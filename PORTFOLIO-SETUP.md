# Creator portfolio website

This site is separate from the GitHub profile README. It uses plain HTML, CSS and JavaScript; there is no build step and no package installation.

## One-time publishing setup
The GitHub connection can commit the source files, but repository Pages settings must be enabled once by an account owner.

1. Open **https://github.com/jemshadlamb0/jemshadlamb0/settings/pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open **https://github.com/jemshadlamb0/jemshadlamb0/actions/workflows/pages.yml** and run the workflow using **Run workflow** (or re-run the latest failed run).
4. When the workflow succeeds, the Pages URL is usually **https://jemshadlamb0.github.io/jemshadlamb0/**.

After this one-time setting is enabled, updates to the site files on `main` trigger deployments automatically.

## Update profile information
- Edit `creator-data.js` to update follower/subscriber snapshots and social URLs.
- GitHub follower and public-repository counts are retrieved live from the public GitHub API.
- The social audience figures are the last snapshot supplied earlier and may be out of date; refresh them in `creator-data.js`.
- Facebook currently displays its reported follower count, but its direct Page link is intentionally blank because the exact Page URL was not available. Add it to the `href` field in `creator-data.js`.
- The content cards are content categories and links to the relevant channel, not a claim that every card represents a single published post. Replace/add individual post URLs when you want a true latest-content feed.

## Brand tokens
- Red: `#FF0000`
- Navy: `#000080`
- Black: `#000000`
- White: `#FFFFFF`
- Heading 1: Anton
- Heading 2 / subheading: Antonio
- Body: Merriweather
- Code / prompts: IBM Plex Mono
