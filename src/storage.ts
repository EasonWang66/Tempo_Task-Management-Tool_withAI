import type {Settings,Task} from './types';
export interface Persistence{loadTasks():Task[];saveTasks(tasks:Task[]):void;loadSettings():Settings;saveSettings(s:Settings):void}
class BrowserPersistence implements Persistence{loadTasks(){try{return JSON.parse(localStorage.getItem('tempo.tasks')||'[]')}catch{return[]}}saveTasks(v:Task[]){localStorage.setItem('tempo.tasks',JSON.stringify(v))}loadSettings(){try{return JSON.parse(localStorage.getItem('tempo.settings')||'{"provider":"local","onboarded":false}')}catch{return{provider:'local',onboarded:false} as Settings}}saveSettings(v:Settings){localStorage.setItem('tempo.settings',JSON.stringify(v))}}
export const storage:Persistence=new BrowserPersistence();
// API keys intentionally never enter localStorage. Native builds should replace the
// session-only key with tauri-plugin-keyring/Stronghold-backed commands.
