import { useState } from "react";
import { events } from "./eventsData";

const COLORS = {
  good: { bg: "#d4edda", border: "#28a745", text: "#155724" },
  normal: { bg: "#fff3cd", border: "#ffc107", text: "#856404" },
  bad: { bg: "#f8d7da", border: "#dc3545", text: "#721c24" },
};

const OUTCOME_LABEL = {
  good: "✅ 成功",
  normal: "⚠️ まあまあ",
  bad: "❌ 失敗",
};

export default function HigherRunner() {
  const [gamePhase, setGamePhase] = useState("input"); // input, playing, finished
  const [formData, setFormData] = useState({
    raceName: "",
    raceDate: "",
    level: "", // beginner, experienced, time-attack
    goalTime: "",
  });

  const [currentEventId, setCurrentEventId] = useState("F1");
  const [selectedChoice, setSelectedChoice] = useState(null); // "A" | "B" | "C"
  const [showResult, setShowResult] = useState(false);

  const EVENT_ORDER = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25", "F26"];

  const handleStart = () => {
    if (!formData.level) {
      alert("レベルを選択してください");
      return;
    }
    if (formData.level === "time-attack" && !formData.goalTime) {
      alert("目標タイムを入力してください");
      return;
    }
    setCurrentEventId("F1");
    setSelectedChoice(null);
    setShowResult(false);
    setGamePhase("playing");
  };

  const handleChoiceSelect = (choiceId) => {
    if (showResult) return;
    setSelectedChoice(choiceId);
  };

  const handleDecide = () => {
    if (!selectedChoice) return;
    setShowResult(true);
  };

  const handleNextEvent = () => {
    const currentIndex = EVENT_ORDER.indexOf(currentEventId);
    const nextId = EVENT_ORDER[currentIndex + 1];
    if (nextId && events[nextId]) {
      setCurrentEventId(nextId);
      setSelectedChoice(null);
      setShowResult(false);
    } else {
      setGamePhase("finished");
    }
  };

  const handlePrevEvent = () => {
    const currentIndex = EVENT_ORDER.indexOf(currentEventId);
    const prevId = EVENT_ORDER[currentIndex - 1];
    if (prevId && events[prevId]) {
      setCurrentEventId(prevId);
      setSelectedChoice(null);
      setShowResult(false);
    }
  };

  // ─────────────────────────────────────────
  // 入力フェーズ
  // ─────────────────────────────────────────
  if (gamePhase === "input") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{
          maxWidth: "500px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
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
              marginBottom: "8px",
            }}>
              Higher Runner
            </h1>
            <p style={{ color: "#666", fontSize: "14px" }}>フルマラソン完走への道</p>
            <p style={{ color: "#999", fontSize: "12px", marginTop: "8px", fontStyle: "italic" }}>
              "Bring me a higher run..."
            </p>
          </div>

          {/* フォーム */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* レベル選択 */}
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "12px" }}>
                🎯 あなたのレベル
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { value: "beginner", icon: "🔰", label: "初心者", desc: "初フルマラソン" },
                  { value: "experienced", icon: "🏃", label: "完走経験者", desc: "タイムより完走重視" },
                  { value: "time-attack", icon: "⚡", label: "タイムを狙う", desc: "目標タイムがある" },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({ ...formData, level: level.value })}
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
                      gap: "12px",
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
                  onChange={(e) => setFormData({ ...formData, goalTime: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: "16px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    outline: "none",
                    cursor: "pointer",
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
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
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
            <p style={{ marginTop: "8px", fontSize: "11px", color: "#bbb" }}>
              ※ 将来的に大会別カスタマイズ機能を搭載予定です
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // イベント画面（playing フェーズ）
  // ─────────────────────────────────────────
  if (gamePhase === "playing") {
    const eventData = events[currentEventId];
    const isBreak = eventData.type === "break";
    const levelData = isBreak ? null : eventData.levels[formData.level];
    const chosen = levelData ? levelData.choices.find((c) => c.id === selectedChoice) : null;
    const resultColor = chosen ? COLORS[chosen.result.outcome] : null;

    const nextButtonLabel = (() => {
      const nextIndex = EVENT_ORDER.indexOf(currentEventId) + 1;
      const nextId = EVENT_ORDER[nextIndex];
      return nextId && events[nextId]
        ? `次のイベントへ → ${nextId} 🏃`
        : "エンディングへ 🎉";
    })();

    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}>
        <div style={{
          maxWidth: "500px",
          width: "100%",
          margin: "40px auto 0",
          marginBottom: "40px",
        }}>

          {/* 上部バー */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
              🏁 {formData.raceName}
            </span>
            <button
              onClick={() => setGamePhase("input")}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                padding: "6px 14px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              ← 最初に戻る
            </button>
          </div>

          {/* イベントカード */}
          <div style={{
            background: "rgba(255,255,255,0.97)",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}>

            {/* 前後移動ボタン */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              {EVENT_ORDER.indexOf(currentEventId) > 0 ? (
                <button
                  onClick={handlePrevEvent}
                  style={{
                    background: "#e9ecef",
                    border: "none",
                    borderRadius: "8px",
                    color: "#555",
                    padding: "5px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  ← 前へ
                </button>
              ) : (
                <span />
              )}
              {EVENT_ORDER.indexOf(currentEventId) < EVENT_ORDER.length - 1 ? (
                <button
                  onClick={handleNextEvent}
                  style={{
                    background: "#e9ecef",
                    border: "none",
                    borderRadius: "8px",
                    color: "#555",
                    padding: "5px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  次へ →
                </button>
              ) : (
                <span />
              )}
            </div>

            {/* イベントタイトル */}
            <div style={{ marginBottom: "20px" }}>
              <span style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                fontSize: "11px",
                fontWeight: "bold",
                padding: "4px 10px",
                borderRadius: "20px",
                marginBottom: "10px",
                letterSpacing: "0.5px",
              }}>
                {eventData.phase}
              </span>
              <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#222", margin: 0 }}>
                {eventData.title}
              </h2>
            </div>

            {/* ─── break イベント（豆知識タイム） ─── */}
            {isBreak && (
              <>
                <div style={{
                  background: "#f8f9ff",
                  borderLeft: "4px solid #667eea",
                  borderRadius: "0 10px 10px 0",
                  padding: "20px",
                  marginBottom: "24px",
                  fontSize: "15px",
                  color: "#444",
                  lineHeight: "1.8",
                  whiteSpace: "pre-line",
                }}>
                  {eventData.content}
                </div>
                <button
                  onClick={handleNextEvent}
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "white",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
                  }}
                >
                  {nextButtonLabel}
                </button>
              </>
            )}

            {/* ─── 通常イベント（選択肢あり） ─── */}
            {!isBreak && (
              <>
                {/* 状況説明 */}
                <div style={{
                  background: "#f8f9ff",
                  borderLeft: "4px solid #667eea",
                  borderRadius: "0 10px 10px 0",
                  padding: "16px",
                  marginBottom: "24px",
                  fontSize: "15px",
                  color: "#444",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                }}>
                  {levelData.description}
                </div>

                {/* 選択肢 */}
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "bold", color: "#888", marginBottom: "12px" }}>
                    どうする？
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {levelData.choices.map((choice) => {
                      const isSelected = selectedChoice === choice.id;
                      const isDecided = showResult;
                      const isWinner = isDecided && isSelected;

                      let borderColor = "#e0e0e0";
                      let bgColor = "white";
                      if (isSelected && !isDecided) { borderColor = "#667eea"; bgColor = "rgba(102,126,234,0.08)"; }
                      if (isWinner) { borderColor = resultColor.border; bgColor = resultColor.bg; }
                      if (isDecided && !isSelected) { bgColor = "#f5f5f5"; }

                      return (
                        <button
                          key={choice.id}
                          onClick={() => handleChoiceSelect(choice.id)}
                          disabled={isDecided}
                          style={{
                            padding: "14px 16px",
                            border: `2px solid ${borderColor}`,
                            borderRadius: "12px",
                            background: bgColor,
                            cursor: isDecided ? "default" : "pointer",
                            textAlign: "left",
                            fontSize: "15px",
                            color: isDecided && !isSelected ? "#aaa" : "#333",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: isSelected ? "#667eea" : "#eee",
                            color: isSelected ? "white" : "#888",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            fontWeight: "bold",
                            flexShrink: 0,
                          }}>
                            {choice.id}
                          </span>
                          {choice.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 決定ボタン */}
                {!showResult && (
                  <button
                    onClick={handleDecide}
                    disabled={!selectedChoice}
                    style={{
                      width: "100%",
                      padding: "14px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "white",
                      background: selectedChoice
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "#ccc",
                      border: "none",
                      borderRadius: "12px",
                      cursor: selectedChoice ? "pointer" : "not-allowed",
                      transition: "all 0.3s",
                      marginBottom: "8px",
                    }}
                  >
                    これで決定！
                  </button>
                )}

                {/* 結果表示 */}
                {showResult && chosen && (
                  <div style={{ marginTop: "8px" }}>
                    {/* アウトカムラベル */}
                    <div style={{
                      display: "inline-block",
                      background: resultColor.bg,
                      border: `2px solid ${resultColor.border}`,
                      color: resultColor.text,
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      fontSize: "14px",
                      marginBottom: "14px",
                    }}>
                      {OUTCOME_LABEL[chosen.result.outcome]}
                    </div>

                    {/* 結果テキスト */}
                    <div style={{
                      background: resultColor.bg,
                      border: `1px solid ${resultColor.border}`,
                      borderRadius: "12px",
                      padding: "16px",
                      marginBottom: "14px",
                      fontSize: "15px",
                      color: "#333",
                      lineHeight: "1.7",
                      whiteSpace: "pre-line",
                    }}>
                      {chosen.result.text}
                    </div>

                    {/* Tips */}
                    <div style={{
                      background: "#fffbea",
                      border: "1px solid #f0c040",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      marginBottom: "14px",
                      fontSize: "13px",
                      color: "#6b5900",
                      lineHeight: "1.6",
                    }}>
                      💡 <strong>Tips：</strong>{chosen.tip}
                    </div>

                    {/* 教育コンテンツ */}
                    <div style={{
                      background: "#f0f4ff",
                      border: "1px solid #c5d0f5",
                      borderRadius: "12px",
                      padding: "16px",
                      marginBottom: "24px",
                      fontSize: "13px",
                      color: "#334",
                      lineHeight: "1.8",
                      whiteSpace: "pre-line",
                    }}>
                      {levelData.educationContent}
                    </div>

                    {/* 次へボタン */}
                    <button
                      onClick={handleNextEvent}
                      style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "white",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
                      }}
                    >
                      {nextButtonLabel}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // エンディング画面（finished フェーズ）
  // ─────────────────────────────────────────
  if (gamePhase === "finished") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{
          maxWidth: "500px",
          width: "100%",
          background: "rgba(255,255,255,0.97)",
          borderRadius: "20px",
          padding: "36px 28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}>
          {/* タイトル */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏃</div>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", margin: "0 0 8px" }}>
              お疲れさまでした！
            </h2>
            <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.8", margin: 0 }}>
              Higher Runner を<br />
              最後まで体験いただき<br />
              ありがとうございました。
            </p>
            <p style={{ fontSize: "14px", color: "#777", lineHeight: "1.7", marginTop: "14px" }}>
              フルマラソン完走への道、<br />
              少しでもイメージできましたか？
            </p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 28px" }} />

          {/* 今後の予定 */}
          <div style={{ textAlign: "left", marginBottom: "28px" }}>
            <p style={{
              fontSize: "13px",
              fontWeight: "bold",
              color: "#888",
              letterSpacing: "0.5px",
              marginBottom: "16px",
              textAlign: "center",
            }}>
              📍 今後の予定
            </p>
            {[
              { icon: "🌤️", title: "天気予報連携", desc: "大会当日の天気に応じた\nカスタムアドバイス" },
              { icon: "🗺️", title: "大会別コース情報", desc: "各マラソン大会の特性に\n合わせた攻略法" },
              { icon: "💬", title: "ランナーの声", desc: "実際の経験談を反映した\nリアルなTips" },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                display: "flex",
                gap: "14px",
                marginBottom: "16px",
                background: "#f8f9ff",
                borderRadius: "12px",
                padding: "14px 16px",
              }}>
                <span style={{ fontSize: "22px", lineHeight: 1 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "14px", color: "#333", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", whiteSpace: "pre-line" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 24px" }} />

          {/* キャッチコピー */}
          <p style={{ fontSize: "14px", color: "#888", fontStyle: "italic", marginBottom: "24px" }}>
            🎵 Bring me a higher run...
          </p>

          {/* ボタン */}
          <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
            <button
              onClick={() => {
                setGamePhase("input");
                setCurrentEventId("F1");
                setSelectedChoice(null);
                setShowResult(false);
              }}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "white",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
              }}
            >
              最初からやり直す
            </button>
            <a
              href="https://github.com/MonoMonoMonozu/higher-runner"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#555",
                background: "#f0f0f0",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              GitHub で見る
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
