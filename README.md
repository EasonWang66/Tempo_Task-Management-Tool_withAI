# **Tempo — AI Task & Focus Planner**

## **Description**

Tempo is a local-first productivity app that helps users plan realistic time blocks, break larger tasks into manageable milestones, focus with a live timer, and learn from the difference between planned and actual work time.

The web experience works without an account and defaults to **Continue without AI**. Users who want task-specific AI breakdowns can optionally connect their own OpenAI or Anthropic API key. Keys are held only for the active browser session and are never written to local storage.

Tempo is built as a macOS-first desktop product with a Vercel-ready web version. Its React and TypeScript core is independent of Tauri so the same task, timer, milestone, and reflection logic can later support Windows and mobile clients.

## **Link to Live Demo**

Deploy this repository with Vercel to create the production URL. The Vercel configuration is included in `vercel.json`.

## **Tools and Technologies Used**

**React** — component-based planner, focus, history, settings, and onboarding UI  
**TypeScript** — typed tasks, milestones, providers, timers, and persistence boundaries  
**Vite** — development server and optimized production build  
**Tauri 2** — native macOS/Windows shell and always-on-top focus widget foundation  
**Local Storage** — replaceable local-first web persistence adapter  
**OpenAI and Anthropic APIs** — optional bring-your-own-key milestone generation  
**CSS3** — responsive desktop interface, focus timer, onboarding, and widget styling  
**Vercel** — web hosting and provider API relay configuration  
**Git & GitHub** — version control and public project documentation

## **Core Product Features**

**Day planner** — schedule tasks by date, start time, and planned duration.  
**Milestone planning** — generate task steps locally or through a configured AI provider.  
**Focus sessions** — start, pause, resume, extend, and complete timed work.  
**Timer widget** — compact, resizable, draggable, always-on-top native focus window.  
**Live checklist** — mark individual milestones complete during a session.  
**Planning reflection** — compare planned and actual time and receive a practical suggestion.  
**History** — review completed sessions and estimation patterns.  
**Private by default** — tasks remain on the local device; no account or cloud sync is required.

## **Web and Desktop Behavior**

The Vercel-hosted web app defaults to local mode, so visitors can use the full planning and timer workflow immediately without entering an API key. AI providers remain optional in Settings.

The Tauri desktop build adds native-window behavior for the focus widget. The main app hides while the widget is active; the widget can remain above other windows and restore Tempo when opened.

## **Getting Started**

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:1420`.

Build for production:

```bash
npm run build
npm run preview
```

## **Deploy to Vercel**

1. Import this GitHub repository into Vercel.
2. Keep the detected framework as **Vite**.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Deploy. No environment variables are required for local mode.

`vercel.json` contains the OpenAI and Anthropic relay rewrites used by the optional bring-your-own-key flow.

## **Run the macOS Desktop App**

Install the Rust toolchain and Apple Command Line Tools, then run:

```bash
npm run tauri dev
```

Before public desktop distribution, connect the scaffolded secret-storage boundary to macOS Keychain and package, sign, and notarize the application.

## **Project Structure**

```text
tempo/
  public/
    favicon.svg          Minimal hourglass app mark
  src/
    App.tsx              Planner, focus, onboarding, history, settings, widget
    lib.ts               Timer math, AI adapters, local breakdowns, reflections
    storage.ts           Replaceable local persistence interface
    types.ts             Core task, milestone, provider, and settings types
    styles.css           Main desktop application styles
    welcome.css          Onboarding and provider setup styles
    widget.css           Compact focus widget styles
    logo.css             Minimal hourglass UI mark
  src-tauri/             Tauri 2 desktop shell and native permissions
  vercel.json            Vercel build and API relay configuration
  vite.config.ts         Vite development and local API proxy configuration
```

## **Current Product Scope**

Tempo is a functional MVP. Authentication, cloud sync, subscriptions, calendar integrations, team workspaces, and mobile clients are intentionally outside the current scope.

## **Privacy and API Keys**

Do not commit API keys to this repository. The web app keeps entered keys only in memory for the active session. For a production desktop release, store secrets using macOS Keychain or an audited Tauri secure-storage plugin rather than browser storage.

