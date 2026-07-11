import { useState } from "react";

// ── STYLE SYSTEM (matches App.jsx's palette) ──────────────────────
const C = {
  bg:"#FAF8F6", card:"#FFFFFF", border:"#E8E0D8",
  sidebar:"#B8AB9E", text:"#2C2420", sub:"#9C8E84", mute:"#C2B6AC",
  pink:"#C2A28E", pinkLight:"#F4EEE6", pinkDark:"#9C7A62",
  green:"#7C9583", greenLight:"#EEF3EF",
  red:"#CC5C5C", redLight:"#FCEAEA",
  amber:"#C2914F", amberLight:"#FAF1E2",
};

const TIER_LABELS = { basic: "Basic", pro: "Pro", studio: "Studio" };
// Optional add-on: custom app styling. Studio plan already includes this,
// so the option is hidden (and shown as included) for tier=studio.
// Discounted for choosing it now, at signup - full price if added later.
const STYLING_ADDON_PRICE = 99;
const STYLING_ADDON_LATER_PRICE = 149;
const STYLE_PRESETS = [
  { key: "blush_cream", label: "Blush & Cream", swatches: ["#C2A28E", "#FAF8F6", "#2C2420"] },
  { key: "sage_ivory", label: "Sage & Ivory", swatches: ["#8FA68E", "#F5F1E8", "#33392F"] },
  { key: "terracotta_sand", label: "Terracotta & Sand", swatches: ["#C97B5F", "#F0E4D4", "#4A3428"] },
  { key: "charcoal_gold", label: "Charcoal & Gold", swatches: ["#2B2B2B", "#C9A96A", "#F5F5F0"] },
  { key: "monochrome", label: "Monochrome", swatches: ["#1A1A1A", "#FFFFFF", "#6B6B6B"] },
];
const DAYS = [
  { key: "Mon", label: "Monday" }, { key: "Tue", label: "Tuesday" }, { key: "Wed", label: "Wednesday" },
  { key: "Thu", label: "Thursday" }, { key: "Fri", label: "Friday" }, { key: "Sat", label: "Saturday" },
  { key: "Sun", label: "Sunday" },
];
const TIMEZONES = ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Perth", "Asia/Hong_Kong"];

const card = { background: C.card, borderRadius: 14, padding: "18px 20px", marginBottom: 16, border: `1px solid ${C.border}` };
const lbl = { fontSize: 12, color: C.sub, marginBottom: 5, display: "block", fontWeight: 600 };
const inp = { width: "100%", padding: "10px 13px", borderRadius: 9, border: `1.5px solid ${C.border}`, fontSize: 14, background: C.bg, outline: "none", boxSizing: "border-box", fontFamily: "inherit", color: C.text };
const stitle = { fontSize: 11, fontWeight: 700, color: C.mute, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 };
const btn = { background: C.pinkDark, color: "#fff", border: "none", borderRadius: 10, padding: "14px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%" };
const btnGhost = { background: "transparent", color: C.pinkDark, border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" };

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Onboarding() {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const tier = params.get("tier") || "";
  const stripeSessionId = params.get("session_id") || "";

  const [studioName, setStudioName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [timezone, setTimezone] = useState("Australia/Sydney");
  const [instagram, setInstagram] = useState("");

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [wantsStyling, setWantsStyling] = useState(false);
  const [stylePreference, setStylePreference] = useState("");
  const [styleNotes, setStyleNotes] = useState("");

  const [hours, setHours] = useState(
    DAYS.map(d => ({ day: d.key, isOpen: d.key !== "Sun", start: "09:00", end: "18:00" }))
  );

  const [services, setServices] = useState([{ name: "", duration: 60, price: "" }]);

  const [requireDeposit, setRequireDeposit] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankBsb, setBankBsb] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");

  const [specialRequests, setSpecialRequests] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const updateHour = (day, patch) => setHours(hours.map(h => h.day === day ? { ...h, ...patch } : h));
  const updateService = (idx, patch) => setServices(services.map((s, i) => i === idx ? { ...s, ...patch } : s));
  const addService = () => setServices([...services, { name: "", duration: 60, price: "" }]);
  const removeService = (idx) => setServices(services.filter((_, i) => i !== idx));

  const onLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const dataUrl = await readFileAsDataUrl(file);
    setLogoPreview(dataUrl);
  };

  const canSubmit = studioName.trim() && ownerName.trim() && ownerEmail.trim() && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setErrorMsg("");
    try {
      const payload = {
        tier, stripeSessionId,
        studioName, ownerName, ownerEmail, ownerPhone, address, timezone, instagram,
        logoDataUrl: logoPreview || null,
        logoFilename: logoFile ? logoFile.name : null,
        wantsStyling,
        stylePreference: wantsStyling ? (stylePreference || null) : null,
        styleNotes: wantsStyling ? (styleNotes.trim() || null) : null,
        hours,
        services: services.filter(s => s.name.trim()),
        requireDeposit, depositAmount, bankAccountName, bankBsb, bankAccountNumber,
        specialRequests,
      };
      const res = await fetch("/api/onboarding-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch (e) {
      setErrorMsg("Something went wrong sending your details — please try again, or email account@ollieconsult.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ fontFamily: "'Inter',system-ui,sans-serif", background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ maxWidth: 440, textAlign: "center" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 18px" }}>✓</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 600, color: C.text, marginBottom: 10 }}>You're all set!</div>
          <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.7 }}>
            Thanks — we've received your studio details. We'll get {studioName || "your studio"}'s NailDesk app set up and email you the link within 1–2 business days.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter',system-ui,sans-serif", background: C.bg, minHeight: "100vh" }}>
      <div style={{ background: `linear-gradient(135deg, #7A6D63 0%, #9C8E84 100%)`, padding: "28px 20px 22px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Dancing Script',cursive", fontSize: 30, fontWeight: 700, color: "#fff" }}>NailDesk</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 8 }}>
          {tier && TIER_LABELS[tier] ? `Welcome to the ${TIER_LABELS[tier]} plan! ` : ""}Let's set up your studio.
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 18px 60px" }}>

        <div style={card}>
          <div style={stitle}>Business & Contact</div>
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Studio name *</label>
            <input style={inp} value={studioName} onChange={e => setStudioName(e.target.value)} placeholder="e.g. Bloom Nails" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div>
              <label style={lbl}>Your name *</label>
              <input style={inp} value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="e.g. Sarah Chen" />
            </div>
            <div>
              <label style={lbl}>Phone</label>
              <input style={inp} type="tel" value={ownerPhone} onChange={e => setOwnerPhone(e.target.value)} placeholder="0412 345 678" />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Email *</label>
            <input style={inp} type="email" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} placeholder="sarah@email.com" />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={lbl}>Studio address</label>
            <input style={inp} value={address} onChange={e => setAddress(e.target.value)} placeholder="Shop 4, 123 High St, Sydney NSW" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={lbl}>Timezone</label>
              <select style={inp} value={timezone} onChange={e => setTimezone(e.target.value)}>
                {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Instagram</label>
              <input style={inp} value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@bloomnails" />
            </div>
          </div>
        </div>

        <div style={card}>
          <div style={stitle}>Logo</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {logoPreview
              ? <img src={logoPreview} alt="Logo preview" style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", border: `1px solid ${C.border}` }} />
              : <div style={{ width: 64, height: 64, borderRadius: 10, background: C.pinkLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: C.pinkDark, flexShrink: 0 }}>🖼</div>
            }
            <div style={{ flex: 1 }}>
              <input type="file" accept="image/*" onChange={onLogoChange} style={{ fontSize: 13 }} />
              <div style={{ fontSize: 11, color: C.mute, marginTop: 4 }}>PNG or JPG, square works best.</div>
            </div>
          </div>
        </div>

        <div style={card}>
          <div style={stitle}>Custom Style & Colour (optional add-on)</div>
          {tier === "studio" ? (
            <div style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>✓ Included in your Studio plan — no extra charge.</div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div onClick={() => setWantsStyling(!wantsStyling)} style={{ width: 38, height: 22, borderRadius: 12, background: wantsStyling ? C.pinkDark : "#E0DADC", position: "relative", cursor: "pointer", flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: wantsStyling ? 18 : 2, transition: "left 0.15s" }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                  Tailor my app's style & colours (+${STYLING_ADDON_PRICE} AUD <span style={{ textDecoration: "line-through", color: C.mute, fontWeight: 400 }}>${STYLING_ADDON_LATER_PRICE}</span>)
                </div>
              </div>
              <div style={{ fontSize: 11, color: C.mute, marginLeft: 48, marginBottom: wantsStyling ? 12 : 0 }}>
                Sign-up price — adding this later costs ${STYLING_ADDON_LATER_PRICE} AUD instead.
              </div>
              {wantsStyling && (
                <>
                  <div style={{ fontSize: 12, color: C.sub, marginBottom: 10, lineHeight: 1.5 }}>
                    Pick the palette closest to what you're after — we'll follow up with mockups and a payment link once we confirm the details.
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                    {STYLE_PRESETS.map(p => (
                      <div
                        key={p.key}
                        onClick={() => setStylePreference(p.key)}
                        style={{
                          border: `1.5px solid ${stylePreference === p.key ? C.pinkDark : C.border}`,
                          background: stylePreference === p.key ? C.pinkLight : C.bg,
                          borderRadius: 10, padding: "10px 12px", cursor: "pointer",
                          display: "flex", alignItems: "center", gap: 8,
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          {p.swatches.map((c, i) => (
                            <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, marginLeft: i === 0 ? 0 : -6, border: `1.5px solid ${C.border}` }} />
                          ))}
                        </div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text }}>{p.label}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={lbl}>Anything else about the look you want? (optional)</label>
                    <textarea style={{ ...inp, height: 60, resize: "none" }} value={styleNotes} onChange={e => setStyleNotes(e.target.value)} placeholder="e.g. links to inspiration, a specific colour, fonts you like…" />
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div style={card}>
          <div style={stitle}>Opening Hours</div>
          {hours.map(h => (
            <div key={h.day} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
              <div onClick={() => updateHour(h.day, { isOpen: !h.isOpen })} style={{ width: 36, height: 20, borderRadius: 12, background: h.isOpen ? C.pinkDark : "#E0DADC", position: "relative", cursor: "pointer", flexShrink: 0 }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: h.isOpen ? 18 : 2, transition: "left 0.15s" }} />
              </div>
              <div style={{ width: 90, fontSize: 13, fontWeight: 600, color: C.text }}>{DAYS.find(d => d.key === h.day)?.label}</div>
              {h.isOpen ? (
                <div style={{ display: "flex", gap: 6, flex: 1 }}>
                  <input style={{ ...inp, padding: "6px 8px", fontSize: 12 }} type="time" value={h.start} onChange={e => updateHour(h.day, { start: e.target.value })} />
                  <input style={{ ...inp, padding: "6px 8px", fontSize: 12 }} type="time" value={h.end} onChange={e => updateHour(h.day, { end: e.target.value })} />
                </div>
              ) : <div style={{ flex: 1, fontSize: 12, color: C.mute }}>Closed</div>}
            </div>
          ))}
        </div>

        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ ...stitle, marginBottom: 0 }}>Services & Pricing</div>
            <button style={btnGhost} onClick={addService}>+ Add service</button>
          </div>
          {services.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-end" }}>
              <div style={{ flex: 2 }}>
                {i === 0 && <label style={lbl}>Service</label>}
                <input style={inp} value={s.name} onChange={e => updateService(i, { name: e.target.value })} placeholder="e.g. Gel Manicure" />
              </div>
              <div style={{ flex: 1 }}>
                {i === 0 && <label style={lbl}>Mins</label>}
                <input style={inp} type="number" value={s.duration} onChange={e => updateService(i, { duration: e.target.value })} />
              </div>
              <div style={{ flex: 1 }}>
                {i === 0 && <label style={lbl}>Price $</label>}
                <input style={inp} type="number" value={s.price} onChange={e => updateService(i, { price: e.target.value })} placeholder="80" />
              </div>
              {services.length > 1 && (
                <button onClick={() => removeService(i)} style={{ background: "none", border: "none", color: C.mute, fontSize: 18, cursor: "pointer", paddingBottom: 8 }}>×</button>
              )}
            </div>
          ))}
        </div>

        <div style={card}>
          <div style={stitle}>Deposit & Bank Details</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: requireDeposit ? 14 : 0 }}>
            <div onClick={() => setRequireDeposit(!requireDeposit)} style={{ width: 38, height: 22, borderRadius: 12, background: requireDeposit ? C.pinkDark : "#E0DADC", position: "relative", cursor: "pointer" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: requireDeposit ? 18 : 2, transition: "left 0.15s" }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Require a deposit for online bookings</div>
          </div>
          {requireDeposit && (
            <>
              <div style={{ marginBottom: 10 }}>
                <label style={lbl}>Deposit amount ($)</label>
                <input style={inp} type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} placeholder="20" />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={lbl}>Account name</label>
                <input style={inp} value={bankAccountName} onChange={e => setBankAccountName(e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={lbl}>BSB</label>
                  <input style={inp} value={bankBsb} onChange={e => setBankBsb(e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Account number</label>
                  <input style={inp} value={bankAccountNumber} onChange={e => setBankAccountNumber(e.target.value)} />
                </div>
              </div>
            </>
          )}
        </div>

        <div style={card}>
          <div style={stitle}>Anything else?</div>
          <textarea style={{ ...inp, height: 80, resize: "none" }} value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Special requests, questions, or anything we should know before setting things up." />
        </div>

        {errorMsg && (
          <div style={{ background: C.redLight, color: C.red, borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 14 }}>{errorMsg}</div>
        )}

        <button style={{ ...btn, opacity: canSubmit ? 1 : 0.4 }} disabled={!canSubmit} onClick={handleSubmit}>
          {submitting ? "Sending…" : "Submit my details →"}
        </button>
      </div>
    </div>
  );
}
