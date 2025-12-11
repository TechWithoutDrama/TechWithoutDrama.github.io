export interface SiteConfig {
  title: string;
  description: string;
  social: Record<string, string>;
  channelId: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string;
}

export interface UpcomingVideo {
  title: string;
  status: 'Planned' | 'Recording' | 'Editing' | 'Released';
  description: string;
  tentativeDate?: string;
}

export async function fetchContent() {
  // In a real build, this file is in /data/content-index.json
  const res = await fetch('./data/content-index.json');
  if (!res.ok) throw new Error('Failed to load content');
  return res.json() as Promise<{
    config: SiteConfig;
    blogs: BlogPost[];
    upcoming: UpcomingVideo[];
  }>;
}
