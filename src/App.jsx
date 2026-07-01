import { useState } from "react";

// ── COLOURS ──────────────────────────────────────────────────────
const C = {
  bg:"#FAF8F6", card:"#FFFFFF", border:"#E8E0D8",
  sidebar:"#B8AB9E", text:"#2C2420", sub:"#9C8E84", mute:"#C2B6AC",
  pink:"#C2A28E", pinkLight:"#F4EEE6", pinkDark:"#9C7A62",
  green:"#7C9583", greenLight:"#EEF3EF",
  red:"#CC5C5C", redLight:"#FCEAEA",
  amber:"#C2914F", amberLight:"#FAF1E2",
  blue:"#7E97A8", blueLight:"#EEF2F5",
  mauve:"#A6968A",
};

// ── CONSTANTS ────────────────────────────────────────────────────
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const SERVICES = [
  { id:1, name:"Gel Manicure", duration:60, price:80 },
  { id:2, name:"Acrylic Full Set", duration:90, price:120 },
  { id:3, name:"Gel Pedicure", duration:75, price:90 },
  { id:4, name:"Nail Art (per nail)", duration:30, price:30 },
  { id:5, name:"Removal + Regrowth", duration:45, price:60 },
];

const EXPENSE_CATS = [
  {key:"rent",label:"Studio Rent",icon:"🏠"},
  {key:"supplies",label:"Nail Supplies",icon:"💅"},
  {key:"equip",label:"Equipment",icon:"⚙️"},
  {key:"insure",label:"Insurance",icon:"🛡️"},
  {key:"clean",label:"Cleaning",icon:"🧹"},
  {key:"market",label:"Marketing",icon:"📣"},
  {key:"account",label:"Accounting",icon:"📊"},
  {key:"other",label:"Other",icon:"📋"},
];

const CPA_TOPICS = [
  {id:"abn",label:"ABN Registration",icon:"📋"},
  {id:"gst",label:"GST Registration",icon:"📊"},
  {id:"payroll",label:"Payroll Setup",icon:"💵"},
  {id:"bookkeep",label:"Bookkeeping System Setup",icon:"📒"},
  {id:"bas",label:"BAS Lodgement",icon:"📅"},
  {id:"tax",label:"Income Tax Return",icon:"🧾"},
  {id:"other",label:"Other question",icon:"💬"},
];

const IT_TOPICS = [
  {id:"bug",label:"Something isn't working",icon:"🐛"},
  {id:"missing",label:"Missing booking / data",icon:"❓"},
  {id:"howto",label:"How do I do something?",icon:"💡"},
  {id:"feature",label:"Request a new feature",icon:"✨"},
  {id:"change",label:"Custom change to my app",icon:"🎨"},
  {id:"other",label:"Other technical issue",icon:"⚙️"},
];

// ── INITIAL DATA ─────────────────────────────────────────────────
const INIT_CLIENTS = [
  {id:1,name:"Sarah Chen",phone:"0412 345 678",email:"sarah@email.com",dob:"1988-03-15",joined:"2025-01-10",notes:"Prefers almond shape, allergic to certain gel brands."},
  {id:2,name:"Emma Williams",phone:"0423 456 789",email:"emma@email.com",dob:"1995-07-22",joined:"2025-02-01",notes:"Regular every 3 weeks."},
  {id:3,name:"Mei Lin",phone:"0445 678 901",email:"mei@email.com",dob:"2000-04-18",joined:"2025-04-20",notes:""},
  {id:4,name:"Lisa Park",phone:"0434 567 890",email:"lisa@email.com",dob:"1990-11-05",joined:"2025-03-15",notes:"Sensitive cuticles."},
];

const INIT_APPTS = [
  {id:1,date:"2026-07-01",time:"09:00",duration:60,service:"Gel Manicure",price:80,client:"Sarah Chen",phone:"0412 345 678",source:"online"},
  {id:2,date:"2026-07-01",time:"11:00",duration:90,service:"Acrylic Full Set",price:120,client:"Emma Williams",phone:"0423 456 789",source:"online"},
  {id:3,date:"2026-07-01",time:"14:00",duration:60,service:"Gel Manicure",price:80,client:"Mei Lin",phone:"0445 678 901",source:"manual"},
  {id:4,date:"2026-07-02",time:"10:00",duration:75,service:"Gel Pedicure",price:90,client:"Lisa Park",phone:"0434 567 890",source:"online"},
  {id:5,date:"2026-07-03",time:"13:00",duration:45,service:"Removal + Regrowth",price:60,client:"Anna Wu",phone:"0456 789 012",source:"manual"},
];

const INIT_INCOME = [
  {id:1,date:"2026-06-02",client:"Sarah Chen",type:"Gel Manicure",amount:80,method:"Card"},
  {id:2,date:"2026-06-03",client:"Emma Williams",type:"Acrylic Full Set",amount:120,method:"Bank transfer"},
  {id:3,date:"2026-06-05",client:"Lisa Park",type:"Gel Pedicure",amount:90,method:"Card"},
  {id:4,date:"2026-06-07",client:"Mei Lin",type:"Gel Manicure",amount:80,method:"Cash"},
  {id:5,date:"2026-06-10",client:"Sarah Chen",type:"Nail Art",amount:60,method:"Card"},
  {id:6,date:"2026-06-12",client:"Anna Wu",type:"Acrylic Full Set",amount:120,method:"Card"},
  {id:7,date:"2026-06-14",client:"Emma Williams",type:"Gel Manicure",amount:80,method:"Card"},
  {id:8,date:"2026-06-17",client:"Lisa Park",type:"Removal + Regrowth",amount:60,method:"Card"},
  {id:9,date:"2026-06-19",client:"Mei Lin",type:"Gel Pedicure",amount:90,method:"Cash"},
  {id:10,date:"2026-06-21",client:"Sarah Chen",type:"Acrylic Full Set",amount:120,method:"Card"},
  {id:11,date:"2026-06-24",client:"Anna Wu",type:"Gel Manicure",amount:80,method:"Bank transfer"},
  {id:12,date:"2026-06-26",client:"Emma Williams",type:"Gel Pedicure",amount:90,method:"Card"},
];

const INIT_EXPENSES = [
  {id:1,date:"2026-06-01",category:"rent",description:"Studio rent — June",amount:800,receipt:true},
  {id:2,date:"2026-06-05",category:"supplies",description:"Gel polish restock",amount:120,receipt:true},
  {id:3,date:"2026-06-10",category:"clean",description:"Cleaning supplies",amount:35,receipt:true},
];

const INIT_PRICES = SERVICES.map(s=>({...s,active:true}));

const INIT_STOCK = [
  {id:1,name:"Disposable wipes",qty:8,reorder:5,unit:"packs"},
  {id:2,name:"Cotton pads",qty:12,reorder:8,unit:"packs"},
  {id:3,name:"Gel top coat",qty:2,reorder:2,unit:"bottles"},
  {id:4,name:"Nail polish remover",qty:3,reorder:2,unit:"bottles"},
  {id:5,name:"Disposable files",qty:20,reorder:10,unit:"pcs"},
];

const INIT_TODOS = [
  {id:1,text:"Buy disposable wipes",done:false},
  {id:2,text:"Restock gel polish — pink shades",done:false},
  {id:3,text:"Clean and sanitise tools",done:false},
];

// ── HELPERS ───────────────────────────────────────────────────────
const fmtDate = d => { if(!d) return "—"; const dt=new Date(d); return `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`; };
const fmt12 = t => { const [h,m]=t.split(":").map(Number); const mm=String(m).padStart(2,"0"); return h===12?`12:${mm}pm`:h>12?`${h-12}:${mm}pm`:`${h}:${mm}am`; };
const todayStr = () => new Date().toISOString().split("T")[0];

// ── NAV CONFIG ────────────────────────────────────────────────────
const NAV = [
  {id:"dashboard",label:"Home"},
  {id:"appointments",label:"Bookings"},
  {id:"clients",label:"Clients"},
  {id:"finances",label:"Finances"},
  {id:"prices",label:"Prices"},
  {id:"stock",label:"To-Do"},
  {id:"settings",label:"Booking"},
  {id:"support",label:"Support"},
];

// ── SIDEBAR (top-level component) ─────────────────────────────────
function AppSidebar({screen, setScreen}) {
  const icons = {
    dashboard: "⊞", appointments: "📅", clients: "👤",
    finances: "💰", prices: "🏷", stock: "✅",
    settings: "⚙️", support: "❓",
  };
  return (
    <div style={{width:68,flexShrink:0,background:C.sidebar,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:16,gap:2,position:"sticky",top:0,borderRight:`1px solid ${C.border}`}}>
      <div style={{marginBottom:14,textAlign:"center",padding:"0 6px"}}>
        <div style={{fontFamily:"'Dancing Script',cursive",fontSize:20,fontWeight:700,color:C.text,lineHeight:1}}>Bloom</div>
        <div style={{fontSize:7,color:C.text,opacity:0.5,marginTop:3,letterSpacing:"0.12em",textTransform:"uppercase"}}>Studio</div>
      </div>
      <div style={{width:36,height:1,background:C.border,marginBottom:8}}/>
      {NAV.map(item=>{
        const active=screen===item.id;
        return (
          <div key={item.id} onClick={()=>setScreen(item.id)}
            style={{width:58,padding:"8px 4px 6px",borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer",marginBottom:2,
              background:active?"rgba(255,255,255,0.5)":"transparent",
              borderLeft:active?`2px solid ${C.pinkDark}`:"2px solid transparent"}}>
            <div style={{fontSize:16,opacity:active?1:0.5}}>{icons[item.id]}</div>
            <div style={{fontSize:7.5,marginTop:3,fontWeight:active?700:400,color:active?C.pinkDark:C.text,opacity:active?1:0.6}}>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function NailDesk() {
  const studioName = "Bloom Nails";
  const [screen, setScreen] = useState("dashboard");

  // Data state
  const [clients, setClients] = useState(INIT_CLIENTS);
  const [appts, setAppts] = useState(INIT_APPTS);
  const [income, setIncome] = useState(INIT_INCOME);
  const [expenses, setExpenses] = useState(INIT_EXPENSES);
  const [prices, setPrices] = useState(INIT_PRICES);
  const [stock, setStock] = useState(INIT_STOCK);
  const [todos, setTodos] = useState(INIT_TODOS);
  const [newTodo, setNewTodo] = useState("");
  const [showAddStock, setShowAddStock] = useState(false);
  const [newStock, setNewStock] = useState({name:"",qty:"",reorder:"",unit:"pcs"});

  // Appointments state
  const [selDate, setSelDate] = useState("2026-07-01");
  const [selAppt, setSelAppt] = useState(null);
  const [showAddAppt, setShowAddAppt] = useState(false);
  const [newAppt, setNewAppt] = useState({time:"09:00",service:"Gel Manicure",client:"",phone:""});

  // Client state
  const [selClient, setSelClient] = useState(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({name:"",phone:"",email:"",dob:"",notes:""});
  const [clientSearch, setClientSearch] = useState("");

  // Finance state
  const [finTab, setFinTab] = useState("income");
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newIncome, setNewIncome] = useState({date:"",client:"",type:"",amount:"",method:"Card"});
  const [newExpense, setNewExpense] = useState({date:"",category:"rent",description:"",amount:""});

  // Booking settings
  const [slotLength, setSlotLength] = useState(60);
  const [requireDeposit, setRequireDeposit] = useState(true);
  const [depositAmount, setDepositAmount] = useState("20");
  const [bankDetails, setBankDetails] = useState({accountName:"Bloom Nails Pty Ltd",bsb:"062-000",accountNumber:"1234 5678"});
  const [customMessage, setCustomMessage] = useState("Please transfer your deposit within 24 hours to secure your booking.");
  const [blockedDates, setBlockedDates] = useState([{id:1,date:"2026-07-25",reason:"Studio closed"}]);
  const [showAddBlocked, setShowAddBlocked] = useState(false);
  const [newBlocked, setNewBlocked] = useState({date:"",reason:""});

  // Booking flow state
  const [bkStep, setBkStep] = useState(1);
  const [bkService, setBkService] = useState(null);
  const [bkDate, setBkDate] = useState(null);
  const [bkSlot, setBkSlot] = useState(null);
  const [bkForm, setBkForm] = useState({name:"",email:"",phone:"",note:""});
  const [bkRef] = useState("BK"+Math.random().toString(36).substr(2,6).toUpperCase());

  // Support state
  const [supportTab, setSupportTab] = useState("cpa");
  const [cpaTopics, setCpaTopics] = useState([]);
  const [cpaMessage, setCpaMessage] = useState("");
  const [itTopic, setItTopic] = useState(null);
  const [itMessage, setItMessage] = useState("");
  const [itUrgent, setItUrgent] = useState(false);
  // Support contact state
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [supportSent, setSupportSent] = useState(null);

  // Computed
  const totalIn = income.reduce((s,i)=>s+i.amount,0);
  const totalOut = expenses.reduce((s,e)=>s+e.amount,0);
  const hour = new Date().getHours();
  const greeting = hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";

  // ── SHARED STYLES ─────────────────────────────────────────────────
  const overlay={position:"fixed",inset:0,background:"rgba(42,24,32,0.5)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"};
  const sheet={background:C.card,borderRadius:"18px 18px 0 0",padding:"22px 18px 32px",width:"100%",maxWidth:480,maxHeight:"88vh",overflowY:"auto"};
  const inp={width:"100%",padding:"10px 13px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:13,background:C.bg,outline:"none",boxSizing:"border-box",fontFamily:"inherit",color:C.text};
  const btn={background:C.pinkDark,color:"#fff",border:"none",borderRadius:10,padding:"12px 20px",fontSize:13,fontWeight:600,cursor:"pointer",width:"100%"};
  const btnSm={background:C.pinkDark,color:"#fff",border:"none",borderRadius:8,padding:"6px 13px",fontSize:11,fontWeight:600,cursor:"pointer"};
  const btnGhost={background:"transparent",color:C.pinkDark,border:`1.5px solid ${C.pinkDark}`,borderRadius:10,padding:"11px 20px",fontSize:13,fontWeight:600,cursor:"pointer",width:"100%"};
  const card={background:C.card,borderRadius:14,padding:"14px 16px",marginBottom:10,boxShadow:"0 1px 4px rgba(42,33,24,0.07)"};
  const row={display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.border}`};
  const lbl={fontSize:11,color:C.sub,marginBottom:4,display:"block",fontWeight:500};
  const stitle={fontSize:10,fontWeight:700,color:C.mute,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10};
  const pill=(bg,col)=>({background:bg,color:col,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,display:"inline-block"});
  const chk=(done)=>({width:18,height:18,borderRadius:5,border:`2px solid ${done?C.pinkDark:C.border}`,background:done?C.pinkDark:C.card,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0});

  const TopBar=({title,action})=>(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
      <div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:400,fontStyle:"italic",color:C.text}}>{title}</div>
        {screen==="dashboard"&&<div style={{fontSize:10,color:C.sub,marginTop:1,letterSpacing:"0.08em",textTransform:"uppercase"}}>{studioName}</div>}
      </div>
      {action}
    </div>
  );

  // ── WEEK NAVIGATION ───────────────────────────────────────────────
  const getWeekDates = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - (day===0?6:day-1));
    return Array.from({length:7},(_,i)=>{
      const dd=new Date(monday);
      dd.setDate(monday.getDate()+i);
      return dd.toISOString().split("T")[0];
    });
  };

  const shiftWeek = (dir) => {
    const d = new Date(selDate);
    d.setDate(d.getDate()+dir*7);
    setSelDate(d.toISOString().split("T")[0]);
  };

  // ── BOOKING SLOTS ─────────────────────────────────────────────────
  const BLOCKED_SLOTS = {"2026-07-01":["09:00","11:00","14:00"],"2026-07-02":["10:00","13:00"],"2026-07-03":["09:00","10:00","11:00","14:00","15:00","16:00","17:00"]};
  const getSlots = (dateStr, dur) => {
    if (blockedDates.find(b=>b.date===dateStr)) return [];
    const booked = BLOCKED_SLOTS[dateStr]||[];
    const slots=[];
    for(let h=9;h<=18-Math.ceil(dur/slotLength);h++){
      const t=`${String(h).padStart(2,"0")}:00`;
      if(!booked.includes(t)) slots.push(t);
    }
    return slots;
  };

  const getBkDates = () => {
    const dates=[];
    const today=new Date();
    for(let i=1;i<=14;i++){
      const d=new Date(today);
      d.setDate(today.getDate()+i);
      if(d.getDay()!==0) dates.push(d);
    }
    return dates;
  };

  // ─────────────────────────────────────────────────────────────────
  // SCREENS
  // ─────────────────────────────────────────────────────────────────

  // ── DASHBOARD ─────────────────────────────────────────────────────
  const renderDashboard = () => {
    const todayAppts = appts.filter(a=>a.date===todayStr()).sort((a,b)=>a.time.localeCompare(b.time));
    return (
      <div>
        <TopBar title={greeting}/>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          {[{l:"Income",v:`$${totalIn.toLocaleString()}`,c:C.green},{l:"Expenses",v:`$${totalOut.toLocaleString()}`,c:C.amber},{l:"Net",v:`$${(totalIn-totalOut).toLocaleString()}`,c:(totalIn-totalOut)>=0?C.green:C.red}].map(s=>(
            <div key={s.l} style={{...card,flex:1,marginBottom:0,textAlign:"center",padding:"12px 8px"}}>
              <div style={{fontSize:17,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:9,color:C.mute,marginTop:3,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={stitle}>Today's Appointments</div>
            <button onClick={()=>setScreen("appointments")} style={{...btnSm,background:"transparent",color:C.pinkDark,border:`1px solid ${C.pinkLight}`}}>View all →</button>
          </div>
          {todayAppts.length===0?<div style={{color:C.mute,fontSize:13}}>No appointments today</div>:todayAppts.map(a=>(
            <div key={a.id} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}} onClick={()=>{setSelAppt(a);setScreen("appointments")}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text,width:60}}>{fmt12(a.time)}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{a.client}</div><div style={{fontSize:11,color:C.sub}}>{a.service}</div></div>
              <div style={{fontSize:13,fontWeight:700,color:C.pinkDark}}>${a.price}</div>
            </div>
          ))}
        </div>
        <div style={{...card,background:C.greenLight,border:`1px solid ${C.green}30`}}>
          <div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:6}}>🔗 Online Booking Active</div>
          <div style={{fontSize:12,color:C.text,lineHeight:1.6,marginBottom:10}}>Share your booking link — clients book themselves 24/7.</div>
          <button onClick={()=>setScreen("booking")} style={btnSm}>Try booking page →</button>
        </div>
      </div>
    );
  };

  // ── APPOINTMENTS ──────────────────────────────────────────────────
  const renderAppointments = () => {
    const weekDates = getWeekDates(selDate);
    const dayAppts = appts.filter(a=>a.date===selDate).sort((a,b)=>a.time.localeCompare(b.time));
    const dateObj = new Date(selDate);
    const dateDisplay = `${DAYS[dateObj.getDay()]} ${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]}`;
    return (
      <div>
        <TopBar title="Appointments" action={<button onClick={()=>setScreen("booking")} style={btnSm}>🔗 Booking Link</button>}/>
        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:14}}>
          <button onClick={()=>shiftWeek(-1)} style={{background:C.pinkLight,border:"none",borderRadius:8,width:28,height:28,fontSize:14,color:C.pinkDark,cursor:"pointer",flexShrink:0}}>‹</button>
          <div style={{display:"flex",gap:4,flex:1,overflowX:"auto"}}>
            {weekDates.map(d=>{
              const dt=new Date(d);
              const count=appts.filter(a=>a.date===d).length;
              const sel=d===selDate;
              const isToday=d===todayStr();
              return (
                <div key={d} onClick={()=>setSelDate(d)} style={{flex:1,minWidth:40,borderRadius:11,padding:"7px 3px",textAlign:"center",cursor:"pointer",background:sel?C.pinkDark:C.card,border:`1.5px solid ${sel?C.pinkDark:isToday?C.pink:C.border}`}}>
                  <div style={{fontSize:8,fontWeight:700,color:sel?"rgba(255,255,255,0.7)":C.sub}}>{DAYS[dt.getDay()]}</div>
                  <div style={{fontSize:15,fontWeight:700,color:sel?"#fff":C.text,margin:"2px 0"}}>{dt.getDate()}</div>
                  {count>0&&<div style={{fontSize:7,color:sel?"rgba(255,255,255,0.7)":C.pink,fontWeight:600}}>{count}</div>}
                </div>
              );
            })}
          </div>
          <button onClick={()=>shiftWeek(1)} style={{background:C.pinkLight,border:"none",borderRadius:8,width:28,height:28,fontSize:14,color:C.pinkDark,cursor:"pointer",flexShrink:0}}>›</button>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text}}>{dateDisplay} · {dayAppts.length} appointment{dayAppts.length!==1?"s":""}</div>
          <button onClick={()=>setShowAddAppt(true)} style={btnSm}>+ Manual</button>
        </div>
        {dayAppts.length===0?<div style={{...card,textAlign:"center",padding:28}}><div style={{fontSize:28,marginBottom:8}}>📅</div><div style={{color:C.sub,fontSize:13}}>No appointments</div></div>:
          dayAppts.map(a=>(
            <div key={a.id} onClick={()=>setSelAppt(a)} style={{...card,cursor:"pointer",borderLeft:`3px solid ${a.source==="online"?C.green:C.pink}`}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:12}}>
                  <div style={{textAlign:"center",flexShrink:0}}><div style={{fontSize:13,fontWeight:700}}>{fmt12(a.time)}</div><div style={{fontSize:9,color:C.mute}}>{a.duration}min</div></div>
                  <div><div style={{fontWeight:600,fontSize:14}}>{a.client}</div><div style={{fontSize:12,color:C.sub,marginTop:2}}>{a.service}</div><div style={{marginTop:5}}>{a.source==="online"?<span style={pill(C.greenLight,C.green)}>🔗 Online</span>:<span style={pill(C.pinkLight,C.pinkDark)}>✏️ Manual</span>}</div></div>
                </div>
                <div style={{fontSize:15,fontWeight:700,color:C.pinkDark}}>${a.price}</div>
              </div>
            </div>
          ))
        }
        {selAppt&&(
          <div style={overlay} onClick={()=>setSelAppt(null)}>
            <div style={sheet} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div style={{fontWeight:700,fontSize:17}}>{selAppt.client}</div><button onClick={()=>setSelAppt(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>✕</button></div>
              {[{l:"Service",v:selAppt.service},{l:"Time",v:fmt12(selAppt.time)},{l:"Duration",v:`${selAppt.duration} min`},{l:"Price",v:`$${selAppt.price}`},{l:"Phone",v:selAppt.phone}].map((item,i)=>(
                <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div><div style={{fontSize:13,fontWeight:600}}>{item.v}</div></div>
              ))}
              <div style={{display:"flex",gap:8,marginTop:16}}>
                <button style={{...btnGhost,flex:1}} onClick={()=>{setAppts(appts.filter(a=>a.id!==selAppt.id));setSelAppt(null);}}>Cancel appt</button>
                <a href={`tel:${selAppt.phone}`} style={{...btn,flex:1,textDecoration:"none",textAlign:"center",display:"block"}}>📞 Call</a>
              </div>
            </div>
          </div>
        )}
        {showAddAppt&&(
          <div style={overlay} onClick={()=>setShowAddAppt(false)}>
            <div style={sheet} onClick={e=>e.stopPropagation()}>
              <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>+ Manual Appointment</div>
              <div style={{marginBottom:10}}><label style={lbl}>Client name</label><input style={inp} value={newAppt.client} onChange={e=>setNewAppt({...newAppt,client:e.target.value})}/></div>
              <div style={{marginBottom:10}}><label style={lbl}>Phone</label><input style={inp} value={newAppt.phone} onChange={e=>setNewAppt({...newAppt,phone:e.target.value})}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                <div><label style={lbl}>Time</label><input style={inp} type="time" value={newAppt.time} onChange={e=>setNewAppt({...newAppt,time:e.target.value})}/></div>
                <div><label style={lbl}>Service</label><select style={inp} value={newAppt.service} onChange={e=>setNewAppt({...newAppt,service:e.target.value})}>{SERVICES.map(s=><option key={s.id}>{s.name}</option>)}</select></div>
              </div>
              <button style={btn} onClick={()=>{if(newAppt.client){const svc=SERVICES.find(s=>s.name===newAppt.service);setAppts([...appts,{id:Date.now(),date:selDate,time:newAppt.time,duration:svc.duration,service:svc.name,price:svc.price,client:newAppt.client,phone:newAppt.phone,source:"manual"}]);setNewAppt({time:"09:00",service:"Gel Manicure",client:"",phone:""});setShowAddAppt(false);}}}>Add Appointment</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── CLIENTS ───────────────────────────────────────────────────────
  const renderClients = () => {
    const filtered = clients.filter(c=>c.name.toLowerCase().includes(clientSearch.toLowerCase()));
    return (
      <div>
        <TopBar title="Clients" action={<button onClick={()=>setShowAddClient(true)} style={btnSm}>+ Add</button>}/>
        <input style={{...inp,marginBottom:12}} placeholder="Search clients..." value={clientSearch} onChange={e=>setClientSearch(e.target.value)}/>
        {filtered.map(c=>(
          <div key={c.id} style={{...card,cursor:"pointer"}} onClick={()=>setSelClient(c)}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:C.pinkLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:C.pinkDark,flexShrink:0}}>{c.name[0]}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:14}}>{c.name}</div>
                <div style={{fontSize:11,color:C.sub,marginTop:2}}>{c.phone}</div>
                {c.notes&&<div style={{marginTop:5}}><span style={pill(C.amberLight,C.amber)}>⚠ Note</span></div>}
              </div>
              <div style={{color:C.border,fontSize:18}}>›</div>
            </div>
          </div>
        ))}
        {selClient&&(
          <div style={overlay} onClick={()=>setSelClient(null)}>
            <div style={sheet} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div style={{fontWeight:700,fontSize:18}}>{selClient.name}</div><button onClick={()=>setSelClient(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>✕</button></div>
              {[{l:"Phone",v:selClient.phone,link:`tel:${selClient.phone.replace(/\s/g,"")}`},{l:"Email",v:selClient.email},{l:"Date of birth",v:fmtDate(selClient.dob)},{l:"Client since",v:fmtDate(selClient.joined)}].map((item,i)=>(
                <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div>{item.link?<a href={item.link} style={{fontSize:13,fontWeight:600,color:C.pinkDark,textDecoration:"none"}}>{item.v}</a>:<div style={{fontSize:13,fontWeight:600}}>{item.v}</div>}</div>
              ))}
              {selClient.notes&&<div style={{background:C.amberLight,borderRadius:10,padding:12,marginTop:14}}><div style={{fontSize:10,fontWeight:700,color:C.amber,marginBottom:5}}>⚠ NOTES</div><div style={{fontSize:13,lineHeight:1.6}}>{selClient.notes}</div></div>}
            </div>
          </div>
        )}
        {showAddClient&&(
          <div style={overlay} onClick={()=>setShowAddClient(false)}>
            <div style={sheet} onClick={e=>e.stopPropagation()}>
              <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>New Client</div>
              {[{l:"Full Name",k:"name",t:"text"},{l:"Phone",k:"phone",t:"tel"},{l:"Email",k:"email",t:"email"},{l:"Date of Birth",k:"dob",t:"date"}].map(f=>(
                <div key={f.k} style={{marginBottom:10}}><label style={lbl}>{f.l}</label><input style={inp} type={f.t} value={newClient[f.k]} onChange={e=>setNewClient({...newClient,[f.k]:e.target.value})}/></div>
              ))}
              <div style={{marginBottom:14}}><label style={lbl}>Notes</label><textarea style={{...inp,height:60,resize:"none"}} value={newClient.notes} onChange={e=>setNewClient({...newClient,notes:e.target.value})}/></div>
              <button style={btn} onClick={()=>{if(newClient.name){setClients([...clients,{id:Date.now(),...newClient,joined:todayStr()}]);setNewClient({name:"",phone:"",email:"",dob:"",notes:""});setShowAddClient(false);}}}>Add Client</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── FINANCES ──────────────────────────────────────────────────────
  const renderFinances = () => (
    <div>
      <TopBar title="Income & Expenses"/>
      <div style={{...card,display:"flex",justifyContent:"space-around",textAlign:"center",padding:"14px 10px",marginBottom:14}}>
        {[{l:"Income",v:`$${totalIn.toLocaleString()}`,c:C.green},{l:"Expenses",v:`$${totalOut.toLocaleString()}`,c:C.amber},{l:"Net",v:`$${(totalIn-totalOut).toLocaleString()}`,c:(totalIn-totalOut)>=0?C.green:C.red}].map((s,i)=>(
          <div key={i}><div style={{fontSize:19,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:9,color:C.mute,textTransform:"uppercase"}}>{s.l}</div></div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["income","expenses"].map(t=><button key={t} onClick={()=>setFinTab(t)} style={{flex:1,padding:9,borderRadius:9,border:"none",fontWeight:600,fontSize:12,cursor:"pointer",background:finTab===t?C.pinkDark:C.pinkLight,color:finTab===t?"#fff":C.pinkDark,textTransform:"capitalize"}}>{t}</button>)}
      </div>
      {finTab==="income"&&(
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={stitle}>Income</div><button onClick={()=>setShowAddIncome(true)} style={btnSm}>+ Add</button></div>
          {income.map(item=>(
            <div key={item.id} style={row}><div><div style={{fontSize:13,fontWeight:500}}>{item.client}</div><div style={{fontSize:10,color:C.sub}}>{item.type} · {fmtDate(item.date)}</div></div><div style={{fontSize:14,fontWeight:700,color:C.green}}>${item.amount}</div></div>
          ))}
        </div>
      )}
      {finTab==="expenses"&&(
        <div style={card}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={stitle}>Expenses</div><button onClick={()=>setShowAddExpense(true)} style={btnSm}>+ Add</button></div>
          {expenses.map(item=>{const cat=EXPENSE_CATS.find(c=>c.key===item.category);return(<div key={item.id} style={row}><div style={{display:"flex",gap:8}}><span style={{fontSize:16}}>{cat?.icon}</span><div><div style={{fontSize:13,fontWeight:500}}>{item.description}</div><div style={{fontSize:10,color:C.sub}}>{fmtDate(item.date)}</div></div></div><div style={{fontSize:14,fontWeight:700,color:C.amber}}>${item.amount}</div></div>);})}
        </div>
      )}
      {showAddIncome&&(
        <div style={overlay} onClick={()=>setShowAddIncome(false)}>
          <div style={sheet} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>Record Income</div>
            <div style={{marginBottom:10}}><label style={lbl}>Date</label><input style={inp} type="date" value={newIncome.date} onChange={e=>setNewIncome({...newIncome,date:e.target.value})}/></div>
            <div style={{marginBottom:10}}><label style={lbl}>Client</label><select style={inp} value={newIncome.client} onChange={e=>setNewIncome({...newIncome,client:e.target.value})}><option value="">Select</option>{clients.map(c=><option key={c.id}>{c.name}</option>)}</select></div>
            <div style={{marginBottom:10}}><label style={lbl}>Type</label><input style={inp} value={newIncome.type} onChange={e=>setNewIncome({...newIncome,type:e.target.value})}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div><label style={lbl}>Amount ($)</label><input style={inp} type="number" value={newIncome.amount} onChange={e=>setNewIncome({...newIncome,amount:e.target.value})}/></div>
              <div><label style={lbl}>Method</label><select style={inp} value={newIncome.method} onChange={e=>setNewIncome({...newIncome,method:e.target.value})}>{["Card","Cash","Bank transfer"].map(m=><option key={m}>{m}</option>)}</select></div>
            </div>
            <button style={btn} onClick={()=>{if(newIncome.amount){setIncome([...income,{id:Date.now(),...newIncome,amount:parseFloat(newIncome.amount)}]);setShowAddIncome(false);}}}>Save</button>
          </div>
        </div>
      )}
      {showAddExpense&&(
        <div style={overlay} onClick={()=>setShowAddExpense(false)}>
          <div style={sheet} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>Record Expense</div>
            <div style={{marginBottom:10}}><label style={lbl}>Date</label><input style={inp} type="date" value={newExpense.date} onChange={e=>setNewExpense({...newExpense,date:e.target.value})}/></div>
            <div style={{marginBottom:10}}><label style={lbl}>Category</label><select style={inp} value={newExpense.category} onChange={e=>setNewExpense({...newExpense,category:e.target.value})}>{EXPENSE_CATS.map(c=><option key={c.key} value={c.key}>{c.icon} {c.label}</option>)}</select></div>
            <div style={{marginBottom:10}}><label style={lbl}>Description</label><input style={inp} value={newExpense.description} onChange={e=>setNewExpense({...newExpense,description:e.target.value})}/></div>
            <div style={{marginBottom:14}}><label style={lbl}>Amount ($)</label><input style={inp} type="number" value={newExpense.amount} onChange={e=>setNewExpense({...newExpense,amount:e.target.value})}/></div>
            <button style={btn} onClick={()=>{if(newExpense.amount){setExpenses([...expenses,{id:Date.now(),...newExpense,amount:parseFloat(newExpense.amount)}]);setShowAddExpense(false);}}}>Save</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── PRICES ────────────────────────────────────────────────────────
  const renderPrices = () => (
    <div>
      <TopBar title="Price List" action={<button onClick={()=>window.print()} style={btnSm}>🖨 Print</button>}/>
      <div id="price-card" style={{background:C.card,borderRadius:16,overflow:"hidden",boxShadow:"0 2px 12px rgba(42,33,24,0.10)",marginBottom:12}}>
        <div style={{background:`linear-gradient(135deg, #7A6D63 0%, #9C8E84 100%)`,padding:"28px 22px 20px",textAlign:"center"}}>
          <div style={{fontFamily:"'Dancing Script',cursive",fontSize:32,fontWeight:700,color:"#fff"}}>{studioName}</div>
          <div style={{fontSize:9,color:"rgba(255,255,255,0.5)",marginTop:5,letterSpacing:"0.2em",textTransform:"uppercase"}}>Service Menu · Price List</div>
          <div style={{width:24,height:1,background:"rgba(255,255,255,0.3)",margin:"10px auto 0"}}/>
        </div>
        <div style={{padding:"18px 20px"}}>
          {prices.filter(p=>p.active).map((item,i)=>(
            <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:i<prices.filter(p=>p.active).length-1?`1px solid ${C.border}`:"none"}}>
              <div><div style={{fontWeight:600,fontSize:14}}>{item.name}</div><div style={{fontSize:11,color:C.sub,marginTop:2}}>⏱ {item.duration} min</div></div>
              <div style={{fontSize:19,fontWeight:800,color:C.pinkDark,fontFamily:"'Playfair Display',serif"}}>${item.price}</div>
            </div>
          ))}
        </div>
        <div style={{background:C.pinkLight,padding:"12px 20px",textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:600,color:C.pinkDark}}>Book online — naildesk.shop</div>
        </div>
      </div>
      <div className="no-print" style={{...card,background:C.greenLight,border:`1px solid ${C.green}30`}}>
        <div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:6}}>📱 Share your price list</div>
        <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>Tap Print to save as PDF or send to a printer. Screenshot this card to post on Instagram.</div>
      </div>
    </div>
  );

  // ── STOCK & TODO ──────────────────────────────────────────────────
  const renderStock = () => (
    <div>
      <TopBar title="To-Do & Stock"/>
      <div style={card}>
        <div style={stitle}>✅ To-Do List</div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <input style={{...inp,flex:1}} placeholder="e.g. Buy disposable wipes" value={newTodo} onChange={e=>setNewTodo(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&newTodo.trim()){setTodos([...todos,{id:Date.now(),text:newTodo.trim(),done:false}]);setNewTodo("");}}}/>
          <button style={btnSm} onClick={()=>{if(newTodo.trim()){setTodos([...todos,{id:Date.now(),text:newTodo.trim(),done:false}]);setNewTodo("");}}} >+</button>
        </div>
        {todos.map(t=>(
          <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
            <div style={chk(t.done)} onClick={()=>setTodos(todos.map(td=>td.id===t.id?{...td,done:!td.done}:td))}>{t.done&&<span style={{color:"#fff",fontSize:9}}>✓</span>}</div>
            <div style={{flex:1,fontSize:13,color:t.done?C.mute:C.text,textDecoration:t.done?"line-through":"none"}}>{t.text}</div>
            <button onClick={()=>setTodos(todos.filter(td=>td.id!==t.id))} style={{background:"none",border:"none",color:C.mute,fontSize:16,cursor:"pointer"}}>×</button>
          </div>
        ))}
      </div>
      <div style={card}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={stitle}>📦 Supply Stock</div>
          <button onClick={()=>setShowAddStock(true)} style={btnSm}>+ Add</button>
        </div>
        {stock.map(item=>{
          const low=item.qty<=item.reorder;
          return (
            <div key={item.id} style={{padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:600,fontSize:13}}>{item.name}</div><div style={{fontSize:10,color:C.sub}}>Reorder at {item.reorder} {item.unit}</div></div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{fontSize:18,fontWeight:800,color:low?C.red:C.pinkDark}}>{item.qty}</div>
                  <button onClick={()=>setStock(stock.map(s=>s.id===item.id?{...s,qty:Math.max(0,s.qty-1)}:s))} style={{background:C.pinkLight,border:"none",borderRadius:6,width:26,height:26,fontSize:14,fontWeight:700,color:C.pinkDark,cursor:"pointer"}}>−</button>
                  <button onClick={()=>setStock(stock.map(s=>s.id===item.id?{...s,qty:s.qty+1}:s))} style={{background:C.pinkLight,border:"none",borderRadius:6,width:26,height:26,fontSize:14,fontWeight:700,color:C.pinkDark,cursor:"pointer"}}>+</button>
                  <button onClick={()=>setStock(stock.filter(s=>s.id!==item.id))} style={{background:"none",border:"none",color:C.mute,fontSize:16,cursor:"pointer"}}>×</button>
                </div>
              </div>
              {low&&<div style={{marginTop:6,fontSize:10,color:C.red,fontWeight:600}}>⚠ Low stock — reorder now</div>}
            </div>
          );
        })}
      </div>
      {showAddStock&&(
        <div style={overlay} onClick={()=>setShowAddStock(false)}>
          <div style={sheet} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>+ Add Stock Item</div>
            <div style={{marginBottom:10}}><label style={lbl}>Item name</label><input style={inp} placeholder="e.g. Gel top coat" value={newStock.name} onChange={e=>setNewStock({...newStock,name:e.target.value})}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
              <div><label style={lbl}>Qty</label><input style={inp} type="number" placeholder="0" value={newStock.qty} onChange={e=>setNewStock({...newStock,qty:e.target.value})}/></div>
              <div><label style={lbl}>Reorder at</label><input style={inp} type="number" placeholder="0" value={newStock.reorder} onChange={e=>setNewStock({...newStock,reorder:e.target.value})}/></div>
              <div><label style={lbl}>Unit</label><select style={inp} value={newStock.unit} onChange={e=>setNewStock({...newStock,unit:e.target.value})}>{["pcs","packs","bottles","boxes","sets"].map(u=><option key={u}>{u}</option>)}</select></div>
            </div>
            <button style={btn} onClick={()=>{if(newStock.name){setStock([...stock,{id:Date.now(),name:newStock.name,qty:parseInt(newStock.qty)||0,reorder:parseInt(newStock.reorder)||0,unit:newStock.unit}]);setNewStock({name:"",qty:"",reorder:"",unit:"pcs"});setShowAddStock(false);}}}>Add Item</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── BOOKING SETTINGS ──────────────────────────────────────────────
  const renderSettings = () => (
    <div>
      <TopBar title="Booking Settings"/>
      <div style={card}>
        <div style={stitle}>⏱ Time Slot Length</div>
        <div style={{display:"flex",gap:6,marginBottom:8}}>
          {[15,30,45,60,90].map(v=><button key={v} onClick={()=>setSlotLength(v)} style={{flex:1,padding:"8px 4px",borderRadius:8,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",background:slotLength===v?C.pinkDark:C.pinkLight,color:slotLength===v?"#fff":C.pinkDark}}>{v<60?`${v}m`:v===60?"1hr":"1h30"}</button>)}
        </div>
      </div>
      <div style={card}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={stitle}>🚫 Blocked Dates</div><button onClick={()=>setShowAddBlocked(true)} style={btnSm}>+ Block</button></div>
        {blockedDates.map(b=>(
          <div key={b.id} style={row}><div><div style={{fontSize:13,fontWeight:600}}>{fmtDate(b.date)}</div><div style={{fontSize:11,color:C.sub}}>{b.reason}</div></div><button onClick={()=>setBlockedDates(blockedDates.filter(bd=>bd.id!==b.id))} style={{background:"none",border:"none",color:C.mute,fontSize:16,cursor:"pointer"}}>×</button></div>
        ))}
      </div>
      <div style={card}>
        <div style={stitle}>💰 Deposit & Bank Details</div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div onClick={()=>setRequireDeposit(!requireDeposit)} style={{width:38,height:22,borderRadius:12,background:requireDeposit?C.pinkDark:"#E0DADC",position:"relative",cursor:"pointer"}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:requireDeposit?18:2,transition:"left 0.2s"}}/>
          </div>
          <div style={{fontSize:13,fontWeight:600}}>Request a deposit</div>
        </div>
        {requireDeposit&&(
          <>
            <div style={{marginBottom:10}}><label style={lbl}>Deposit amount ($)</label><input style={inp} type="number" value={depositAmount} onChange={e=>setDepositAmount(e.target.value)}/></div>
            <div style={{marginBottom:10}}><label style={lbl}>Account name</label><input style={inp} value={bankDetails.accountName} onChange={e=>setBankDetails({...bankDetails,accountName:e.target.value})}/></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
              <div><label style={lbl}>BSB</label><input style={inp} value={bankDetails.bsb} onChange={e=>setBankDetails({...bankDetails,bsb:e.target.value})}/></div>
              <div><label style={lbl}>Account No.</label><input style={inp} value={bankDetails.accountNumber} onChange={e=>setBankDetails({...bankDetails,accountNumber:e.target.value})}/></div>
            </div>
            <label style={lbl}>Custom message</label>
            <textarea style={{...inp,height:70,resize:"none"}} value={customMessage} onChange={e=>setCustomMessage(e.target.value)}/>
          </>
        )}
      </div>
      <button style={btn}>Save Settings</button>
      {showAddBlocked&&(
        <div style={overlay} onClick={()=>setShowAddBlocked(false)}>
          <div style={sheet} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>Block a Date</div>
            <div style={{marginBottom:10}}><label style={lbl}>Date</label><input style={inp} type="date" value={newBlocked.date} onChange={e=>setNewBlocked({...newBlocked,date:e.target.value})}/></div>
            <div style={{marginBottom:14}}><label style={lbl}>Reason</label><input style={inp} value={newBlocked.reason} onChange={e=>setNewBlocked({...newBlocked,reason:e.target.value})}/></div>
            <button style={btn} onClick={()=>{if(newBlocked.date){setBlockedDates([...blockedDates,{id:Date.now(),...newBlocked}]);setNewBlocked({date:"",reason:""});setShowAddBlocked(false);}}}>Block Date</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── SUPPORT ───────────────────────────────────────────────────────
  const renderSupport = () => {
    const chip=(sel,color,light)=>({display:"flex",alignItems:"center",gap:8,padding:"11px 12px",borderRadius:10,cursor:"pointer",background:sel?color:light,border:`1.5px solid ${sel?color:C.border}`,marginBottom:8});
    const sendSupport = async (payload) => {
      try {
        const res = await fetch("/api/send-support",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            ...payload,
            studioName,
            clientName: supportName,
            clientEmail: supportEmail,
            clientPhone: supportPhone,
          })
        });
        if (!res.ok) throw new Error("API failed");
      } catch(e) {
        const subject = payload.type==="cpa" ? `Business Support — ${supportName||studioName}` : `IT Support — ${supportName||studioName}`;
        const body = `Name: ${supportName}\nEmail: ${supportEmail}\nPhone: ${supportPhone}\n\n`
          + (payload.type==="cpa"
            ? `Topics: ${(payload.topics||[]).join(", ")}\n\nDetails: ${payload.message||"—"}`
            : `Issue: ${(payload.topics||[])[0]||"—"}\n\nDescription: ${payload.message||"—"}\nUrgent: ${payload.urgent?"Yes":"No"}`);
        window.location.href = `mailto:account@ollieconsult.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    };
    return (
      <div>
        <TopBar title="Get Help"/>
        {!supportSent?(
          <>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <button onClick={()=>setSupportTab("cpa")} style={{flex:1,padding:11,borderRadius:10,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:supportTab==="cpa"?C.pinkDark:C.pinkLight,color:supportTab==="cpa"?"#fff":C.pinkDark}}>📊 Business Support</button>
              <button onClick={()=>setSupportTab("it")} style={{flex:1,padding:11,borderRadius:10,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",background:supportTab==="it"?C.blue:C.blueLight,color:supportTab==="it"?"#fff":C.blue}}>🛠 IT Support</button>
            </div>
            {supportTab==="cpa"&&(
              <div>
                <div style={{...card,background:C.pinkLight}}><div style={{fontSize:12,color:C.pinkDark,lineHeight:1.6}}>💡 We can refer you to a registered professional for registration, bookkeeping, payroll, or tax support. Select what you need below.</div></div>
                <div style={{marginBottom:10}}><label style={lbl}>Your name</label><input style={inp} placeholder="e.g. Sarah Chen" value={supportName} onChange={e=>setSupportName(e.target.value)}/></div>
                <div style={{marginBottom:10}}><label style={lbl}>Your email</label><input style={inp} type="email" placeholder="sarah@email.com" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)}/></div>
                <div style={{marginBottom:14}}><label style={lbl}>Your phone</label><input style={inp} type="tel" placeholder="0412 345 678" value={supportPhone} onChange={e=>setSupportPhone(e.target.value)}/></div>
                <div style={stitle}>What do you need help with?</div>
                {CPA_TOPICS.map(t=>(
                  <div key={t.id} onClick={()=>setCpaTopics(cpaTopics.includes(t.id)?cpaTopics.filter(x=>x!==t.id):[...cpaTopics,t.id])} style={chip(cpaTopics.includes(t.id),C.pinkDark,C.pinkLight)}>
                    <span>{t.icon}</span><span style={{fontSize:13,fontWeight:600,color:cpaTopics.includes(t.id)?"#fff":C.text,flex:1}}>{t.label}</span>
                    {cpaTopics.includes(t.id)&&<span style={{color:"#fff"}}>✓</span>}
                  </div>
                ))}
                <div style={{margin:"14px 0"}}><label style={lbl}>Additional details (optional)</label><textarea style={{...inp,height:70,resize:"none"}} value={cpaMessage} onChange={e=>setCpaMessage(e.target.value)}/></div>
                <button style={{...btn,opacity:cpaTopics.length?1:0.4}} onClick={async()=>{if(!cpaTopics.length)return;const payload={type:"cpa",topics:cpaTopics.map(id=>CPA_TOPICS.find(t=>t.id===id).label),message:cpaMessage};setSupportSent(payload);await sendSupport(payload);}}>Send Request →</button>
              </div>
            )}
            {supportTab==="it"&&(
              <div>
                <div style={{...card,background:C.blueLight}}><div style={{fontSize:12,color:C.blue,lineHeight:1.6}}>🛠 Found a bug or something not working? Let us know and we'll fix it.</div></div>
                <div style={{marginBottom:10}}><label style={lbl}>Your name</label><input style={inp} placeholder="e.g. Sarah Chen" value={supportName} onChange={e=>setSupportName(e.target.value)}/></div>
                <div style={{marginBottom:10}}><label style={lbl}>Your email</label><input style={inp} type="email" placeholder="sarah@email.com" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)}/></div>
                <div style={{marginBottom:14}}><label style={lbl}>Your phone</label><input style={inp} type="tel" placeholder="0412 345 678" value={supportPhone} onChange={e=>setSupportPhone(e.target.value)}/></div>
                <div style={stitle}>What's the issue?</div>
                {IT_TOPICS.map(t=>(
                  <div key={t.id} onClick={()=>setItTopic(t.id)} style={chip(itTopic===t.id,C.blue,C.blueLight)}>
                    <span>{t.icon}</span><span style={{fontSize:13,fontWeight:600,color:itTopic===t.id?"#fff":C.text,flex:1}}>{t.label}</span>
                    {itTopic===t.id&&<span style={{color:"#fff"}}>✓</span>}
                  </div>
                ))}
                <div style={{margin:"14px 0"}}><label style={lbl}>Describe the issue</label><textarea style={{...inp,height:80,resize:"none"}} value={itMessage} onChange={e=>setItMessage(e.target.value)}/></div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                  <div onClick={()=>setItUrgent(!itUrgent)} style={{width:38,height:22,borderRadius:12,background:itUrgent?C.red:"#E0DADC",position:"relative",cursor:"pointer"}}><div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:itUrgent?18:2,transition:"left 0.2s"}}/></div>
                  <div style={{fontSize:13,fontWeight:600}}>This is urgent</div>
                </div>
                <button style={{...btn,background:C.blue,opacity:itTopic?1:0.4}} onClick={async()=>{if(!itTopic)return;const payload={type:"it",topics:[IT_TOPICS.find(t=>t.id===itTopic).label],message:itMessage,urgent:itUrgent};setSupportSent(payload);await sendSupport(payload);}}>Send to IT Support →</button>
              </div>
            )}
          </>
        ):(
          <div style={{textAlign:"center",paddingTop:20}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px"}}>✓</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:600,marginBottom:8}}>Request sent!</div>
            <div style={{fontSize:13,color:C.sub,marginBottom:20}}>We'll get back to you within 1–2 business days.</div>
            <button style={btn} onClick={()=>{setSupportSent(null);setCpaTopics([]);setCpaMessage("");setItTopic(null);setItMessage("");setItUrgent(false);setSupportName("");setSupportEmail("");setSupportPhone("");}}>Send another request</button>
          </div>
        )}
      </div>
    );
  };

  // ── CLIENT BOOKING ────────────────────────────────────────────────
  const renderBooking = () => {
    const bkDates = getBkDates();
    const bkSlots = bkDate ? getSlots(bkDate.toISOString().split("T")[0], bkService?.duration||60) : [];
    return (
      <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,minHeight:"100vh"}}>
        <div style={{background:`linear-gradient(135deg, #7A6D63 0%, #9C8E84 100%)`,padding:"20px 18px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <button onClick={()=>{setScreen("appointments");setBkStep(1);setBkService(null);setBkDate(null);setBkSlot(null);setBkForm({name:"",email:"",phone:"",note:""});}} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer"}}>← Back</button>
            <div style={{fontFamily:"'Dancing Script',cursive",fontSize:20,fontWeight:700,color:"#fff"}}>{studioName}</div>
          </div>
          <div style={{display:"flex",gap:4}}>
            {[1,2,3,4].map(n=><div key={n} style={{flex:1,height:3,borderRadius:3,background:bkStep>=n?"#fff":"rgba(255,255,255,0.25)",transition:"all 0.3s"}}/>)}
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",marginTop:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Step {Math.min(bkStep,4)} of 4 — {["","Choose Service","Pick Date & Time","Your Details","Confirm"][bkStep]||"Done"}</div>
        </div>
        <div style={{padding:"20px 16px"}}>
          {bkStep===1&&(
            <div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>Book an appointment</div>
              <div style={{fontSize:12,color:C.sub,marginBottom:16}}>Select a service to see available times</div>
              {SERVICES.map(svc=>(
                <div key={svc.id} onClick={()=>{setBkService(svc);setBkStep(2);}} style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",border:`1.5px solid ${bkService?.id===svc.id?C.pinkDark:C.border}`}}>
                  <div><div style={{fontWeight:600,fontSize:14}}>{svc.name}</div><div style={{fontSize:11,color:C.sub,marginTop:2}}>⏱ {svc.duration} min</div></div>
                  <div style={{fontSize:18,fontWeight:800,color:C.pinkDark}}>${svc.price}</div>
                </div>
              ))}
            </div>
          )}
          {bkStep===2&&(
            <div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:2}}>{bkService?.name}</div>
              <div style={{fontSize:11,color:C.pinkDark,fontWeight:500,marginBottom:14}}>🕐 All times in Sydney time (AEDT)</div>
              <div style={{fontSize:11,fontWeight:700,color:C.sub,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Select a date</div>
              <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:8,marginBottom:14}}>
                {bkDates.map((d,i)=>{
                  const ds=d.toISOString().split("T")[0];
                  const avail=getSlots(ds,bkService?.duration||60).length;
                  const sel=bkDate?.toISOString().split("T")[0]===ds;
                  return(
                    <div key={i} onClick={()=>avail>0&&(setBkDate(d),setBkSlot(null))} style={{flexShrink:0,width:50,borderRadius:11,padding:"7px 4px",textAlign:"center",cursor:avail>0?"pointer":"not-allowed",background:sel?C.pinkDark:C.card,border:`1.5px solid ${sel?C.pinkDark:C.border}`,opacity:avail===0?0.35:1}}>
                      <div style={{fontSize:8.5,fontWeight:700,color:sel?"rgba(255,255,255,0.7)":C.sub}}>{DAYS[d.getDay()]}</div>
                      <div style={{fontSize:15,fontWeight:700,color:sel?"#fff":C.text,margin:"2px 0"}}>{d.getDate()}</div>
                      <div style={{fontSize:8,color:sel?"rgba(255,255,255,0.6)":C.mute}}>{avail===0?"Full":MONTHS[d.getMonth()]}</div>
                    </div>
                  );
                })}
              </div>
              {bkDate&&(
                <>
                  <div style={{fontSize:11,fontWeight:700,color:C.sub,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Available times — {DAYS[bkDate.getDay()]} {bkDate.getDate()} {MONTHS[bkDate.getMonth()]}</div>
                  {bkSlots.length===0?<div style={{...card,textAlign:"center",padding:20,color:C.sub}}>Fully booked — try another date</div>:
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
                      {bkSlots.map((t,i)=>(
                        <div key={i} onClick={()=>setBkSlot(t)} style={{padding:"11px 8px",borderRadius:10,textAlign:"center",cursor:"pointer",background:bkSlot===t?C.pinkDark:C.card,border:`1.5px solid ${bkSlot===t?C.pinkDark:C.border}`,fontSize:13,fontWeight:600,color:bkSlot===t?"#fff":C.text}}>{fmt12(t)}</div>
                      ))}
                    </div>
                  }
                </>
              )}
              <div style={{display:"flex",gap:8}}>
                <button style={btnGhost} onClick={()=>setBkStep(1)}>← Back</button>
                <button style={{...btn,opacity:bkSlot?1:0.4}} onClick={()=>bkSlot&&setBkStep(3)}>Continue →</button>
              </div>
            </div>
          )}
          {bkStep===3&&(
            <div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>Your details</div>
              <div style={{...card,background:C.pinkLight,marginBottom:14}}>
                <div style={{fontWeight:700,fontSize:14}}>{bkService?.name}</div>
                <div style={{fontSize:12,color:C.sub,marginTop:2}}>{bkDate&&`${DAYS[bkDate.getDay()]} ${bkDate.getDate()} ${MONTHS[bkDate.getMonth()]}`} · {bkSlot&&fmt12(bkSlot)} AEDT</div>
                <div style={{fontSize:16,fontWeight:800,color:C.pinkDark,marginTop:6}}>${bkService?.price}</div>
              </div>
              {requireDeposit&&(
                <div style={{background:C.amberLight,borderRadius:10,padding:"10px 14px",marginBottom:14,border:`1px solid ${C.amber}30`}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.amber,marginBottom:6}}>💰 Deposit required — ${depositAmount}</div>
                  <div style={{fontSize:12,color:C.text,lineHeight:1.6}}><strong>Account:</strong> {bankDetails.accountName}<br/><strong>BSB:</strong> {bankDetails.bsb}<br/><strong>No:</strong> {bankDetails.accountNumber}<br/><span style={{fontStyle:"italic",color:C.sub}}>{customMessage}</span></div>
                </div>
              )}
              {[{l:"Full Name *",k:"name",t:"text",p:"e.g. Sarah Chen"},{l:"Email *",k:"email",t:"email",p:"sarah@email.com"},{l:"Phone *",k:"phone",t:"tel",p:"0412 345 678"},{l:"Notes (optional)",k:"note",t:"text",p:"e.g. allergies"}].map(f=>(
                <div key={f.k} style={{marginBottom:10}}><label style={lbl}>{f.l}</label><input style={inp} type={f.t} placeholder={f.p} value={bkForm[f.k]} onChange={e=>setBkForm({...bkForm,[f.k]:e.target.value})}/></div>
              ))}
              <div style={{fontSize:11,color:C.mute,marginBottom:14,lineHeight:1.6}}>By booking you agree to our cancellation policy — please cancel at least 24 hours before your appointment.</div>
              <div style={{display:"flex",gap:8}}>
                <button style={btnGhost} onClick={()=>setBkStep(2)}>← Back</button>
                <button style={{...btn,opacity:bkForm.name&&bkForm.email&&bkForm.phone?1:0.4}} onClick={()=>bkForm.name&&bkForm.email&&bkForm.phone&&setBkStep(4)}>Review →</button>
              </div>
            </div>
          )}
          {bkStep===4&&(
            <div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>Confirm your booking</div>
              <div style={{...card,marginBottom:10}}>
                {[{l:"Service",v:bkService?.name},{l:"Date",v:bkDate&&`${DAYS[bkDate.getDay()]} ${bkDate.getDate()} ${MONTHS[bkDate.getMonth()]}`},{l:"Time",v:bkSlot&&`${fmt12(bkSlot)} AEDT`},{l:"Duration",v:`${bkService?.duration} min`},{l:"Price",v:`$${bkService?.price}`}].map((item,i)=>(
                  <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div><div style={{fontSize:13,fontWeight:600}}>{item.v}</div></div>
                ))}
              </div>
              <div style={{...card,marginBottom:14}}>
                {[{l:"Name",v:bkForm.name},{l:"Email",v:bkForm.email},{l:"Phone",v:bkForm.phone}].map((item,i)=>(
                  <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div><div style={{fontSize:13,fontWeight:600}}>{item.v}</div></div>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={btnGhost} onClick={()=>setBkStep(3)}>← Back</button>
                <button style={btn} onClick={()=>setBkStep(5)}>Confirm booking ✓</button>
              </div>
            </div>
          )}
          {bkStep===5&&(
            <div style={{textAlign:"center",paddingTop:20}}>
              <div style={{width:68,height:68,borderRadius:"50%",background:C.greenLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 16px"}}>✓</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:600,marginBottom:8}}>You're booked!</div>
              <div style={{fontSize:13,color:C.sub,marginBottom:20,lineHeight:1.6}}>A confirmation has been sent to<br/><strong style={{color:C.text}}>{bkForm.email}</strong></div>
              <div style={{...card,textAlign:"left",marginBottom:16}}>
                {[{l:"Reference",v:bkRef,a:true},{l:"Service",v:bkService?.name},{l:"Date & Time",v:`${bkDate?.getDate()} ${bkDate&&MONTHS[bkDate.getMonth()]} · ${bkSlot&&fmt12(bkSlot)} AEDT`}].map((item,i)=>(
                  <div key={i} style={row}><div style={{fontSize:12,color:C.sub}}>{item.l}</div><div style={{fontSize:13,fontWeight:700,color:item.a?C.pinkDark:C.text}}>{item.v}</div></div>
                ))}
              </div>
              <div style={{background:C.pinkLight,borderRadius:12,padding:"12px 16px",marginBottom:20,textAlign:"left"}}>
                <div style={{fontSize:12,color:C.pinkDark,lineHeight:1.7}}>📧 Confirmation email sent<br/>⏰ Reminder will be sent 24hrs before<br/>📞 Need to cancel? Use your reference above</div>
              </div>
              <button style={btn} onClick={()=>{setBkStep(1);setBkService(null);setBkDate(null);setBkSlot(null);setBkForm({name:"",email:"",phone:"",note:""});}}>Book another appointment</button>
              <button style={{...btnGhost,marginTop:10}} onClick={()=>setScreen("appointments")}>← Back to dashboard</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── RENDER ────────────────────────────────────────────────────────
  let content;
  if      (screen==="dashboard")    content = renderDashboard();
  else if (screen==="appointments") content = renderAppointments();
  else if (screen==="clients")      content = renderClients();
  else if (screen==="finances")     content = renderFinances();
  else if (screen==="prices")       content = renderPrices();
  else if (screen==="stock")        content = renderStock();
  else if (screen==="settings")     content = renderSettings();
  else if (screen==="support")      content = renderSupport();
  else if (screen==="booking")      content = renderBooking();
  else                              content = renderDashboard();

  if (screen==="booking") {
    return (
      <div style={{fontFamily:"'Inter',system-ui,sans-serif",maxWidth:520,margin:"0 auto"}}>
        <div style={{background:C.sidebar,padding:"6px 16px",textAlign:"center"}}>
          <span style={{fontSize:11,color:C.text,opacity:0.7}}>✦ <strong>NailDesk Demo</strong> — <a href="https://naildesk.shop" style={{color:C.pinkDark,textDecoration:"none",fontWeight:600}}>Get your own →</a></span>
        </div>
        {content}
        <div style={{padding:"10px",textAlign:"center",background:C.card,borderTop:`1px solid ${C.border}`}}>
          <span style={{fontSize:10,color:C.mute}}>NailDesk Demo · naildesk.shop · Data resets on refresh</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{display:"flex",flexDirection:"column",fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:520,margin:"0 auto"}}>
      <div style={{background:C.sidebar,padding:"7px 16px",textAlign:"center",flexShrink:0}}>
        <span style={{fontSize:11,color:C.text,opacity:0.7}}>✦ <strong>NailDesk Demo</strong> — Sample data only. <a href="https://naildesk.shop" style={{color:C.pinkDark,textDecoration:"none",fontWeight:600}}>Get your own →</a></span>
      </div>
      <div style={{display:"flex",flex:1}}>
        <AppSidebar screen={screen} setScreen={setScreen}/>
        <div style={{flex:1,padding:"20px 18px",overflowY:"auto"}}>
          {content}
        </div>
      </div>
      <div style={{padding:"10px",textAlign:"center",background:C.card,borderTop:`1px solid ${C.border}`,flexShrink:0}}>
        <span style={{fontSize:10,color:C.mute}}>NailDesk Demo · naildesk.shop · Data resets on refresh</span>
      </div>
    </div>
  );
}
