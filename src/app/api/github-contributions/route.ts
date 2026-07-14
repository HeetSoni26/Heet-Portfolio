import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'HeetSoni26';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface ContributionDay {
  date: string;
  contributionCount: number;
  color?: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

function generateServerMockData() {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  let totalContributions = 0;

  // Generate last 52 weeks of data
  for (let week = 51; week >= 0; week--) {
    const contributionDays: ContributionDay[] = [];
    
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (week * 7 + (6 - day)));
      
      const count = Math.floor(Math.random() * 6); // Max 5 contributions for realistic look
      totalContributions += count;
      
      let color = '#161b22';
      if (count > 0) color = '#0e4429';
      if (count > 1) color = '#006d32';
      if (count > 3) color = '#26a641';
      if (count > 4) color = '#39d353';
      
      contributionDays.push({
        date: date.toISOString().split('T')[0],
        contributionCount: count,
        color,
      });
    }
    
    weeks.push({ contributionDays });
  }

  // Calculate streaks
  const allDays = weeks.flatMap((week) => week.contributionDays);
  const { currentStreak, longestStreak } = calculateStreaks(allDays);

  return {
    totalContributions,
    weeks,
    currentStreak,
    longestStreak,
  };
}

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      console.warn('GitHub token not configured. Returning server mock contributions.');
      return NextResponse.json(generateServerMockData());
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`GitHub API returned response status ${response.status}. Returning server mock contributions.`);
      return NextResponse.json(generateServerMockData());
    }

    const data = await response.json();

    if (data.errors) {
      console.warn(`GitHub API returned GraphQL errors: ${data.errors[0].message}. Returning server mock contributions.`);
      return NextResponse.json(generateServerMockData());
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;

    // Calculate streaks
    const allDays = calendar.weeks.flatMap((week: ContributionWeek) => week.contributionDays);
    const { currentStreak, longestStreak } = calculateStreaks(allDays);

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      currentStreak,
      longestStreak,
    });
  } catch (error) {
    console.error('Error fetching GitHub contributions, returning fallback mock data:', error);
    return NextResponse.json(generateServerMockData());
  }
}

function calculateStreaks(days: ContributionDay[]) {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Sort days by date (newest first)
  const sortedDays = [...days].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate current streak (from today backwards)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const day of sortedDays) {
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    if (dayDate > today) continue; // Skip future dates

    if (day.contributionCount > 0) {
      currentStreak++;
    } else {
      break; // Stop at first day with no contributions
    }
  }

  // Calculate longest streak
  for (const day of days) {
    if (day.contributionCount > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}
