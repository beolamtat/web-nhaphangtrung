import { stats } from "@/data/home/stats";
export function Stats() {
  return (
    <section
      className="container stats"
      aria-label="Nhập Hàng Trung qua những con số"
      data-motion="stats"
    >
      <div className="stats-intro">
        <span className="eyebrow">
          MỖI CHUYẾN HÀNG.
          <br />
          MỘT KẾT NỐI.
        </span>
      </div>
      {stats.map((s) => (
        <div key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
      <p>Bản giới thiệu quy trình · Chưa tiếp nhận giao dịch trực tuyến</p>
    </section>
  );
}
