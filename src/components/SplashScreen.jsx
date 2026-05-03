import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => handleFinish(), 6000);
    return () => clearTimeout(timer);
  }, []);

  function handleFinish() {
    setVisible(false);
    setTimeout(() => onFinish(), 600);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "linear-gradient(160deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.6s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* SVGイラスト */}
      <svg
        width="100%"
        viewBox="0 0 680 480"
        style={{ maxWidth: 680, flex: "0 0 auto" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sky */}
        <rect x="0" y="0" width="680" height="340" fill="url(#splashSky)" />
        <defs>
          <linearGradient id="splashSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="splashRoad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a4a6a" />
            <stop offset="100%" stopColor="#2a2a4a" />
          </linearGradient>
          <linearGradient id="splashSun" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>

        {/* Sun */}
        <circle cx="580" cy="70" r="38" fill="url(#splashSun)" opacity="0.9" />
        <circle cx="580" cy="70" r="50" fill="#fde68a" opacity="0.2" />

        {/* Clouds */}
        <ellipse cx="120" cy="80" rx="55" ry="22" fill="white" opacity="0.7" />
        <ellipse cx="160" cy="68" rx="38" ry="18" fill="white" opacity="0.8" />
        <ellipse cx="88" cy="72" rx="30" ry="16" fill="white" opacity="0.6" />
        <ellipse cx="350" cy="60" rx="45" ry="18" fill="white" opacity="0.5" />
        <ellipse cx="390" cy="50" rx="30" ry="14" fill="white" opacity="0.6" />

        {/* City silhouette */}
        <rect x="60" y="195" width="18" height="55" fill="#7c6eaa" opacity="0.5" rx="2" />
        <rect x="82" y="185" width="14" height="65" fill="#7c6eaa" opacity="0.5" rx="2" />
        <rect x="100" y="200" width="20" height="50" fill="#7c6eaa" opacity="0.4" rx="2" />
        <rect x="500" y="190" width="16" height="60" fill="#7c6eaa" opacity="0.5" rx="2" />
        <rect x="520" y="200" width="12" height="50" fill="#7c6eaa" opacity="0.4" rx="2" />
        <rect x="540" y="182" width="18" height="68" fill="#7c6eaa" opacity="0.5" rx="2" />

        {/* Road */}
        <rect x="0" y="280" width="680" height="200" fill="url(#splashRoad)" />
        <rect x="335" y="290" width="10" height="35" fill="#fde68a" opacity="0.5" rx="2" />
        <rect x="335" y="340" width="10" height="35" fill="#fde68a" opacity="0.5" rx="2" />
        <rect x="335" y="390" width="10" height="35" fill="#fde68a" opacity="0.5" rx="2" />

        {/* Crowd background */}
        <ellipse cx="340" cy="268" rx="260" ry="12" fill="#5b4b8a" opacity="0.5" />
        {[220,245,270,295,320,360,385,410,435,460].map((cx, i) => (
          <circle key={i} cx={cx} cy={250 + (i % 3) * 4} r={4 + (i % 2)} fill={["#e879f9","#38bdf8","#f97316","#4ade80","#fb7185","#fbbf24","#a78bfa","#38bdf8","#e879f9","#4ade80"][i]} opacity="0.7" />
        ))}

        {/* Runner A: カッパ脱ぎ */}
        <g transform="translate(68, 195)">
          <path d="M-18,30 Q-30,10 -20,-5 Q-10,-15 0,5" fill="#fbbf24" opacity="0.9" />
          <path d="M18,30 Q32,8 22,-5 Q12,-16 0,5" fill="#fbbf24" opacity="0.9" />
          <rect x="-9" y="5" width="18" height="32" fill="#f97316" rx="3" />
          <circle cx="0" cy="-4" r="12" fill="#fcd9a0" />
          <path d="M-10,-12 Q0,-22 10,-12" fill="#3b2a1a" />
          <circle cx="-4" cy="-5" r="2" fill="#3b2a1a" />
          <circle cx="4" cy="-5" r="2" fill="#3b2a1a" />
          <path d="M-4,2 Q0,6 4,2" stroke="#3b2a1a" strokeWidth="1.5" fill="none" />
          <line x1="-9" y1="15" x2="-22" y2="-2" stroke="#fcd9a0" strokeWidth="6" strokeLinecap="round" />
          <line x1="9" y1="15" x2="20" y2="5" stroke="#fcd9a0" strokeWidth="6" strokeLinecap="round" />
          <line x1="-4" y1="37" x2="-8" y2="58" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
          <line x1="4" y1="37" x2="10" y2="58" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="-9" cy="60" rx="8" ry="4" fill="#ef4444" />
          <ellipse cx="11" cy="60" rx="8" ry="4" fill="#ef4444" />
        </g>

        {/* Runner B: スマホ自撮り */}
        <g transform="translate(170, 185)">
          <rect x="-10" y="8" width="20" height="34" fill="#7c3aed" rx="3" />
          <circle cx="0" cy="-3" r="13" fill="#fcd9a0" />
          <path d="M10,-10 Q22,-8 18,4" stroke="#8b4513" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="-4" cy="-5" r="2" fill="#3b2a1a" />
          <circle cx="4" cy="-5" r="2" fill="#3b2a1a" />
          <path d="M-5,2 Q0,8 5,2" stroke="#3b2a1a" strokeWidth="1.5" fill="none" />
          <line x1="10" y1="18" x2="32" y2="-8" stroke="#fcd9a0" strokeWidth="6" strokeLinecap="round" />
          <rect x="28" y="-18" width="12" height="18" fill="#1e1b4b" rx="2" />
          <rect x="30" y="-16" width="8" height="12" fill="#60a5fa" rx="1" />
          <line x1="-10" y1="18" x2="-20" y2="30" stroke="#fcd9a0" strokeWidth="6" strokeLinecap="round" />
          <line x1="-4" y1="42" x2="-10" y2="62" stroke="#1e1b4b" strokeWidth="6" strokeLinecap="round" />
          <line x1="4" y1="42" x2="12" y2="56" stroke="#1e1b4b" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="-11" cy="64" rx="8" ry="4" fill="#a78bfa" />
          <ellipse cx="13" cy="58" rx="8" ry="4" fill="#a78bfa" />
        </g>

        {/* Runner C: 中央 両手振り メイン */}
        <g transform="translate(280, 175)">
          <rect x="-12" y="8" width="24" height="38" fill="#dc2626" rx="3" />
          <rect x="-8" y="14" width="16" height="14" fill="white" rx="1" />
          <text x="0" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626" fontFamily="monospace">42</text>
          <circle cx="0" cy="-4" r="14" fill="#fcd9a0" />
          <rect x="-14" y="-14" width="28" height="6" fill="#dc2626" rx="2" />
          <rect x="-16" y="-10" width="32" height="4" fill="#dc2626" rx="1" />
          <circle cx="-5" cy="-5" r="2.5" fill="#3b2a1a" />
          <circle cx="5" cy="-5" r="2.5" fill="#3b2a1a" />
          <path d="M-6,1 Q0,8 6,1" stroke="#3b2a1a" strokeWidth="2" fill="none" />
          <line x1="-12" y1="20" x2="-38" y2="-2" stroke="#fcd9a0" strokeWidth="7" strokeLinecap="round" />
          <line x1="12" y1="20" x2="38" y2="-2" stroke="#fcd9a0" strokeWidth="7" strokeLinecap="round" />
          <circle cx="-39" cy="-4" r="6" fill="#fcd9a0" />
          <circle cx="39" cy="-4" r="6" fill="#fcd9a0" />
          <line x1="-5" y1="46" x2="-14" y2="68" stroke="#1e1b4b" strokeWidth="7" strokeLinecap="round" />
          <line x1="5" y1="46" x2="18" y2="62" stroke="#1e1b4b" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="-15" cy="70" rx="10" ry="5" fill="#fbbf24" />
          <ellipse cx="19" cy="64" rx="10" ry="5" fill="#fbbf24" />
        </g>

        {/* Runner D: ピース */}
        <g transform="translate(400, 190)">
          <rect x="-10" y="8" width="20" height="34" fill="#059669" rx="3" />
          <circle cx="0" cy="-3" r="12" fill="#c9a87c" />
          <rect x="-12" y="-14" width="24" height="8" fill="#1e1b4b" rx="3" />
          <rect x="-8" y="-20" width="16" height="10" fill="#1e1b4b" rx="2" />
          <circle cx="-4" cy="-3" r="2" fill="#3b2a1a" />
          <circle cx="4" cy="-3" r="2" fill="#3b2a1a" />
          <path d="M-4,3 Q0,8 4,3" stroke="#3b2a1a" strokeWidth="1.5" fill="none" />
          <line x1="10" y1="16" x2="26" y2="-8" stroke="#c9a87c" strokeWidth="6" strokeLinecap="round" />
          <line x1="26" y1="-8" x2="22" y2="-20" stroke="#c9a87c" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="26" y1="-8" x2="30" y2="-20" stroke="#c9a87c" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-10" y1="16" x2="-22" y2="10" stroke="#c9a87c" strokeWidth="6" strokeLinecap="round" />
          <line x1="-4" y1="42" x2="-8" y2="60" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
          <line x1="4" y1="42" x2="10" y2="56" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="-9" cy="62" rx="8" ry="4" fill="#38bdf8" />
          <ellipse cx="11" cy="58" rx="8" ry="4" fill="#38bdf8" />
        </g>

        {/* Runner E: ガッツポーズ */}
        <g transform="translate(510, 182)">
          <rect x="-10" y="6" width="20" height="32" fill="#db2777" rx="3" />
          <circle cx="0" cy="-5" r="13" fill="#fcd9a0" />
          <path d="M-12,-16 Q-16,0 -12,14" stroke="#5c3317" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M12,-16 Q16,2 12,14" stroke="#5c3317" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="-4" cy="-6" r="2.5" fill="#3b2a1a" />
          <circle cx="4" cy="-6" r="2.5" fill="#3b2a1a" />
          <ellipse cx="0" cy="1" rx="5" ry="4" fill="#c0392b" />
          <line x1="-10" y1="14" x2="-28" y2="-6" stroke="#fcd9a0" strokeWidth="6" strokeLinecap="round" />
          <line x1="10" y1="14" x2="26" y2="-8" stroke="#fcd9a0" strokeWidth="6" strokeLinecap="round" />
          <rect x="-35" y="-14" width="10" height="10" fill="#fcd9a0" rx="3" />
          <rect x="24" y="-16" width="10" height="10" fill="#fcd9a0" rx="3" />
          <line x1="-4" y1="38" x2="-12" y2="54" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
          <line x1="4" y1="38" x2="16" y2="50" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="-13" cy="56" rx="8" ry="4" fill="#f97316" />
          <ellipse cx="17" cy="52" rx="8" ry="4" fill="#f97316" />
        </g>

        {/* Drone */}
        <g transform="translate(310, 90)">
          <rect x="-18" y="-8" width="36" height="16" fill="#1e1b4b" rx="4" />
          <rect x="-10" y="-4" width="20" height="8" fill="#374151" rx="2" />
          <circle cx="0" cy="4" r="5" fill="#1e1b4b" />
          <circle cx="0" cy="4" r="3" fill="#60a5fa" />
          <circle cx="0" cy="4" r="1.5" fill="#1e293b" />
          <line x1="-18" y1="0" x2="-38" y2="-10" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="0" x2="38" y2="-10" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
          <line x1="-18" y1="0" x2="-38" y2="8" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="0" x2="38" y2="8" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="-38" cy="-10" rx="12" ry="3.5" fill="#6b7280" opacity="0.7" />
          <ellipse cx="38" cy="-10" rx="12" ry="3.5" fill="#6b7280" opacity="0.7" />
          <ellipse cx="-38" cy="8" rx="12" ry="3.5" fill="#6b7280" opacity="0.7" />
          <ellipse cx="38" cy="8" rx="12" ry="3.5" fill="#6b7280" opacity="0.7" />
          <circle cx="-14" cy="-5" r="3" fill="#ef4444" opacity="0.9" />
          <circle cx="14" cy="5" r="3" fill="#4ade80" opacity="0.9" />
        </g>

        {/* Title */}
        <text x="340" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" opacity="0.85" fontFamily="sans-serif" letterSpacing="4">HIGHER RUNNER</text>
        <line x1="240" y1="152" x2="300" y2="152" stroke="white" strokeWidth="0.8" opacity="0.4" />
        <line x1="380" y1="152" x2="440" y2="152" stroke="white" strokeWidth="0.8" opacity="0.4" />

        {/* Start gate */}
        <rect x="200" y="230" width="10" height="50" fill="#fbbf24" opacity="0.7" rx="2" />
        <rect x="470" y="230" width="10" height="50" fill="#fbbf24" opacity="0.7" rx="2" />
        <rect x="200" y="228" width="280" height="8" fill="#fbbf24" opacity="0.7" rx="2" />
        <text x="340" y="224" textAnchor="middle" fontSize="10" fill="white" opacity="0.8" fontFamily="sans-serif" fontWeight="600">START</text>

        {/* Confetti */}
        {[
          [148,135,"#fbbf24"],[220,118,"#f97316"],[450,125,"#4ade80"],
          [520,110,"#38bdf8"],[380,128,"#f97316"],[290,142,"#38bdf8"],
          [560,142,"#4ade80"]
        ].map(([cx,cy,fill],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill={fill} opacity="0.85" />
        ))}

        {/* Shadows */}
        {[105,200,308,418,530].map((cx,i) => (
          <ellipse key={i} cx={cx} cy={254+i} rx={28+i*2} ry={5} fill="#2a1a4a" opacity="0.3" />
        ))}
      </svg>

      {/* タイトル＋スキップ */}
      <div style={{ textAlign: "center", marginTop: 8, padding: "0 16px" }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "0 0 16px", letterSpacing: 1 }}>
          Bring me a higher run...
        </p>
        <button
          onClick={handleFinish}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "white",
            padding: "8px 28px",
            borderRadius: 999,
            fontSize: 13,
            cursor: "pointer",
            letterSpacing: 1,
          }}
        >
          SKIP
        </button>
      </div>
    </div>
  );
}
