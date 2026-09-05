/** Lightweight, code-native illustration for mobile and reduced-motion users. */
export default function PackageVisual() {
  return (
    <div className="package-fallback" aria-hidden="true">
      <svg viewBox="0 0 300 280">
        <path d="m45 78 119-40 96 47-111 44Z" fill="#dfae76" />
        <path d="m45 78 104 51v122L47 192Z" fill="#b77e49" />
        <path d="m149 129 111-44-2 121-109 45Z" fill="#ca9259" />
        <path d="m92 62 24-8 106 47-23 10Z" fill="#ff5a36" />
        <path d="m199 111 23-10-1 122-23 9Z" fill="#ff3b30" />
        <path d="m62 144 47 25v35l-47-25Z" fill="#ece5d8" />
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            d={`m${67 + i * 3.6} ${155 + i * 1.9}v22`}
            stroke="#362b21"
            strokeWidth={i % 3 === 0 ? 2 : 1}
          />
        ))}
        <path d="m166 219 20-8" stroke="#553b25" strokeWidth="3" />
        <text
          x="62"
          y="122"
          fill="#f5e7d3"
          fontSize="9"
          transform="rotate(28 62 122)"
        >
          NHẬP HÀNG TRUNG
        </text>
      </svg>
    </div>
  );
}
