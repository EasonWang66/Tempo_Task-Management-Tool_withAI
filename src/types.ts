export type Milestone={id:string;title:string;minutes:number;completed:boolean};
export type TaskStatus='planned'|'active'|'paused'|'completed';
export type Task={id:string;title:string;date:string;startTime:string;plannedMinutes:number;originalPlannedMinutes:number;status:TaskStatus;milestones:Milestone[];elapsedSeconds:number;startedAt?:number;completedAt?:number;reflection?:string};
export type Provider='local'|'openai'|'anthropic';
export type Settings={provider:Provider;onboarded?:boolean};
