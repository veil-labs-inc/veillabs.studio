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
            A paranormal investigation game set in your real neighborhood. Ghosts haunt actual places around you. Walk to them. Photograph them. Speak to them. Build a bond — or lose them forever.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <a href="https://appari.sh" target="_blank" rel="noreferrer" className="btn-retro" style={{ textDecoration: "none", display: "inline-block" }}>
              ◉ JOIN BETA
            </a>
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
        <MetaBar label="GENRE" value="PARANORMAL · GEOLOCATION" />
        <MetaBar label="MODE" value="SOLO · PVP THEFT" />
        <MetaBar label="PLATFORM" value="iOS · 2026" />
        <MetaBar label="STATUS" value="OPEN BETA" flash />
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
    { n: "01", label: "EXPLORE", body: "Ghosts haunt real places around you — cemeteries, old hotels, churches, parks. Your phone pulses harder the closer you get." },
    { n: "02", label: "CAPTURE", body: "Raise your camera and snap a photo. A ghost appears in your shot — with a name, a backstory, and a voice. Every one is unique." },
    { n: "03", label: "BOND", body: "Speak to your ghosts out loud. They talk back. They remember what you said. Be kind and they open up. Be cruel and they shut down." },
    { n: "04", label: "MAINTAIN", body: "Ghosts need attention. Ignore them and they grow restless. Neglect them long enough and they escape — free for someone else to find." },
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
    { id: "001", name: "SEBASTIAN COLE", loc: "APPARITION", mood: "BENEVOLENT", trait: "Anxious dev who wiped the database and died at his desk. Apologizes for everything. He'll be your first ghost — if you pick him.", tagline: "The Engineer" },
    { id: "014", name: "VESPER KANE", loc: "WRAITH", mood: "SEEKING", trait: "Late-night pirate radio DJ who died on air NYE 1999. Warm, strange, and disarmingly deep. She collects confessions.", tagline: "The Static" },
    { id: "027", name: "VALENTINO VOSS", loc: "SHADOW FIGURE", mood: "VENGEFUL", trait: "70s Vegas entertainer who murdered his rivals. Bitchy, glamorous, and unapologetically petty. He's still the star.", tagline: "The Showman" },
  ];
  return (
    <div style={{ marginTop: 70 }}>
      <SectionHeader kicker="— SPECIMENS" title="THE CAST OF THE DEAD" />
      <div className="font-mono" style={{ color: "var(--bone)", fontSize: 20, maxWidth: 640, marginBottom: 22 }}>
        You pick your first ghost when you join. Each one has a personality, a mood, and a memory. Earn their trust and they'll start telling you things — about themselves, about the ghosts nearby, and about places you haven't found yet.
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
    { icon: "◉", title: "REAL PLACES", body: "Ghosts haunt actual locations around you — cemeteries, old churches, historic hotels, parks. Known haunted sites have rare boss encounters you won't find anywhere else." },
    { icon: "♪", title: "VOICE CONVERSATIONS", body: "Talk to your ghosts out loud. They speak back in real time — in character, in their own voice. They remember past conversations and their mood changes based on what you say." },
    { icon: "◈", title: "THEY CAN LEAVE", body: "Every ghost has a mood. Talk to them and it rises. Ignore them and it falls. If it hits zero, they vanish from your collection — and someone else can capture them." },
    { icon: "✦", title: "CAPTURE RITUALS", body: "Trapping a ghost isn't just a tap. Wandering spirits require a steady hand. Boss ghosts at haunted sites demand sigil tracing and containment rituals. Rarer ghosts are harder to catch." },
    { icon: "⌬", title: "THE WITCHING HOUR", body: "Play after dark and rarer ghosts appear. Between 11pm and 1am, something else comes out — spirits that only exist in the dead of night." },
    { icon: "✶", title: "DAILY TAROT", body: "Draw a card every day. Common pulls give you a little. Rare pulls give you a lot. And once in a while, you'll pull The Phantom King — a legendary card that almost never appears." },
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
  const rarities = [
    { name: "COMMON", pct: "50%", night: "40%", color: "#9ca3af" },
    { name: "UNCOMMON", pct: "30%", night: "30%", color: "#22c55e" },
    { name: "RARE", pct: "15%", night: "20%", color: "#3b82f6" },
    { name: "EPIC", pct: "5%", night: "10%", color: "#a855f7" },
    { name: "LEGENDARY", pct: "HOTSPOT", night: "HOTSPOT", color: "#f59e0b" },
  ];
  return (
    <div style={{ marginTop: 70 }}>
      <SectionHeader kicker="— SPIRIT TAXONOMY" title="RARITY & TYPES" />
      <div className="font-mono" style={{ color: "var(--bone)", fontSize: 20, maxWidth: 620, marginBottom: 22 }}>
        Not all ghosts are created equal. Some are common. Some are legendary. Some only come out at night. Here's what you'll find.
      </div>
      <div className="grid-responsive-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="hud-frame" style={{ padding: 18 }}>
          <div className="font-pixel" style={{ fontSize: 11, color: "var(--phos)", letterSpacing: "0.2em", marginBottom: 14 }}>
            ■ RARITY TIERS
          </div>
          {rarities.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < rarities.length - 1 ? "1px dashed var(--phos-dim)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, background: r.color, boxShadow: `0 0 6px ${r.color}` }} />
                <span className="font-pixel" style={{ fontSize: 10, color: r.color, letterSpacing: "0.1em" }}>{r.name}</span>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span className="font-mono" style={{ fontSize: 14, color: "var(--bone-dim)" }}>DAY {r.pct}</span>
                <span className="font-mono" style={{ fontSize: 14, color: "var(--amber)" }}>NIGHT {r.night}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hud-frame" style={{ padding: 18 }}>
          <div className="font-pixel" style={{ fontSize: 11, color: "var(--phos)", letterSpacing: "0.2em", marginBottom: 14 }}>
            ■ SPIRIT TYPES
          </div>
          {[
            { type: "APPARITION", pct: "65%", desc: "Translucent humanoid" },
            { type: "SHADOW FIGURE", pct: "10%", desc: "Dark silhouette" },
            { type: "POLTERGEIST", pct: "7%", desc: "Fragmented disturbance" },
            { type: "ORB", pct: "7%", desc: "Glowing sphere" },
            { type: "ANIMAL SPIRIT", pct: "5%", desc: "Translucent animal" },
            { type: "MIST", pct: "3%", desc: "Ethereal vapor" },
            { type: "RESIDUAL", pct: "3%", desc: "Looping phantom" },
            { type: "WITCHING SPECTER", pct: "11PM+", desc: "Midnight-only" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "6px 0", borderBottom: i < 7 ? "1px dashed var(--phos-dim)" : "none" }}>
              <span className="font-mono" style={{ fontSize: 16, color: "var(--bone)" }}>{s.type}</span>
              <span className="font-mono" style={{ fontSize: 13, color: "var(--bone-dim)" }}>{s.pct} · {s.desc}</span>
            </div>
          ))}
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
          Your neighborhood is haunted.
          <br/><br/>
          <span className="phos">Real places. Ghosts tied to local history. Conversations that remember you.</span>
          <br/><br/>
          This isn't a collection game. It's a relationship game — and the characters can leave.
        </div>
      </div>
      <div className="hud-frame" style={{ padding: "24px 26px", background: "rgba(57,255,122,0.03)" }}>
        <div className="font-pixel" style={{ fontSize: 11, color: "var(--amber)", letterSpacing: "0.25em", marginBottom: 14 }}>
          ◆ HOW SPIRITS SPAWN
        </div>
        <div className="font-mono" style={{ fontSize: 18, color: "var(--bone)", lineHeight: 1.35 }}>
          Ghosts appear at real places near you — the older the building, the better the ghost. <span className="phos">Known haunted locations</span> have powerful boss spirits guarding them. And drifting between it all, <span className="phos">wandering ghosts</span> that could show up anywhere.
          <br/><br/>
          The map resets every night at midnight. Places you've already cleared get new ghosts — so there's always a reason to go back out.
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
          ■ PROGRESSION
        </div>
        <div className="grid-responsive-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { v: "RANK UP", body: "Start as a Novice. Rise through 7 ranks to Paranormal Authority. Each rank unlocks new missions and abilities." },
            { v: "DAILY MISSIONS", body: "Three assignments every day — easy, medium, and hard. Complete them all for bonus rewards. Keep the streak going all week." },
            { v: "EARN BADGES", body: "Capture milestones. Exploration streaks. Conversation breakthroughs. Collect them all — some are common, some are legendary." },
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
          Free to play on iOS. Premium unlocks unlimited ghost conversations and an expanded vault for serious investigators.
        </div>
        <a href="https://appari.sh" target="_blank" rel="noreferrer" className="btn-retro" style={{ textDecoration: "none" }}>
          ▶ APPARI.SH
        </a>
      </div>
    </div>
  );
}

window.ApparishPage = ApparishPage;
