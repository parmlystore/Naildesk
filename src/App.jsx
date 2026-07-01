import { useState } from "react";

// ── DESIGN TOKENS — Warm Minimalist Nude (research-based 2026 palette) ─
const C = {
  bg: "#FAF8F6", bgDeep: "#F2EDE7", card: "#FFFFFF", border: "#E8E0D8",
  sidebar: "#B8AB9E",   // soft warm beige — light, gentle, neutral
  text: "#2C2420", sub: "#9C8E84", mute: "#C2B6AC",
  pink: "#C2A28E",      // warm nude — primary accent
  pinkLight: "#F4EEE6", // milky cream tint
  pinkDark: "#9C7A62",  // deeper warm nude
  mauve: "#A6968A", mauveLight: "#F0EBE5",  // soft taupe (replaces plum)
  gold: "#C4A882", goldLight: "#F7F0E6",
  red: "#CC5C5C", redLight: "#FCEAEA",
  amber: "#C2914F", amberLight: "#FAF1E2",
  green: "#7C9583", greenLight: "#EEF3EF",  // sage — 2026 trend colour
  blue: "#7E97A8", blueLight: "#EEF2F5",
};

const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const SERVICES = [
  { id:1, name:"Gel Manicure", duration:60, price:80 },
  { id:2, name:"Acrylic Full Set", duration:90, price:120 },
  { id:3, name:"Gel Pedicure", duration:75, price:90 },
  { id:4, name:"Nail Art (per nail)", duration:30, price:30 },
  { id:5, name:"Removal + Regrowth", duration:45, price:60 },
];

const EXPENSE_CATS = [
  {key:"rent",label:"Studio Rent",icon:"🏠"},{key:"supplies",label:"Nail Supplies",icon:"💅"},
  {key:"equip",label:"Equipment",icon:"⚙️"},{key:"insure",label:"Insurance",icon:"🛡️"},
  {key:"clean",label:"Cleaning",icon:"🧹"},{key:"cpd",label:"Professional Dev",icon:"📚"},
  {key:"market",label:"Marketing",icon:"📣"},{key:"account",label:"Accounting",icon:"📊"},
  {key:"other",label:"Other",icon:"📋"},
];

const CPA_TOPICS = [
  { id:"abn",label:"ABN Registration",icon:"📋" },{ id:"gst",label:"GST Registration",icon:"📊" },
  { id:"payroll",label:"Payroll Setup",icon:"💵" },{ id:"xero",label:"Bookkeeping System Setup",icon:"📒" },
  { id:"bas",label:"BAS Lodgement",icon:"📅" },{ id:"tax",label:"Income Tax Return",icon:"🧾" },
  { id:"bookkeep",label:"General Bookkeeping",icon:"📈" },{ id:"other",label:"Other accounting question",icon:"💬" },
];
const IT_TOPICS = [
  { id:"bug",label:"Something isn't working",icon:"🐛" },{ id:"missing",label:"Missing booking / data",icon:"❓" },
  { id:"howto",label:"How do I do something?",icon:"💡" },{ id:"feature",label:"Request a new feature",icon:"✨" },
  { id:"change",label:"Custom change to my site/app",icon:"🎨" },{ id:"other",label:"Other technical issue",icon:"⚙️" },
];

// ── DATA ──────────────────────────────────────────────────────────────
const INIT_CLIENTS = [
  { id:1, name:"Sarah Chen", phone:"0412 345 678", email:"sarah@email.com", dob:"1988-03-15", joined:"2025-01-10",
    notes:"Prefers almond shape, allergic to certain gel brands — check before use." },
  { id:2, name:"Emma Williams", phone:"0423 456 789", email:"emma@email.com", dob:"1995-07-22", joined:"2025-02-01",
    notes:"Regular every 3 weeks, gel manicure." },
  { id:3, name:"Mei Lin", phone:"0445 678 901", email:"mei@email.com", dob:"2000-04-18", joined:"2025-04-20", notes:"" },
  { id:4, name:"Lisa Park", phone:"0434 567 890", email:"lisa@email.com", dob:"1990-11-05", joined:"2025-03-15", notes:"Sensitive cuticles, go gentle." },
];

const INIT_APPOINTMENTS = [
  { id:1, date:"2026-07-01", time:"09:00", duration:60, service:"Gel Manicure", price:80, client:"Sarah Chen", phone:"0412 345 678", email:"sarah@email.com", source:"online", status:"confirmed" },
  { id:2, date:"2026-07-01", time:"11:00", duration:90, service:"Acrylic Full Set", price:120, client:"Emma Williams", phone:"0423 456 789", email:"emma@email.com", source:"online", status:"confirmed" },
  { id:3, date:"2026-07-01", time:"14:00", duration:60, service:"Gel Manicure", price:80, client:"Mei Lin", phone:"0445 678 901", email:"", source:"manual", status:"confirmed" },
  { id:4, date:"2026-07-02", time:"10:00", duration:75, service:"Gel Pedicure", price:90, client:"Lisa Park", phone:"0434 567 890", email:"lisa@email.com", source:"online", status:"confirmed" },
  { id:5, date:"2026-07-03", time:"13:00", duration:45, service:"Removal + Regrowth", price:60, client:"Anna Wu", phone:"0456 789 012", email:"", source:"manual", status:"confirmed" },
];

const INIT_INCOME = [
  { id:1, date:"2026-06-02", client:"Sarah Chen", type:"Gel Manicure", amount:80, method:"Card" },
  { id:2, date:"2026-06-03", client:"Emma Williams", type:"Acrylic Full Set", amount:120, method:"Bank transfer" },
  { id:3, date:"2026-06-05", client:"Lisa Park", type:"Gel Pedicure", amount:90, method:"Card" },
  { id:4, date:"2026-06-08", client:"Mei Lin", type:"Removal + Regrowth", amount:60, method:"Cash" },
];
const INIT_EXPENSES = [
  { id:1, date:"2026-06-01", category:"rent", description:"Studio rent — June", amount:1800, receipt:true },
  { id:2, date:"2026-06-01", category:"insure", description:"Public liability", amount:85, receipt:true },
  { id:3, date:"2026-06-05", category:"supplies", description:"Gel polish restock", amount:140, receipt:true },
];

const INIT_PRICES = SERVICES.map(s => ({ ...s, active:true }));

const INIT_STOCK = [
  { id:1, name:"Disposable wipes", qty:8, reorder:5, unit:"packs" },
  { id:2, name:"Cotton pads", qty:12, reorder:8, unit:"packs" },
  { id:3, name:"Nail polish remover", qty:3, reorder:2, unit:"bottles" },
  { id:4, name:"Gel top coat", qty:2, reorder:2, unit:"bottles" },
  { id:5, name:"Disposable files", qty:20, reorder:10, unit:"pcs" },
  { id:6, name:"Hand sanitiser", qty:2, reorder:2, unit:"bottles" },
];

const INIT_TODOS = [
  { id:1, text:"Buy disposable wipes", done:false },
  { id:2, text:"Restock gel polish — pink shades", done:false },
  { id:3, text:"Order new nail files", done:true },
  { id:4, text:"Clean and sanitise tools", done:false },
];

const fmtDate = d => { if(!d) return "—"; const dt=new Date(d); return `${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`; };
const fmt12 = (t) => { const [h,m]=t.split(":").map(Number); return h===12?`12:${m.toString().padStart(2,"0")} pm`:h>12?`${h-12}:${m.toString().padStart(2,"0")} pm`:`${h}:${m.toString().padStart(2,"0")} am`; };
const today = () => { const d=new Date(); return d.toISOString().split("T")[0]; };

// ── STATIC NAV DATA ───────────────────────────────────────────────
const NAV = [
  { id:"dashboard", label:"Home" }, { id:"appointments", label:"Bookings" },
  { id:"clients", label:"Clients" }, { id:"finances", label:"Finances" },
  { id:"prices", label:"Prices" }, { id:"stock", label:"To-Do" },
  { id:"settings", label:"Booking" }, { id:"support", label:"Support" },
];

// ── STUDIO LOGO ───────────────────────────────────────────────────
function StudioLogo({ name }) {
  return (
    <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:22, fontWeight:700, color:C.pinkDark, lineHeight:1, letterSpacing:"0.01em" }}>
      {name.split(" ")[0]}
    </div>
  );
}

// ── NAV ICON ──────────────────────────────────────────────────────
function NavIcon({ id, active }) {
  const col = active ? C.pinkDark : "rgba(44,36,32,0.4)";
  const icons = {
    dashboard: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="2" stroke={col} strokeWidth="1.6"/><rect x="11" y="2" width="7" height="7" rx="2" stroke={col} strokeWidth="1.6"/><rect x="2" y="11" width="7" height="7" rx="2" stroke={col} strokeWidth="1.6"/><rect x="11" y="11" width="7" height="7" rx="2" stroke={col} strokeWidth="1.6"/></svg>,
    appointments: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="15" rx="2.5" stroke={col} strokeWidth="1.6"/><path d="M6 2v3M14 2v3" stroke={col} strokeWidth="1.6" strokeLinecap="round"/><path d="M2 8h16" stroke={col} strokeWidth="1.4"/><circle cx="7" cy="13" r="1" fill={col}/><circle cx="10" cy="13" r="1" fill={col}/><circle cx="13" cy="13" r="1" fill={col}/></svg>,
    clients: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke={col} strokeWidth="1.6"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={col} strokeWidth="1.6" strokeLinecap="round"/></svg>,
    finances: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2.5" stroke={col} strokeWidth="1.6"/><path d="M6 5V4a4 4 0 0 1 8 0v1" stroke={col} strokeWidth="1.6"/><circle cx="10" cy="11" r="2" stroke={col} strokeWidth="1.4"/></svg>,
    prices: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 4h5l7 7-5 5-7-7V4z" stroke={col} strokeWidth="1.6" strokeLinejoin="round"/><circle cx="8" cy="8" r="1.2" fill={col}/></svg>,
    stock: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M4 6l1 10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-10M8 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke={col} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    settings: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={col} strokeWidth="1.6"/><path d="M10 6v4l3 2" stroke={col} strokeWidth="1.6" strokeLinecap="round"/></svg>,
    support: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={col} strokeWidth="1.6"/><path d="M10 13v.01M10 10c0-2 2-2 2-4a2 2 0 1 0-4 0" stroke={col} strokeWidth="1.6" strokeLinecap="round"/></svg>,
  };
  return icons[id] || null;
}

// ── SIDEBAR ───────────────────────────────────────────────────────
function Sidebar({ screen, setScreen, studioName }) {
  return (
    <div style={{ width:72, flexShrink:0, background:C.sidebar, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", paddingTop:18, gap:1, position:"sticky", top:0 }}>
      <div style={{ marginBottom:10, textAlign:"center", padding:"0 8px" }}>
        <StudioLogo name={studioName}/>
        <div style={{ fontSize:7, color:"rgba(44,36,32,0.45)", marginTop:2, fontWeight:400, letterSpacing:"0.18em", textTransform:"uppercase" }}>STUDIO</div>
      </div>
      <div style={{ width:32, height:"0.5px", background:"rgba(44,36,32,0.15)", marginBottom:10 }}/>
      {NAV.map(item => {
        const active = screen===item.id;
        return (
          <div key={item.id} onClick={() => setScreen(item.id)}
            style={{ width:58, padding:"8px 4px 7px", borderRadius:10, display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer", marginBottom:1,
              background: active ? "rgba(255,255,255,0.45)" : "transparent",
              borderLeft: active ? `2px solid ${C.pinkDark}` : "2px solid transparent" }}>
            <NavIcon id={item.id} active={active}/>
            <div style={{ fontSize:7.5, marginTop:4, fontWeight:active?700:500, color:active?C.pinkDark:"rgba(44,36,32,0.55)" }}>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── TOP BAR ───────────────────────────────────────────────────────
function TopBar({ title, action, screen, studioName }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, paddingBottom:14, borderBottom:`1px solid ${C.border}` }}>
      <div>
        <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:20, fontWeight:400, fontStyle:"italic", color:C.text }}>{title}</div>
        {screen==="dashboard" && <div style={{ fontSize:10, color:C.sub, marginTop:1, letterSpacing:"0.08em", textTransform:"uppercase", fontStyle:"normal", fontFamily:"'Inter',sans-serif" }}>{studioName}</div>}
      </div>
      {action}
    </div>
  );
}

export default function NailDesk() {
  const [screen, setScreen] = useState("dashboard");
  const [clients, setClients] = useState(INIT_CLIENTS);
  const [appointments, setAppointments] = useState(INIT_APPOINTMENTS);
  const [income, setIncome] = useState(INIT_INCOME);
  const [expenses, setExpenses] = useState(INIT_EXPENSES);
  const [prices, setPrices] = useState(INIT_PRICES);
  const [stock, setStock] = useState(INIT_STOCK);
  const [todos, setTodos] = useState(INIT_TODOS);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-07-01");
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddManual, setShowAddManual] = useState(false);
  const [showBookingLink, setShowBookingLink] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [finTab, setFinTab] = useState("income");
  const [newAppt, setNewAppt] = useState({ time:"09:00", service:SERVICES[0].name, client:"", phone:"" });
  const [newIncome, setNewIncome] = useState({ date:"", client:"", type:"", amount:"", method:"Card" });
  const [newExpense, setNewExpense] = useState({ date:"", category:"rent", description:"", amount:"", receipt:false });
  const [newClient, setNewClient] = useState({ name:"", phone:"", email:"", dob:"", notes:"" });
  const studioName = "Bloom Nails";
  const [clientSearch, setClientSearch] = useState("");

  // Booking settings state
  const [slotLength, setSlotLength] = useState(60);
  const [bookingWindow, setBookingWindow] = useState(14);
  const [minNotice, setMinNotice] = useState(2);
  const [requireDeposit, setRequireDeposit] = useState(true);
  const [depositAmount, setDepositAmount] = useState("20");
  const [bankDetails, setBankDetails] = useState({ accountName:"Bloom Nails Pty Ltd", bsb:"062-000", accountNumber:"1234 5678" });
  const [customMessage, setCustomMessage] = useState("Please transfer your deposit within 24 hours to secure your booking.");
  const [blockedDates, setBlockedDates] = useState([{ id:1, date:"2026-07-25", reason:"Closed", allDay:true }]);
  const [showAddBlocked, setShowAddBlocked] = useState(false);
  const [newBlocked, setNewBlocked] = useState({ date:"", reason:"", allDay:true });

  // Support state
  const [supportTab, setSupportTab] = useState("cpa");
  const [cpaTopics, setCpaTopics] = useState([]);
  const [cpaMessage, setCpaMessage] = useState("");
  const [itTopic, setItTopic] = useState(null);
  const [itMessage, setItMessage] = useState("");
  const [itUrgent, setItUrgent] = useState(false);
  const [bkStep, setBkStep] = useState(1);
  const [bkService, setBkService] = useState(null);
  const [bkDate, setBkDate] = useState(null);
  const [bkSlot, setBkSlot] = useState(null);
  const [bkForm, setBkForm] = useState({ name:"", email:"", phone:"", note:"" });
  const [bkRef] = useState(`BK${Math.random().toString(36).substr(2,6).toUpperCase()}`);
  const [supportSent, setSupportSent] = useState(null);

  const totalIn = income.reduce((s,i)=>s+i.amount,0);
  const totalOut = expenses.reduce((s,e)=>s+e.amount,0);
  const net = totalIn - totalOut;

  // ── SHARED STYLES ────────────────────────────────────────────────
  const overlay = { position:"fixed", inset:0, background:"rgba(42,24,32,0.5)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" };
  const sheet = { background:C.card, borderRadius:"18px 18px 0 0", padding:"22px 18px 30px", width:"100%", maxWidth:480, maxHeight:"88vh", overflowY:"auto" };
  const inp = { width:"100%", padding:"10px 13px", borderRadius:9, border:`1.5px solid ${C.border}`, fontSize:13, background:C.bg, outline:"none", boxSizing:"border-box", fontFamily:"inherit", color:C.text };
  const sel = inp;
  const lbl = { fontSize:11, color:C.sub, marginBottom:4, display:"block", fontWeight:500 };
  const btn = { background:C.pink, color:"#fff", border:"none", borderRadius:10, padding:"12px 20px", fontSize:13, fontWeight:600, cursor:"pointer", width:"100%" };
  const btnSm = { background:C.pink, color:"#fff", border:"none", borderRadius:7, padding:"6px 12px", fontSize:11, fontWeight:600, cursor:"pointer" };
  const btnGhost = { background:"transparent", color:C.pink, border:`1.5px solid ${C.pink}`, borderRadius:10, padding:"11px 20px", fontSize:13, fontWeight:600, cursor:"pointer", width:"100%" };
  const card = { background:C.card, borderRadius:14, padding:"14px 16px", marginBottom:10, boxShadow:"0 1px 4px rgba(42,33,24,0.07)" };
  const rowStyle = { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.border}` };
  const stTitle = { fontSize:10, fontWeight:700, color:C.mute, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:10 };
  const pill = (bg,color) => ({ background:bg, color, padding:"2px 8px", borderRadius:20, fontSize:10, fontWeight:600 });
  const checkBox = (done) => ({ width:18, height:18, borderRadius:5, border:`2px solid ${done?C.pink:"#D8D0C8"}`, background:done?C.pink:C.card, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, marginTop:1 });

  // ── LOGO — Script wordmark (no icon, font does the work) ─────────
  // ── DASHBOARD ─────────────────────────────────────────────────────
  const Dashboard = () => {
    const todayAppts = appointments.filter(a => a.date === today()).sort((a,b) => a.time.localeCompare(b.time));
    const upcomingOnline = appointments.filter(a => a.source === "online").length;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    return (
      <div>
        <TopBar title={greeting} screen={screen} studioName={studioName}/>
        <div style={{ display:"flex", gap:10, marginBottom:16 }}>
          {[
            { label:"Income", value:`$${totalIn.toLocaleString()}`, color:C.green },
            { label:"Expenses", value:`$${totalOut.toLocaleString()}`, color:C.amber },
            { label:"Net profit", value:`$${net.toLocaleString()}`, color: net>=0?C.green:C.red },
          ].map(s => (
            <div key={s.label} style={{ ...card, flex:1, marginBottom:0, padding:"12px 10px", textAlign:"center" }}>
              <div style={{ fontSize:17, fontWeight:800, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:9, color:C.mute, marginTop:3, textTransform:"uppercase", letterSpacing:"0.08em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={stTitle}>Today's Appointments</div>
            <button onClick={() => setScreen("appointments")} style={{ ...btnSm, background:"transparent", color:C.pink, border:`1px solid ${C.pinkLight}` }}>View all →</button>
          </div>
          {todayAppts.length === 0 ? <div style={{ color:C.mute, fontSize:13 }}>No appointments today</div> : todayAppts.map(a => (
            <div key={a.id} onClick={() => { setSelectedAppt(a); setScreen("appointments"); }} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:`1px solid ${C.border}`, cursor:"pointer" }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, width:60 }}>{fmt12(a.time)}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:13 }}>{a.client}</div>
                <div style={{ fontSize:11, color:C.sub }}>{a.service}</div>
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:C.pink }}>${a.price}</div>
            </div>
          ))}
        </div>

        <div style={{ ...card, background:C.greenLight, border:`1px solid ${C.green}30` }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.green, marginBottom:6 }}>🔗 Online Booking Active</div>
          <div style={{ fontSize:12, color:C.text, lineHeight:1.6 }}>{upcomingOnline} of your upcoming appointments came from your online booking link — no WhatsApp needed.</div>
          <button onClick={() => setScreen("booking")} style={{ ...btnSm, marginTop:10 }}>Try booking page</button>
        </div>
      </div>
    );
  };

  // ── APPOINTMENTS ──────────────────────────────────────────────────
  const Appointments = () => {
    const dayAppts = appointments.filter(a => a.date === selectedDate).sort((a,b) => a.time.localeCompare(b.time));
    const dateObj = new Date(selectedDate);
    const dateDisplay = `${DAY_NAMES[dateObj.getDay()]} ${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]}`;
    const weekStart = new Date(selectedDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Monday of current week
    const dates = Array.from({length:7}, (_,i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return d.toISOString().split("T")[0];
    });

    const shiftWeek = (dir) => {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() + dir*7);
      setSelectedDate(d.toISOString().split("T")[0]);
    };

    return (
      <div>
        <TopBar title="Appointments" action={<button onClick={() => setScreen("booking")} style={btnSm}>🔗 Booking Link</button>} screen={screen} studioName={studioName}/>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14 }}>
          <button onClick={() => shiftWeek(-1)} style={{ background:C.pinkLight, border:"none", borderRadius:8, width:28, height:28, fontSize:14, color:C.pinkDark, cursor:"pointer", flexShrink:0 }}>‹</button>
          <div style={{ display:"flex", gap:5, overflowX:"auto", flex:1 }}>
            {dates.map(d => {
              const dt = new Date(d);
              const count = appointments.filter(a => a.date === d).length;
              const isSel = d === selectedDate;
              const isToday = d === today();
              return (
                <div key={d} onClick={() => setSelectedDate(d)} style={{ flex:1, minWidth:42, borderRadius:11, padding:"7px 2px", textAlign:"center", cursor:"pointer", background: isSel?C.pink:C.card, border:`1.5px solid ${isSel?C.pink:isToday?C.pinkDark:C.border}` }}>
                  <div style={{ fontSize:8.5, fontWeight:700, color: isSel?"rgba(255,255,255,0.7)":C.sub }}>{DAY_NAMES[dt.getDay()]}</div>
                  <div style={{ fontSize:15, fontWeight:700, color: isSel?"#fff":C.text, margin:"2px 0" }}>{dt.getDate()}</div>
                  {count>0 && <div style={{ fontSize:7.5, color: isSel?"rgba(255,255,255,0.7)":C.pink, fontWeight:600 }}>{count}</div>}
                </div>
              );
            })}
          </div>
          <button onClick={() => shiftWeek(1)} style={{ background:C.pinkLight, border:"none", borderRadius:8, width:28, height:28, fontSize:14, color:C.pinkDark, cursor:"pointer", flexShrink:0 }}>›</button>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{dateDisplay} · {dayAppts.length} appointment{dayAppts.length!==1?"s":""}</div>
          <button onClick={() => setShowAddManual(true)} style={btnSm}>+ Manual</button>
        </div>

        {dayAppts.length === 0 ? (
          <div style={{ ...card, textAlign:"center", padding:28 }}>
            <div style={{ fontSize:28, marginBottom:8 }}>📅</div>
            <div style={{ color:C.sub, fontSize:13 }}>No appointments this day</div>
          </div>
        ) : dayAppts.map(a => (
          <div key={a.id} onClick={() => setSelectedAppt(a)} style={{ ...card, cursor:"pointer", borderLeft:`3px solid ${a.source==="online"?C.green:C.pink}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ display:"flex", gap:12 }}>
                <div style={{ textAlign:"center", flexShrink:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{fmt12(a.time)}</div>
                  <div style={{ fontSize:9, color:C.mute }}>{a.duration}min</div>
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color:C.text }}>{a.client}</div>
                  <div style={{ fontSize:12, color:C.sub, marginTop:2 }}>{a.service}</div>
                  <div style={{ marginTop:5 }}>{a.source==="online" ? <span style={pill(C.greenLight,C.green)}>🔗 Online booking</span> : <span style={pill(C.pinkLight,C.pinkDark)}>✏️ Manual entry</span>}</div>
                </div>
              </div>
              <div style={{ fontSize:15, fontWeight:700, color:C.pink }}>${a.price}</div>
            </div>
          </div>
        ))}

        {/* Detail sheet */}
        {selectedAppt && (
          <div style={overlay} onClick={() => setSelectedAppt(null)}>
            <div style={sheet} onClick={e => e.stopPropagation()}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                <div style={{ fontWeight:700, fontSize:17 }}>{selectedAppt.client}</div>
                <button onClick={() => setSelectedAppt(null)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>✕</button>
              </div>
              {selectedAppt.source==="online" && <div style={{ ...pill(C.greenLight,C.green), marginBottom:14, display:"inline-block" }}>🔗 Booked online — confirmation sent</div>}
              {[
                { label:"Service", value:selectedAppt.service },
                { label:"Date & Time", value:`${dateDisplay} · ${fmt12(selectedAppt.time)}` },
                { label:"Duration", value:`${selectedAppt.duration} min` },
                { label:"Price", value:`$${selectedAppt.price}` },
                { label:"Phone", value:selectedAppt.phone },
              ].map((item,i) => (
                <div key={i} style={rowStyle}><div style={{ fontSize:12, color:C.sub }}>{item.label}</div><div style={{ fontSize:13, fontWeight:600 }}>{item.value}</div></div>
              ))}
              <div style={{ display:"flex", gap:8, marginTop:16 }}>
                <button style={{ ...btnGhost, flex:1 }} onClick={() => { setAppointments(appointments.filter(a => a.id !== selectedAppt.id)); setSelectedAppt(null); }}>Cancel</button>
                <a href={`tel:${selectedAppt.phone}`} style={{ ...btn, flex:1, textDecoration:"none", textAlign:"center", display:"block" }}>📞 Call</a>
              </div>
            </div>
          </div>
        )}

        {/* Booking link sheet */}
        {showBookingLink && (
          <div style={overlay} onClick={() => setShowBookingLink(false)}>
            <div style={sheet} onClick={e => e.stopPropagation()}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}><div style={{ fontWeight:700, fontSize:16 }}>Your Booking Link</div><button onClick={() => setShowBookingLink(false)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer" }}>✕</button></div>
              <div style={{ ...card, background:C.pinkLight, textAlign:"center", padding:20 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.pinkDark, marginBottom:10 }}>naildesk.au/book/bloom-nails</div>
                <button style={btn}>📋 Copy Link</button>
              </div>
              <div style={{ fontSize:12, color:C.sub, marginTop:14, lineHeight:1.7 }}>Share this link on Instagram bio, WhatsApp, or your website. Clients book 24/7 without messaging you directly.</div>
            </div>
          </div>
        )}

        {/* Add manual sheet */}
        {showAddManual && (
          <div style={overlay} onClick={() => setShowAddManual(false)}>
            <div style={sheet} onClick={e => e.stopPropagation()}>
              <div style={{ fontWeight:700, fontSize:16, marginBottom:16 }}>+ Manual Appointment</div>
              <div style={{ marginBottom:10 }}><label style={lbl}>Client name</label><input style={inp} value={newAppt.client} onChange={e => setNewAppt({...newAppt,client:e.target.value})}/></div>
              <div style={{ marginBottom:10 }}><label style={lbl}>Phone</label><input style={inp} value={newAppt.phone} onChange={e => setNewAppt({...newAppt,phone:e.target.value})}/></div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                <div><label style={lbl}>Time</label><input style={inp} type="time" value={newAppt.time} onChange={e => setNewAppt({...newAppt,time:e.target.value})}/></div>
                <div><label style={lbl}>Service</label><select style={sel} value={newAppt.service} onChange={e => setNewAppt({...newAppt,service:e.target.value})}>{SERVICES.map(sv => <option key={sv.id}>{sv.name}</option>)}</select></div>
              </div>
              <button style={btn} onClick={() => {
                if (newAppt.client) {
                  const svc = SERVICES.find(sv => sv.name === newAppt.service);
                  setAppointments([...appointments, { id:Date.now(), date:selectedDate, time:newAppt.time, duration:svc.duration, service:svc.name, price:svc.price, client:newAppt.client, phone:newAppt.phone, email:"", source:"manual", status:"confirmed" }]);
                  setNewAppt({ time:"09:00", service:SERVICES[0].name, client:"", phone:"" });
                  setShowAddManual(false);
                }
              }}>Add Appointment</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── CLIENTS ───────────────────────────────────────────────────────
  const Clients = () => {
    const filtered = clients.filter(c => c.name.toLowerCase().includes(clientSearch.toLowerCase()));
    return (
      <div>
        <TopBar title="Clients" action={<button onClick={() => setShowAddClient(true)} style={btnSm}>+ Add</button>} screen={screen} studioName={studioName}/>
        <input style={{ ...inp, marginBottom:12 }} placeholder="Search clients..." value={clientSearch} onChange={e => setClientSearch(e.target.value)}/>
        {filtered.length === 0 ? (
          <div style={{ ...card, textAlign:"center", padding:28 }}>
            <div style={{ fontSize:28, marginBottom:8 }}>👤</div>
            <div style={{ color:C.sub, fontSize:13 }}>{clients.length === 0 ? "No clients yet — add your first client" : "No clients match your search"}</div>
          </div>
        ) : filtered.map(c => (
          <div key={c.id} style={{ ...card, cursor:"pointer" }} onClick={() => setSelectedClient(c)}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:C.pinkLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:C.pink, fontFamily:"'Playfair Display',serif", flexShrink:0 }}>{c.name[0]}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:14 }}>{c.name}</div>
                <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>{c.phone}</div>
                {c.notes && <div style={{ marginTop:5 }}><span style={pill(C.amberLight,C.amber)}>⚠ Note</span></div>}
              </div>
              <div style={{ color:C.border, fontSize:18 }}>›</div>
            </div>
          </div>
        ))}

        {selectedClient && (
          <div style={overlay} onClick={() => setSelectedClient(null)}>
            <div style={sheet} onClick={e => e.stopPropagation()}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ fontWeight:700, fontSize:18, fontFamily:"'Playfair Display',serif" }}>{selectedClient.name}</div>
                <button onClick={() => setSelectedClient(null)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>✕</button>
              </div>
              <div style={{ fontSize:11, color:C.sub, marginBottom:14 }}>Client since {fmtDate(selectedClient.joined)}</div>
              {[
                { label:"Phone", value:selectedClient.phone, link:`tel:${selectedClient.phone.replace(/\s/g,"")}` },
                { label:"Email", value:selectedClient.email },
                { label:"Date of birth", value:fmtDate(selectedClient.dob) },
              ].map((item,i) => (
                <div key={i} style={rowStyle}>
                  <div style={{ fontSize:11, color:C.sub }}>{item.label}</div>
                  {item.link ? <a href={item.link} style={{ fontSize:13, fontWeight:600, color:C.pink, textDecoration:"none" }}>{item.value}</a> : <div style={{ fontSize:13, fontWeight:600 }}>{item.value}</div>}
                </div>
              ))}
              {selectedClient.notes && (
                <div style={{ background:C.amberLight, borderRadius:10, padding:12, marginTop:14, border:`1px solid ${C.amber}30` }}>
                  <div style={{ fontSize:10, fontWeight:700, color:C.amber, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 }}>⚠ Notes</div>
                  <div style={{ fontSize:13, color:C.text, lineHeight:1.6 }}>{selectedClient.notes}</div>
                </div>
              )}
              <div style={{ marginTop:16 }}>
                <div style={stTitle}>Visit History</div>
                {income.filter(i => i.client === selectedClient.name).map(item => (
                  <div key={item.id} style={rowStyle}>
                    <div><div style={{ fontSize:13, fontWeight:500 }}>{item.type}</div><div style={{ fontSize:10, color:C.sub }}>{fmtDate(item.date)}</div></div>
                    <div style={{ fontSize:14, fontWeight:700, color:C.pink }}>${item.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showAddClient && (
          <div style={overlay} onClick={() => setShowAddClient(false)}>
            <div style={sheet} onClick={e => e.stopPropagation()}>
              <div style={{ fontWeight:700, fontSize:16, marginBottom:16 }}>New Client</div>
              {[{label:"Full Name",key:"name",type:"text"},{label:"Phone",key:"phone",type:"tel"},{label:"Email",key:"email",type:"email"},{label:"Date of Birth",key:"dob",type:"date"}].map(f => (
                <div key={f.key} style={{ marginBottom:10 }}><label style={lbl}>{f.label}</label><input style={inp} type={f.type} value={newClient[f.key]} onChange={e => setNewClient({...newClient,[f.key]:e.target.value})}/></div>
              ))}
              <div style={{ marginBottom:14 }}><label style={lbl}>Notes (allergies, preferences)</label><textarea style={{ ...inp, height:70, resize:"none" }} value={newClient.notes} onChange={e => setNewClient({...newClient,notes:e.target.value})}/></div>
              <button style={btn} onClick={() => { if (newClient.name) { setClients([...clients,{id:Date.now(),...newClient,joined:today()}]); setNewClient({name:"",phone:"",email:"",dob:"",notes:""}); setShowAddClient(false); }}}>Add Client</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── FINANCES ──────────────────────────────────────────────────────
  const Finances = () => (
    <div>
      <TopBar title="Income & Expenses" screen={screen} studioName={studioName}/>
      <div style={{ ...card, display:"flex", justifyContent:"space-around", textAlign:"center", padding:"14px 10px", marginBottom:14 }}>
        <div><div style={{ fontSize:19, fontWeight:800, color:C.green }}>${totalIn.toLocaleString()}</div><div style={{ fontSize:9, color:C.mute, textTransform:"uppercase" }}>Income</div></div>
        <div style={{ width:1, background:C.border }}/>
        <div><div style={{ fontSize:19, fontWeight:800, color:C.amber }}>${totalOut.toLocaleString()}</div><div style={{ fontSize:9, color:C.mute, textTransform:"uppercase" }}>Expenses</div></div>
        <div style={{ width:1, background:C.border }}/>
        <div><div style={{ fontSize:19, fontWeight:800, color:net>=0?C.green:C.red }}>${net.toLocaleString()}</div><div style={{ fontSize:9, color:C.mute, textTransform:"uppercase" }}>Net</div></div>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <button onClick={() => setFinTab("income")} style={{ flex:1, padding:9, borderRadius:9, border:"none", fontWeight:600, fontSize:12, cursor:"pointer", background:finTab==="income"?C.pink:C.pinkLight, color:finTab==="income"?"#fff":C.pinkDark }}>Income</button>
        <button onClick={() => setFinTab("expenses")} style={{ flex:1, padding:9, borderRadius:9, border:"none", fontWeight:600, fontSize:12, cursor:"pointer", background:finTab==="expenses"?C.pink:C.pinkLight, color:finTab==="expenses"?"#fff":C.pinkDark }}>Expenses</button>
      </div>
      {finTab==="income" && (
        <div style={card}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}><div style={stTitle}>Income</div><button onClick={() => setShowAddIncome(true)} style={btnSm}>+ Add</button></div>
          {income.map(item => (
            <div key={item.id} style={rowStyle}><div><div style={{ fontSize:13, fontWeight:500 }}>{item.client}</div><div style={{ fontSize:10, color:C.sub }}>{item.type} · {fmtDate(item.date)}</div></div><div style={{ fontSize:14, fontWeight:700, color:C.green }}>${item.amount}</div></div>
          ))}
        </div>
      )}
      {finTab==="expenses" && (
        <div style={card}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}><div style={stTitle}>Expenses</div><button onClick={() => setShowAddExpense(true)} style={btnSm}>+ Add</button></div>
          {expenses.map(item => { const cat = EXPENSE_CATS.find(c => c.key===item.category); return (
            <div key={item.id} style={rowStyle}>
              <div style={{ display:"flex", gap:8 }}><span style={{ fontSize:16 }}>{cat?.icon}</span><div><div style={{ fontSize:13, fontWeight:500 }}>{item.description}</div><div style={{ fontSize:10, color:C.sub }}>{fmtDate(item.date)}</div></div></div>
              <div style={{ fontSize:14, fontWeight:700, color:C.amber }}>${item.amount}</div>
            </div>
          );})}
        </div>
      )}
      {showAddIncome && (
        <div style={overlay} onClick={() => setShowAddIncome(false)}>
          <div style={sheet} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:16 }}>Record Income</div>
            <div style={{ marginBottom:10 }}><label style={lbl}>Date</label><input style={inp} type="date" value={newIncome.date} onChange={e => setNewIncome({...newIncome,date:e.target.value})}/></div>
            <div style={{ marginBottom:10 }}><label style={lbl}>Client</label><select style={sel} value={newIncome.client} onChange={e => setNewIncome({...newIncome,client:e.target.value})}><option value="">Select</option>{clients.map(c => <option key={c.id}>{c.name}</option>)}</select></div>
            <div style={{ marginBottom:10 }}><label style={lbl}>Type</label><input style={inp} value={newIncome.type} onChange={e => setNewIncome({...newIncome,type:e.target.value})}/></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
              <div><label style={lbl}>Amount ($)</label><input style={inp} type="number" value={newIncome.amount} onChange={e => setNewIncome({...newIncome,amount:e.target.value})}/></div>
              <div><label style={lbl}>Method</label><select style={sel} value={newIncome.method} onChange={e => setNewIncome({...newIncome,method:e.target.value})}>{["Card","Cash","Bank transfer"].map(m => <option key={m}>{m}</option>)}</select></div>
            </div>
            <button style={btn} onClick={() => { if (newIncome.amount) { setIncome([...income,{id:Date.now(),...newIncome,amount:parseFloat(newIncome.amount)}]); setShowAddIncome(false); }}}>Save</button>
          </div>
        </div>
      )}
      {showAddExpense && (
        <div style={overlay} onClick={() => setShowAddExpense(false)}>
          <div style={sheet} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:16 }}>Record Expense</div>
            <div style={{ marginBottom:10 }}><label style={lbl}>Date</label><input style={inp} type="date" value={newExpense.date} onChange={e => setNewExpense({...newExpense,date:e.target.value})}/></div>
            <div style={{ marginBottom:10 }}><label style={lbl}>Category</label><select style={sel} value={newExpense.category} onChange={e => setNewExpense({...newExpense,category:e.target.value})}>{EXPENSE_CATS.map(c => <option key={c.key} value={c.key}>{c.icon} {c.label}</option>)}</select></div>
            <div style={{ marginBottom:10 }}><label style={lbl}>Description</label><input style={inp} value={newExpense.description} onChange={e => setNewExpense({...newExpense,description:e.target.value})}/></div>
            <div style={{ marginBottom:14 }}><label style={lbl}>Amount ($)</label><input style={inp} type="number" value={newExpense.amount} onChange={e => setNewExpense({...newExpense,amount:e.target.value})}/></div>
            <button style={btn} onClick={() => { if (newExpense.amount) { setExpenses([...expenses,{id:Date.now(),...newExpense,amount:parseFloat(newExpense.amount)}]); setShowAddExpense(false); }}}>Save</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── PRICES ────────────────────────────────────────────────────────
  const Prices = () => {
    const exportAsImage = async () => {
      const el = document.getElementById("price-card-export");
      if (!el) return;
      try {
        // Load html2canvas from CDN if not already loaded
        if (!window.html2canvas) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
        const canvas = await window.html2canvas(el, { scale:3, useCORS:true, backgroundColor:"#FAF8F6" });
        const link = document.createElement("a");
        link.download = `${studioName.replace(/\s+/g,"-")}-price-list.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch(e) {
        alert("Export failed — try screenshot instead");
      }
    };

    return (
      <div>
        <TopBar title="Price List" screen={screen} studioName={studioName} action={
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={exportAsImage} style={btnSm}>🖼 Save Image</button>
            <button onClick={() => window.print()} style={{ ...btnSm, background:C.mauve }}>🖨 Print</button>
          </div>
        }/>

        <div id="price-card-export" style={{ background:C.card, borderRadius:18, overflow:"hidden", boxShadow:"0 2px 16px rgba(42,33,24,0.10)", marginBottom:12 }}>
          {/* Branded header */}
          <div style={{ background:`linear-gradient(135deg, ${C.sidebar} 0%, #8C7F73 100%)`, padding:"32px 24px 24px", textAlign:"center" }}>
            <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:36, fontWeight:700, color:"#fff" }}>{studioName}</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)", marginTop:6, letterSpacing:"0.22em", textTransform:"uppercase" }}>Service Menu · Price List</div>
            <div style={{ width:28, height:"0.5px", background:"rgba(201,168,154,0.6)", margin:"12px auto 0" }}/>
          </div>

          {/* Price items */}
          <div style={{ padding:"20px 22px" }}>
            {prices.filter(p => p.active).map((item,i) => (
              <div key={item.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 0", borderBottom: i < prices.filter(p=>p.active).length-1 ? `1px solid ${C.border}` : "none" }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color:C.text }}>{item.name}</div>
                  <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>⏱ {item.duration} min</div>
                </div>
                <div style={{ fontSize:20, fontWeight:800, color:C.pinkDark, fontFamily:"'Playfair Display',serif" }}>${item.price}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ background:C.pinkLight, padding:"16px 22px", textAlign:"center" }}>
            <div style={{ fontSize:12, fontWeight:600, color:C.pinkDark, marginBottom:3 }}>Book online — {studioName.toLowerCase().replace(/\s+/g,"-")}.naildesk.shop</div>
            <div style={{ fontSize:10, color:C.sub, marginTop:4 }}>Powered by NailDesk</div>
          </div>
        </div>

        {/* Export instructions */}
        <div style={{ ...card, background:C.greenLight, border:`1px solid ${C.green}30` }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.green, marginBottom:6 }}>📱 Post on Instagram or print</div>
          <div style={{ fontSize:12, color:C.text, lineHeight:1.7 }}>
            Tap <strong>🖼 Save Image</strong> → saves as a PNG file → post directly to Instagram, send on WhatsApp, or print at any photo shop.<br/><br/>
            Tap <strong>🖨 Print</strong> → opens print dialog → choose "Save as PDF" or send to your printer.
          </div>
        </div>
      </div>
    );
  };

  // ── BOOKING SETTINGS ──────────────────────────────────────────────
  const Settings = () => (
    <div>
      <TopBar title="Booking Settings" screen={screen} studioName={studioName}/>
      <div style={card}>
        <div style={stTitle}>⏱ Time Slot Length</div>
        <div style={{ display:"flex", gap:6, marginBottom:8 }}>
          {[15,30,45,60,90].map(v => (
            <button key={v} onClick={() => setSlotLength(v)} style={{ flex:1, padding:"8px 4px", borderRadius:8, border:"none", fontSize:11, fontWeight:600, cursor:"pointer", background:slotLength===v?C.pink:C.pinkLight, color:slotLength===v?"#fff":C.pinkDark }}>
              {v<60?`${v}m`:v===60?"1h":"1h30"}
            </button>
          ))}
        </div>
        <div style={{ fontSize:11, color:C.mute }}>Available booking times appear every {slotLength} minutes.</div>
      </div>

      <div style={card}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}><div style={stTitle}>🚫 Blocked Dates</div><button onClick={() => setShowAddBlocked(true)} style={btnSm}>+ Block</button></div>
        {blockedDates.map(b => (
          <div key={b.id} style={rowStyle}>
            <div><div style={{ fontSize:13, fontWeight:600 }}>{fmtDate(b.date)}</div><div style={{ fontSize:11, color:C.sub }}>{b.reason}</div></div>
            <button onClick={() => setBlockedDates(blockedDates.filter(bd => bd.id !== b.id))} style={{ background:"none", border:"none", color:C.mute, fontSize:16, cursor:"pointer" }}>×</button>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={stTitle}>💰 Deposit & Bank Details</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <div onClick={() => setRequireDeposit(!requireDeposit)} style={{ width:38, height:22, borderRadius:12, background:requireDeposit?C.pink:"#E0DADC", position:"relative", cursor:"pointer" }}>
            <div style={{ width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute", top:2, left:requireDeposit?18:2, transition:"left 0.2s" }}/>
          </div>
          <div style={{ fontSize:13, fontWeight:600 }}>Request a deposit</div>
        </div>
        {requireDeposit && (
          <>
            <div style={{ marginBottom:10 }}><label style={lbl}>Deposit amount ($)</label><input style={inp} type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)}/></div>
            {["accountName","bsb","accountNumber"].map(k => (
              <div key={k} style={{ marginBottom:10 }}>
                <label style={lbl}>{k==="accountName"?"Account name":k==="bsb"?"BSB":"Account number"}</label>
                <input style={inp} value={bankDetails[k]} onChange={e => setBankDetails({...bankDetails,[k]:e.target.value})}/>
              </div>
            ))}
            <label style={lbl}>Custom message</label>
            <textarea style={{ ...inp, height:70, resize:"none" }} value={customMessage} onChange={e => setCustomMessage(e.target.value)}/>
          </>
        )}
      </div>

      <button style={btn}>Save Settings</button>

      {showAddBlocked && (
        <div style={overlay} onClick={() => setShowAddBlocked(false)}>
          <div style={sheet} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:16 }}>Block a Date</div>
            <div style={{ marginBottom:10 }}><label style={lbl}>Date</label><input style={inp} type="date" value={newBlocked.date} onChange={e => setNewBlocked({...newBlocked,date:e.target.value})}/></div>
            <div style={{ marginBottom:14 }}><label style={lbl}>Reason</label><input style={inp} value={newBlocked.reason} onChange={e => setNewBlocked({...newBlocked,reason:e.target.value})}/></div>
            <button style={btn} onClick={() => { if (newBlocked.date) { setBlockedDates([...blockedDates,{id:Date.now(),...newBlocked}]); setNewBlocked({date:"",reason:"",allDay:true}); setShowAddBlocked(false); }}}>Block This Date</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── STOCK & TO-DO ─────────────────────────────────────────────────
  const StockTodo = () => (
    <div>
      <TopBar title="To-Do &amp; Stock" screen={screen} studioName={studioName}/>

      <div style={card}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
          <div style={stTitle}>✅ To-Do List</div>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          <input style={{ ...inp, flex:1 }} placeholder="e.g. Buy disposable wipes" value={newTodo} onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && newTodo.trim()) { setTodos([...todos,{id:Date.now(),text:newTodo.trim(),done:false}]); setNewTodo(""); }}}/>
          <button style={btnSm} onClick={() => { if (newTodo.trim()) { setTodos([...todos,{id:Date.now(),text:newTodo.trim(),done:false}]); setNewTodo(""); }}}>+</button>
        </div>
        {todos.map(t => (
          <div key={t.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={checkBox(t.done)} onClick={() => setTodos(todos.map(td => td.id===t.id ? {...td,done:!td.done} : td))}>{t.done && <span style={{ color:"#fff", fontSize:9 }}>✓</span>}</div>
            <div style={{ flex:1, fontSize:13, color:t.done?C.mute:C.text, textDecoration:t.done?"line-through":"none" }}>{t.text}</div>
            <button onClick={() => setTodos(todos.filter(td => td.id !== t.id))} style={{ background:"none", border:"none", color:C.mute, fontSize:16, cursor:"pointer" }}>×</button>
          </div>
        ))}
        {todos.length === 0 && <div style={{ color:C.mute, fontSize:12, textAlign:"center", padding:12 }}>No tasks yet</div>}
      </div>

      <div style={card}>
        <div style={stTitle}>📦 Supply Stock</div>
        {stock.map(item => {
          const low = item.qty <= item.reorder;
          return (
            <div key={item.id} style={{ padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:13 }}>{item.name}</div>
                  <div style={{ fontSize:10, color:C.sub }}>Reorder at {item.reorder} {item.unit}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ fontSize:18, fontWeight:800, color: low?C.red:C.pink }}>{item.qty}</div>
                  <button onClick={() => setStock(stock.map(s => s.id===item.id ? {...s,qty:Math.max(0,s.qty-1)} : s))} style={{ background:C.pinkLight, border:"none", borderRadius:7, width:26, height:26, fontSize:14, fontWeight:700, color:C.pinkDark, cursor:"pointer" }}>−</button>
                  <button onClick={() => setStock(stock.map(s => s.id===item.id ? {...s,qty:s.qty+1} : s))} style={{ background:C.pinkLight, border:"none", borderRadius:7, width:26, height:26, fontSize:14, fontWeight:700, color:C.pinkDark, cursor:"pointer" }}>+</button>
                </div>
              </div>
              {low && <div style={{ marginTop:6, fontSize:10, color:C.red, fontWeight:600 }}>⚠ Low stock — add to to-do list above</div>}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── REGISTRATION ──────────────────────────────────────────────────
  // ── SUPPORT ───────────────────────────────────────────────────────
  const Support = () => {
    const toggleCpaTopic = (id) => setCpaTopics(cpaTopics.includes(id) ? cpaTopics.filter(t => t!==id) : [...cpaTopics, id]);
    const chip = (sel, color, colorLight) => ({ display:"flex", alignItems:"center", gap:8, padding:"11px 12px", borderRadius:10, cursor:"pointer", background:sel?color:colorLight, border:`1.5px solid ${sel?color:C.border}`, marginBottom:8 });

    const sendSupport = async (payload) => {
      try {
        await fetch('/api/send-support', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            ...payload,
            studioName,
            studioEmail: 'owner@studio.com', // replace with real owner email from auth later
          }),
        });
      } catch(e) {
        console.error('Support send error:', e);
      }
    };

    return (
      <div>
        <TopBar title="Get Help" screen={screen} studioName={studioName}/>
        {!supportSent ? (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <button onClick={() => setSupportTab("cpa")} style={{ flex:1, padding:11, borderRadius:10, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", background:supportTab==="cpa"?C.pink:C.pinkLight, color:supportTab==="cpa"?"#fff":C.pinkDark }}>📊 Business Support</button>
              <button onClick={() => setSupportTab("it")} style={{ flex:1, padding:11, borderRadius:10, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", background:supportTab==="it"?C.blue:C.blueLight, color:supportTab==="it"?"#fff":C.blue }}>🛠 IT Support</button>
            </div>

            {supportTab==="cpa" && (
              <div>
                <div style={{ ...card, background:C.pinkLight }}>
                  <div style={{ fontSize:12, color:C.pinkDark, lineHeight:1.6 }}>💡 We can refer you to a registered professional for registration, bookkeeping, payroll, or tax support.</div>
                </div>
                <div style={stTitle}>What do you need help with?</div>
                {CPA_TOPICS.map(t => (
                  <div key={t.id} onClick={() => toggleCpaTopic(t.id)} style={chip(cpaTopics.includes(t.id), C.pink, C.pinkLight)}>
                    <span>{t.icon}</span><span style={{ fontSize:13, fontWeight:600, color:cpaTopics.includes(t.id)?"#fff":C.text, flex:1 }}>{t.label}</span>
                    {cpaTopics.includes(t.id) && <span style={{ color:"#fff" }}>✓</span>}
                  </div>
                ))}
                <div style={{ margin:"14px 0" }}><label style={lbl}>Additional details (optional)</label><textarea style={{ ...inp, height:70, resize:"none" }} value={cpaMessage} onChange={e => setCpaMessage(e.target.value)}/></div>
                <button style={{ ...btn, opacity:cpaTopics.length?1:0.4 }} onClick={async () => {
                  if (!cpaTopics.length) return;
                  const payload = { type:"cpa", topics:cpaTopics.map(id=>CPA_TOPICS.find(t=>t.id===id).label), message:cpaMessage };
                  setSupportSent(payload);
                  await sendSupport(payload);
                }}>Send Request →</button>
              </div>
            )}

            {supportTab==="it" && (
              <div>
                <div style={{ ...card, background:C.blueLight }}>
                  <div style={{ fontSize:12, color:C.blue, lineHeight:1.6 }}>🛠 Found a bug or something not working? Let us know — usually free if it's our error.</div>
                </div>
                <div style={stTitle}>What's the issue?</div>
                {IT_TOPICS.map(t => (
                  <div key={t.id} onClick={() => setItTopic(t.id)} style={chip(itTopic===t.id, C.blue, C.blueLight)}>
                    <span>{t.icon}</span><span style={{ fontSize:13, fontWeight:600, color:itTopic===t.id?"#fff":C.text, flex:1 }}>{t.label}</span>
                    {itTopic===t.id && <span style={{ color:"#fff" }}>✓</span>}
                  </div>
                ))}
                <div style={{ margin:"14px 0" }}><label style={lbl}>Describe the issue</label><textarea style={{ ...inp, height:80, resize:"none" }} value={itMessage} onChange={e => setItMessage(e.target.value)}/></div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                  <div onClick={() => setItUrgent(!itUrgent)} style={{ width:38, height:22, borderRadius:12, background:itUrgent?C.red:"#E0DADC", position:"relative", cursor:"pointer" }}><div style={{ width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute", top:2, left:itUrgent?18:2, transition:"left 0.2s" }}/></div>
                  <div style={{ fontSize:13, fontWeight:600 }}>This is urgent</div>
                </div>
                <button style={{ ...btn, background:C.blue, opacity:itTopic?1:0.4 }} onClick={async () => {
                  if (!itTopic) return;
                  const payload = { type:"it", topics:[IT_TOPICS.find(t=>t.id===itTopic).label], message:itMessage, urgent:itUrgent };
                  setSupportSent(payload);
                  await sendSupport(payload);
                }}>Send to IT Support →</button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign:"center", paddingTop:20 }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:supportSent.type==="cpa"?C.pinkLight:C.blueLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 16px" }}>✓</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:600, marginBottom:8 }}>Request sent!</div>
            <div style={{ fontSize:13, color:C.sub, marginBottom:20 }}>{supportSent.type==="cpa" ? "We'll connect you with a registered professional within 1–2 business days." : "We'll reply within 1–2 business days."}</div>
            <button style={btn} onClick={() => { setSupportSent(null); setCpaTopics([]); setCpaMessage(""); setItTopic(null); setItMessage(""); setItUrgent(false); }}>Send Another Request</button>
          </div>
        )}
      </div>
    );
  };

  // ── CLIENT BOOKING PAGE ───────────────────────────────────────────
  const BOOKED_SLOTS = {
    "2026-07-01":["09:00","11:00","14:00"],
    "2026-07-02":["10:00","13:00"],
    "2026-07-03":["09:00","10:00","11:00","14:00","15:00","16:00","17:00"],
  };

  const getSlots = (dateStr, durationMins) => {
    const booked = BOOKED_SLOTS[dateStr] || [];
    const slots = [];
    const slotsNeeded = Math.ceil(durationMins / slotLength);
    for (let h = 9; h <= 18 - slotsNeeded; h++) {
      for (let m = 0; m < 60; m += slotLength) {
        if (h === 18 && m > 0) break;
        const time = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
        if (!booked.includes(time)) slots.push(time);
      }
    }
    return slots;
  };

  const getDates = () => {
    const dates = [];
    const today2 = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today2);
      d.setDate(today2.getDate() + i);
      if (d.getDay() !== 0) dates.push(d);
    }
    return dates;
  };

  const ClientBooking = () => {
    const bkDates = getDates();
    const bkSlots = bkDate ? getSlots(bkDate.toISOString().split("T")[0], bkService?.duration||60) : [];

    const s2 = {
      header: { background:`linear-gradient(135deg, ${C.sidebar} 0%, #8C7F73 100%)`, padding:"20px 18px 16px" },
      card2: { background:C.card, borderRadius:12, padding:14, marginBottom:10, boxShadow:"0 1px 4px rgba(42,33,24,0.07)" },
    };

    return (
      <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:C.bg, minHeight:"100vh" }}>
        {/* Header */}
        <div style={s2.header}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <button onClick={() => setScreen("appointments")} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", borderRadius:8, padding:"6px 12px", fontSize:12, cursor:"pointer" }}>← Back</button>
            <div style={{ fontFamily:"'Dancing Script',cursive", fontSize:20, fontWeight:700, color:"#fff" }}>{studioName}</div>
          </div>
          {/* Progress */}
          <div style={{ display:"flex", gap:4 }}>
            {[1,2,3,4].map(n => (
              <div key={n} style={{ flex:1, height:3, borderRadius:3, background: bkStep>=n ? "#fff" : "rgba(255,255,255,0.25)", transition:"all 0.3s" }}/>
            ))}
          </div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Step {Math.min(bkStep,4)} of 4 — {["","Choose Service","Pick Date & Time","Your Details","Confirm"][bkStep]||"Done"}
          </div>
        </div>

        <div style={{ padding:"20px 16px" }}>
          {/* Step 1 — Service */}
          {bkStep===1 && (
            <div>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>Book an appointment</div>
              <div style={{ fontSize:12, color:C.sub, marginBottom:16 }}>Select a service to see available times</div>
              {SERVICES.map(svc => (
                <div key={svc.id} onClick={() => { setBkService(svc); setBkStep(2); }}
                  style={{ ...s2.card2, display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", border:`1.5px solid ${bkService?.id===svc.id?C.pink:C.border}` }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14 }}>{svc.name}</div>
                    <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>⏱ {svc.duration} min</div>
                  </div>
                  <div style={{ fontSize:18, fontWeight:800, color:C.pinkDark }}>${svc.price}</div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2 — Date & Time */}
          {bkStep===2 && (
            <div>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:2 }}>{bkService?.name}</div>
              <div style={{ fontSize:11, color:C.pinkDark, fontWeight:500, marginBottom:14 }}>🕐 All times in Sydney time (AEDT)</div>
              <div style={{ fontSize:11, fontWeight:700, color:C.sub, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>Select a date</div>
              <div style={{ display:"flex", gap:5, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
                {bkDates.map((d,i) => {
                  const ds = d.toISOString().split("T")[0];
                  const avail = getSlots(ds, bkService?.duration||60).length;
                  const sel = bkDate?.toISOString().split("T")[0]===ds;
                  return (
                    <div key={i} onClick={() => avail>0 && (setBkDate(d), setBkSlot(null))}
                      style={{ flexShrink:0, width:50, borderRadius:11, padding:"7px 4px", textAlign:"center", cursor:avail>0?"pointer":"not-allowed",
                        background:sel?C.pink:C.card, border:`1.5px solid ${sel?C.pink:C.border}`, opacity:avail===0?0.35:1 }}>
                      <div style={{ fontSize:8.5, fontWeight:700, color:sel?"rgba(255,255,255,0.7)":C.sub }}>{DAY_NAMES[d.getDay()]}</div>
                      <div style={{ fontSize:15, fontWeight:700, color:sel?"#fff":C.text, margin:"2px 0" }}>{d.getDate()}</div>
                      <div style={{ fontSize:8, color:sel?"rgba(255,255,255,0.6)":C.mute }}>{avail===0?"Full":MONTHS[d.getMonth()]}</div>
                    </div>
                  );
                })}
              </div>
              {bkDate && (
                <>
                  <div style={{ fontSize:11, fontWeight:700, color:C.sub, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>
                    Available times — {DAY_NAMES[bkDate.getDay()]} {bkDate.getDate()} {MONTHS[bkDate.getMonth()]}
                  </div>
                  {bkSlots.length===0
                    ? <div style={{ ...s2.card2, textAlign:"center", padding:20, color:C.sub }}>Fully booked — try another date</div>
                    : <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
                        {bkSlots.map((t,i) => (
                          <div key={i} onClick={() => setBkSlot(t)}
                            style={{ padding:"11px 8px", borderRadius:10, textAlign:"center", cursor:"pointer",
                              background:bkSlot===t?C.pink:C.card, border:`1.5px solid ${bkSlot===t?C.pink:C.border}`,
                              fontSize:13, fontWeight:600, color:bkSlot===t?"#fff":C.text }}>
                            {fmt12(t)}
                          </div>
                        ))}
                      </div>
                  }
                </>
              )}
              <div style={{ display:"flex", gap:8 }}>
                <button style={btnGhost} onClick={() => setBkStep(1)}>← Back</button>
                <button style={{ ...btn, opacity:bkSlot?1:0.4 }} onClick={() => bkSlot && setBkStep(3)}>Continue →</button>
              </div>
            </div>
          )}

          {/* Step 3 — Details */}
          {bkStep===3 && (
            <div>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>Your details</div>
              <div style={{ fontSize:12, color:C.sub, marginBottom:14 }}>We'll send your confirmation here</div>
              <div style={{ ...s2.card2, background:C.pinkLight, marginBottom:16 }}>
                <div style={{ fontWeight:700, fontSize:14 }}>{bkService?.name}</div>
                <div style={{ fontSize:12, color:C.sub, marginTop:2 }}>{bkDate && `${DAY_NAMES[bkDate.getDay()]} ${bkDate.getDate()} ${MONTHS[bkDate.getMonth()]}`} · {bkSlot && fmt12(bkSlot)} AEDT</div>
                <div style={{ fontSize:15, fontWeight:800, color:C.pinkDark, marginTop:6 }}>${bkService?.price}</div>
              </div>
              {[{label:"Full Name *",key:"name",type:"text",ph:"e.g. Sarah Chen"},
                {label:"Email *",key:"email",type:"email",ph:"sarah@email.com"},
                {label:"Phone *",key:"phone",type:"tel",ph:"0412 345 678"},
                {label:"Notes (optional)",key:"note",type:"text",ph:"e.g. allergies, preferences"}].map(f => (
                <div key={f.key} style={{ marginBottom:10 }}>
                  <label style={lbl}>{f.label}</label>
                  <input style={inp} type={f.type} placeholder={f.ph} value={bkForm[f.key]} onChange={e => setBkForm({...bkForm,[f.key]:e.target.value})}/>
                </div>
              ))}
              {requireDeposit && (
                <div style={{ background:C.amberLight, borderRadius:10, padding:"10px 14px", marginBottom:14, border:`1px solid ${C.amber}30` }}>
                  <div style={{ fontSize:11, fontWeight:700, color:C.amber, marginBottom:6 }}>💰 Deposit required — ${depositAmount}</div>
                  <div style={{ fontSize:12, color:C.text, lineHeight:1.6 }}>
                    {bankDetails.accountName && <><strong>Account:</strong> {bankDetails.accountName}<br/></>}
                    {bankDetails.bsb && <><strong>BSB:</strong> {bankDetails.bsb}<br/></>}
                    {bankDetails.accountNumber && <><strong>No:</strong> {bankDetails.accountNumber}<br/></>}
                    {customMessage && <span style={{ fontStyle:"italic", color:C.sub }}>{customMessage}</span>}
                  </div>
                </div>
              )}
              <div style={{ fontSize:11, color:C.mute, marginBottom:14, lineHeight:1.6 }}>By booking you agree to our cancellation policy — please cancel at least 24 hours before your appointment.</div>
              <div style={{ display:"flex", gap:8 }}>
                <button style={btnGhost} onClick={() => setBkStep(2)}>← Back</button>
                <button style={{ ...btn, opacity:bkForm.name&&bkForm.email&&bkForm.phone?1:0.4 }}
                  onClick={() => bkForm.name&&bkForm.email&&bkForm.phone && setBkStep(4)}>Review →</button>
              </div>
            </div>
          )}

          {/* Step 4 — Confirm */}
          {bkStep===4 && (
            <div>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>Confirm your booking</div>
              <div style={{ fontSize:12, color:C.sub, marginBottom:14 }}>Please check everything looks correct</div>
              <div style={s2.card2}>
                {[{label:"Service",value:bkService?.name},{label:"Date",value:bkDate&&`${DAY_NAMES[bkDate.getDay()]} ${bkDate.getDate()} ${MONTHS[bkDate.getMonth()]}`},{label:"Time",value:bkSlot&&`${fmt12(bkSlot)} AEDT`},{label:"Duration",value:`${bkService?.duration} min`},{label:"Price",value:`$${bkService?.price}`}].map((item,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:12, color:C.sub }}>{item.label}</div>
                    <div style={{ fontSize:13, fontWeight:600 }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={s2.card2}>
                {[{label:"Name",value:bkForm.name},{label:"Email",value:bkForm.email},{label:"Phone",value:bkForm.phone}].map((item,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:12, color:C.sub }}>{item.label}</div>
                    <div style={{ fontSize:13, fontWeight:600 }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button style={btnGhost} onClick={() => setBkStep(3)}>← Back</button>
                <button style={btn} onClick={() => setBkStep(5)}>Confirm booking ✓</button>
              </div>
            </div>
          )}

          {/* Step 5 — Done */}
          {bkStep===5 && (
            <div style={{ textAlign:"center", paddingTop:20 }}>
              <div style={{ width:68, height:68, borderRadius:"50%", background:C.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, margin:"0 auto 16px" }}>✓</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:600, marginBottom:8 }}>You're booked!</div>
              <div style={{ fontSize:13, color:C.sub, marginBottom:20, lineHeight:1.6 }}>A confirmation has been sent to<br/><strong style={{ color:C.text }}>{bkForm.email}</strong></div>
              <div style={{ ...s2.card2, textAlign:"left", marginBottom:16 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.sub, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Booking confirmed</div>
                {[{label:"Reference",value:bkRef,accent:true},{label:"Service",value:bkService?.name},{label:"Date & Time",value:`${bkDate?.getDate()} ${bkDate&&MONTHS[bkDate.getMonth()]} · ${bkSlot&&fmt12(bkSlot)} AEDT`}].map((item,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:12, color:C.sub }}>{item.label}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:item.accent?C.pinkDark:C.text }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:C.pinkLight, borderRadius:12, padding:"12px 16px", marginBottom:20, textAlign:"left" }}>
                <div style={{ fontSize:12, color:C.pinkDark, lineHeight:1.7 }}>📧 Confirmation email sent<br/>⏰ Reminder will be sent 24hrs before<br/>📞 Need to cancel? Use your reference above</div>
              </div>
              <button style={btn} onClick={() => { setBkStep(1); setBkService(null); setBkDate(null); setBkSlot(null); setBkForm({name:"",email:"",phone:"",note:""}); }}>Book another appointment</button>
              <button style={{ ...btnGhost, marginTop:10 }} onClick={() => setScreen("appointments")}>← Back to dashboard</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── SCREEN ROUTING ────────────────────────────────────────────────
  if (screen === "dashboard") ScreenContent = Dashboard();
  else if (screen === "appointments") ScreenContent = Appointments();
  else if (screen === "clients") ScreenContent = Clients();
  else if (screen === "finances") ScreenContent = Finances();
  else if (screen === "prices") ScreenContent = Prices();
  else if (screen === "stock") ScreenContent = StockTodo();
  else if (screen === "settings") ScreenContent = Settings();
  else if (screen === "support") ScreenContent = Support();
  else if (screen === "booking") ScreenContent = ClientBooking();
  else ScreenContent = Dashboard();

  return (
      <div style={{ display:"flex", flexDirection:"column", fontFamily:"'Inter',system-ui,sans-serif", background:C.bg, minHeight:"100vh", maxWidth:520, margin:"0 auto" }}>
      {/* Demo banner */}
      <div style={{ background:C.sidebar, padding:"8px 16px", textAlign:"center", flexShrink:0 }}>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.7)", letterSpacing:"0.06em" }}>
          ✦ <strong style={{ color:"#fff" }}>NailDesk Demo</strong> — Sample data only. <a href="https://naildesk.shop" style={{ color:C.pink, textDecoration:"none", fontWeight:600 }}>Get your own →</a>
        </span>
      </div>
      <div style={{ display:"flex", flex:1 }}>
        {screen !== "booking" && <Sidebar screen={screen} setScreen={setScreen} studioName={studioName}/>}
        <div style={{ flex:1, padding: screen==="booking"?"0":"20px 18px", overflowY:"auto" }}>
          {ScreenContent}
        </div>
      </div>
      {/* Demo footer */}
      <div style={{ padding:"10px 16px", textAlign:"center", borderTop:`1px solid ${C.border}`, background:C.card, flexShrink:0 }}>
        <span style={{ fontSize:10, color:C.mute }}>NailDesk Demo · <a href="https://naildesk.shop" style={{ color:C.pinkDark, textDecoration:"none" }}>naildesk.shop</a> · Data resets on refresh</span>
      </div>
    </div>
  );
}
