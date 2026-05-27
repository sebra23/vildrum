# VILDRUM E-Commerce Website — Build Plan

## Overview
Build a premium e-commerce website for VILDRUM — an inflatable Scandinavian outdoor shelter brand. Inspired by Vipp's minimal, architectural aesthetic. Single-page application with HashRouter.

## Brand Foundation
- **Brand**: VILDRUM — "A room for the wild"
- **Positioning**: Portable Nordic architecture (not camping tents, not glamping)
- **Aesthetic**: Quiet, architectural, premium, calm — Vipp Shelter × Snow Peak × Aesop
- **Colors**: Limestone, Dune, Ash, Charcoal, Pine, Fog, Warm White
- **Typography**: Clean sans-serif, generous letter-spacing, refined hierarchy

## Pages (Planned by Designer in Phase 2)
1. **Home** — Hero, brand intro, product showcase, lifestyle editorial, CTA
2. **Products** — Full product catalog grid with filtering
3. **Product Detail** — Individual shelter pages with specs, gallery, add to cart
4. **Our Story** — Brand philosophy, Scandinavian roots, design approach
5. **Journal** — Editorial content, outdoor living inspiration
6. **Cart** — Shopping cart with checkout flow

## Execution Stages

### Phase 1: Init Project
- Read webapp-building-swarm SKILL.md
- Run init-webapp.sh
- Research: Visit Vipp.com, gather brand context

### Phase 2: Design (Pro_Designer Subagent)
- Load design-guide.md
- Create design.md + per-page designs + asset manifest
- Design decisions: minimalism, muted palette, editorial photography

### Phase 3: Scaffold (Subagent)
- Home page implementation
- Shared components (Navbar, Footer, Layout)
- Asset generation
- Router setup with route stubs

### Phase 4: Parallel Page Implementation
- **Group A**: Products + Product Detail pages
- **Group B**: Our Story + Journal pages
- **Group C**: Cart feature + e-commerce functionality

### Phase 5: Merge, Build & Deploy
- Octopus merge all branches
- Wire routes
- Build and deploy

## Skill Loading
- Phase 1: `vibecoding-webapp-swarm` SKILL.md + `webapp-building-swarm` SKILL.md
- Phase 2: `design-guide.md` (for Pro_Designer)
- Phase 3: `react-dev.md` (for Scaffold)
- Phase 4: `react-dev.md` (for all page agents)
