# Haitham Aloufee Portfolio

A premium, dark-first React portfolio built with Vite. The project is structured to stay easy to edit, easy to extend, and reusable around one main card component: `ProjectCard`.

## Run the project

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## Vercel deployment

The project is ready for Vercel as a standard Vite app.

1. Push the project to GitHub.
2. Open Vercel.
3. Click `Add New Project`.
4. Import your GitHub repository.
5. Vercel should detect it as a `Vite` project automatically.
6. Confirm these values if Vercel asks:
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click `Deploy`.

Deployment support files already included:

- `.gitignore`
- `vercel.json`
- `package.json` with build scripts

## Main structure

```text
portfolio2/
  public/
    favicon.svg
    me.jpg
  src/
    components/
      ContactLinks.jsx
      ExpandableProjects.jsx
      Footer.jsx
      Header.jsx
      Hero.jsx
      ProjectCard.jsx
      SectionBlock.jsx
    data/
      profile.js
      projects.js
      socialLinks.js
    App.jsx
    index.css
    main.jsx
  index.html
  package.json
```

## Where to edit content

- Identity, bio, technologies, SEO, and shared text: `src/data/profile.js`
- LinkedIn, Facebook, Instagram, and email links: `src/data/socialLinks.js`
- Projects data: `src/data/projects.js`
- Hero profile image path: `src/data/profile.js`
- Actual hero image file: `public/me.jpg`
- Main styling, colors, section/card design, and animations: `src/index.css`

## How projects work

The Projects section uses the `projects` array in `src/data/projects.js`.

Each item supports:

- `title`
- `description`
- `year`
- `tags`
- `liveUrl`
- `repoUrl`
- `videoUrl`
- `imageUrl`
- `accent`

## How to add a new project

1. Open `src/data/projects.js`.
2. Copy an existing object in the array.
3. Change `id`, `title`, `description`, `year`, and `tags`.
4. Add `liveUrl` and `repoUrl` if available.
5. If you want a local video preview, put the file in `public/` and use a path like `/media/my-demo.mp4`.
6. If you want a local image preview, use a path like `/images/my-cover.jpg`.
7. Save the file. The new item appears in the Projects section automatically.

## Full workflow for adding your own deployed project

Use this flow every time you finish a real project and want to add it to the portfolio:

1. Finish your own project and make sure it works locally.
2. Deploy it first on a platform such as Vercel, Netlify, GitHub Pages, or your own hosting.
3. Copy the final live URL of the deployed project.
4. If you have source code you want to show, copy the GitHub repository URL too.
5. Prepare a preview asset if you want the card to look better:
   - image example: `public/images/my-project-cover.jpg`
   - video example: `public/media/my-project-demo.mp4`
6. Open `src/data/projects.js`.
7. Copy one full project object from the `projects` array.
8. Paste it at the end of the array and update these fields:
   - `id`: unique value like `task-manager-app`
   - `title`: project name shown on the card
   - `description`: short summary of what the project does
   - `year`: project year like `2026`
   - `tags`: short tech tags like `["React", "Node.js", "MongoDB"]`
   - `liveUrl`: your deployed project URL
   - `repoUrl`: your GitHub repository URL, or leave empty if you do not want to show it
   - `videoUrl`: direct local video path like `/media/my-project-demo.mp4`, or leave empty
   - `imageUrl`: local image path like `/images/my-project-cover.jpg`, or leave empty
   - `accent`: one of the existing visual accents such as `gold`, `sand`, `ember`, `olive`, or `slate`
9. Save the file.
10. Run `npm run dev` and check the Projects section.
11. If the card has no preview image or video yet, the portfolio will show the styled placeholder automatically.
12. When you finish checking, run `npm run build` before deployment.

Important notes:

- `videoUrl` should be a direct media file path, not a YouTube page URL.
- If you only have a live deployed link, just fill `liveUrl` and leave the other optional media fields empty.
- If you replace files inside `public/`, keep the paths updated exactly inside `src/data/projects.js`.
- New projects appear automatically. You do not need to edit the Projects section component itself.

## Theme and styling

- Dark mode is the default theme.
- The theme toggle saves the current choice in `localStorage`.
- Main color tokens live at the top of `src/index.css`.

## Notes

- There is no backend form submission.
- Contact is handled through direct email and social links.
- The current project entries are polished placeholders that you can replace with real work later.
