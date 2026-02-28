import { useState } from "react";

export default function HigherRunner() {
  const [gamePhase, setGamePhase] = useState("input"); // input, playing, finished
  const [formData, setFormData] = useState({
    raceName: "",
    raceDate: "",
    level: "", // beginner, experienced, time-attack
    goalTime: ""
  });

  const handleStart = () => {
    if (!formData.raceName || !formData.raceDate || !formData.level) {
      alert("大会名、開催日、レベルを入力してください");
      return;
    }
    if (formData.level === "time-attack" && !formData.goalTime) {
      alert("目標タイムを入力してください");
      return;
    }
    setGamePhase("playing");
  };

  // 入力フェーズ
  if (gamePhase === "input") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        <div style={{
          maxWidth: "500px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
        }}>
          {/* ヘッダー */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>🎵🏃💨</div>
            <h1 style={{
              fontSize: "32px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "8px"
            }}>
              Higher Runner
            </h1>
            <p style={{ color: "#666", fontSize: "14px" }}>
              フルマラソン完走への道
            </p>
            <p style={{ color: "#999", fontSize: "12px", marginTop: "8px", fontStyle: "italic" }}>
              "Bring me a higher run..."
            </p>
          </div>

          {/* フォーム */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* 大会名 */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "8px" }}>
                🏁 大会名
              </label>
              <input
                type="text"
                placeholder="例：東京マラソン2026"
                value={formData.raceName}
                onChange={(e) => setFormData({...formData, raceName: e.target.value})}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "10px",
                  outline: "none",
                  transition: "all 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              />
            </div>

            {/* 開催日 */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "8px" }}>
                📅 開催日
              </label>
              <input
                type="date"
                value={formData.raceDate}
                onChange={(e) => setFormData({...formData, raceDate: e.target.value})}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "16px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "10px",
                  outline: "none",
                  transition: "all 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              />
            </div>

            {/* レベル選択 */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "12px" }}>
                🎯 あなたのレベル
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { value: "beginner", icon: "🔰", label: "初心者", desc: "初フルマラソン" },
                  { value: "experienced", icon: "🏃", label: "完走経験者", desc: "タイムより完走重視" },
                  { value: "time-attack", icon: "⚡", label: "タイムを狙う", desc: "目標タイムがある" }
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({...formData, level: level.value})}
                    style={{
                      padding: "16px",
                      border: formData.level === level.value ? "3px solid #667eea" : "2px solid #e0e0e0",
                      borderRadius: "12px",
                      background: formData.level === level.value ? "rgba(102, 126, 234, 0.1)" : "white",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.3s",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}
                    onMouseOver={(e) => {
                      if (formData.level !== level.value) {
                        e.currentTarget.style.borderColor = "#667eea";
                        e.currentTarget.style.background = "rgba(102, 126, 234, 0.05)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (formData.level !== level.value) {
                        e.currentTarget.style.borderColor = "#e0e0e0";
                        e.currentTarget.style.background = "white";
                      }
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>{level.icon}</span>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>{level.label}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>{level.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 目標タイム（タイム狙いの場合のみ） */}
            {formData.level === "time-attack" && (
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "8px" }}>
                  ⏱️ 目標タイム
                </label>
                <select
                  value={formData.goalTime}
                  onChange={(e) => setFormData({...formData, goalTime: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="">選択してください</option>
                  <option value="sub3">サブ3（2:59:59以内）</option>
                  <option value="sub3.5">サブ3.5（3:29:59以内）</option>
                  <option value="sub4">サブ4（3:59:59以内）</option>
                  <option value="sub4.5">サブ4.5（4:29:59以内）</option>
                  <option value="sub5">サブ5（4:59:59以内）</option>
                  <option value="sub6">サブ6（5:59:59以内）</option>
                </select>
              </div>
            )}

            {/* スタートボタン */}
            <button
              onClick={handleStart}
              style={{
                marginTop: "10px",
                padding: "16px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
              }}
            >
              🎵 Bring Me a Higher Run! 🏃
            </button>
          </div>

          {/* フッター */}
          <div style={{ marginTop: "30px", textAlign: "center", fontSize: "12px", color: "#999" }}>
            <p>初フルマラソンチャレンジャーを応援します</p>
          </div>
        </div>
      </div>
    );
  }

  // ゲームプレイ中（仮画面）
  if (gamePhase === "playing") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "white"
      }}>
        <div style={{ textAlign: "center", maxWidth: "600px" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎵</div>
          <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>Coming Soon...</h1>
          <div style={{
            background: "rgba(255,255,255,0.2)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
          }}>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>入力された情報：</p>
            <p>🏁 {formData.raceName}</p>
            <p>📅 {formData.raceDate}</p>
            <p>🎯 {
              formData.level === "beginner" ? "🔰 初心者" :
              formData.level === "experienced" ? "🏃 完走経験者" :
              "⚡ タイムを狙う"
            }</p>
            {formData.goalTime && <p>⏱️ {formData.goalTime}</p>}
          </div>
          <button
            onClick={() => setGamePhase("input")}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              color: "#667eea",
              background: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ← 入力画面に戻る
          </button>
        </div>
      </div>
    );
  }

  return null;
}
