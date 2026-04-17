// Page sections for the Veil Labs site
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* =========================================================
   NAV
========================================================= */
function Nav({ page, setPage }) {
  const items = [
    ["HOME", "home"],
    ["CARTRIDGES", "cartridges"],
    ["APPARISH", "apparish"],
    ["PRESS", "press"],
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: "linear-gradient(180deg, #050806 0%, #050806 80%, rgba(5,8,6,0.6) 100%)",
      borderBottom: "2px solid var(--phos-dim)",
      padding: "10px 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      backdropFilter: "blur(4px)",
    }}>
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <VeilLogo size={26} />
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 12, color: "var(--phos)", letterSpacing: "0.15em", textShadow: "0 0 6px rgba(57,255,122,0.5)" }}>
          VEIL LABS
        </div>
      </button>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {items.map(([label, key]) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            className="font-pixel"
            style={{
              background: page === key ? "var(--phos-dim)" : "transparent",
              color: page === key ? "var(--phos)" : "var(--bone)",
              border: page === key ? "1px solid var(--phos)" : "1px solid transparent",
              padding: "8px 12px",
              fontSize: 10,
              letterSpacing: "0.1em",
              cursor: "pointer",
              fontFamily: "'Press Start 2P', monospace",
              textShadow: page === key ? "0 0 6px rgba(57,255,122,0.6)" : "none",
            }}
          >
            {page === key ? "▶ " : "  "}{label}
          </button>
        ))}
      </div>
      <div className="font-mono" style={{ color: "var(--phos)", fontSize: 14, letterSpacing: "0.2em", opacity: 0.75 }}>
        <span className="cursor">PLAYER 1</span>
      </div>
    </nav>
  );
}

function VeilLogo({ size = 24, color = "var(--phos)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ filter: "drop-shadow(0 0 4px rgba(57,255,122,0.6))" }}>
      {/* Stylized V + moon glyph */}
      <polygon points="4,6 10,6 16,22 22,6 28,6 19,28 13,28" fill={color} />
      <circle cx="16" cy="14" r="3" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="17" cy="13" r="1.5" fill="#050806" />
    </svg>
  );
}

/* =========================================================
   HOME
========================================================= */
function HomePage({ setPage, colorway }) {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 24px 80px" }}>
      <Hero setPage={setPage} colorway={colorway} />
      <MissionStrip />
      <ShelfPreview setPage={setPage} colorway={colorway} />
      <PlayerOneDialogue />
    </div>
  );
}

function Hero({ setPage, colorway }) {
  const [pressed, setPressed] = useStateS(false);
  useEffectS(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") { setPressed(true); setTimeout(() => setPage("apparish"), 400); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{
      position: "relative",
      border: "2px solid var(--phos-dim)",
      padding: "30px 20px 40px",
      background: "radial-gradient(ellipse at 50% 30%, #0f1f16 0%, #050806 65%)",
      overflow: "hidden",
    }}>
      {/* corner brackets */}
      <CornerBrackets />
      {/* bg moon */}
      <div style={{ position: "absolute", top: 40, right: 60, width: 220, height: 220, borderRadius: "50%",
        background: "radial-gradient(circle at 35% 30%, #1a3a25 0%, #0a1a10 60%, transparent 100%)",
        boxShadow: "0 0 60px rgba(57,255,122,0.15)",
        opacity: 0.7,
        pointerEvents: "none",
      }} />
      {/* bg grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(57,255,122,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,122,0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 30, alignItems: "center", position: "relative", zIndex: 1 }}>
        <div>
          <div className="font-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: "0.3em", marginBottom: 18 }}>
            ▲ VEIL LABS · EST. 2025
          </div>
          <h1 className="font-heavy" style={{
            fontSize: "clamp(56px, 9vw, 128px)",
            lineHeight: 0.92,
            margin: 0,
            color: "var(--phos)",
            textShadow: "0 0 14px rgba(57,255,122,0.7), 0 4px 0 #0a1a10",
            letterSpacing: "0.02em",
          }}>
            WE MAKE<br/>GAMES THAT<br/>SLAP.
          </h1>
          <div className="font-mono" style={{ fontSize: 22, color: "var(--bone)", marginTop: 20, maxWidth: 540, lineHeight: 1.25 }}>
            Veil Labs is a studio building immersive, AI-native games — where every character remembers you and the world you play in is the one outside your window.
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <button
              className="btn-retro"
              onClick={() => { setPressed(true); setTimeout(() => setPage("apparish"), 300); }}
              style={pressed ? { transform: "translate(1px,1px)" } : {}}
            >
              ▶ PRESS START
            </button>
            <button className="btn-retro" onClick={() => setPage("cartridges")} style={{ color: "var(--bone)", borderColor: "var(--bone-dim)" }}>
              ◉ VIEW CARTRIDGES
            </button>
          </div>
          <div className="font-mono" style={{ marginTop: 20, fontSize: 16, color: "var(--bone-dim)", letterSpacing: "0.1em" }}>
            PRESS [ENTER] / [SPACE] TO BEGIN<span className="cursor"/>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="float">
            <Cartridge colorway={colorway} size={0.95} />
          </div>
        </div>
      </div>

      {/* HUD strip */}
      <div style={{
        marginTop: 30,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px dashed var(--phos-dim)",
        paddingTop: 14,
        fontFamily: "'VT323', monospace",
        fontSize: 16,
      }}>
        <HudStat label="TITLES" value="01" />
        <HudStat label="STATUS" value="SHIPPING" flash />
        <HudStat label="SIGNAL" value="▊▊▊▊▊▊▁▁" />
        <HudStat label="YEAR" value="2026" />
      </div>
    </div>
  );
}

function HudStat({ label, value, flash }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ color: "var(--bone-dim)", fontSize: 12, letterSpacing: "0.2em" }}>{label}</span>
      <span className={flash ? "" : ""} style={{
        color: "var(--phos)", textShadow: "0 0 4px rgba(57,255,122,0.5)",
        fontSize: 18, letterSpacing: "0.1em",
        animation: flash ? "ghost-shimmer 1.4s ease-in-out infinite" : "none",
      }}>
        {value}
      </span>
    </div>
  );
}

function CornerBrackets() {
  const B = ({ style }) => <div style={{ position: "absolute", width: 14, height: 14, borderColor: "var(--phos)", borderStyle: "solid", borderWidth: 0, ...style }} />;
  return (
    <>
      <B style={{ top: 6, left: 6, borderTopWidth: 2, borderLeftWidth: 2 }} />
      <B style={{ top: 6, right: 6, borderTopWidth: 2, borderRightWidth: 2 }} />
      <B style={{ bottom: 6, left: 6, borderBottomWidth: 2, borderLeftWidth: 2 }} />
      <B style={{ bottom: 6, right: 6, borderBottomWidth: 2, borderRightWidth: 2 }} />
    </>
  );
}

/* =========================================================
   MISSION
========================================================= */
function MissionStrip() {
  return (
    <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
      {[
        {
          kicker: "01 / MISSION",
          title: "BUILD WORLDS THAT REACH BACK",
          body: "We build games where the characters know you're there. Every NPC has memory, voice, and agency. You leave a mark; they keep score.",
        },
        {
          kicker: "02 / METHOD",
          title: "AI ON-DEVICE. ALWAYS.",
          body: "Ghost generation, voice, imagery, and story writing run locally on Apple's neural engine. No per-call costs. No server lag. Real autonomy at scale.",
        },
        {
          kicker: "03 / CANON",
          title: "THE REAL WORLD IS THE LEVEL",
          body: "Our games use real geography, real folklore, real history. Your neighborhood is the map. The haunted house down the street is a boss fight.",
        },
      ].map((card, i) => (
        <div key={i} className="hud-frame" style={{ padding: 18, minHeight: 200, position: "relative" }}>
          <div className="font-pixel" style={{ fontSize: 9, color: "var(--amber)", letterSpacing: "0.25em", marginBottom: 12 }}>
            {card.kicker}
          </div>
          <div className="font-pixel" style={{ fontSize: 13, color: "var(--phos)", letterSpacing: "0.06em", lineHeight: 1.35, marginBottom: 12, textShadow: "0 0 5px rgba(57,255,122,0.5)" }}>
            {card.title}
          </div>
          <div className="font-mono" style={{ color: "var(--bone)", fontSize: 18, lineHeight: 1.3 }}>
            {card.body}
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   SHELF PREVIEW
========================================================= */
function ShelfPreview({ setPage, colorway }) {
  return (
    <div style={{ marginTop: 70 }}>
      <SectionHeader kicker="— LIBRARY" title="THE CARTRIDGE SHELF" />
      <div style={{ fontFamily: "'VT323', monospace", color: "var(--bone)", fontSize: 20, maxWidth: 620, marginBottom: 28 }}>
        Each Veil Labs game ships as a cartridge. One on the shelf, more in development. Click to inspect.
      </div>
      <Shelf setPage={setPage} colorway={colorway} preview />
    </div>
  );
}

function SectionHeader({ kicker, title, align = "left" }) {
  return (
    <div style={{ textAlign: align, marginBottom: 10 }}>
      <div className="font-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: "0.3em", marginBottom: 10 }}>
        {kicker}
      </div>
      <h2 className="font-heavy" style={{
        fontSize: "clamp(36px, 5vw, 64px)", margin: 0,
        color: "var(--phos)", textShadow: "0 0 10px rgba(57,255,122,0.5), 0 3px 0 #0a1a10",
        letterSpacing: "0.03em",
      }}>
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   SHELF (cartridges page)
========================================================= */
function Shelf({ setPage, colorway, preview = false }) {
  const slots = [
    { type: "cart", label: "APPARISH", subtitle: "HAUNTED REALITY", status: "AVAILABLE", code: "VL-001", colorway, year: "2026" },
    { type: "empty", label: "UNTITLED", subtitle: "CLASSIFIED", status: "DEVELOPMENT", code: "VL-002", year: "2027" },
    { type: "empty", label: "UNTITLED", subtitle: "CLASSIFIED", status: "CONCEPT", code: "VL-003", year: "20XX" },
  ];
  if (preview) slots.length = 3;

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        border: "2px solid var(--phos-dim)",
        background: "linear-gradient(180deg, #0a1512 0%, #050806 100%)",
        padding: "30px 24px 14px",
        position: "relative",
      }}>
        <CornerBrackets />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "end" }}>
          {slots.map((s, i) => (
            <SlotItem key={i} slot={s} onClick={s.type === "cart" ? () => setPage("apparish") : null} />
          ))}
        </div>
        {/* wood-like shelf base */}
        <div style={{
          marginTop: 22, height: 18,
          background: "repeating-linear-gradient(90deg, #1a2a20 0 4px, #0a1510 4px 8px)",
          borderTop: "2px solid var(--phos-dim)",
          borderBottom: "2px solid #000",
          boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
        }} />
        <div style={{
          fontFamily: "'VT323', monospace", fontSize: 14, color: "var(--bone-dim)",
          textAlign: "center", marginTop: 10, letterSpacing: "0.2em",
        }}>
          — VEIL LABS CATALOGUE · 01 OF 01 SHIPPING ·  03 SLOTS TOTAL —
        </div>
      </div>
    </div>
  );
}

function SlotItem({ slot, onClick }) {
  const [hover, setHover] = useStateS(false);
  if (slot.type === "empty") {
    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        }}
      >
        <div style={{
          width: 220, height: 295,
          border: "2px dashed var(--phos-dim)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 8, color: "var(--bone-dim)",
          background: "rgba(57,255,122,0.02)",
        }}>
          <div style={{ fontSize: 42, opacity: 0.25 }}>▒</div>
          <div className="font-pixel" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--amber)", opacity: 0.8 }}>
            {slot.status}
          </div>
          <div className="font-mono" style={{ fontSize: 14, letterSpacing: "0.2em", opacity: 0.6 }}>
            {slot.code}
          </div>
          <div className="font-mono" style={{ fontSize: 12, opacity: 0.5, maxWidth: 160, textAlign: "center", lineHeight: 1.2, marginTop: 4 }}>
            ENCRYPTED<span className="cursor"/>
          </div>
        </div>
        <CartCaption slot={slot} dimmed />
      </div>
    );
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, cursor: onClick ? "pointer" : "default" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div style={{ transform: hover ? "translateY(-8px)" : "none", transition: "transform 0.25s" }}>
        <Cartridge colorway={slot.colorway || "ghost-green"} size={0.92} flippable={false} label={slot.label} subtitle={slot.subtitle} />
      </div>
      <CartCaption slot={slot} />
    </div>
  );
}

function CartCaption({ slot, dimmed }) {
  const color = dimmed ? "var(--bone-dim)" : "var(--phos)";
  return (
    <div style={{ textAlign: "center" }}>
      <div className="font-pixel" style={{ fontSize: 10, color, letterSpacing: "0.15em", textShadow: dimmed ? "none" : "0 0 4px rgba(57,255,122,0.5)" }}>
        {slot.label}
      </div>
      <div className="font-mono" style={{ fontSize: 14, color: "var(--bone-dim)", letterSpacing: "0.2em", marginTop: 4 }}>
        {slot.code} · {slot.year}
      </div>
      <div className="font-mono" style={{
        fontSize: 12, marginTop: 6,
        color: slot.status === "AVAILABLE" ? "var(--phos)" : "var(--amber)",
        letterSpacing: "0.2em",
        border: "1px solid currentColor",
        display: "inline-block", padding: "2px 8px",
      }}>
        {slot.status}
      </div>
    </div>
  );
}

/* =========================================================
   PLAYER 1 DIALOGUE
========================================================= */
function PlayerOneDialogue() {
  return (
    <div style={{ marginTop: 70 }}>
      <div className="hud-frame" style={{ padding: "22px 24px", display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "center" }}>
        <div style={{
          width: 72, height: 72, border: "2px solid var(--phos)",
          background: "#0a1510",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Press Start 2P', monospace", fontSize: 20, color: "var(--phos)",
          textShadow: "0 0 6px rgba(57,255,122,0.6)",
        }}>VL</div>
        <div>
          <div className="font-pixel" style={{ fontSize: 11, color: "var(--amber)", letterSpacing: "0.2em", marginBottom: 6 }}>
            ◆ TRANSMISSION FROM THE STUDIO
          </div>
          <div className="font-mono" style={{ fontSize: 20, color: "var(--bone)", lineHeight: 1.3 }}>
            "We make games that reach out of the screen. Characters with memory. Worlds that use the one you already live in. Experiences you carry with you after you put the phone down."
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CARTRIDGES PAGE
========================================================= */
function CartridgesPage({ setPage, colorway }) {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 24px 80px" }}>
      <SectionHeader kicker="— CATALOGUE" title="CARTRIDGES" />
      <div className="font-mono" style={{ color: "var(--bone)", fontSize: 20, maxWidth: 720, marginBottom: 30 }}>
        Each Veil Labs game is released as a cartridge. One is shipping. More are in the vault. Click a cartridge to learn more — hover to tilt, click the shipped cart to flip the back.
      </div>
      <Shelf setPage={setPage} colorway={colorway} />
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <RomSpec title="HARDWARE" rows={[
          ["PLATFORM", "iOS · iPadOS"],
          ["NEURAL", "APPLE SILICON"],
          ["STORAGE", "ON-DEVICE"],
          ["NETWORK", "OPTIONAL"],
        ]} />
        <RomSpec title="CARTRIDGE SPEC" rows={[
          ["FORMAT", "VL-ROM / 64MBit"],
          ["REGION", "WORLDWIDE"],
          ["SAVE DATA", "PERSISTENT"],
          ["MULTIPLAYER", "ASYNC · STEAL"],
        ]} />
      </div>
    </div>
  );
}

function RomSpec({ title, rows }) {
  return (
    <div className="hud-frame" style={{ padding: 18 }}>
      <div className="font-pixel" style={{ fontSize: 11, color: "var(--phos)", letterSpacing: "0.2em", marginBottom: 14 }}>
        ■ {title}
      </div>
      <table style={{ width: "100%", fontFamily: "'VT323', monospace", fontSize: 18, borderCollapse: "collapse" }}>
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={i} style={{ borderBottom: "1px dashed var(--phos-dim)" }}>
              <td style={{ color: "var(--bone-dim)", padding: "6px 0", letterSpacing: "0.15em" }}>{k}</td>
              <td style={{ color: "var(--phos)", textAlign: "right", padding: "6px 0", letterSpacing: "0.1em" }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

window.Nav = Nav;
window.HomePage = HomePage;
window.CartridgesPage = CartridgesPage;
window.VeilLogo = VeilLogo;
window.SectionHeader = SectionHeader;
window.CornerBrackets = CornerBrackets;
