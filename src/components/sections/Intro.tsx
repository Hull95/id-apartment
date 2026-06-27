export function Intro({ brand }: { brand: string }) {
  return (
    <div className="intro" id="intro">
      <div className="loader-house">
        <div className="loader-ring" />
        <svg viewBox="0 0 60 60">
          <path className="lh-path" d="M10 30 L30 12 L50 30 M15 27 L15 48 L45 48 L45 27" />
          <circle className="lh-fill" cx="30" cy="40" r="5" />
        </svg>
      </div>
      <div className="loader-text">{brand}</div>
      <div className="loader-dots">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
