// Apparish deep-dive page
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

function ApparishPage({ colorway }) {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 24px 80px" }}>
      <ApparishHero colorway={colorway} />
      <CoreLoop />
      <GhostCards />
      <GameFeatures />
      <CityMap />
      <StorySection />
      <ApparishSpecs />
    </div>
  );
}

function ApparishHero({ colorway }) {
  return (
    <div style={{
      position: "relative",
      border: "2px solid var(--phos-dim)",
      padding: "30px 24px 36px",
      overflow: "hidden",
      background: "radial-gradient(ellipse at 80% 20%, #1a3a25 0%, #050806 70%)",
    }}>
      <CornerBrackets />
      {/* scanline sweep */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, transparent 0%, rgba(57,255,122,0.08) 2%, transparent 4%)",
        animation: "scan-sweep 6s linear infinite",
      }} />

      <div className="grid-responsive-hero" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 1fr)", gap: 30, alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ minWidth: 0 }}>
          <div className="font-pixel" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: "0.3em", marginBottom: 14 }}>
            ▲ VL-001 · NOW LOADING
          </div>
          <div style={{
            fontFamily: "'Monoton', 'Press Start 2P', monospace",
            fontSize: "clamp(40px, 6.5vw, 92px)",
            lineHeight: 0.95,
            color: "var(--phos)",
            textShadow: "0 0 18px rgba(57,255,122,0.7), 0 5px 0 #0a1a10",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }} className="apparish-title">
            APPARISH
          </div>
          <div className="font-pixel" style={{ fontSize: 12, color: "var(--phos)", letterSpacing: "0.25em", marginTop: 8, opacity: 0.85 }}>
            SEE WHAT OTHERS DON'T.
          </div>
          <div className="font-mono" style={{ fontSize: 22, color: "var(--bone)", marginTop: 24, maxWidth: 560, lineHeight: 1.3 }}>
            A paranormal reality game. Explore real haunted places on a live geolocation map and uncover persistent AI-generated spirits tied to local history and folklore.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <a href="https://appari.sh" target="_blank" rel="noreferrer" className="btn-retro" style={{ textDecoration: "none", display: "inline-block" }}>
              ▶ VISIT APPARI.SH
            </a>
            <button className="btn-retro" style={{ color: "var(--bone)", borderColor: "var(--bone-dim)" }}>
              ◉ JOIN BETA
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: 0 }}>
          <div className="float cart-scale-mobile" style={{ flexShrink: 0 }}>
            <Cartridge colorway={colorway} size={0.9} />
          </div>
        </div>
      </div>

      {/* HP/MP bars reframed as game meta */}
      <div className="grid-responsive-4" style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, borderTop: "1px dashed var(--phos-dim)", paddingTop: 16 }}>
        <MetaBar label="GENRE" value="PARANORMAL · GEOLOC" />
        <MetaBar label="MODE" value="SOLO · ASYNC PVP" />
        <MetaBar label="PLATFORM" value="iOS · 2026" />
        <MetaBar label="STATUS" value="BETA · MARCH" flash />
      </div>
    </div>
  );
}

function MetaBar({ label, value, flash }) {
  return (
    <div>
      <div className="font-mono" style={{ color: "var(--bone-dim)", fontSize: 13, letterSpacing: "0.2em" }}>{label}</div>
      <div className="font-pixel" style={{
        color: "var(--phos)", fontSize: 11, marginTop: 4, letterSpacing: "0.1em",
        textShadow: "0 0 4px rgba(57,255,122,0.5)",
        animation: flash ? "ghost-shimmer 1.4s ease-in-out infinite" : "none",
      }}>{value}</div>
    </div>
  );
}

/* =========================================================
   CORE LOOP
========================================================= */
function CoreLoop() {
  const steps = [
    { n: "01", label: "DISCOVER", body: "A live map of real haunted places. History pings you when you're close." },
    { n: "02", label: "CAPTURE", body: "Spirits surface. Talk to them with AI voice. Their mood is shifting." },
    { n: "03", label: "PROGRESS", body: "Every ghost is persistent. They remember how you treated them." },
    { n: "04", label: "REPEAT", body: "Neglect them and they escape. Other players can steal them. Daily events rewrite the map." },
  ];
  return (
    <div style={{ marginTop: 60 }}>
      <SectionHeader kicker="— CORE LOOP" title="HOW TO PLAY" />
      <div className="grid-responsive-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 }}>
        {steps.map((s, i) => (
          <div key={i} className="hud-frame" style={{ padding: 18, position: "relative", minHeight: 180 }}>
            <div className="font-heavy" style={{ fontSize: 56, color: "var(--phos-dim)", lineHeight: 1, position: "absolute", top: 10, right: 14, opacity: 0.7 }}>
              {s.n}
            </div>
            <div className="font-pixel" style={{ fontSize: 14, color: "var(--phos)", letterSpacing: "0.15em", marginTop: 40, marginBottom: 12, textShadow: "0 0 5px rgba(57,255,122,0.5)" }}>
              {s.label}
            </div>
            <div className="font-mono" style={{ color: "var(--bone)", fontSize: 18, lineHeight: 1.3 }}>
              {s.body}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)",
                color: "var(--phos)", fontFamily: "'Press Start 2P', monospace", fontSize: 14, zIndex: 2,
                textShadow: "0 0 6px rgba(57,255,122,0.6)",
              }} className="step-arrow">▶</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   GHOST CARDS — pokedex style
========================================================= */
function GhostCards() {
  const ghosts = [
    { id: "001", name: "THE BELL-KEEPER", loc: "NEW ORLEANS, LA", mood: "RESTLESS", trait: "Tolls at 3am. Will tell you who rang last." },
    { id: "014", name: "ROOM-412 GUEST", loc: "CHICAGO, IL", mood: "ATTACHED", trait: "Remembers every visitor. Prefers returnees." },
    { id: "027", name: "FOG-WALKER", loc: "SAN FRANCISCO, CA", mood: "GRIEVING", trait: "Trades secrets for news from the living." },
  ];
  return (
    <div style={{ marginTop: 70 }}>
      <SectionHeader kicker="— SPECIMENS" title="THE CAST OF THE DEAD" />
      <div className="font-mono" style={{ color: "var(--bone)", fontSize: 20, maxWidth: 640, marginBottom: 22 }}>
        Every ghost is a persistent character. They remember you, react to how you treat them, and their mood shifts over time.
      </div>
      <div className="grid-responsive-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {ghosts.map((g, i) => <GhostCard key={i} ghost={g} idx={i} />)}
      </div>
    </div>
  );
}

function GhostCard({ ghost, idx }) {
  const tones = ["#39ff7a", "#ffb020", "#e23a4a"];
  const tone = tones[idx % 3];
  return (
    <div style={{
      border: `2px solid ${tone}55`,
      background: "linear-gradient(180deg, #0a140e 0%, #050806 100%)",
      padding: 16,
      position: "relative",
      minHeight: 320,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span className="font-pixel" style={{ fontSize: 10, color: tone, letterSpacing: "0.15em" }}>
          № {ghost.id}
        </span>
        <span className="font-pixel" style={{ fontSize: 9, color: "var(--bone-dim)", letterSpacing: "0.15em" }}>
          {ghost.mood}
        </span>
      </div>
      {/* portrait area */}
      <div style={{
        aspectRatio: "1 / 1", width: "100%",
        background: `radial-gradient(ellipse at 50% 40%, ${tone}22 0%, #0a140e 65%)`,
        border: `1px solid ${tone}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <svg viewBox="0 0 100 100" width="75%" height="75%">
          <path
            d="M28 46 Q28 22 50 22 Q72 22 72 46 L72 78 Q69 73 64 78 Q59 82 54 78 Q49 73 44 78 Q39 82 34 78 Q30 73 28 78 Z"
            fill="none" stroke={tone} strokeWidth="1.4" opacity="0.9"
          />
          <ellipse cx="41" cy="46" rx="3" ry="4" fill={tone}/>
          <ellipse cx="59" cy="46" rx="3" ry="4" fill={tone}/>
          <path d="M42 60 Q50 55 58 60" stroke={tone} strokeWidth="1.2" fill="none" opacity="0.8"/>
        </svg>
        {/* scan lines */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)",
          pointerEvents: "none",
        }}/>
        {/* corner text */}
        <div style={{ position: "absolute", top: 6, left: 6, fontFamily: "'VT323', monospace", fontSize: 10, color: tone, letterSpacing: "0.15em", opacity: 0.8 }}>
          REC ●
        </div>
      </div>
      <div className="font-pixel" style={{ fontSize: 12, color: "var(--phos)", letterSpacing: "0.08em", marginTop: 14, textShadow: "0 0 4px rgba(57,255,122,0.5)" }}>
        {ghost.name}
      </div>
      <div className="font-mono" style={{ color: "var(--bone-dim)", fontSize: 14, letterSpacing: "0.15em", marginTop: 4 }}>
        ⌖ {ghost.loc}
      </div>
      <div className="font-mono" style={{ color: "var(--bone)", fontSize: 16, marginTop: 10, lineHeight: 1.3, flex: 1 }}>
        "{ghost.trait}"
      </div>
      {/* affinity bar */}
      <div style={{ marginTop: 12 }}>
        <div className="font-mono" style={{ fontSize: 11, color: "var(--bone-dim)", letterSpacing: "0.2em", marginBottom: 3 }}>
          AFFINITY
        </div>
        <div style={{ height: 8, background: "#0a1a10", border: "1px solid var(--phos-dim)", position: "relative" }}>
          <div style={{
            width: `${40 + idx * 20}%`, height: "100%",
            background: `repeating-linear-gradient(90deg, ${tone} 0 6px, ${tone}99 6px 10px)`,
            boxShadow: `0 0 8px ${tone}99`,
          }}/>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FEATURES
========================================================= */
function GameFeatures() {
  const features = [
    { icon: "◉", title: "LIVE GEO MAP", body: "Real world as your game board. Real haunted locations, curated from ghost tour data, historical records, community reports." },
    { icon: "♪", title: "AI VOICE CHAT", body: "Every ghost speaks. Conversations deepen with every visit. Their mood shifts. They remember what you said last." },
    { icon: "◈", title: "PERSISTENT SOULS", body: "Not collectibles. Characters. Neglect them and they escape — and other players can steal them from your roster." },
    { icon: "✦", title: "DAILY HAUNTS", body: "The world you explored yesterday is not the world you'll find today. A daily event system rewrites what appears on the map." },
    { icon: "⌬", title: "HIDDEN LAYER", body: "Players who've put in the time unlock ghosts invisible to everyone else. The world expands as you go deeper." },
    { icon: "✶", title: "ON-DEVICE AI", body: "Ghost generation, voice, imagery, and story writing run locally on Apple silicon. No per-call costs. No latency." },
  ];
  return (
    <div style={{ marginTop: 70 }}>
      <SectionHeader kicker="— FEATURES" title="INSTRUCTION MANUAL" />
      <div className="grid-responsive-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 22 }}>
        {features.map((f, i) => (
          <div key={i} className="hud-frame" style={{ padding: 18, minHeight: 170 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
              <div style={{
                fontSize: 22, color: "var(--amber)", textShadow: "0 0 6px rgba(255,176,32,0.5)",
              }}>{f.icon}</div>
              <div className="font-pixel" style={{ fontSize: 12, color: "var(--phos)", letterSpacing: "0.1em", textShadow: "0 0 4px rgba(57,255,122,0.5)" }}>
                {f.title}
              </div>
            </div>
            <div className="font-mono" style={{ color: "var(--bone)", fontSize: 17, lineHeight: 1.3 }}>
              {f.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   CITY MAP (pilot cities)
========================================================= */
function CityMap() {
  return (
    <div style={{ marginTop: 70 }}>
      <SectionHeader kicker="— DEPLOYMENT" title="3-CITY LAUNCH" />
      <div className="font-mono" style={{ color: "var(--bone)", fontSize: 20, maxWidth: 620, marginBottom: 22 }}>
        Launch cities selected for their historic density of haunted locations. Every neighborhood is its own map.
      </div>
      <div style={{
        border: "2px solid var(--phos-dim)",
        background: "linear-gradient(180deg, #050806 0%, #0a1510 100%)",
        padding: 20,
        position: "relative",
        overflow: "hidden",
      }}>
        <CornerBrackets />
        <div style={{
          aspectRatio: "16 / 7",
          position: "relative",
          backgroundImage: "linear-gradient(rgba(57,255,122,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,122,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          overflow: "hidden",
        }}>
          {/* US outline approximation */}
          <svg viewBox="0 0 1000 440" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path
              d="M60,180 L140,120 L240,90 L360,80 L460,70 L560,70 L680,80 L780,100 L880,130 L940,180 L930,250 L880,300 L800,340 L680,360 L560,360 L460,370 L360,360 L260,340 L180,300 L110,260 Z"
              fill="rgba(57,255,122,0.04)"
              stroke="rgba(57,255,122,0.45)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            {/* pins */}
            {[
              { x: 340, y: 240, name: "NEW ORLEANS", code: "NOLA" },
              { x: 540, y: 170, name: "CHICAGO", code: "CHI" },
              { x: 130, y: 180, name: "SAN FRANCISCO", code: "SF" },
            ].map((c, i) => (
              <g key={i}>
                <circle cx={c.x} cy={c.y} r="18" fill="none" stroke="#39ff7a" strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" from="8" to="30" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" from="0.6" to="0" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx={c.x} cy={c.y} r="6" fill="#39ff7a" />
                <circle cx={c.x} cy={c.y} r="10" fill="none" stroke="#39ff7a" strokeWidth="1"/>
                <text x={c.x + 16} y={c.y - 10} fontFamily="'Press Start 2P', monospace" fontSize="14" fill="#39ff7a" letterSpacing="2">
                  {c.name}
                </text>
                <text x={c.x + 16} y={c.y + 8} fontFamily="'VT323', monospace" fontSize="16" fill="#d7e5d2" opacity="0.75">
                  ▸ {c.code} · LAUNCH
                </text>
              </g>
            ))}
          </svg>
          {/* HUD overlays */}
          <div style={{ position: "absolute", top: 10, left: 10, fontFamily: "'VT323', monospace", fontSize: 14, color: "var(--phos)", letterSpacing: "0.2em", opacity: 0.8 }}>
            ⌖ GEOLOC · LIVE
          </div>
          <div style={{ position: "absolute", top: 10, right: 10, fontFamily: "'VT323', monospace", fontSize: 14, color: "var(--phos)", letterSpacing: "0.2em", opacity: 0.8 }}>
            ZONE 03 / 50<span className="cursor"/>
          </div>
          <div style={{ position: "absolute", bottom: 10, left: 10, fontFamily: "'VT323', monospace", fontSize: 12, color: "var(--bone-dim)", letterSpacing: "0.2em" }}>
            ENCOUNTERS LOGGED: 1,743 · DAY 11
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STORY
========================================================= */
function StorySection() {
  return (
    <div className="grid-responsive-2" style={{ marginTop: 70, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }}>
      <div className="hud-frame" style={{ padding: "24px 26px" }}>
        <div className="font-pixel" style={{ fontSize: 11, color: "var(--amber)", letterSpacing: "0.25em", marginBottom: 14 }}>
          ◆ THE PITCH
        </div>
        <div className="font-mono" style={{ fontSize: 22, color: "var(--bone)", lineHeight: 1.3 }}>
          Every city has a hidden layer.
          <br/><br/>
          <span className="phos">Real places. Real folklore. Characters that remember you.</span>
          <br/><br/>
          The world you explore outside is the game.
        </div>
      </div>
      <div className="hud-frame" style={{ padding: "24px 26px", background: "rgba(57,255,122,0.03)" }}>
        <div className="font-pixel" style={{ fontSize: 11, color: "var(--amber)", letterSpacing: "0.25em", marginBottom: 14 }}>
          ◆ WHAT TO EXPECT
        </div>
        <div className="font-mono" style={{ fontSize: 18, color: "var(--bone)", lineHeight: 1.35 }}>
          A live map of your neighborhood's haunted history. Conversations with spirits who speak back. A roster of ghosts that only you have found. And daily events that rewrite the map overnight.
          <br/><br/>
          <span className="phos">See what others don't.</span>
        </div>
      </div>
    </div>
  );
}

function StatLine({ num, body, last }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "baseline",
      padding: "12px 0",
      borderBottom: last ? "none" : "1px dashed var(--phos-dim)",
    }}>
      <div className="font-heavy" style={{ fontSize: 36, color: "var(--phos)", textShadow: "0 0 8px rgba(57,255,122,0.5)", letterSpacing: "0.02em" }}>
        {num}
      </div>
      <div className="font-mono" style={{ color: "var(--bone)", fontSize: 17, lineHeight: 1.25 }}>
        {body}
      </div>
    </div>
  );
}

/* =========================================================
   SPECS
========================================================= */
function ApparishSpecs() {
  return (
    <div className="grid-responsive-2" style={{ marginTop: 60, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
      <div className="hud-frame" style={{ padding: 22 }}>
        <div className="font-pixel" style={{ fontSize: 12, color: "var(--phos)", letterSpacing: "0.2em", marginBottom: 18, textShadow: "0 0 4px rgba(57,255,122,0.5)" }}>
          ■ WHAT'S COMING
        </div>
        <div className="grid-responsive-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { v: "OPEN BETA", body: "Step into the app. Talk to your first ghost." },
            { v: "NEW CITIES", body: "Three more on the map after launch." },
            { v: "HALLOWEEN", body: "The night the veil is thinnest. You'll want to be out." },
          ].map((m, i) => (
            <div key={i} style={{ borderLeft: "2px solid var(--phos-dim)", paddingLeft: 12 }}>
              <div className="font-pixel" style={{ fontSize: 11, color: "var(--phos)", letterSpacing: "0.1em", textShadow: "0 0 4px rgba(57,255,122,0.5)" }}>
                {m.v}
              </div>
              <div className="font-mono" style={{ fontSize: 16, color: "var(--bone)", letterSpacing: "0.02em", marginTop: 8, lineHeight: 1.3 }}>
                {m.body}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hud-frame" style={{ padding: 22, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 12 }}>
        <div className="font-pixel" style={{ fontSize: 11, color: "var(--phos)", letterSpacing: "0.2em", textShadow: "0 0 4px rgba(57,255,122,0.5)" }}>
          ■ GET THE GAME
        </div>
        <div className="font-mono" style={{ color: "var(--bone)", fontSize: 17, lineHeight: 1.3 }}>
          Visit the official Apparish site. Beta access opens Q2 2026.
        </div>
        <a href="https://appari.sh" target="_blank" rel="noreferrer" className="btn-retro" style={{ textDecoration: "none" }}>
          ▶ APPARI.SH
        </a>
      </div>
    </div>
  );
}

window.ApparishPage = ApparishPage;
