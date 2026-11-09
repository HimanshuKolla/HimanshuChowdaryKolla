import { useEffect, useRef, useState } from "react";
import bgm from "./assets/bgm.mp3";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  // Try to start playback. Browsers block autoplay with sound until the
  // user interacts, so we also wire a one-time gesture listener below.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setStarted(true))
        .catch(() => {});
    };

    tryPlay();

    const onFirstGesture = () => {
      if (!audioRef.current) return;
      audioRef.current.play().then(() => setStarted(true)).catch(() => {});
      removeGestureListeners();
    };
    const removeGestureListeners = () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };

    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);
    window.addEventListener("touchstart", onFirstGesture);

    return removeGestureListeners;
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // Ensure playback has begun (clicking the button counts as a gesture).
    if (audio.paused) audio.play().then(() => setStarted(true)).catch(() => {});
    const next = !muted;
    audio.muted = next;
    setMuted(next);
  };

  return (
    <>
      <style>{`
        .bgm-btn {
          position: fixed;
          top: 14px;
          right: 16px;
          z-index: 9999;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6, 12, 46, 0.72);
          border: 1px solid rgba(140, 239, 255, 0.55);
          border-radius: 5px;
          cursor: pointer;
          color: #8df6ff;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 7px rgba(0, 0, 0, 0.35);
          transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .bgm-btn:hover {
          transform: scale(1.06);
          background: rgba(12, 24, 86, 0.9);
          border-color: #8df6ff;
          color: #d2fdff;
        }
        .bgm-btn:active { transform: scale(0.96); }
        .bgm-btn svg { width: 15px; height: 15px; display: block; }
        .bgm-wave {
          transition: opacity 0.15s ease;
        }
        .bgm-btn.muted { color: #ff5e74; border-color: rgba(255, 94, 116, 0.6); }
        .bgm-btn.muted:hover { border-color: #ff5e74; color: #ff93a3; }
      `}</style>

      <audio ref={audioRef} src={bgm} loop preload="auto" />

      <button
        className={`bgm-btn${muted ? " muted" : ""}`}
        onClick={toggleMute}
        aria-label={muted ? "Unmute music" : "Mute music"}
        title={muted ? "Unmute music" : "Mute music"}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* speaker body */}
          <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" stroke="currentColor" />
          {!muted ? (
            <>
              {/* sound waves */}
              <path className="bgm-wave" d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path className="bgm-wave" d="M18.5 6a9 9 0 0 1 0 12" />
            </>
          ) : (
            <>
              {/* X for muted */}
              <line x1="16" y1="9" x2="21" y2="14" />
              <line x1="21" y1="9" x2="16" y2="14" />
            </>
          )}
        </svg>
      </button>
    </>
  );
}
