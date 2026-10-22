# Creator portfolio website

This site is separate from the GitHub profile README. It uses plain HTML, CSS and JavaScript; there is no build step and no package installation.

## Publish on GitHub Pages
1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. The workflow in `.github/workflows/pages.yml` deploys the root website after changes are pushed to `main`.
4. When deployment completes, GitHub Actions will show the published Pages URL. For this project repository, it is typically `https://jemshadlamb0.github.io/jemshadlamb0/`.

## Update profile information
- Edit `creator-data.js` to update follower/subscriber snapshots and social URLs.
- GitHub follower and public-repository counts are retrieved live from the public GitHub API.
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
