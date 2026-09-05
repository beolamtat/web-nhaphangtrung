"use client";
import { useState } from "react";
import { Check, ArrowUpRight, Search } from "lucide-react";
import { demoOrder } from "@/data/home/tracking";
export default function TrackingPreview() {
  const [code, setCode] = useState(demoOrder.id);
  const [result, setResult] = useState<"idle" | "found" | "missing">("idle");
  return (
    <div className={`tracking-preview tracking-${result}`} id="theo-doi-don" data-motion="tracking">
      <div className="tracking-header">
        <span className="eyebrow">TRA CỨU HÀNH TRÌNH</span>
        <span className="demo-label">Bản xem thử</span>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResult(
            code.trim().toUpperCase() === demoOrder.id ? "found" : "missing",
          );
        }}
      >
        <label htmlFor="tracking-code">Mã đơn hàng</label>
        <div className="tracking-input">
          <input
            id="tracking-code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setResult("idle");
            }}
            placeholder={demoOrder.id}
            required
            spellCheck={false}
          />
          <button aria-label="Tra cứu mã đơn" type="submit">
            <Search size={18} />
          </button>
        </div>
        <button className="tracking-submit" type="submit">
          Theo dõi đơn hàng <ArrowUpRight size={17} />
        </button>
      </form>
      <div className="tracking-feedback" aria-live="polite">
        {result === "found" && <p>Đã tìm thấy đơn minh họa {demoOrder.id}.</p>}
        {result === "missing" && (
          <p>
            Chưa tìm thấy mã này trong bản xem thử. Dùng mã{" "}
            <button
              onClick={() => {
                setCode(demoOrder.id);
                setResult("found");
              }}
            >
              {demoOrder.id}
            </button>
            .
          </p>
        )}
      </div>
      {result !== "missing" && (
        <>
          <div className="tracking-status">
            <span className="live-dot" />
            <h3>{demoOrder.status}</h3>
            <p>
              {demoOrder.id} · {demoOrder.packages} · {demoOrder.weight}
            </p>
          </div>
          <ol className="tracking-timeline">
            {demoOrder.steps.map((step) => (
              <li className={step.state} key={step.label}>
                <span className="timeline-dot" aria-hidden="true">
                  {step.state === "done" ? (
                    <Check size={11} />
                  ) : step.state === "active" ? (
                    "●"
                  ) : (
                    "○"
                  )}
                </span>
                <div>
                  <strong>{step.label}</strong>
                  <small>{step.location}</small>
                </div>
                <time>{step.time}</time>
              </li>
            ))}
          </ol>
          <p className="tracking-note">
            Hành trình và thời gian minh họa, không phải dữ liệu vận đơn thực
            tế.
          </p>
        </>
      )}
    </div>
  );
}
