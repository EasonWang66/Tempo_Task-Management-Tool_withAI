import type {Milestone,Provider,Task} from './types';
export const uid=()=>crypto.randomUUID();
export const today=()=>new Date().toLocaleDateString('en-CA');
export const displayDate=(d:string)=>new Date(d+'T12:00:00').toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
export const clock=(s:number)=>`${String(Math.floor(Math.abs(s)/60)).padStart(2,'0')}:${String(Math.abs(s)%60).padStart(2,'0')}`;
export const effectiveElapsed=(t:Task,now=Date.now())=>t.elapsedSeconds+(t.status==='active'&&t.startedAt?Math.floor((now-t.startedAt)/1000):0);
export const endTime=(start:string,minutes:number)=>{const [h,m]=start.split(':').map(Number);const d=new Date(0,0,0,h,m+minutes);return d.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});};
export const formatTime=(s:string)=>new Date(`2000-01-01T${s}`).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
const verbs:Record<string,string[]>={write:['Outline the key points','Draft the core content','Review and tighten the draft','Polish and finalize'],design:['Clarify the goal and constraints','Explore two directions','Build the strongest direction','Review details and export'],study:['Set a clear learning goal','Review the key concepts','Practice with examples','Summarize and test recall'],plan:['Define the desired outcome','Gather constraints and inputs','Create the working plan','Review next actions']};
export function localBreakdown(title:string,total:number):Milestone[]{const key=Object.keys(verbs).find(k=>title.toLowerCase().includes(k))||'plan';const items=verbs[key];let remaining=total;return items.map((x,i)=>{const minutes=i===items.length-1?remaining:Math.max(5,Math.round(total/items.length/5)*5);remaining-=minutes;return{id:uid(),title:x,minutes:Math.max(1,minutes),completed:false};});}
export async function breakdown(provider:Provider,title:string,total:number,key?:string):Promise<Milestone[]>{
  if(provider==='local'||!key)return localBreakdown(title,total);
  const prompt=`Break down this task into 3-6 concrete milestones totaling exactly ${total} minutes: ${title}. Return only JSON array with title and minutes.`;
  const isPreview=location.hostname==='localhost'||location.hostname==='127.0.0.1';
  const url=provider==='openai'?(isPreview?'/api/openai/v1/chat/completions':'https://api.openai.com/v1/chat/completions'):(isPreview?'/api/anthropic/v1/messages':'https://api.anthropic.com/v1/messages');
  const headers:Record<string,string>={'content-type':'application/json'};
  if(provider==='openai')headers.authorization=`Bearer ${key}`;else{headers['x-api-key']=key;headers['anthropic-version']='2023-06-01';}
  const body=provider==='openai'?{model:'gpt-4o-mini',messages:[{role:'user',content:prompt}],response_format:{type:'json_object'}}:{model:'claude-3-5-haiku-latest',max_tokens:700,messages:[{role:'user',content:prompt}]};
  const res=await fetch(url,{method:'POST',headers,body:JSON.stringify(body)});if(!res.ok){let detail='';try{const failure=await res.json();detail=failure?.error?.message||''}catch{}const label=res.status===401?'The API key was rejected':res.status===429?'The account has no available quota or is rate-limited':`OpenAI returned error ${res.status}`;throw new Error(detail?`${label}: ${detail}`:label)}
  const json=await res.json();const raw=provider==='openai'?json.choices[0].message.content:json.content[0].text;const parsed=JSON.parse(raw);const arr=Array.isArray(parsed)?parsed:(parsed.milestones||parsed.tasks);
  return arr.map((m:{title:string;minutes:number})=>({id:uid(),title:m.title,minutes:m.minutes,completed:false}));
}
export function reflection(t:Task,actual:number){const planned=t.originalPlannedMinutes;const delta=actual-planned;const pct=Math.round(Math.abs(delta)/planned*100);if(Math.abs(delta)<=Math.max(2,planned*.1))return `Excellent estimate — you finished within 10% of your ${planned}-minute plan. Keep using this duration for similar work.`;if(delta>0)return `This took ${delta} minutes longer than planned (${pct}% over). Next time, allow about ${actual} minutes or make the milestones smaller before starting.`;return `You finished ${Math.abs(delta)} minutes early (${pct}% under). Your plan had comfortable margin; try a ${actual}–${Math.min(planned,actual+5)} minute block next time.`;}
