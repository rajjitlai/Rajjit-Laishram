# Changelog

All notable changes to the Rajjit Laishram portfolio project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.7.11] - 2026-06-01
### Added
- **Interactive Drone Media**: Created modular [ImageCarousel](file:///d:/Code/Rajjit-Laishram/app/(home)/components/ImageCarousel.tsx) and [VideoDemo](file:///d:/Code/Rajjit-Laishram/app/(home)/components/VideoDemo.tsx) components for the **SYS_01 Autonomous Drone System (NAWA)**.
- **Auto-sliding & Hover-pause**: Added 5-second autoplay interval to the carousel with an automatic mouse hover pausing listener to prevent disruptive transitions while looking.
- **Next.js & Vercel Image Patterns**: Configured `remotePatterns` inside [next.config.ts](file:///d:/Code/Rajjit-Laishram/next.config.ts) for `fra.cloud.appwrite.io` and `cloud.appwrite.io` to ensure image optimization build compatibility.
- **HTML5 Video Upgrades**: Embedded the Appwrite video feed in an un-interrupted autoplay loop, muted by default for browser policy compatibility, and removed the controls overlay.
- **Right-Click Prevention**: Added mouse event capture context-menu locks to prevent native context controls menu from appearing on right-clicks on the drone feed.

### Fixed
- **ESLint/TypeScript Audits**: Resolved 6 linter issues in [UAVSimulation.tsx](file:///d:/Code/Rajjit-Laishram/components/ui/UAVSimulation.tsx):
  - Removed unused lucide-react imports (`CheckCircle2`, `Battery`).
  - Cleared unused variables and state handles (`dt`, `completedCount`, `setCompletedCount`).
  - Resolved `react-hooks/exhaustive-deps` warning by appending `initAudio` callback to the main physics loop dependency list.
- **Variable Destructuring**: Suppressed unused linter errors on waypoints array via placeholder destructuring syntax (`[, setWaypoints]`).

---

## [2.7.10] - 2026-05-15
### Added
- **Tactical UAV Flight Simulator**: Implemented a responsive 60FPS simulation playground mapping autonomous patrolling and user-controlled flight zones.
- **Sensor Filters**: Implemented optics view toggles for thermal inversion and night-vision optics overlays.
- **Synthesized Audio hums**: Programmed custom sound oscillators reproducing real-time motor frequency shifts based on throttle changes.

---

## [2.7.0] - 2026-04-20
### Added
- **Forensic Mission Log modal**: Programmed custom responsive drawers detailing task schematics, roles, and project outputs.
- **Interactive Scroll timelines**: Added custom milestones tracking NIDAR Disaster management showcases.

---

## [2.0.0] - 2026-03-01
### Changed
- **Cyber-themed UI Revamp**: Completed core transition to customized HSL CSS theme, introducing neon-green (`#38ff42`) and neon-cyan (`#00fdea`) glow filters.
- **Appwrite backend integrations**: Connected message logs, testimonials, and resume schemas to the Appwrite backend.
