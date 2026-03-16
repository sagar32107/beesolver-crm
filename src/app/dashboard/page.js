"use client";
import { useState, useEffect, useReducer, useMemo, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

const IC={leads:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,dash:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,pipe:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,gear:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,plus:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>,search:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,x:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,edit:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,trash:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,filter:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,check:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>,logout:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,cal:<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,clip:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>,msg:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,warn:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,clock:<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,fire:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1012 0c0-1.532-1.056-3.94-2-5-1.786 3-2 2-4 2z"/></svg>};

const fmt$=(n)=>"$"+(n||0).toLocaleString();
const fmtDate=(d)=>new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric"});
const fmtDateTime=(d)=>new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"});
const isOverdue=(d)=>new Date(d)<new Date(new Date().toDateString());
const isSameDay=(a,b)=>{const d1=new Date(a),d2=new Date(b);return d1.getFullYear()===d2.getFullYear()&&d1.getMonth()===d2.getMonth()&&d1.getDate()===d2.getDate();};
const daysSince=(d)=>Math.floor((Date.now()-new Date(d).getTime())/(1000*60*60*24));

const DEFAULT_SOURCES=["Website","Referral","LinkedIn","Cold Outreach","Conference","Google Ads","Social Media","Partner","Other"];

function getLeadScore(lead,stages){
  let score=0;
  const st=stages.find(s=>s.id===lead.stage_id);
  const stName=(st?.name||"").toLowerCase();
  if(stName==="won")return{score:100,label:"Won",color:"#10b981"};
  if(stName==="lost")return{score:0,label:"Lost",color:"#ef4444"};
  if(lead.value>=30000)score+=30;else if(lead.value>=15000)score+=20;else if(lead.value>=5000)score+=10;
  if(stName==="negotiation")score+=30;else if(stName==="proposal")score+=25;else if(stName==="qualified")score+=20;else if(stName==="contacted")score+=10;else score+=5;
  const age=daysSince(lead.updated_at||lead.created_at);
  if(age<7)score+=20;else if(age<14)score+=10;else if(age<30)score+=5;
  if(lead.email)score+=5;
  if(lead.company)score+=5;
  if(score>=70)return{score,label:"Hot",color:"#ef4444"};
  if(score>=40)return{score,label:"Warm",color:"#f59e0b"};
  return{score,label:"Cold",color:"#3b82f6"};
}

function getWinProb(stageName){
  const s=(stageName||"").toLowerCase();
  if(s==="new")return 10;if(s==="contacted")return 20;if(s==="qualified")return 40;
  if(s==="proposal")return 60;if(s==="negotiation")return 80;if(s==="won")return 100;if(s==="lost")return 0;return 15;
}

function isStale(lead){return daysSince(lead.updated_at||lead.created_at)>14;}

function reducer(s,a){switch(a.type){
case "INIT":return{...s,...a.payload,loading:false};
case "SET_PAGE":return{...s,page:a.p};
case "ADD_LEAD":return{...s,leads:[a.p,...s.leads]};
case "UPD_LEAD":return{...s,leads:s.leads.map(l=>l.id===a.p.id?{...l,...a.p}:l)};
case "DEL_LEAD":return{...s,leads:s.leads.filter(l=>l.id!==a.p)};
case "SET_STAGES":return{...s,stages:a.p};
case "SET_CF":return{...s,customFields:a.p};
case "SET_SOURCES":return{...s,sources:a.p};
case "SET_SEARCH":return{...s,search:a.p};
case "SET_FILTER":return{...s,filters:{...s.filters,...a.p}};
case "CLR_FILTERS":return{...s,filters:{},search:""};
case "SET_VIEW":return{...s,view:a.p};
case "SET_MODAL":return{...s,modal:a.p};
case "SET_SEL":return{...s,sel:a.p};
case "SET_FBAR":return{...s,fbar:a.p};
default:return s;}}

function Badge({color,children,onClick,style:xs}){return <span onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:999,fontSize:12,fontWeight:600,background:color+"18",color,cursor:onClick?"pointer":"default",whiteSpace:"nowrap",...xs}}>{children}</span>;}
function Btn({children,v="primary",sz="md",onClick,style:xs,disabled}){const b={border:"none",borderRadius:8,cursor:disabled?"not-allowed":"pointer",fontWeight:600,display:"inline-flex",alignItems:"center",gap:6,transition:"all .15s",opacity:disabled?.5:1};const vs={primary:{background:"#6366f1",color:"#fff",padding:sz==="sm"?"6px 12px":"8px 18px",fontSize:sz==="sm"?12:14},secondary:{background:"#f1f5f9",color:"#334155",padding:sz==="sm"?"6px 12px":"8px 18px",fontSize:sz==="sm"?12:14},ghost:{background:"transparent",color:"#64748b",padding:"6px 8px",fontSize:13},danger:{background:"#fee2e2",color:"#ef4444",padding:sz==="sm"?"6px 12px":"8px 18px",fontSize:sz==="sm"?12:14}};return <button onClick={onClick} disabled={disabled} style={{...b,...vs[v],...xs}}>{children}</button>;}
function Inp({label,value,onChange,type="text",placeholder,options,required}){const s={width:"100%",padding:"8px 12px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:14,outline:"none",background:"#fff",boxSizing:"border-box"};return(<div style={{marginBottom:12}}>{label&&<label style={{fontSize:12,fontWeight:600,color:"#64748b",marginBottom:4,display:"block"}}>{label}{required&&<span style={{color:"#ef4444"}}> *</span>}</label>}{type==="select"?<select value={value} onChange={e=>onChange(e.target.value)} style={s}><option value="">Select...</option>{(options||[]).map(o=><option key={typeof o==="object"?o.value:o} value={typeof o==="object"?o.value:o}>{typeof o==="object"?o.label:o}</option>)}</select>:type==="textarea"?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3} style={{...s,resize:"vertical"}}/>:<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={s}/>}</div>);}
function Modal({title,onClose,children,width=520}){return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}><div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:width,maxHeight:"90vh",overflow:"auto",boxShadow:"0 25px 50px -12px rgba(0,0,0,.25)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",borderBottom:"1px solid #f1f5f9"}}><h3 style={{margin:0,fontSize:16,fontWeight:700}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",padding:4}}>{IC.x}</button></div><div style={{padding:20}}>{children}</div></div></div>);}

function checkDuplicates(name,email,company,leads,excludeId){const dupes=[];const n=(name||"").toLowerCase().trim();const e=(email||"").toLowerCase().trim();const c=(company||"").toLowerCase().trim();leads.forEach(l=>{if(l.id===excludeId)return;let score=0;if(n&&(l.name||"").toLowerCase().trim()===n)score+=3;else if(n&&(l.name||"").toLowerCase().includes(n))score+=1;if(e&&e===(l.email||"").toLowerCase().trim())score+=4;if(c&&c===(l.company||"").toLowerCase().trim())score+=1;if(score>=3)dupes.push({lead:l,score});});return dupes.sort((a,b)=>b.score-a.score);}

async function logActivity(leadId,userId,action,details){try{await supabase.from("activities").insert({lead_id:leadId,user_id:userId,action:action,details:details||{}});}catch(e){}}

function LeadForm({lead,stages,customFields,profiles,leads,sources,onSave,onClose}){
  const [f,setF]=useState(lead||{name:"",email:"",phone:"",company:"",source:"",stage_id:stages[0]?.id||"",value:"",assignee_id:"",notes:"",custom_data:{}});
  const [dupes,setDupes]=useState([]);
  const [err,setErr]=useState("");
  const u=(k,v)=>{const nf={...f,[k]:v};setF(nf);setErr("");if(k==="name"||k==="email"||k==="company")setDupes(checkDuplicates(nf.name,nf.email,nf.company,leads||[],lead?.id));};
  const uCF=(k,v)=>setF(p=>({...p,custom_data:{...p.custom_data,[k]:v}}));
  const profileOpts=(profiles||[]).map(p=>({value:p.id,label:p.full_name||p.email}));
  const stageOpts=(stages||[]).map(s=>({value:s.id,label:s.name}));
  const submit=()=>{if(!f.name.trim()){setErr("Name is required");return;}onSave({...f,value:Number(f.value)||0});};
  return(<>
    {dupes.length>0&&<div style={{padding:"10px 14px",background:"#fef3c7",border:"1px solid #fbbf24",borderRadius:10,marginBottom:14,display:"flex",alignItems:"flex-start",gap:8}}><span style={{color:"#f59e0b",flexShrink:0,marginTop:2}}>{IC.warn}</span><div><div style={{fontSize:13,fontWeight:600,color:"#92400e"}}>Possible duplicate{dupes.length>1?"s":""} found:</div>{dupes.map(d=><div key={d.lead.id} style={{fontSize:12,color:"#92400e",marginTop:2}}>{d.lead.name}{d.lead.email?" — "+d.lead.email:""}{d.lead.company?" ("+d.lead.company+")":""}</div>)}</div></div>}
    {err&&<div style={{padding:"8px 12px",background:"#fee2e2",borderRadius:8,marginBottom:12,fontSize:13,color:"#dc2626"}}>{err}</div>}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
      <Inp label="Full Name" required value={f.name} onChange={v=>u("name",v)} placeholder="John Doe"/>
      <Inp label="Email" value={f.email} onChange={v=>u("email",v)} placeholder="john@example.com" type="email"/>
      <Inp label="Phone" value={f.phone} onChange={v=>u("phone",v)} placeholder="+1 555-0000"/>
      <Inp label="Company" value={f.company} onChange={v=>u("company",v)} placeholder="Acme Inc"/>
      <Inp label="Source" value={f.source} onChange={v=>u("source",v)} type="select" options={sources||DEFAULT_SOURCES}/>
      <Inp label="Stage" value={f.stage_id} onChange={v=>u("stage_id",v)} type="select" options={stageOpts}/>
      <Inp label="Deal Value ($)" value={f.value} onChange={v=>u("value",v)} type="number" placeholder="0"/>
      <Inp label="Assignee" value={f.assignee_id} onChange={v=>u("assignee_id",v)} type="select" options={profileOpts}/>
    </div>
    {customFields&&customFields.length>0&&<><div style={{fontSize:12,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1,margin:"8px 0"}}>Custom Fields</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>{customFields.map(cf=><Inp key={cf.id} label={cf.name} value={f.custom_data?.[cf.id]||""} onChange={v=>uCF(cf.id,cf.field_type==="number"?Number(v):v)} type={cf.field_type==="select"?"select":cf.field_type==="number"?"number":"text"} options={cf.options}/>)}</div></>}
    <Inp label="Notes" value={f.notes} onChange={v=>u("notes",v)} type="textarea" placeholder="Any notes..."/>
    <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}><Btn v="secondary" onClick={onClose}>Cancel</Btn><Btn onClick={submit}>{lead?"Update":"Create Lead"}</Btn></div>
  </>);
}

function CommentsSection({leadId,user,profiles}){const [comments,setComments]=useState([]);const [text,setText]=useState("");useEffect(()=>{supabase.from("activities").select("*").eq("lead_id",leadId).eq("action","comment").order("created_at",{ascending:false}).then(({data})=>setComments(data||[]));},[leadId]);const add=async()=>{if(!text.trim())return;const{data}=await supabase.from("activities").insert({lead_id:leadId,user_id:user.id,action:"comment",details:{text:text}}).select().single();if(data)setComments(p=>[data,...p]);setText("");};const getName=(uid)=>{const p=(profiles||[]).find(x=>x.id===uid);return p?.full_name||p?.email||"Unknown";};return(<div style={{marginTop:20}}><div style={{fontSize:13,fontWeight:700,color:"#334155",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{IC.msg} Notes & Comments</div><div style={{display:"flex",gap:8,marginBottom:12}}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Add a comment..." style={{flex:1,padding:"7px 10px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:13}} onKeyDown={e=>e.key==="Enter"&&add()}/><Btn sz="sm" onClick={add}>Post</Btn></div>{comments.map(c=><div key={c.id} style={{padding:"8px 0",borderBottom:"1px solid #f8fafc"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:12,fontWeight:600,color:"#6366f1"}}>{getName(c.user_id)}</span><span style={{fontSize:11,color:"#94a3b8"}}>{fmtDateTime(c.created_at)}</span></div><div style={{fontSize:13,color:"#475569"}}>{c.details?.text}</div></div>)}{comments.length===0&&<div style={{fontSize:12,color:"#cbd5e1",textAlign:"center",padding:8}}>No comments yet</div>}</div>);}

function ActivityTimeline({leadId,profiles}){const [acts,setActs]=useState([]);useEffect(()=>{supabase.from("activities").select("*").eq("lead_id",leadId).neq("action","comment").order("created_at",{ascending:false}).limit(20).then(({data})=>setActs(data||[]));},[leadId]);const getName=(uid)=>{const p=(profiles||[]).find(x=>x.id===uid);return p?.full_name||p?.email||"System";};const desc=(a)=>{switch(a.action){case "created":return "created this lead";case "updated":return "updated this lead";case "stage_changed":return "moved to "+(a.details?.to||"new stage");case "task_added":return "added task: "+(a.details?.text||"");case "task_done":return "completed task: "+(a.details?.text||"");case "assigned":return "assigned to "+(a.details?.to||"someone");case "file_attached":return "attached file: "+(a.details?.name||"");default:return a.action;}};return(<div style={{marginTop:20}}><div style={{fontSize:13,fontWeight:700,color:"#334155",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{IC.clock} Activity Timeline</div>{acts.map(a=><div key={a.id} style={{display:"flex",gap:10,padding:"6px 0",borderBottom:"1px solid #f8fafc"}}><div style={{width:8,height:8,borderRadius:99,background:"#6366f1",marginTop:5,flexShrink:0}}/><div><div style={{fontSize:13}}><span style={{fontWeight:600,color:"#334155"}}>{getName(a.user_id)}</span>{" "}<span style={{color:"#64748b"}}>{desc(a)}</span></div><div style={{fontSize:11,color:"#94a3b8"}}>{fmtDateTime(a.created_at)}</div></div></div>)}{acts.length===0&&<div style={{fontSize:12,color:"#cbd5e1",textAlign:"center",padding:8}}>No activity yet</div>}</div>);}

function FileAttachments({leadId,user}){const [files,setFiles]=useState([]);const [uploading,setUploading]=useState(false);const ref=useRef(null);useEffect(()=>{loadFiles();},[leadId]);const loadFiles=async()=>{try{const{data}=await supabase.storage.from("attachments").list(leadId+"/");setFiles(data||[]);}catch(e){setFiles([]);}};const upload=async(e)=>{const file=e.target.files?.[0];if(!file)return;setUploading(true);try{const path=leadId+"/"+Date.now()+"_"+file.name;await supabase.storage.from("attachments").upload(path,file);await logActivity(leadId,user.id,"file_attached",{name:file.name});await loadFiles();}catch(err){}setUploading(false);};const getUrl=(name)=>{const{data}=supabase.storage.from("attachments").getPublicUrl(leadId+"/"+name);return data?.publicUrl||"#";};const del=async(name)=>{await supabase.storage.from("attachments").remove([leadId+"/"+name]);await loadFiles();};return(<div style={{marginTop:20}}><div style={{fontSize:13,fontWeight:700,color:"#334155",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{IC.clip} Attachments</div>{files.map(f=><div key={f.name} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:"1px solid #f8fafc"}}><span style={{color:"#6366f1"}}>{IC.clip}</span><a href={getUrl(f.name)} target="_blank" rel="noreferrer" style={{flex:1,fontSize:13,color:"#3b82f6",textDecoration:"none"}}>{f.name.replace(/^\d+_/,"")}</a><button onClick={()=>del(f.name)} style={{background:"none",border:"none",cursor:"pointer",color:"#cbd5e1",padding:2}}>{IC.trash}</button></div>)}<input ref={ref} type="file" onChange={upload} style={{display:"none"}}/><Btn v="secondary" sz="sm" onClick={()=>ref.current?.click()} style={{marginTop:8}} disabled={uploading}>{IC.clip} {uploading?"Uploading...":"Attach File"}</Btn></div>);}

function LeadDetail({lead,stages,customFields,profiles,dispatch,onClose,user,sources}){
  const [tt,setTT]=useState("");const [td,setTD]=useState("");const [tasks,setTasks]=useState([]);const [tab,setTab]=useState("details");
  const stage=stages.find(s=>s.id===lead.stage_id);const assignee=(profiles||[]).find(p=>p.id===lead.assignee_id);
  const isAdmin=(profiles||[]).find(p=>p.id===user?.id)?.role==="admin";
  const score=getLeadScore(lead,stages);const stale=isStale(lead);
  useEffect(()=>{supabase.from("tasks").select("*").eq("lead_id",lead.id).order("created_at").then(({data})=>setTasks(data||[]));},[lead.id]);
  const addTask=async()=>{if(!tt)return;const{data}=await supabase.from("tasks").insert({lead_id:lead.id,text:tt,due_date:td||null,created_by:user.id}).select().single();if(data){setTasks(p=>[...p,data]);await logActivity(lead.id,user.id,"task_added",{text:tt});}setTT("");setTD("");};
  const toggleTask=async(t)=>{await supabase.from("tasks").update({is_done:!t.is_done}).eq("id",t.id);setTasks(p=>p.map(x=>x.id===t.id?{...x,is_done:!x.is_done}:x));if(!t.is_done)await logActivity(lead.id,user.id,"task_done",{text:t.text});};
  const delTask=async(id)=>{await supabase.from("tasks").delete().eq("id",id);setTasks(p=>p.filter(x=>x.id!==id));};
  const moveStage=async(sid)=>{const sName=(stages.find(s=>s.id===sid)||{}).name||"";await supabase.from("leads").update({stage_id:sid}).eq("id",lead.id);dispatch({type:"UPD_LEAD",p:{id:lead.id,stage_id:sid}});await logActivity(lead.id,user.id,"stage_changed",{to:sName});};
  const assignLead=async(pid)=>{const pName=((profiles||[]).find(p=>p.id===pid)||{}).full_name||"";await supabase.from("leads").update({assignee_id:pid}).eq("id",lead.id);dispatch({type:"UPD_LEAD",p:{id:lead.id,assignee_id:pid}});await logActivity(lead.id,user.id,"assigned",{to:pName});};
  const tabs=[{id:"details",label:"Details"},{id:"tasks",label:"Tasks"},{id:"comments",label:"Notes"},{id:"files",label:"Files"},{id:"activity",label:"Activity"}];
  return(
    <div style={{position:"fixed",right:0,top:0,bottom:0,width:460,maxWidth:"100vw",background:"#fff",boxShadow:"-10px 0 40px rgba(0,0,0,.1)",zIndex:999,overflow:"auto",borderLeft:"1px solid #e2e8f0",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"16px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div><h3 style={{margin:0,fontSize:16}}>{lead.name}</h3><div style={{display:"flex",gap:6,marginTop:4}}><Badge color={score.color}>{IC.fire} {score.label} ({score.score})</Badge>{stale&&<Badge color="#f59e0b">Stale ({daysSince(lead.updated_at||lead.created_at)}d)</Badge>}</div></div>
        <div style={{display:"flex",gap:4}}><Btn v="ghost" sz="sm" onClick={()=>{dispatch({type:"SET_MODAL",p:{type:"editLead",lead:lead}});onClose();}}>{IC.edit}</Btn><button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",padding:4}}>{IC.x}</button></div>
      </div>
      <div style={{display:"flex",gap:0,borderBottom:"1px solid #f1f5f9",flexShrink:0}}>{tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"10px 16px",fontSize:12,fontWeight:600,border:"none",background:"none",cursor:"pointer",color:tab===t.id?"#6366f1":"#94a3b8",borderBottom:tab===t.id?"2px solid #6366f1":"2px solid transparent"}}>{t.label}</button>)}</div>
      <div style={{padding:20,flex:1,overflow:"auto"}}>
        {tab==="details"&&<><div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}><Badge color={stage?.color||"#6366f1"}>{stage?.name||"—"}</Badge><Badge color="#64748b">{fmt$(lead.value)}</Badge>{lead.source&&<Badge color="#64748b">{lead.source}</Badge>}</div>
          <div style={{display:"grid",gap:12,fontSize:14}}>{[["Company",lead.company],["Email",lead.email],["Phone",lead.phone],["Assignee",assignee?.full_name],["Win Probability",getWinProb(stage?.name)+"%"],["Created",lead.created_at?fmtDate(lead.created_at):"—"],["Last Updated",lead.updated_at?fmtDate(lead.updated_at):"—"]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#94a3b8"}}>{k}</span><span style={{fontWeight:500}}>{v||"—"}</span></div>)}{(customFields||[]).map(cf=><div key={cf.id} style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#94a3b8"}}>{cf.name}</span><span style={{fontWeight:500}}>{lead.custom_data?.[cf.id]||"—"}</span></div>)}</div>
          {lead.notes&&<div style={{marginTop:16,padding:12,background:"#f8fafc",borderRadius:10,fontSize:13,color:"#475569"}}>{lead.notes}</div>}
          {isAdmin&&<div style={{marginTop:16}}><label style={{fontSize:12,fontWeight:600,color:"#64748b",display:"block",marginBottom:4}}>Assign to team member</label><select value={lead.assignee_id||""} onChange={e=>assignLead(e.target.value)} style={{padding:"8px 12px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:14,width:"100%"}}><option value="">Unassigned</option>{(profiles||[]).map(p=><option key={p.id} value={p.id}>{p.full_name||p.email}</option>)}</select></div>}
          <div style={{marginTop:16,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}><span style={{fontSize:12,color:"#94a3b8",fontWeight:600}}>Move to:</span>{stages.filter(s=>s.id!==lead.stage_id).map(s=><Badge key={s.id} color={s.color} onClick={()=>moveStage(s.id)} style={{cursor:"pointer",fontSize:11}}>{s.name}</Badge>)}</div>
        </>}
        {tab==="tasks"&&<div><div style={{fontSize:13,fontWeight:700,color:"#334155",marginBottom:10}}>Tasks & Follow-ups</div>{tasks.map(t=>(<div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:"1px solid #f1f5f9"}}><div onClick={()=>toggleTask(t)} style={{width:20,height:20,borderRadius:6,border:t.is_done?"none":"2px solid #cbd5e1",background:t.is_done?"#10b981":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>{t.is_done&&<span style={{color:"#fff"}}>{IC.check}</span>}</div><div style={{flex:1}}><div style={{fontSize:13,textDecoration:t.is_done?"line-through":"none",color:t.is_done?"#94a3b8":"#334155"}}>{t.text}</div>{t.due_date&&<div style={{fontSize:11,color:!t.is_done&&isOverdue(t.due_date)?"#ef4444":"#94a3b8"}}>Due {fmtDate(t.due_date)}{!t.is_done&&isOverdue(t.due_date)?" • Overdue":""}</div>}</div><button onClick={()=>delTask(t.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#cbd5e1",padding:2}}>{IC.trash}</button></div>))}<div style={{display:"flex",gap:8,marginTop:10}}><input value={tt} onChange={e=>setTT(e.target.value)} placeholder="New task..." style={{flex:1,padding:"7px 10px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:13}} onKeyDown={e=>e.key==="Enter"&&addTask()}/><input type="date" value={td} onChange={e=>setTD(e.target.value)} style={{padding:"7px 10px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:13,width:130}}/><Btn sz="sm" onClick={addTask}>{IC.plus}</Btn></div></div>}
        {tab==="comments"&&<CommentsSection leadId={lead.id} user={user} profiles={profiles}/>}
        {tab==="files"&&<FileAttachments leadId={lead.id} user={user}/>}
        {tab==="activity"&&<ActivityTimeline leadId={lead.id} profiles={profiles}/>}
      </div>
    </div>);
}

const DEFAULT_COLS=[{id:"name",label:"Name",on:true,system:true},{id:"score",label:"Score",on:true,system:false},{id:"company",label:"Company",on:true,system:false},{id:"stage",label:"Stage",on:true,system:false},{id:"value",label:"Value",on:true,system:false},{id:"assignee",label:"Assignee",on:true,system:false},{id:"source",label:"Source",on:true,system:false},{id:"email",label:"Email",on:false,system:false},{id:"phone",label:"Phone",on:false,system:false},{id:"age",label:"Age",on:false,system:false},{id:"created",label:"Created",on:true,system:false}];

function LeadsTable({leads,stages,profiles,customFields,dispatch}){
  const [showColPicker,setShowColPicker]=useState(false);
  const [cols,setCols]=useState(()=>{const cf=(customFields||[]).map(f=>({id:"cf_"+f.id,label:f.name,on:false,system:false,cfId:f.id}));return[...DEFAULT_COLS,...cf];});
  useEffect(()=>{setCols(prev=>{const existing=prev.map(c=>c.id);const cf=(customFields||[]).filter(f=>!existing.includes("cf_"+f.id)).map(f=>({id:"cf_"+f.id,label:f.name,on:false,system:false,cfId:f.id}));if(cf.length===0)return prev;return[...prev,...cf];});},[customFields]);
  const toggleCol=(id)=>setCols(p=>p.map(c=>c.id===id&&!c.system?{...c,on:!c.on}:c));
  const activeCols=cols.filter(c=>c.on);
  const getCellContent=(col,l)=>{const st=stages.find(s=>s.id===l.stage_id);const as=(profiles||[]).find(p=>p.id===l.assignee_id);const sc=getLeadScore(l,stages);
    switch(col.id){case "name":return <><div style={{fontWeight:600}}>{l.name}</div>{isStale(l)&&<span style={{fontSize:10,color:"#f59e0b"}}>Stale</span>}</>;case "score":return <Badge color={sc.color}>{sc.label}</Badge>;case "company":return <span style={{color:"#475569"}}>{l.company||"—"}</span>;case "stage":return <Badge color={st?.color||"#6366f1"}>{st?.name||"—"}</Badge>;case "value":return <span style={{fontWeight:600}}>{fmt$(l.value)}</span>;case "assignee":return <span style={{color:"#64748b",fontSize:13}}>{as?.full_name||"—"}</span>;case "source":return <span style={{color:"#64748b"}}>{l.source||"—"}</span>;case "email":return <span style={{color:"#64748b",fontSize:13}}>{l.email||"—"}</span>;case "phone":return <span style={{color:"#64748b",fontSize:13}}>{l.phone||"—"}</span>;case "age":return <span style={{color:isStale(l)?"#f59e0b":"#94a3b8",fontSize:13}}>{daysSince(l.updated_at||l.created_at)}d</span>;case "created":return <span style={{color:"#94a3b8",fontSize:13}}>{l.created_at?fmtDate(l.created_at):"—"}</span>;default:if(col.cfId)return <span style={{color:"#475569",fontSize:13}}>{l.custom_data?.[col.cfId]||"—"}</span>;return "—";}};
  return(<div><div style={{display:"flex",justifyContent:"flex-end",marginBottom:8,position:"relative"}}><Btn v="ghost" sz="sm" onClick={()=>setShowColPicker(!showColPicker)}>{IC.gear} Columns</Btn>{showColPicker&&<div style={{position:"absolute",top:36,right:0,background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:12,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",zIndex:50,width:220}}><div style={{fontSize:12,fontWeight:700,color:"#64748b",marginBottom:8}}>Show/Hide Columns</div>{cols.map(c=><label key={c.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 4px",cursor:c.system?"default":"pointer",fontSize:13,color:c.system?"#94a3b8":"#334155"}}><input type="checkbox" checked={c.on} onChange={()=>toggleCol(c.id)} disabled={c.system} style={{accentColor:"#6366f1"}}/>{c.label}{c.system&&<span style={{fontSize:10,color:"#cbd5e1"}}>(required)</span>}</label>)}<div style={{borderTop:"1px solid #f1f5f9",marginTop:8,paddingTop:8}}><Btn v="ghost" sz="sm" onClick={()=>setShowColPicker(false)}>Done</Btn></div></div>}</div>
    <div style={{overflowX:"auto",borderRadius:12,border:"1px solid #e2e8f0"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}><thead><tr style={{background:"#f8fafc"}}>{activeCols.map(c=><th key={c.id} style={{textAlign:"left",padding:"10px 14px",fontWeight:600,color:"#64748b",fontSize:12,textTransform:"uppercase",letterSpacing:.5,whiteSpace:"nowrap"}}>{c.label}</th>)}</tr></thead><tbody>{leads.map(l=><tr key={l.id} onClick={()=>dispatch({type:"SET_SEL",p:l})} style={{cursor:"pointer",borderTop:"1px solid #f1f5f9"}} onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{activeCols.map(c=><td key={c.id} style={{padding:"10px 14px"}}>{getCellContent(c,l)}</td>)}</tr>)}{leads.length===0&&<tr><td colSpan={activeCols.length} style={{textAlign:"center",padding:40,color:"#94a3b8"}}>No leads found.</td></tr>}</tbody></table></div></div>);
}

function PipelineView({leads,stages,dispatch}){return(<div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:12}}>{stages.filter(s=>s.name!=="Lost").map(stage=>{const sl=leads.filter(l=>l.stage_id===stage.id);const tot=sl.reduce((a,l)=>a+(l.value||0),0);return(<div key={stage.id} style={{minWidth:240,flex:"1 0 240px",background:"#f8fafc",borderRadius:12,padding:12}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:10,borderRadius:99,background:stage.color}}/><span style={{fontWeight:700,fontSize:13}}>{stage.name}</span><span style={{background:"#e2e8f0",borderRadius:99,padding:"1px 8px",fontSize:11,fontWeight:600}}>{sl.length}</span></div><span style={{fontSize:12,color:"#64748b",fontWeight:600}}>{fmt$(tot)}</span></div>{sl.map(l=>{const sc=getLeadScore(l,stages);return(<div key={l.id} onClick={()=>dispatch({type:"SET_SEL",p:l})} style={{background:"#fff",borderRadius:10,padding:12,cursor:"pointer",border:"1px solid #e2e8f0",marginBottom:8}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.08)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}><span style={{fontWeight:600,fontSize:13}}>{l.name}</span><Badge color={sc.color} style={{fontSize:10}}>{sc.label}</Badge></div><div style={{fontSize:12,color:"#94a3b8",marginBottom:6}}>{l.company}</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:13,fontWeight:700,color:"#334155"}}>{fmt$(l.value)}</span>{isStale(l)&&<span style={{fontSize:10,color:"#f59e0b"}}>Stale</span>}</div></div>);})}</div>);})}</div>);}

function CalendarView(){const [month,setMonth]=useState(()=>{const d=new Date();return new Date(d.getFullYear(),d.getMonth(),1);});const [allTasks,setAllTasks]=useState([]);useEffect(()=>{supabase.from("tasks").select("*").order("due_date").then(({data})=>setAllTasks(data||[]));},[]);const year=month.getFullYear();const mo=month.getMonth();const firstDay=new Date(year,mo,1).getDay();const daysInMonth=new Date(year,mo+1,0).getDate();const days=[];for(let i=0;i<firstDay;i++)days.push(null);for(let i=1;i<=daysInMonth;i++)days.push(new Date(year,mo,i));const prev=()=>setMonth(new Date(year,mo-1,1));const next=()=>setMonth(new Date(year,mo+1,1));const today=new Date();return(<div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><Btn v="secondary" sz="sm" onClick={prev}>← Prev</Btn><h3 style={{fontSize:16,fontWeight:700}}>{month.toLocaleDateString("en-US",{month:"long",year:"numeric"})}</h3><Btn v="secondary" sz="sm" onClick={next}>Next →</Btn></div><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:1,background:"#e2e8f0",borderRadius:12,overflow:"hidden"}}>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d} style={{padding:"8px",textAlign:"center",fontSize:12,fontWeight:600,color:"#64748b",background:"#f8fafc"}}>{d}</div>)}{days.map((day,i)=>{const dayTasks=day?allTasks.filter(t=>t.due_date&&isSameDay(t.due_date,day)):[];const isToday=day&&isSameDay(day,today);return <div key={i} style={{minHeight:80,padding:4,background:isToday?"#eef2ff":"#fff",verticalAlign:"top"}}>{day&&<><div style={{fontSize:12,fontWeight:isToday?700:400,color:isToday?"#6366f1":"#64748b",marginBottom:2,textAlign:"right",paddingRight:4}}>{day.getDate()}</div>{dayTasks.slice(0,3).map(t=><div key={t.id} style={{fontSize:10,padding:"2px 4px",borderRadius:4,marginBottom:2,background:t.is_done?"#dcfce7":isOverdue(t.due_date)?"#fee2e2":"#e0e7ff",color:t.is_done?"#16a34a":isOverdue(t.due_date)?"#dc2626":"#4338ca",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.is_done?"✓ ":""}{t.text}</div>)}{dayTasks.length>3&&<div style={{fontSize:10,color:"#94a3b8",paddingLeft:4}}>+{dayTasks.length-3} more</div>}</>}</div>;})}</div></div>);}

function DashboardView({leads,stages}){
  const total=leads.length;const totalVal=leads.reduce((a,l)=>a+(l.value||0),0);
  const wonStage=stages.find(s=>s.name==="Won");const lostStage=stages.find(s=>s.name==="Lost");
  const wonLeads=wonStage?leads.filter(l=>l.stage_id===wonStage.id):[];const wonVal=wonLeads.reduce((a,l)=>a+(l.value||0),0);
  const conv=total>0?((wonLeads.length/total)*100).toFixed(1):0;
  const activeLeads=leads.filter(l=>l.stage_id!==(wonStage?.id)&&l.stage_id!==(lostStage?.id));
  const forecast=activeLeads.reduce((a,l)=>{const st=stages.find(s=>s.id===l.stage_id);return a+(l.value||0)*(getWinProb(st?.name)/100);},0);
  const staleCount=activeLeads.filter(l=>isStale(l)).length;
  const hotLeads=activeLeads.filter(l=>getLeadScore(l,stages).label==="Hot").length;
  const bySource={};leads.forEach(l=>{bySource[l.source||"Unknown"]=(bySource[l.source||"Unknown"]||0)+1;});
  const srcEntries=Object.entries(bySource).sort((a,b)=>b[1]-a[1]);const maxSrc=srcEntries[0]?.[1]||1;
  const activeStages=stages.filter(s=>s.name!=="Won"&&s.name!=="Lost");
  const cards=[{label:"Total Leads",value:total,color:"#6366f1"},{label:"Pipeline Value",value:fmt$(totalVal),color:"#3b82f6"},{label:"Won Revenue",value:fmt$(wonVal),color:"#10b981"},{label:"Conversion",value:conv+"%",color:"#f59e0b"},{label:"Forecast",value:fmt$(Math.round(forecast)),color:"#8b5cf6"},{label:"Hot Leads",value:hotLeads,color:"#ef4444"},{label:"Stale Leads",value:staleCount,color:"#f59e0b"},{label:"Active",value:activeLeads.length,color:"#14b8a6"}];
  return(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:12,marginBottom:20}}>{cards.map(c=><div key={c.label} style={{background:"#fff",borderRadius:12,padding:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:11,color:"#94a3b8",fontWeight:600,marginBottom:4}}>{c.label}</div><div style={{fontSize:22,fontWeight:800,color:c.color}}>{c.value}</div></div>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      <div style={{background:"#fff",borderRadius:12,padding:16,border:"1px solid #e2e8f0"}}><div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Pipeline & Win Probability</div>{activeStages.map(s=>{const sl=leads.filter(l=>l.stage_id===s.id);const val=sl.reduce((a,l)=>a+(l.value||0),0);const wp=getWinProb(s.name);return(<div key={s.id} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{fontWeight:600}}>{s.name} <span style={{color:"#94a3b8"}}>({sl.length})</span></span><span style={{color:"#64748b"}}>{fmt$(val)} · {wp}% win</span></div><div style={{height:8,background:"#f1f5f9",borderRadius:99}}><div style={{height:"100%",borderRadius:99,background:s.color,width:(total>0?(sl.length/total)*100:0)+"%"}}/></div></div>);})}</div>
      <div style={{background:"#fff",borderRadius:12,padding:16,border:"1px solid #e2e8f0"}}><div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Lead Sources</div>{srcEntries.map(([src,cnt])=>(<div key={src} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span style={{fontWeight:600}}>{src}</span><span style={{color:"#64748b"}}>{cnt}</span></div><div style={{height:8,background:"#f1f5f9",borderRadius:99}}><div style={{height:"100%",borderRadius:99,background:"#6366f1",width:((cnt/maxSrc)*100)+"%"}}/></div></div>))}</div>
    </div>
    {staleCount>0&&<div style={{background:"#fffbeb",borderRadius:12,padding:16,border:"1px solid #fbbf24"}}><div style={{fontSize:13,fontWeight:700,color:"#92400e",marginBottom:8}}>{IC.warn} {staleCount} Stale Lead{staleCount>1?"s":""} — No activity in 14+ days</div>{activeLeads.filter(l=>isStale(l)).slice(0,5).map(l=><div key={l.id} style={{fontSize:13,color:"#92400e",padding:"4px 0"}}>{l.name}{l.company?" — "+l.company:""} · Last updated {daysSince(l.updated_at||l.created_at)} days ago</div>)}</div>}
  </div>);
}

function SettingsView({stages,customFields,dispatch,profile,profiles,sources,onSourcesChange}){
  const [ns,setNS]=useState({name:"",color:"#6366f1"});const [nf,setNF]=useState({name:"",type:"text",options:""});
  const [newSource,setNewSource]=useState("");
  const isAdmin=profile?.role==="admin";
  const colors=["#6366f1","#3b82f6","#10b981","#f59e0b","#ec4899","#8b5cf6","#ef4444","#14b8a6","#f97316"];
  const addStage=async()=>{if(!ns.name||!isAdmin)return;const{data}=await supabase.from("stages").insert({name:ns.name,color:ns.color,position:stages.length}).select().single();if(data)dispatch({type:"SET_STAGES",p:[...stages,data]});setNS({name:"",color:"#6366f1"});};
  const delStage=async(id)=>{const st=stages.find(s=>s.id===id);if(st?.is_system||!isAdmin)return;await supabase.from("stages").delete().eq("id",id);dispatch({type:"SET_STAGES",p:stages.filter(s=>s.id!==id)});};
  const addField=async()=>{if(!nf.name||!isAdmin)return;const opts=nf.type==="select"?nf.options.split(",").map(o=>o.trim()).filter(Boolean):[];const{data}=await supabase.from("custom_fields").insert({name:nf.name,field_type:nf.type,options:opts,position:customFields.length}).select().single();if(data)dispatch({type:"SET_CF",p:[...customFields,data]});setNF({name:"",type:"text",options:""});};
  const delField=async(id)=>{if(!isAdmin)return;await supabase.from("custom_fields").delete().eq("id",id);dispatch({type:"SET_CF",p:customFields.filter(f=>f.id!==id)});};
  const changeRole=async(uid,role)=>{await supabase.from("profiles").update({role:role}).eq("id",uid);};
  const addSource=()=>{if(!newSource.trim()||sources.includes(newSource.trim()))return;onSourcesChange([...sources,newSource.trim()]);setNewSource("");};
  const delSource=(s)=>{onSourcesChange(sources.filter(x=>x!==s));};

  if(!isAdmin)return <div style={{padding:40,textAlign:"center",color:"#94a3b8"}}>Only admins can manage settings. Your role: <Badge color="#6366f1">{profile?.role}</Badge></div>;

  return(<div style={{maxWidth:700}}>
    <h3 style={{fontSize:16,fontWeight:700,marginBottom:16}}>Pipeline Stages</h3>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>{stages.map(s=><div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"#f8fafc",borderRadius:10}}><div style={{width:16,height:16,borderRadius:99,background:s.color}}/><span style={{flex:1,fontWeight:600,fontSize:14}}>{s.name}</span>{!s.is_system&&<button onClick={()=>delStage(s.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#cbd5e1"}}>{IC.trash}</button>}</div>)}</div>
    <div style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:32}}><Inp label="Stage Name" value={ns.name} onChange={v=>setNS(p=>({...p,name:v}))} placeholder="e.g. Discovery"/><div style={{marginBottom:12}}><label style={{fontSize:12,fontWeight:600,color:"#64748b",marginBottom:4,display:"block"}}>Color</label><div style={{display:"flex",gap:4}}>{colors.map(c=><div key={c} onClick={()=>setNS(p=>({...p,color:c}))} style={{width:24,height:24,borderRadius:6,background:c,cursor:"pointer",border:ns.color===c?"2px solid #1e293b":"2px solid transparent"}}/>)}</div></div><Btn onClick={addStage} style={{marginBottom:12}}>{IC.plus} Add</Btn></div>

    <h3 style={{fontSize:16,fontWeight:700,marginBottom:16}}>Lead Sources</h3>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>{sources.map(s=><div key={s} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"#f8fafc",borderRadius:10}}><span style={{flex:1,fontWeight:600,fontSize:14}}>{s}</span><button onClick={()=>delSource(s)} style={{background:"none",border:"none",cursor:"pointer",color:"#cbd5e1"}}>{IC.trash}</button></div>)}</div>
    <div style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:32}}><Inp label="Source Name" value={newSource} onChange={setNewSource} placeholder="e.g. Facebook Ads"/><Btn onClick={addSource} style={{marginBottom:12}}>{IC.plus} Add</Btn></div>

    <h3 style={{fontSize:16,fontWeight:700,marginBottom:16}}>Custom Fields</h3>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>{customFields.map(f=><div key={f.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"#f8fafc",borderRadius:10}}><Badge color="#6366f1">{f.field_type}</Badge><span style={{flex:1,fontWeight:600,fontSize:14}}>{f.name}</span><button onClick={()=>delField(f.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#cbd5e1"}}>{IC.trash}</button></div>)}</div>
    <div style={{display:"flex",gap:8,alignItems:"flex-end",flexWrap:"wrap"}}><Inp label="Field Name" value={nf.name} onChange={v=>setNF(p=>({...p,name:v}))} placeholder="e.g. Region"/><Inp label="Type" value={nf.type} onChange={v=>setNF(p=>({...p,type:v}))} type="select" options={["text","number","select"]}/>{nf.type==="select"&&<Inp label="Options (comma)" value={nf.options} onChange={v=>setNF(p=>({...p,options:v}))} placeholder="Low, Medium, High"/>}<Btn onClick={addField} style={{marginBottom:12}}>{IC.plus} Add</Btn></div>

    <h3 style={{fontSize:16,fontWeight:700,marginTop:32,marginBottom:16}}>Team Members & Roles</h3>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>{(profiles||[]).map(p=><div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"#f8fafc",borderRadius:10}}><div style={{width:32,height:32,borderRadius:99,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:700}}>{(p.full_name||p.email||"?")[0].toUpperCase()}</div><div style={{flex:1}}><div style={{fontWeight:600,fontSize:14}}>{p.full_name||"Unnamed"}</div><div style={{fontSize:12,color:"#94a3b8"}}>{p.email}</div></div><select value={p.role} onChange={e=>changeRole(p.id,e.target.value)} style={{padding:"4px 8px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:12}} disabled={p.id===profile.id}><option value="admin">Admin</option><option value="manager">Manager</option><option value="member">Member</option></select></div>)}</div>
  </div>);
}

export default function CRMDashboard(){
  const [state,dispatch]=useReducer(reducer,{page:"leads",leads:[],stages:[],customFields:[],sources:DEFAULT_SOURCES,search:"",filters:{},view:"table",modal:null,sel:null,fbar:false,loading:true});
  const {page,leads,stages,customFields,sources,search,filters,view,modal,sel,fbar,loading}=state;
  const [user,setUser]=useState(null);const [profile,setProfile]=useState(null);const [profiles,setProfiles]=useState([]);
  const router=useRouter();

  useEffect(()=>{
    const load=async()=>{
      const{data:{session}}=await supabase.auth.getSession();
      if(!session){router.push("/");return;}
      setUser(session.user);
      const[profRes,stagesRes,cfRes,leadsRes,allProf]=await Promise.all([
        supabase.from("profiles").select("*").eq("id",session.user.id).single(),
        supabase.from("stages").select("*").order("position"),
        supabase.from("custom_fields").select("*").order("position"),
        supabase.from("leads").select("*").order("created_at",{ascending:false}),
        supabase.from("profiles").select("*"),
      ]);
      setProfile(profRes.data);setProfiles(allProf.data||[]);
      const savedSources=profRes.data?.sources;
      dispatch({type:"INIT",payload:{stages:stagesRes.data||[],customFields:cfRes.data||[],leads:leadsRes.data||[],sources:savedSources||DEFAULT_SOURCES}});
    };
    load();
    const{data:{subscription}}=supabase.auth.onAuthStateChange(function(_,session){if(!session)router.push("/");});
    return function(){subscription.unsubscribe();};
  },[router]);

  const saveLead=async(f)=>{
    if(f.id&&leads.find(l=>l.id===f.id)){const{data}=await supabase.from("leads").update(f).eq("id",f.id).select().single();if(data){dispatch({type:"UPD_LEAD",p:data});await logActivity(data.id,user.id,"updated",{});}}
    else{const{id,...rest}=f;const{data}=await supabase.from("leads").insert({...rest,created_by:user.id}).select().single();if(data){dispatch({type:"ADD_LEAD",p:data});await logActivity(data.id,user.id,"created",{});}}
    dispatch({type:"SET_MODAL",p:null});
  };
  const handleSourcesChange=(newSources)=>{dispatch({type:"SET_SOURCES",p:newSources});};
  const logout=async()=>{await supabase.auth.signOut();router.push("/");};
  const filtered=useMemo(()=>{let r=leads;if(search){const s=search.toLowerCase();r=r.filter(l=>(l.name||"").toLowerCase().includes(s)||(l.company||"").toLowerCase().includes(s)||(l.email||"").toLowerCase().includes(s));}if(filters.stage)r=r.filter(l=>l.stage_id===filters.stage);if(filters.source)r=r.filter(l=>l.source===filters.source);if(filters.assignee)r=r.filter(l=>l.assignee_id===filters.assignee);if(filters.score){r=r.filter(l=>getLeadScore(l,stages).label===filters.score);}return r;},[leads,search,filters,stages]);
  const activeF=Object.values(filters).filter(Boolean).length;
  const uniqueSources=[...new Set(leads.map(l=>l.source).filter(Boolean))];
  const selLead=sel?leads.find(l=>l.id===sel.id):null;
  const nav=[{id:"dashboard",icon:IC.dash,label:"Dashboard"},{id:"leads",icon:IC.leads,label:"Leads"},{id:"pipeline",icon:IC.pipe,label:"Pipeline"},{id:"calendar",icon:IC.cal,label:"Calendar"},{id:"settings",icon:IC.gear,label:"Settings"}];

  if(loading)return <div style={{display:"flex",height:"100vh",alignItems:"center",justifyContent:"center",fontFamily:"-apple-system, sans-serif"}}><p style={{color:"#94a3b8"}}>Loading CRM...</p></div>;

  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",background:"#f8fafc",color:"#1e293b",overflow:"hidden"}}>
      <div style={{width:220,background:"#fff",borderRight:"1px solid #e2e8f0",display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"16px 18px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:16}}>🐝</span></div><div><div style={{fontWeight:800,fontSize:15,letterSpacing:-.3}}>BeeSolver</div><div style={{fontSize:11,color:"#94a3b8"}}>CRM</div></div></div>
        <nav style={{flex:1,padding:"8px 10px"}}>{nav.map(n=><div key={n.id} onClick={()=>dispatch({type:"SET_PAGE",p:n.id})} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,cursor:"pointer",marginBottom:2,fontWeight:600,fontSize:14,background:page===n.id?"#f1f5f9":"transparent",color:page===n.id?"#6366f1":"#64748b"}}>{n.icon} {n.label}</div>)}</nav>
        <div style={{padding:14,borderTop:"1px solid #f1f5f9"}}><div style={{fontSize:12,fontWeight:600,color:"#334155",marginBottom:2}}>{profile?.full_name}</div><div style={{fontSize:11,color:"#94a3b8",marginBottom:8}}>{profile?.role}</div><button onClick={logout} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:12,fontWeight:600,padding:0}}>{IC.logout} Sign out</button></div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"12px 20px",background:"#fff",borderBottom:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexShrink:0}}>
          <h2 style={{margin:0,fontSize:18,fontWeight:800}}>{page==="dashboard"?"Dashboard":page==="leads"?"Leads":page==="pipeline"?"Pipeline":page==="calendar"?"Calendar":"Settings"}</h2>
          {(page==="leads"||page==="pipeline")&&(<div style={{display:"flex",gap:8,alignItems:"center",flex:1,justifyContent:"flex-end"}}>
            <div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#94a3b8"}}>{IC.search}</span><input value={search} onChange={e=>dispatch({type:"SET_SEARCH",p:e.target.value})} placeholder="Search..." style={{padding:"8px 12px 8px 34px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:13,width:200,outline:"none"}}/></div>
            <Btn v="secondary" sz="sm" onClick={()=>dispatch({type:"SET_FBAR",p:!fbar})}>{IC.filter} Filters{activeF>0&&<span style={{background:"#6366f1",color:"#fff",borderRadius:99,width:18,height:18,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10}}>{activeF}</span>}</Btn>
            {page==="leads"&&<div style={{display:"flex",gap:2,background:"#f1f5f9",borderRadius:8,padding:2}}>{["table","pipeline"].map(v=><button key={v} onClick={()=>dispatch({type:"SET_VIEW",p:v})} style={{padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:view===v?"#fff":"transparent",color:view===v?"#6366f1":"#64748b",boxShadow:view===v?"0 1px 3px rgba(0,0,0,.08)":"none"}}>{v==="table"?"Table":"Kanban"}</button>)}</div>}
            <Btn onClick={()=>dispatch({type:"SET_MODAL",p:{type:"addLead"}})}>{IC.plus} New Lead</Btn>
          </div>)}
        </div>
        {fbar&&(page==="leads"||page==="pipeline")&&(<div style={{padding:"10px 20px",background:"#fff",borderBottom:"1px solid #e2e8f0",display:"flex",gap:12,alignItems:"center",flexShrink:0}}>
          <select value={filters.stage||""} onChange={e=>dispatch({type:"SET_FILTER",p:{stage:e.target.value}})} style={{padding:"6px 10px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:13}}><option value="">All Stages</option>{stages.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select>
          <select value={filters.source||""} onChange={e=>dispatch({type:"SET_FILTER",p:{source:e.target.value}})} style={{padding:"6px 10px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:13}}><option value="">All Sources</option>{uniqueSources.map(s=><option key={s} value={s}>{s}</option>)}</select>
          <select value={filters.assignee||""} onChange={e=>dispatch({type:"SET_FILTER",p:{assignee:e.target.value}})} style={{padding:"6px 10px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:13}}><option value="">All Assignees</option>{(profiles||[]).map(p=><option key={p.id} value={p.id}>{p.full_name||p.email}</option>)}</select>
          <select value={filters.score||""} onChange={e=>dispatch({type:"SET_FILTER",p:{score:e.target.value}})} style={{padding:"6px 10px",borderRadius:8,border:"1px solid #e2e8f0",fontSize:13}}><option value="">All Scores</option><option value="Hot">Hot</option><option value="Warm">Warm</option><option value="Cold">Cold</option></select>
          {activeF>0&&<Btn v="ghost" sz="sm" onClick={()=>dispatch({type:"CLR_FILTERS"})}>{IC.x} Clear</Btn>}
          <span style={{fontSize:12,color:"#94a3b8"}}>{filtered.length} result{filtered.length!==1?"s":""}</span>
        </div>)}
        <div style={{flex:1,overflow:"auto",padding:20}}>
          {page==="dashboard"&&<DashboardView leads={leads} stages={stages}/>}
          {page==="leads"&&(view==="table"?<LeadsTable leads={filtered} stages={stages} profiles={profiles} customFields={customFields} dispatch={dispatch}/>:<PipelineView leads={filtered} stages={stages} dispatch={dispatch}/>)}
          {page==="pipeline"&&<PipelineView leads={filtered} stages={stages} dispatch={dispatch}/>}
          {page==="calendar"&&<CalendarView/>}
          {page==="settings"&&<SettingsView stages={stages} customFields={customFields} dispatch={dispatch} profile={profile} profiles={profiles} sources={sources} onSourcesChange={handleSourcesChange}/>}
        </div>
      </div>
      {selLead&&<LeadDetail lead={selLead} stages={stages} customFields={customFields} profiles={profiles} dispatch={dispatch} onClose={()=>dispatch({type:"SET_SEL",p:null})} user={user} sources={sources}/>}
      {modal?.type==="addLead"&&<Modal title="New Lead" onClose={()=>dispatch({type:"SET_MODAL",p:null})}><LeadForm stages={stages} customFields={customFields} profiles={profiles} leads={leads} sources={sources} onSave={saveLead} onClose={()=>dispatch({type:"SET_MODAL",p:null})}/></Modal>}
      {modal?.type==="editLead"&&<Modal title="Edit Lead" onClose={()=>dispatch({type:"SET_MODAL",p:null})}><LeadForm lead={modal.lead} stages={stages} customFields={customFields} profiles={profiles} leads={leads} sources={sources} onSave={saveLead} onClose={()=>dispatch({type:"SET_MODAL",p:null})}/></Modal>}
    </div>);
}
