import { useLocation, useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on the main menu (home route).
  if (location.pathname === "/") return null;

  return (
    <>
      <style>{`
        .back-btn {
          position: fixed;
          top: 14px;
          left: 16px;
          z-index: 9999;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(6, 12, 46, 0.72);
          border: 2px solid rgba(140, 239, 255, 0.55);
          border-radius: 10px;
          cursor: pointer;
          color: #8df6ff;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .back-btn:hover {
          transform: scale(1.06);
          background: rgba(12, 24, 86, 0.9);
          border-color: #8df6ff;
          color: #d2fdff;
        }
        .back-btn:active { transform: scale(0.96); }
        .back-btn svg { width: 24px; height: 24px; display: block; }
      `}</style>

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        title="Back"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="6" y2="12" />
          <polyline points="12 5 5 12 12 19" />
        </svg>
      </button>
    </>
  );
}
