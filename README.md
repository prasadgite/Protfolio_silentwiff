# Prasad Gite — Portfolio

Personal engineering portfolio built with **TanStack Start**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

Showcases selected work in machine learning systems, algorithms, real-time infrastructure, and data-intensive applications.

## Tech Stack

- **Framework** — [TanStack Start](https://tanstack.com/start) (SSR + file-based routing)
- **UI** — React 19, [shadcn/ui](https://ui.shadcn.com), [Radix UI](https://www.radix-ui.com)
- **Styling** — Tailwind CSS v4
- **Animation** — [Motion](https://motion.dev) (Framer Motion)
- **Language** — TypeScript
- **Build** — Vite 8
- **Linting** — ESLint + Prettier

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── home/        # Homepage sections
│   ├── layout/      # Navigation, footer, layout shells
│   ├── resume/      # Resume page components
│   ├── search/      # Search functionality
│   └── ui/          # shadcn/ui primitives
├── hooks/           # Custom React hooks
├── lib/
│   └── content/     # Content data (projects, notes, etc.)
├── routes/          # File-based routes (TanStack Router)
├── router.tsx       # Router configuration
├── server.ts        # SSR server entry
├── start.ts         # App entry point
└── styles.css       # Global styles + Tailwind
```

## License

[MIT](./LICENSE)
