import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Requires 'node-fetch' if Node < 18, but Node 18+ has native fetch.
// If using older node, install node-fetch and import it.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID; 

async function fetchStats() {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    console.error('Missing API Key or Channel ID');
    process.exit(1);
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.items && data.items.length > 0) {
      const info = data.items[0];
      const stats = {
        subscriberCount: info.statistics.subscriberCount,
        viewCount: info.statistics.viewCount,
        videoCount: info.statistics.videoCount,
        updatedAt: new Date().toISOString()
      };

      const outputPath = path.join(__dirname, '../public/data/channel-stats.json');
      fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
      console.log('✅ Stats updated:', stats);
    } else {
      console.error('❌ Channel not found or API error', data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Fetch failed', error);
    process.exit(1);
  }
}

fetchStats();
