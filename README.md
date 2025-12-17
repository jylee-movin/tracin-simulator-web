## TRACIN Simulator (movin-tracin-simulator)

Interactive 3D web simulator for visualizing **movin TRACIN** setup conditions and motion-capture modes.

### What this app does

- **Control setup parameters** from the top panel:
  - Mocap zone: **Width / Length / Height / Distance**
  - Installation height: **Tripod** or **Ceiling**
  - Light condition: **Bright / Less / Dark**
  - Mocap mode: **Setup / Body Only / Hands On**
- **3D viewport** shows:
  - TRACIN device + mount/tripod/truss (depending on installation height)
  - A character model (Michelle) positioned by the **Distance** setting
  - A wireframe + floor overlay representing the configured mocap zone
  - Camera zoom animation when switching mocap modes

### Project constraints / behavior

- Changing zone settings **auto-resets mocap mode to `setup`**.
- **Hands On** is **disabled in Dark** light.
- Switching to **Hands On** while light is **Dark** will also switch light to **Bright**.
- When distance is at **1.5m**, zone **length is constrained to 1m** (then increases as distance increases).

---

### Tech stack / libraries used

- **App / tooling**
  - **React 19** + **TypeScript**
  - **Vite** (dev server + build)
  - **ESLint** (flat config)

- **3D / rendering**
  - **three**
  - **@react-three/fiber** (React renderer for Three.js)
  - **@react-three/drei** (helpers like `OrbitControls`, `Grid`, `Gizmo`, `useGLTF`, `useFBX`, `Loader`, `Text`, `Line`)

- **State management**
  - **zustand**

- **UI / styling**
  - **Tailwind CSS v4** + **@tailwindcss/vite**
  - **shadcn/ui** (component pattern) + **Radix UI** primitives
  - **class-variance-authority**, **clsx**, **tailwind-merge**
  - **tw-animate-css**
  - **lucide-react** (icons)

---

### Local development

#### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **pnpm**: recommended (this repo includes `pnpm-lock.yaml`)

#### Install

```bash
pnpm install
```

#### Run (dev)

```bash
pnpm dev
```

Vite will print the local URL (typically `http://localhost:5173`).

#### Build (production)

```bash
pnpm build
```

Build output is generated in `dist/`.

#### Preview the production build locally

```bash
pnpm preview
```

#### Lint

```bash
pnpm lint
```

---

### Deploy to Vercel

This is a static Vite build (output: `dist/`), so it deploys cleanly on Vercel.

1. Push this repo to GitHub.
2. In Vercel: **New Project** → import the GitHub repo.
3. Vercel will usually auto-detect **Vite**. If you need to set it manually:
   - **Framework Preset**: Vite
   - **Install Command**: `pnpm install`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

No environment variables are required for the current codebase.

---

### Project structure (high level)

- `src/App.tsx`: layout (ControlPanel + Viewport)
- `src/components/ControlPanel.tsx`: top UI panels
- `src/components/Viewport.tsx`: R3F canvas + scene composition
- `src/store/simulator-store.ts`: Zustand state + constraints (min/max, mode/light rules)
- `src/assets/`: 3D assets (`.glb`, `.fbx`) used by the scene

---

### Notes

- Import alias: `@/*` maps to `src/*` (see `vite.config.ts` and `tsconfig*.json`).
- Vite is configured to include 3D assets: `**/*.glb`, `**/*.gltf`, `**/*.fbx`.
