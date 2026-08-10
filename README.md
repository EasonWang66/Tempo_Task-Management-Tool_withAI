# **Tempo — AI Task & Focus Planner**

## **Description**

Tempo is a local-first productivity app that helps users plan realistic time blocks, break larger tasks into manageable milestones, focus with a live timer, and learn from the difference between planned and actual work time.

The web experience works without an account and defaults to **Continue without AI**. Users who want task-specific AI breakdowns can optionally connect their own OpenAI or Anthropic API key. Keys are held only for the active browser session and are never written to local storage.

Tempo is built as a macOS-first desktop product with a Vercel-ready web version. Its React and TypeScript core is independent of Tauri so the same task, timer, milestone, and reflection logic can later support Windows and mobile clients.

## **Link to Live Demo**

[https://tempo-task-management-tool-with-ai.vercel.app/](https://tempo-task-management-tool-with-ai.vercel.app/)

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

## **How to Use Tempo**

### **1. Add a task to your day**

Open **Planner**, choose a date, and select **New task**. Enter a clear task title, start time, and planned duration. Select the task card afterward to review its details.

![Tempo planner showing scheduled tasks and generated milestones](docs/screenshots/01-planner.png)

### **2. Create manageable milestones**

Select **AI Break Down** from the task details. Tempo uses its private local planner by default, so this works without an account or API key. To generate a more task-specific plan, connect OpenAI or Anthropic from **Settings** and return to the task.

You can review the suggested milestone names and time allocations before starting. The milestone durations are designed to fit inside the task's planned time block.

### **3. Start a focus session**

Select **Start focus session**. During the session you can:

- Pause or resume the active timer.
- Extend the session by 10 minutes.
- Check off milestones as you finish them.
- Select **Timer widget** in the desktop app for a compact, resizable, always-on-top timer.
- Complete the entire task when the work is finished.

![Tempo focus session with timer and milestone checklist](docs/screenshots/02-focus-session.png)

### **4. Optionally connect an AI provider**

Open **Settings**, choose OpenAI or Anthropic, and enter your own API key. The key is kept in memory only for the active browser session and is not saved to local storage. API usage and billing are handled directly by the selected provider.

![Tempo settings with local, OpenAI, and Anthropic provider choices](docs/screenshots/03-ai-settings.png)

### **5. Review your planning accuracy**

After completing a task, open **History**. Tempo compares the original planned duration with active time spent and provides a short reflection for planning similar work more accurately next time.

![Tempo history showing planned versus actual time and reflection](docs/screenshots/04-history-reflection.png)

## **Web and Desktop Behavior**

The Vercel-hosted web app defaults to local mode, so visitors can use the full planning and timer workflow immediately without entering an API key. AI providers remain optional in Settings.

The Tauri desktop build adds native-window behavior for the focus widget. The main app hides while the widget is active; the widget can remain above other windows and restore Tempo when opened.

## **Getting Started**

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:1420](http://localhost:1420).

Build for production:

```bash
npm run build
npm run preview
```

## **Project Structure**

```text
tempo/
  docs/
    screenshots/          Product walkthrough images used in this README
  public/
    favicon.svg          Minimal hourglass app mark
    hourglass.svg        Transparent interface logo
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
