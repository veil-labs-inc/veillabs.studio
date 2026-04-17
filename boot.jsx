// Boot sequence + CRT utilities
const { useState: useStateBoot, useEffect: useEffectBoot } = React;

function BootSequence({ onDone, skip }) {
  const [phase, setPhase] = useStateBoot(0); // 0 black, 1 warning, 2 VL logo, 3 done
  const [lineIdx, setLineIdx] = useStateBoot(0);

  useEffectBoot(() => {
    if (skip) { onDone?.(); return; }
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 350));
    timers.push(setTimeout(() => setPhase(2), 2600));
    timers.push(setTimeout(() => setPhase(3), 4600));
    timers.push(setTimeout(() => onDone?.(), 5200));
    return () => timers.forEach(clearTimeout);
  }, [skip]);

  useEffectBoot(() => {
    if (phase !== 1) return;
    const id = setInterval(() => setLineIdx(i => Math.min(i + 1, 7)), 180);
    return () => clearInterval(id);
  }, [phase]);

  if (skip || phase === 3) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000", zIndex: 9000,
      color: "var(--phos)",
      fontFamily: "'VT323', monospace",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(to bottom, rgba(0,0,0,0.45) 0 1px, transparent 1px 3px)",
        pointerEvents: "none", zIndex: 2,
      }} />
      {/* vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, #000 100%)",
        pointerEvents: "none", zIndex: 2,
      }} />

      {phase === 0 && (
        <div style={{ color: "var(--phos)", fontSize: 40, letterSpacing: "0.3em" }}>
          <span style={{animation: "ghost-shimmer 0.4s infinite"}}>● ● ●</span>
        </div>
      )}

      {phase === 1 && (
        <div style={{ width: "min(720px, 85vw)", padding: 20 }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: 14, letterSpacing: "0.2em",
            color: "#ffb020", textShadow: "0 0 8px rgba(255,176,32,0.6)",
            marginBottom: 18,
          }}>▲ SYSTEM BOOT — V.001</div>
          {[
            "> POWER ON ................................. [OK]",
            "> MEMORY CHECK ......................... 64MB OK",
            "> CARTRIDGE DETECTED ............ VL-001",
            "> READING ROM ....................... APPARISH",
            "> INIT NEURAL ENGINE ................... [OK]",
            "> LOADING HAUNTED DATABASE .... [OK]",
            "> CONNECTING TO THE VEIL ............... ...",
            "> SIGNAL ACQUIRED. PROCEED.",
          ].slice(0, lineIdx + 1).map((line, i, arr) => (
            <div key={i} style={{
              fontSize: 20,
              color: "var(--phos)",
              textShadow: "0 0 4px rgba(57,255,122,0.7)",
            }}>
              {line}{i === arr.length - 1 && lineIdx < 7 ? <span className="cursor"/> : null}
            </div>
          ))}
        </div>
      )}

      {phase === 2 && (
        <div style={{ textAlign: "center", animation: "boot-flash 1.8s ease-out forwards" }}>
          <div style={{
            fontFamily: "'Monoton', serif",
            fontSize: "clamp(60px, 12vw, 140px)",
            letterSpacing: "0.08em",
            color: "var(--phos)",
            textShadow: "0 0 20px rgba(57,255,122,0.9), 0 0 40px rgba(57,255,122,0.4)",
          }}>VEIL LABS</div>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 11, letterSpacing: "0.4em", color: "var(--phos)", opacity: 0.7, marginTop: 14,
          }}>
            LICENSED BY THE OTHER SIDE
          </div>
        </div>
      )}
    </div>
  );
}

window.BootSequence = BootSequence;
