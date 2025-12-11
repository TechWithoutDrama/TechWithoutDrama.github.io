import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import yaml from 'yaml';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../content');
const outputDir = path.join(__dirname, '../public/data');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// 1. Process Blog Posts
const blogDir = path.join(contentDir, 'blog');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
const blogs = blogFiles.map(filename => {
  const content = fs.readFileSync(path.join(blogDir, filename), 'utf8');
  const { attributes, body } = fm(content);
  return {
    slug: filename.replace('.md', ''),
    ...attributes,
    body // We include body here for simplicity, for huge sites, fetch body individually
  };
}).filter(b => !b.draft).sort((a, b) => new Date(b.date) - new Date(a.date));

// 2. Process Upcoming
const upcomingFile = fs.readFileSync(path.join(contentDir, 'upcoming.yml'), 'utf8');
const upcoming = yaml.parse(upcomingFile);

// 3. Process Site Config
const configFile = fs.readFileSync(path.join(contentDir, 'site-config.json'), 'utf8');
const config = JSON.parse(configFile);

const finalData = { config, blogs, upcoming };
fs.writeFileSync(path.join(outputDir, 'content-index.json'), JSON.stringify(finalData, null, 2));

console.log('✅ Content index generated successfully.');
