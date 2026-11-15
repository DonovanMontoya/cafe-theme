# Cafe theme

A cafe look for the Claude Code desktop and mobile apps. By day the app takes on latte and crema colors; by night it becomes a lamp-lit espresso bar.

Behind the conversation sits a whole cafe, drawn around the edges so the middle stays quiet for reading:

- string lights and two pendant lamps that glow, brightest at night
- an arched window onto the street, with a sun and drifting clouds by day and a moon, stars and lit windows at night
- shelves of jars, cups and a teapot, with trailing ivy
- a chalkboard menu and a wall clock whose hands really turn
- an espresso machine pouring two shots, a cake under glass, a croissant and a latte with a heart in the foam

The side pieces sit clear of the app's sidebar and shrink to fit as the window narrows. On small or short windows some pieces step out of the way. Motion stops if your system asks for reduced motion.

The terminal and editor extensions keep their own look: this theme draws only in the desktop and mobile apps.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install cafe-theme --marketplace DonovanMontoya/cafe-theme
```

Answer `y` to add the marketplace, then pick a scope. From a shell:

```bash
claude plugin install cafe-theme --marketplace DonovanMontoya/cafe-theme
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `DonovanMontoya/cafe-theme`, then Add plugin.

This repository is private. It installs only for people who can read it on GitHub and whose machine already holds a git credential for github.com (an SSH key, or `gh auth login` then `gh auth setup-git`).

## Files

- `hooks/register.tsx` sets the colors and draws the backdrop.
- `hooks/scene.ts` is the cafe itself, one SVG drawing.
- `hooks/make-colors.js` and `hooks/make-colors.d.ts` turn a handful of colors into a full app palette. They come unchanged from Claude Code's plugin authoring kit, and the license below does not cover them.

## License

MIT, for everything except `hooks/make-colors.js` and `hooks/make-colors.d.ts`. See [LICENSE](LICENSE).
