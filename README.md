# Tech Without Drama - Website

A responsive, static Single Page Application built with React, Material UI (M3), and Vite. Designed for GitHub Pages with automated YouTube stats fetching.

## 🚀 Quick Setup

### 1. Repository Setup
1. Clone this repo.
2. Run `npm install`.
3. Rename `homepage` in `package.json` to your GitHub Pages URL (e.g., `https://username.github.io/repo-name`).

### 2. Configure Site
Edit `/content/site-config.json` with your channel details.

### 3. YouTube API & Stats (Automated)
To avoid exposing your API key, this repo uses a GitHub Action to fetch stats.

1. Go to Google Cloud Console, create a project, and enable **YouTube Data API v3**.
2. Create an API Key.
3. In this GitHub Repo, go to **Settings > Secrets and variables > Actions**.
4. Add a Repository Secret: `YOUTUBE_API_KEY` (Paste your Google API Key).
5. Add a Repository Variable (or Secret): `YOUTUBE_CHANNEL_ID` (Your Channel ID, e.g., `UCxxxx...`).
6. Enable GitHub Actions in the Settings tab (Read/Write permissions needed for the workflow to commit `channel-stats.json`).

*Note: The workflow runs hourly. You can manually trigger it in the "Actions" tab to test.*

### 4. Deploying
This command builds the site (generating content JSON) and deploys to the `gh-pages` branch.

```bash
npm run deploy
