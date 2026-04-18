// Press page + Footer + Tweaks panel
const { useState: useStateP, useEffect: useEffectP } = React;

function PressPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 24px 80px" }}>
      <SectionHeader kicker="— TRANSMISSIONS" title="PRESS & CONTACT" />
      <div className="font-mono" style={{ color: "var(--bone)", fontSize: 20, maxWidth: 640, marginBottom: 30 }}>
        For press inquiries, beta invites, city launch coordination, or paranormal leads, reach the studio directly.
      </div>

      <div className="grid-responsive-2" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
        <div className="hud-frame" style={{ padding: 24 }}>
          <div className="font-pixel" style={{ fontSize: 11, color: "var(--phos)", letterSpacing: "0.2em", textShadow: "0 0 4px rgba(57,255,122,0.5)", marginBottom: 16 }}>
            ■ DIRECT LINE
          </div>

          <ContactRow icon="✉" label="STUDIO" value="ahmed@appari.sh" href="mailto:ahmed@appari.sh" />
          <ContactRow icon="◉" label="APPARISH" value="appari.sh" href="https://appari.sh" />
          <ContactRow icon="▲" label="PRESS KIT" value="Available on request" />
          <ContactRow icon="✶" label="BETA ACCESS" value="Opens Q2 2026" last />

          <div style={{ marginTop: 24, padding: 14, border: "1px dashed var(--phos-dim)", background: "rgba(57,255,122,0.03)" }}>
            <div className="font-pixel" style={{ fontSize: 9, color: "var(--amber)", letterSpacing: "0.25em", marginBottom: 6 }}>
              ▲ NOTE
            </div>
            <div className="font-mono" style={{ color: "var(--bone)", fontSize: 17, lineHeight: 1.3 }}>
              Journalists covering paranormal, AI gaming, or location-based experiences — we'll send a build, a ghost, and a map of somewhere near you.
            </div>
          </div>
        </div>

        <div className="hud-frame" style={{ padding: 24 }}>
          <div className="font-pixel" style={{ fontSize: 11, color: "var(--phos)", letterSpacing: "0.2em", textShadow: "0 0 4px rgba(57,255,122,0.5)", marginBottom: 16 }}>
            ■ SEND A SIGNAL
          </div>
          <ContactForm />
        </div>
      </div>

      <div className="grid-responsive-3" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <QuickFact label="FOUNDED" value="2025" />
        <QuickFact label="HEADQUARTERS" value="REMOTE · US" />
        <QuickFact label="FIRST TITLE" value="APPARISH (2026)" />
      </div>
    </div>
  );
}

function ContactRow({ icon, label, value, href, last }) {
  const Inner = () => (
    <div style={{
      display: "grid", gridTemplateColumns: "30px 1fr auto", gap: 14, alignItems: "baseline",
      padding: "14px 0",
      borderBottom: last ? "none" : "1px dashed var(--phos-dim)",
    }}>
      <div style={{ color: "var(--amber)", fontSize: 18, textShadow: "0 0 6px rgba(255,176,32,0.5)" }}>{icon}</div>
      <div className="font-mono" style={{ color: "var(--bone-dim)", fontSize: 14, letterSpacing: "0.2em" }}>{label}</div>
      <div className="font-pixel" style={{ fontSize: 12, color: href ? "var(--phos)" : "var(--bone)", letterSpacing: "0.08em", textShadow: href ? "0 0 4px rgba(57,255,122,0.5)" : "none" }}>
        {value}
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <Inner />
    </a>
  ) : <Inner />;
}

function ContactForm() {
  const [sent, setSent] = useStateP(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  if (sent) {
    return (
      <div className="font-mono" style={{ color: "var(--phos)", fontSize: 18, lineHeight: 1.4 }}>
        &gt; TRANSMISSION RECEIVED.<br/>
        &gt; A GHOST WILL BE IN TOUCH.<span className="cursor"/>
      </div>
    );
  }
  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <RetroInput label="NAME" />
      <RetroInput label="EMAIL" type="email" />
      <RetroInput label="CITY" placeholder="The one we should haunt" />
      <RetroInput label="MESSAGE" textarea />
      <button type="submit" className="btn-retro" style={{ alignSelf: "flex-start" }}>
        ▶ TRANSMIT
      </button>
    </form>
  );
}

function RetroInput({ label, textarea, type = "text", placeholder }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span className="font-pixel" style={{ fontSize: 9, color: "var(--bone-dim)", letterSpacing: "0.25em" }}>
        ▸ {label}
      </span>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={3}
          style={{
            background: "#050806",
            color: "var(--phos)",
            border: "1px solid var(--phos-dim)",
            padding: 10,
            fontFamily: "'VT323', monospace",
            fontSize: 18,
            outline: "none",
            resize: "vertical",
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--phos)"}
          onBlur={(e) => e.target.style.borderColor = "var(--phos-dim)"}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          style={{
            background: "#050806",
            color: "var(--phos)",
            border: "1px solid var(--phos-dim)",
            padding: 10,
            fontFamily: "'VT323', monospace",
            fontSize: 18,
            outline: "none",
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--phos)"}
          onBlur={(e) => e.target.style.borderColor = "var(--phos-dim)"}
        />
      )}
    </label>
  );
}

function QuickFact({ label, value }) {
  return (
    <div className="hud-frame" style={{ padding: 16 }}>
      <div className="font-mono" style={{ color: "var(--bone-dim)", fontSize: 13, letterSpacing: "0.2em" }}>{label}</div>
      <div className="font-pixel" style={{ fontSize: 12, color: "var(--phos)", letterSpacing: "0.1em", marginTop: 8, textShadow: "0 0 4px rgba(57,255,122,0.5)" }}>
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */
function Footer() {
  return (
    <footer style={{
      marginTop: 40, padding: "30px 24px 40px",
      borderTop: "2px solid var(--phos-dim)",
      background: "#050806",
    }}>
      <div className="footer-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <VeilLogo size={30} />
          <div>
            <div className="font-pixel" style={{ fontSize: 12, color: "var(--phos)", letterSpacing: "0.15em", textShadow: "0 0 5px rgba(57,255,122,0.5)" }}>
              VEIL LABS
            </div>
            <div className="font-mono" style={{ fontSize: 13, color: "var(--bone-dim)", letterSpacing: "0.2em", marginTop: 2 }}>
              WE MAKE GAMES THAT HAUNT.
            </div>
          </div>
        </div>
        <div className="font-mono" style={{ fontSize: 14, color: "var(--bone-dim)", textAlign: "center", letterSpacing: "0.15em" }}>
          © 2026 VEIL LABS INC · VL-ROM CATALOGUE · LICENSED BY THE OTHER SIDE
        </div>
        <div className="font-mono" style={{ fontSize: 14, color: "var(--phos)", letterSpacing: "0.2em", textAlign: "right" }}>
          <span className="cursor">▊</span> ONLINE
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   TWEAKS PANEL
========================================================= */
function TweaksPanel({ state, setState, visible }) {
  if (!visible) return null;
  const colorways = ["ghost-green", "atomic-purple", "blood-red", "classic-gray", "bone"];
  return (
    <div style={{
      position: "fixed", bottom: 16, right: 16, zIndex: 10000,
      width: 280, background: "#050806",
      border: "2px solid var(--phos)",
      boxShadow: "0 0 20px rgba(57,255,122,0.3)",
      padding: 16,
      fontFamily: "'VT323', monospace",
    }}>
      <div className="font-pixel" style={{ fontSize: 11, color: "var(--phos)", letterSpacing: "0.2em", marginBottom: 14, textShadow: "0 0 5px rgba(57,255,122,0.5)", borderBottom: "1px dashed var(--phos-dim)", paddingBottom: 10 }}>
        ▣ TWEAKS
      </div>

      <TweakGroup label="CARTRIDGE COLORWAY">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {colorways.map((c) => (
            <button key={c}
              onClick={() => setState({ ...state, colorway: c })}
              className="btn-ghost"
              style={{
                fontSize: 11, padding: "4px 8px",
                borderColor: state.colorway === c ? "var(--phos)" : "var(--bone-dim)",
                color: state.colorway === c ? "var(--phos)" : "var(--bone)",
              }}
            >{c}</button>
          ))}
        </div>
      </TweakGroup>

      <TweakGroup label="CRT INTENSITY">
        <input type="range" min="0" max="1" step="0.05" value={state.crtIntensity}
          onChange={(e) => setState({ ...state, crtIntensity: parseFloat(e.target.value) })}
          style={{ width: "100%", accentColor: "var(--phos)" }}
        />
        <div className="font-mono" style={{ fontSize: 13, color: "var(--bone-dim)", letterSpacing: "0.2em" }}>
          {Math.round(state.crtIntensity * 100)}%
        </div>
      </TweakGroup>

      <TweakGroup label="SCANLINES">
        <input type="range" min="0" max="0.6" step="0.02" value={state.scanlineOpacity}
          onChange={(e) => setState({ ...state, scanlineOpacity: parseFloat(e.target.value) })}
          style={{ width: "100%", accentColor: "var(--phos)" }}
        />
      </TweakGroup>

      <TweakGroup label="PHOSPHOR HUE">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            ["GREEN", "#39ff7a", "#1a4a2a"],
            ["AMBER", "#ffb020", "#5a3e0a"],
            ["BLUE",  "#5ac8ff", "#1a3a55"],
            ["RED",   "#ff5a6a", "#5a1a22"],
          ].map(([name, hex, dim]) => (
            <button key={name}
              onClick={() => setState({ ...state, phosphor: hex, phosphorDim: dim })}
              className="btn-ghost"
              style={{
                fontSize: 11, padding: "4px 8px",
                borderColor: state.phosphor === hex ? hex : "var(--bone-dim)",
                color: state.phosphor === hex ? hex : "var(--bone)",
              }}
            >{name}</button>
          ))}
        </div>
      </TweakGroup>

      <TweakGroup label="BOOT SEQUENCE">
        <button className="btn-ghost" style={{ fontSize: 11 }}
          onClick={() => setState({ ...state, replayBoot: (state.replayBoot || 0) + 1, bootSkip: false })}
        >▶ REPLAY BOOT</button>
      </TweakGroup>

      <div className="font-mono" style={{ fontSize: 11, color: "var(--bone-dim)", letterSpacing: "0.15em", marginTop: 10, borderTop: "1px dashed var(--phos-dim)", paddingTop: 8 }}>
        changes saved automatically
      </div>
    </div>
  );
}

function TweakGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div className="font-pixel" style={{ fontSize: 8, color: "var(--bone-dim)", letterSpacing: "0.25em", marginBottom: 8 }}>
        ▸ {label}
      </div>
      {children}
    </div>
  );
}

window.PressPage = PressPage;
window.Footer = Footer;
window.TweaksPanel = TweaksPanel;
