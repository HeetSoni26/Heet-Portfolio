'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect, memo } from 'react';
import * as THREE from 'three';

// ─── Configuration ───────────────────────────────────────────────────────────

const SPHERE_RADIUS = 2.4;
const GEODESIC_DETAIL = 3;
const RING_COUNT = 10;
const RING_SEGMENTS = 64;

// ─── Generate Geodesic Structure ─────────────────────────────────────────────

function generateGeodesicStructure(radius: number, detail: number) {
  const geometry = new THREE.IcosahedronGeometry(radius, detail);
  const positions = geometry.attributes.position;

  const vertices: THREE.Vector3[] = [];
  const vertexMap = new Map<string, number>();

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    const key = `${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;

    if (!vertexMap.has(key)) {
      vertexMap.set(key, vertices.length);
      vertices.push(new THREE.Vector3(x, y, z));
    }
  }

  const edges: [number, number][] = [];
  const edgeSet = new Set<string>();

  for (let i = 0; i < positions.count; i += 3) {
    const indices: number[] = [];

    for (let j = 0; j < 3; j++) {
      const x = positions.getX(i + j);
      const y = positions.getY(i + j);
      const z = positions.getZ(i + j);
      const key = `${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;
      indices.push(vertexMap.get(key)!);
    }

    const triEdges: [number, number][] = [
      [indices[0], indices[1]],
      [indices[1], indices[2]],
      [indices[2], indices[0]],
    ];

    for (const [a, b] of triEdges) {
      const edgeKey = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (!edgeSet.has(edgeKey)) {
        edgeSet.add(edgeKey);
        edges.push([a, b]);
      }
    }
  }

  geometry.dispose();
  return { vertices, edges };
}

// ─── Generate Latitude Rings ─────────────────────────────────────────────────

function generateLatitudeRings(radius: number, ringCount: number, segments: number) {
  const ringPositions: Float32Array[] = [];

  for (let ring = 1; ring < ringCount; ring++) {
    const phi = (ring / ringCount) * Math.PI;
    const y = radius * Math.cos(phi);
    const ringRadius = radius * Math.sin(phi);

    const positions = new Float32Array(segments * 3);

    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      positions[i * 3] = ringRadius * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = ringRadius * Math.sin(theta);
    }

    ringPositions.push(positions);
  }

  return ringPositions;
}

// ─── Custom Shaders ──────────────────────────────────────────────────────────

const edgeVertexShader = `
  attribute float aEdgeProgress;
  varying float vProgress;
  varying vec3 vWorldPosition;

  void main() {
    vProgress = aEdgeProgress;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const edgeFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vProgress;
  varying vec3 vWorldPosition;

  void main() {
    float pulse = sin(uTime * 2.0 - vProgress * 6.28) * 0.5 + 0.5;
    pulse = pow(pulse, 3.0);

    float heightFactor = 1.0 - abs(vWorldPosition.y) / 2.5;
    heightFactor = 0.6 + heightFactor * 0.4;

    vec3 baseColor = uColor;
    vec3 pulseColor = vec3(0.4, 0.85, 1.0);
    vec3 finalColor = mix(baseColor, pulseColor, pulse * 0.35);

    float alpha = uOpacity * heightFactor * (0.7 + pulse * 0.3);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const nodeVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    float pulse = sin(uTime * 1.5 + aPhase) * 0.5 + 0.5;

    float size = aSize * (0.8 + pulse * 0.4);
    gl_PointSize = size * (80.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;
    vAlpha = 0.2 + pulse * 0.2;
    vGlow = pulse;
  }
`;

const nodeFragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 2.0);

    float core = 1.0 - smoothstep(0.0, 0.15, dist);

    vec3 coreColor = vec3(1.0, 1.0, 1.0);
    vec3 glowColor = uColor;
    vec3 finalColor = mix(glowColor, coreColor, core);

    float alpha = glow * vAlpha;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const ringVertexShader = `
  varying vec3 vPosition;

  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragmentShader = `
  uniform float uTime;
  uniform float uRingIndex;
  uniform float uOpacity;
  varying vec3 vPosition;

  void main() {
    float angle = atan(vPosition.z, vPosition.x);
    float flow = sin(angle * 3.0 + uTime * 1.5 + uRingIndex * 1.5) * 0.5 + 0.5;

    vec3 color1 = vec3(0.2, 0.6, 1.0);
    vec3 color2 = vec3(0.1, 0.9, 0.7);
    vec3 color = mix(color1, color2, flow);

    float alpha = uOpacity * (0.4 + flow * 0.4);

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Geodesic Edges Component ────────────────────────────────────────────────

function GeodesicEdges({
  vertices,
  edges,
}: {
  vertices: THREE.Vector3[];
  edges: [number, number][];
}) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const progress: number[] = [];

    edges.forEach(([a, b]) => {
      const v1 = vertices[a];
      const v2 = vertices[b];

      positions.push(v1.x, v1.y, v1.z);
      positions.push(v2.x, v2.y, v2.z);

      progress.push(0, 1);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('aEdgeProgress', new THREE.Float32BufferAttribute(progress, 1));

    return geo;
  }, [vertices, edges]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: edgeVertexShader,
      fragmentShader: edgeFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0.2, 0.6, 1.0) },
        uOpacity: { value: 0.25 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <lineSegments geometry={geometry} material={material} />;
}

// ─── Geodesic Nodes Component ────────────────────────────────────────────────

function GeodesicNodes({ vertices }: { vertices: THREE.Vector3[] }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(vertices.length * 3);
    const sizes = new Float32Array(vertices.length);
    const phases = new Float32Array(vertices.length);

    vertices.forEach((v, i) => {
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;

      const heightFactor = 1.0 - Math.abs(v.y) / SPHERE_RADIUS;
      sizes[i] = 0.8 + heightFactor * 0.5 + Math.random() * 0.3;
      phases[i] = Math.random() * Math.PI * 2;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute('aPhase', new THREE.Float32BufferAttribute(phases, 1));

    return geo;
  }, [vertices]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0.3, 0.7, 1.0) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <points geometry={geometry} material={material} />;
}

// ─── Latitude Ring Component ─────────────────────────────────────────────────

function LatitudeRing({
  positions,
  ringIndex,
}: {
  positions: Float32Array;
  ringIndex: number;
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: ringVertexShader,
      fragmentShader: ringFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRingIndex: { value: ringIndex },
        uOpacity: { value: 0.1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [ringIndex]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <lineLoop geometry={geometry} material={material} />;
}

function LatitudeRings() {
  const rings = useMemo(
    () => generateLatitudeRings(SPHERE_RADIUS, RING_COUNT, RING_SEGMENTS),
    [],
  );

  return (
    <>
      {rings.map((positions, i) => (
        <LatitudeRing key={i} positions={positions} ringIndex={i} />
      ))}
    </>
  );
}

// ─── Outer Glow Shell ────────────────────────────────────────────────────────

function GlowShell() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[SPHERE_RADIUS * 1.02, 64, 64]} />
      <meshBasicMaterial
        color="#2080ff"
        transparent
        opacity={0.02}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Core Glow ───────────────────────────────────────────────────────────────

function CoreGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.02 + 0.98;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[SPHERE_RADIUS * 0.15, 32, 32]} />
      <meshBasicMaterial
        color="#3399ff"
        transparent
        opacity={0.04}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ─── Main Network Component ──────────────────────────────────────────────────

function GeodesicNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const rotationRef = useRef({
    baseY: 0,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  const { vertices, edges } = useMemo(
    () => generateGeodesicStructure(SPHERE_RADIUS, GEODESIC_DETAIL),
    [],
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      const rot = rotationRef.current;

      rot.baseY += 0.002;

      const smoothDelta = Math.min(delta, 0.1);
      const lerpFactor = 1 - Math.pow(0.001, smoothDelta);

      rot.targetX = pointer.y * 0.15;
      rot.targetY = pointer.x * 0.2;

      rot.currentX += (rot.targetX - rot.currentX) * lerpFactor * 2;
      rot.currentY += (rot.targetY - rot.currentY) * lerpFactor * 2;

      groupRef.current.rotation.y = rot.baseY + rot.currentY;
      groupRef.current.rotation.x = rot.currentX;
    }
  });

  return (
    <group ref={groupRef}>
      <CoreGlow />
      <GeodesicEdges vertices={vertices} edges={edges} />
      <GeodesicNodes vertices={vertices} />
      <LatitudeRings />
      <GlowShell />
    </group>
  );
}

// ─── Canvas Wrapper ──────────────────────────────────────────────────────────

function EarthSceneCanvas({ isVisible }: { isVisible: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
      frameloop={isVisible ? 'always' : 'never'}
    >
      <GeodesicNetwork />
    </Canvas>
  );
}

const MemoizedCanvas = memo(EarthSceneCanvas);

export default function EarthScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full" 
      style={{ minHeight: '320px', contain: 'strict' }}
    >
      <MemoizedCanvas isVisible={isVisible} />
    </div>
  );
}
