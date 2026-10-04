import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'HeetSoni26';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitCommit {
  sha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
}

export async function GET() {
  try {
    let events = [];
    
    if (GITHUB_TOKEN) {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Heet-Portfolio-CLI',
        },
        next: { revalidate: 1800 }, // Cache for 30 minutes
      });

      if (response.ok) {
        events = await response.json();
      } else {
        console.warn(`GitHub API events error: ${response.status}`);
      }
    }

    const commits: GitCommit[] = [];
    
    // Parse PushEvents
    if (Array.isArray(events)) {
      for (const event of events) {
        if (event.type === 'PushEvent' && event.payload && Array.isArray(event.payload.commits)) {
          const repoName = event.repo.name.replace(`${GITHUB_USERNAME}/`, '');
          const eventDate = new Date(event.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          for (const commit of event.payload.commits) {
            commits.push({
              sha: commit.sha.substring(0, 7),
              message: commit.message,
              repo: repoName,
              date: eventDate,
              url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
            });
            if (commits.length >= 10) break; // Limit to 10 commits
          }
        }
        if (commits.length >= 10) break;
      }
    }

    // No commits fetched (API failure, rate limits, or no pushes recently) — return empty
    if (commits.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(commits);
  } catch (error) {
    console.error('Error in github-commits api route:', error);
    return NextResponse.json([]);
  }
}
