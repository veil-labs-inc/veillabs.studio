// 3D CSS Apparish Cartridge — N64-style chunky plastic
const { useState, useRef, useEffect } = React;

function Cartridge({ colorway = "ghost-green", size = 1, flippable = true, onInsert, tilt = true, label = "APPARISH", subtitle = "HAUNTED REALITY" }) {
  const [flipped, setFlipped] = useState(false);
  const [tilted, setTilted] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const colorways = {
    "ghost-green": {
      body: "linear-gradient(145deg, #2a5a3a 0%, #1a3a25 50%, #0f2418 100%)",
      bodyEdge: "#4ea36a",
      shadow: "rgba(57,255,122,0.35)",
      plastic: "rgba(80, 180, 110, 0.55)",
      translucent: true,
    },
    "atomic-purple": {
      body: "linear-gradient(145deg, #3a2a5a 0%, #221640 100%)",
      bodyEdge: "#8a6ad6",
      shadow: "rgba(170,120,255,0.35)",
      plastic: "rgba(140, 100, 220, 0.55)",
      translucent: true,
    },
    "blood-red": {
      body: "linear-gradient(145deg, #5a1a1a 0%, #2a0a0a 100%)",
      bodyEdge: "#d63a3a",
      shadow: "rgba(220, 60, 60, 0.4)",
      plastic: "rgba(200, 40, 40, 0.6)",
      translucent: true,
    },
    "classic-gray": {
      body: "linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 100%)",
      bodyEdge: "#888",
      shadow: "rgba(100,100,100,0.4)",
      plastic: "#2a2a2a",
      translucent: false,
    },
    "bone": {
      body: "linear-gradient(145deg, #d0d0c0 0%, #8a8a80 100%)",
      bodyEdge: "#f0f0e0",
      shadow: "rgba(220,220,200,0.3)",
      plastic: "#b0b0a0",
      translucent: false,
    }
  };
  const cw = colorways[colorway] || colorways["ghost-green"];

  // Mouse-tilt
  const handleMove = (e) => {
    if (!tilt || !ref.current || flipped) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilted({ x: py * -18, y: px * 22 });
  };
  const handleLeave = () => setTilted({ x: 0, y: 0 });

  // SCALE
  const W = 240 * size;
  const H = 320 * size;
  const D = 32 * size; // depth

  return (
    <div
      style={{ perspective: `${1400 * size}px`, display: "inline-block", cursor: flippable ? "pointer" : "default" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => flippable && setFlipped(f => !f)}
    >
      <div
        ref={ref}
        style={{
          width: W, height: H,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilted.x}deg) rotateY(${tilted.y}deg)`,
          transition: "transform 0.55s cubic-bezier(.2,.8,.2,1)",
          filter: `drop-shadow(0 25px 30px ${cw.shadow})`,
        }}
      >
        {/* FRONT or BACK — render one at a time to avoid backface-visibility quirks */}
        {!flipped ? (
          <CartFace front cw={cw} W={W} H={H} D={D} label={label} subtitle={subtitle} />
        ) : (
          <CartFace back cw={cw} W={W} H={H} D={D} />
        )}
        {/* LEFT SIDE */}
        <div style={{
          position: "absolute",
          width: D, height: H,
          left: 0, top: 0,
          background: cw.bodyEdge,
          transform: `rotateY(-90deg) translateZ(0px) translateX(${-D/2}px)`,
          transformOrigin: "left center",
          boxShadow: "inset -4px 0 8px rgba(0,0,0,0.5)",
        }} />
        {/* RIGHT SIDE */}
        <div style={{
          position: "absolute",
          width: D, height: H,
          right: 0, top: 0,
          background: cw.bodyEdge,
          transform: `rotateY(90deg) translateZ(0px) translateX(${D/2}px)`,
          transformOrigin: "right center",
          boxShadow: "inset 4px 0 8px rgba(0,0,0,0.5)",
        }} />
        {/* TOP */}
        <div style={{
          position: "absolute",
          width: W, height: D,
          top: 0, left: 0,
          background: cw.bodyEdge,
          transform: `rotateX(90deg) translateZ(${D/2}px) translateY(${-D/2}px)`,
          transformOrigin: "top center",
          boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.5)",
        }} />
        {/* BOTTOM (connector) */}
        <div style={{
          position: "absolute",
          width: W, height: D,
          bottom: 0, left: 0,
          background: "#1a1a1a",
          transform: `rotateX(-90deg) translateZ(${D/2}px) translateY(${D/2}px)`,
          transformOrigin: "bottom center",
          display: "flex", alignItems: "center", justifyContent: "space-around",
          padding: "0 12px",
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ width: 4, height: D * 0.55, background: "#d4a94a", boxShadow: "0 0 1px #000" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CartFace({ front, back, cw, W, H, D, label, subtitle }) {
  // Each face: rotate first, THEN translate along its own local z forward.
  // Back rotated 180 + translateZ(D/2) lands at world -D/2 (truly on the back).
  const rotation = front ? "rotateY(0deg)" : "rotateY(180deg)";
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, width: W, height: H,
      transform: `${rotation} translateZ(${D/2}px)`,
      backfaceVisibility: "hidden",
      background: cw.body,
      border: `2px solid ${cw.bodyEdge}`,
      borderRadius: "10px 10px 4px 4px",
      overflow: "hidden",
      boxShadow: cw.translucent
        ? `inset 0 0 80px ${cw.plastic}, inset 0 6px 0 rgba(255,255,255,0.15)`
        : `inset 0 6px 0 rgba(255,255,255,0.1), inset 0 -6px 0 rgba(0,0,0,0.3)`,
    }}>
      {/* ridged top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: H * 0.12,
        background: `repeating-linear-gradient(90deg, ${cw.bodyEdge} 0 4px, transparent 4px 8px)`,
        opacity: 0.25,
      }} />
      {/* brand notch top */}
      <div style={{
        position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Press Start 2P', monospace", fontSize: 8, letterSpacing: "0.3em",
        color: cw.translucent ? "rgba(215,229,210,0.55)" : "rgba(255,255,255,0.55)",
      }}>
        VEIL·LABS
      </div>

      {front ? <CartFront label={label} subtitle={subtitle} cw={cw} /> : <CartBack cw={cw} />}

      {/* screw wells */}
      <Screw x={12} y={12} />
      <Screw x={W - 22} y={12} />
      <Screw x={12} y={H - 22} />
      <Screw x={W - 22} y={H - 22} />

      {/* translucent highlight */}
      {cw.translucent && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "55%", height: "100%",
          background: "linear-gradient(120deg, rgba(255,255,255,0.14) 0%, transparent 45%)",
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

function Screw({ x, y }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: 10, height: 10,
      borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, #666 0%, #111 80%)",
      boxShadow: "inset 0 0 0 1px #000",
    }}>
      <div style={{
        position: "absolute", top: "50%", left: 1, right: 1, height: 1,
        background: "#000", transform: "translateY(-0.5px) rotate(-30deg)",
      }} />
    </div>
  );
}

function CartFront({ label, subtitle, cw }) {
  return (
    <div style={{
      position: "absolute", top: "16%", left: "10%", right: "10%", bottom: "8%",
      background: "#0a140e",
      border: "2px solid #1a3a25",
      borderRadius: 4,
      padding: 12,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      overflow: "hidden",
      boxShadow: "inset 0 0 30px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(57,255,122,0.15)",
    }}>
      {/* label art — ghost */}
      <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 100 100" style={{ width: "90%", height: "90%" }}>
          <defs>
            <radialGradient id="ghostGlow" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#39ff7a" stopOpacity="0.9"/>
              <stop offset="60%" stopColor="#39ff7a" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#39ff7a" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#ghostGlow)" />
          {/* ghost silhouette */}
          <path
            d="M30 42 Q30 22 50 22 Q70 22 70 42 L70 74 Q68 70 64 74 Q60 78 56 74 Q52 70 48 74 Q44 78 40 74 Q36 70 32 74 L30 72 Z"
            fill="#0a140e"
            stroke="#39ff7a"
            strokeWidth="1.2"
          />
          {/* eyes */}
          <ellipse cx="42" cy="44" rx="2.5" ry="3.5" fill="#39ff7a" />
          <ellipse cx="58" cy="44" rx="2.5" ry="3.5" fill="#39ff7a" />
          {/* scanline on label */}
          <g opacity="0.3">
            {Array.from({length: 10}).map((_, i) => (
              <line key={i} x1="0" y1={i*10} x2="100" y2={i*10} stroke="#39ff7a" strokeWidth="0.3"/>
            ))}
          </g>
        </svg>
      </div>

      {/* title block */}
      <div style={{ textAlign: "center", borderTop: "1px solid #1a3a25", paddingTop: 8, padding: "8px 4px 0" }}>
        <div style={{
          fontFamily: "'Monoton', 'Press Start 2P', monospace",
          fontSize: 22, color: "#39ff7a", letterSpacing: "0.01em",
          textShadow: "0 0 8px rgba(57,255,122,0.7)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 7, color: "#39ff7a", opacity: 0.7, letterSpacing: "0.3em", marginTop: 4,
        }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function CartBack({ cw }) {
  return (
    <div style={{
      position: "absolute", top: "14%", left: "10%", right: "10%", bottom: "8%",
      padding: 10,
      display: "flex", flexDirection: "column", gap: 6,
      color: cw.translucent ? "rgba(215,229,210,0.7)" : "rgba(255,255,255,0.75)",
      fontFamily: "'VT323', monospace",
      fontSize: 11,
    }}>
      <div style={{
        fontFamily: "'Press Start 2P', monospace", fontSize: 8, opacity: 0.85,
        borderBottom: "1px solid currentColor", paddingBottom: 4, letterSpacing: "0.2em",
      }}>
        VL-001 · APPARISH
      </div>
      <div style={{ lineHeight: 1.15 }}>
        A paranormal reality game. Players physically explore haunted places and uncover AI-generated spirits tied to local history and folklore.
      </div>
      <div style={{
        marginTop: "auto",
        border: "1px solid currentColor",
        padding: 5,
        fontSize: 9,
        lineHeight: 1.2,
      }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, marginBottom: 3, letterSpacing: "0.15em" }}>WARNING</div>
        Contains persistent characters who remember you. Neglect at your own risk.
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginTop: 2 }}>
        <span>© 2026 VEIL LABS</span>
        <span>MADE IN USA</span>
      </div>
    </div>
  );
}

window.Cartridge = Cartridge;
