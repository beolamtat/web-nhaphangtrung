"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Reveal } from "./Animation";
import { checkpoints, demoOrder } from "@/data/home/tracking";

/** Gulf of Tonkin and the South China Sea; everything above the line is land. */
const SEA =
  "M378 640C344 600 302 540 268 498C255 490 250 484 249 476C240 440 250 410 258 399C285 370 315 345 342 326C375 315 415 295 452 280C470 276 480 274 493 273C520 276 545 278 563 280C598 288 622 298 645 302C662 304 674 303 683 301C730 285 780 265 821 255C880 245 930 235 969 231C1000 227 1020 225 1034 224L1200 215V640Z";
/** The road the shipment actually travels: Quảng Châu → Ngô Châu → Nam Ninh → Hữu Nghị → Hà Nội. */
const ROAD =
  "M951 168C900 150 830 134 766 140C660 152 555 172 489 189C440 205 385 222 342 238C315 262 280 290 263 313C252 345 220 375 205 405";
/** The slower alternative most shoppers ask about, drawn for context only. */
const SEALANE =
  "M969 231C930 270 860 300 780 312C700 324 620 330 560 336C480 344 410 336 342 326";
const BORDER = "M452 280C420 272 380 256 342 238C300 228 220 232 160 244C110 254 60 260 0 264";

const LOOP_SECONDS = 16;

export default function LogisticsJourney() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  /** The panel follows the parcel until the reader takes over by picking a stop. */
  const [following, setFollowing] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const point = checkpoints[selected];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (paused || !visible || document.hidden || preference.matches) svg.pauseAnimations();
      else svg.unpauseAnimations();
      if (preference.matches) svg.setCurrentTime(0);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(svg);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [paused]);

  useEffect(() => {
    const svg = svgRef.current;
    const route = routeRef.current;
    if (!svg || !route || !following || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Where each stop sits along the route, as a fraction of its length.
    const total = route.getTotalLength();
    const marks = checkpoints.map((stop) => {
      let nearest = 0;
      let best = Infinity;
      for (let step = 0; step <= 240; step += 1) {
        const at = route.getPointAtLength((step / 240) * total);
        const distance = (at.x - stop.x) ** 2 + (at.y - stop.y) ** 2;
        if (distance < best) {
          best = distance;
          nearest = step / 240;
        }
      }
      return nearest;
    });

    const tick = () => {
      if (document.hidden) return;
      const progress = (svg.getCurrentTime() % LOOP_SECONDS) / LOOP_SECONDS;
      // The nearest stop, so every checkpoint gets a fair share of the loop.
      let nearest = 0;
      let best = Infinity;
      marks.forEach((mark, index) => {
        const distance = Math.abs(progress - mark);
        if (distance < best) {
          best = distance;
          nearest = index;
        }
      });
      setSelected(nearest);
    };
    const timer = window.setInterval(tick, 200);
    tick();
    return () => window.clearInterval(timer);
  }, [following, paused]);

  const choose = (index: number) => {
    setFollowing(false);
    setSelected(index);
  };

  return (
    <section className="section logistics logistics-control" id="hanh-trinh">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow red">02 / HÀNH TRÌNH TRONG TẦM TAY</span>
            <h2>Vạn dặm giao thương.<br /><span className="muted">Từng chặng trong tầm mắt.</span></h2>
          </div>
          <p>Bốn chặng đường bộ từ Quảng Châu về Hà Nội.<br />Chọn một điểm dừng để xem việc gì diễn ra ở đó.</p>
        </Reveal>

        <div className="journey-layout" data-motion="journey">
          <div className="journey-map parchment-map">
            <div className="map-toolbar">
              <span>TRUNG QUỐC — VIỆT NAM · TUYẾN ĐƯỜNG BỘ</span>
              <small>Đơn minh hoạ {demoOrder.id} · {demoOrder.packages} · {demoOrder.weight}</small>
            </div>

            <div className="trade-map-canvas">
              <div className="trade-map-scroll">
              <svg ref={svgRef} viewBox="0 0 1200 640" role="img" aria-label="Sơ đồ tuyến đường bộ Quảng Châu — Nam Ninh — cửa khẩu Hữu Nghị — Hà Nội — giao tận nơi, kèm tuyến biển tham khảo. Không theo tỷ lệ địa lý.">
                <defs>
                  <pattern id="map-grid-paper" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" fill="none" stroke="#b7a17d" strokeWidth=".5" opacity=".22" />
                  </pattern>
                  <linearGradient id="trade-sea" x2=".3" y2="1">
                    <stop stopColor="#dde3d2" /><stop offset="1" stopColor="#e9ecdd" />
                  </linearGradient>
                  <radialGradient id="delta-glow" cx=".5" cy=".5" r=".5">
                    <stop stopColor="#c8a86f" stopOpacity=".28" /><stop offset="1" stopColor="#c8a86f" stopOpacity="0" />
                  </radialGradient>
                  <g id="ink-ridge">
                    <path d="m0 34 17-26 11 13 8-9 12 13 9-7 17 16Z" fill="#b3b59b" fillOpacity=".22" stroke="#8c957c" strokeWidth="1.1" strokeLinejoin="round" />
                    <path d="m17 8-4 21 9-9m19 1-3 14" fill="none" stroke="#8c957c" strokeWidth=".7" />
                  </g>
                </defs>

                <rect width="1200" height="640" fill="#f0e9d8" />
                <path d={SEA} fill="url(#trade-sea)" />
                <path d="M540 430c20-34 70-50 120-44 46 6 76 32 70 66-6 34-54 60-104 56-50-4-90-32-86-78Z" fill="#f0e9d8" stroke="#a2ab92" strokeWidth="1.2" />
                <path d={SEA} fill="none" stroke="#a2ab92" strokeWidth="1.6" />
                <rect width="1200" height="640" fill="url(#map-grid-paper)" />

                {/* Two river deltas, the reason both ends of the route exist at all. */}
                <circle cx="279" cy="322" r="52" fill="url(#delta-glow)" />
                <circle cx="962" cy="200" r="46" fill="url(#delta-glow)" />
                <g fill="none" stroke="#a89069" strokeWidth=".9" opacity=".55">
                  <path d="M263 313c26 4 52 9 79 13m-79-13c18 12 36 22 55 31m24-44c-24-6-49-9-79-9" />
                                </g>

                <g opacity=".85">
                  {[[560,128],[652,170],[712,100],[404,196],[318,180],[214,206],[132,236],[92,300],[88,352]].map(([x, y], i) => (
                    <use key={i} href="#ink-ridge" x={x} y={y} transform={`translate(${x} ${y}) scale(${i % 3 === 0 ? 1.25 : 0.9}) translate(${-x} ${-y})`} />
                  ))}
                </g>

                {/* Wave hatching, the way an old scroll marks open water. */}
                <g fill="none" stroke="#a8b4a0" strokeWidth="1" opacity=".6">
                  <path d="M420 400q20-8 40 0t40 0M400 430q20-8 40 0t40 0M440 545q20-8 40 0t40 0M862 482q20-8 40 0t40 0M882 508q20-8 40 0t40 0" />
                </g>

                <path d={BORDER} fill="none" stroke="#9a7f54" strokeWidth="1.4" strokeDasharray="7 5" opacity=".8" />
                <text x="52" y="232" className="atlas-border">BIÊN GIỚI TRUNG — VIỆT</text>

                <text x="770" y="96" className="atlas-country">TRUNG QUỐC</text>
                <text x="46" y="470" className="atlas-country atlas-country-vn">VIỆT NAM</text>
                <text x="806" y="424" className="atlas-sea">BIỂN ĐÔNG</text>
                <text x="452" y="372" className="atlas-sea">VỊNH BẮC BỘ</text>
                <text x="635" y="452" textAnchor="middle" className="atlas-island">ĐẢO HẢI NAM</text>

                <g transform="translate(1120 196)" stroke="#9d8057" fill="none">
                  <path d="M0-19V19M-13 0H13m-13-19-4 10h8Z" />
                  <text y="-27" textAnchor="middle" stroke="none" fill="#887352" fontSize="10">BẮC</text>
                </g>
                <g transform="translate(60 512)" className="atlas-scale">
                  <path d="M0 0h179M0-5v10M89.5-4v8M179-5v10" stroke="#9d8057" fill="none" />
                  <text y="-11" fill="#887352">0</text><text x="168" y="-11" fill="#887352">200 km</text>
                </g>

                {/* Sea lane first so the road always reads on top of it. */}
                <path d={SEALANE} fill="none" stroke="#7d8f86" strokeWidth="1.6" strokeDasharray="2 8" strokeLinecap="round" opacity=".85" />
                <text x="726" y="286" className="atlas-lane">TUYẾN BIỂN · 7–10 NGÀY</text>
                <g className="atlas-port"><path d="m342 320 7 7-7 7-7-7Z" fill="#f3ece0" stroke="#7d8f86" /><text x="356" y="316" className="atlas-lane">CẢNG HẢI PHÒNG</text></g>

                <path d={ROAD} fill="none" stroke="#b58f5e" strokeWidth="9" opacity=".14" />
                <path id="trade-route" ref={routeRef} d={ROAD} pathLength="1" fill="none" stroke="#983e30" strokeWidth="2.4" strokeLinecap="round" />

                {checkpoints.map((stop, index) => {
                  const active = selected === index;
                  return (
                    <g key={stop.code} className={active ? "atlas-stop is-active" : "atlas-stop"}>
                      {active && <circle cx={stop.x} cy={stop.y} r="21" fill="#963d3012" stroke="#963d30" strokeWidth="1.2" />}
                      <circle cx={stop.x} cy={stop.y} r={active ? 12 : 9} fill="#f7f0e1" stroke="#963d30" strokeWidth={active ? 1.6 : 1.1} />
                      <circle cx={stop.x} cy={stop.y} r="3.4" fill="#963d30" />
                      <text x={stop.x} y={stop.y - 30} textAnchor="middle" className="atlas-city">{stop.city}</text>
                      <text x={stop.x} y={stop.y - 44} textAnchor="middle" className="atlas-city-cn" lang="zh-Hans">{stop.cn}</text>
                    </g>
                  );
                })}

                <g fill="none" stroke="#983e30" strokeWidth="1.2" strokeDasharray="3 5" opacity=".7">
                  <path d="M205 405c-28 14-48 30-62 50m62-50c-6 26-8 48-6 70m6-70c22 16 38 34 48 56" />
                </g>

                <g className="atlas-carrier" aria-hidden="true">
                  <circle r="16" fill="#f7efdb" stroke="#9c4635" />
                  <path d="m-7-4 7-4 7 4v8L0 8l-7-4Zm0 0 7 4 7-4M0 0v8" fill="#b46345" stroke="#f8eed6" strokeWidth="1.2" />
                  <animateMotion dur="16s" repeatCount="indefinite" calcMode="paced"><mpath href="#trade-route" /></animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.04;.94;1" dur="16s" repeatCount="indefinite" />
                </g>

                <g className="atlas-legend" transform="translate(48 56)">
                  <rect width="196" height="74" fill="#f4ecd9d9" stroke="#c9ae82" />
                  <path d="M16 28h34" stroke="#983e30" strokeWidth="2.4" strokeLinecap="round" />
                  <text x="60" y="32">Đường bộ · 4–6 ngày</text>
                  <path d="M16 54h34" stroke="#7d8f86" strokeWidth="1.6" strokeDasharray="2 8" strokeLinecap="round" />
                  <text x="60" y="58">Đường biển · 7–10 ngày</text>
                </g>


                <g className="atlas-archipelago">
                  <rect x="742" y="556" width="96" height="56" rx="3" fill="none" stroke="#8a9a90" strokeDasharray="4 4" />
                  {[[-24,-8,3.2],[-9,-16,2.4],[5,-5,3.6],[18,-14,2.2],[-1,7,2.6],[17,9,3],[-18,11,2],[29,-1,2.4]].map(([dx, dy, r], i) => (
                    <circle key={i} cx={790 + dx} cy={584 + dy} r={r} fill="#dfd6bd" stroke="#8a8b74" strokeWidth=".8" />
                  ))}
                  <text x="790" y="546" textAnchor="middle" className="atlas-archipelago-name">QUẦN ĐẢO HOÀNG SA (VIỆT NAM)</text>
                </g>

                <g className="atlas-inset" transform="translate(958 366)">
                  <rect width="212" height="238" fill="#f0e9d8" stroke="#a2ab92" />
                  <rect x="7" y="7" width="198" height="224" fill="url(#trade-sea)" />
                  {[[64,116,3.4],[92,96,2.6],[118,124,3.8],[86,146,2.4],[142,102,2.2],[54,152,2.8],[132,158,3.2],[104,74,2],[156,134,2.6],[74,88,2.2],[120,180,2.4],[46,128,2]].map(([cx, cy, r], i) => (
                    <circle key={i} cx={cx} cy={cy} r={r} fill="#dfd6bd" stroke="#8a8b74" strokeWidth=".8" />
                  ))}
                  <text x="106" y="34" textAnchor="middle" className="atlas-archipelago-name">QUẦN ĐẢO TRƯỜNG SA</text>
                  <text x="106" y="50" textAnchor="middle" className="atlas-archipelago-name">(VIỆT NAM)</text>
                  <text x="106" y="220" textAnchor="middle" className="atlas-inset-note">KHUNG PHỤ · THU NHỎ</text>
                </g>

                <text x="60" y="622" className="atlas-note">SA BÀN GIAO THƯƠNG · KHÔNG THEO TỶ LỆ</text>
              </svg>
              </div>

              <button className="map-motion-toggle" onClick={() => { if (paused) setFollowing(true); setPaused(!paused); }} aria-pressed={paused} aria-label={paused ? "Tiếp tục mô phỏng hành trình" : "Dừng mô phỏng hành trình"}>
                {paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? "Tiếp tục" : "Dừng mô phỏng"}</span>
              </button>
            </div>

            <div className="checkpoint-tabs" aria-label="Chọn điểm trên hành trình">
              {checkpoints.map((stop, index) => (
                <button key={stop.code} aria-pressed={selected === index} className={selected === index ? "active" : ""} onClick={() => choose(index)}>
                  <span>0{index + 1}</span>{stop.city}
                </button>
              ))}
            </div>

            <div className="checkpoint-detail" aria-live="polite">
              <span className="checkpoint-code">{point.code}</span>
              <div>
                <strong>{point.status}</strong>
                <span>{point.city} · {point.time}</span>
                <p>{point.detail}</p>
              </div>
              <span className="checkpoint-leg">{point.leg}</span>
            </div>

            <div className="journey-bottom">
              <span>≈ 1.150 km đường bộ</span>
              <span>4–6 ngày dự kiến</span>
              <span>Chuyển động minh hoạ, không phải GPS trực tiếp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
