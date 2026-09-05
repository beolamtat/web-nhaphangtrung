"use client";
import { useState } from "react";
import { ArrowUpRight, Box, Bell, Wallet, LayoutDashboard } from "lucide-react";
import { Reveal } from "./Animation";
import {
  dashboardMetrics,
  dashboardOrders,
  notifications,
} from "@/data/home/dashboard";
const tabs = ["Tổng quan", "Đơn hàng", "Tài chính", "Thông báo"];
export default function DashboardPreview() {
  const [tab, setTab] = useState("Tổng quan");
  return (
    <section className="section container dashboard-section" id="quan-ly">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow red">
            07 / KHÔNG CHỈ NHẬP HÀNG. LÀ QUẢN LÝ KINH DOANH.
          </span>
          <h2>
            Mọi đơn hàng.
            <br />
            <span className="muted">Một nơi để quản lý.</span>
          </h2>
        </div>
        <div>
          <p>
            Đơn mua, dòng tiền và thông báo.
            <br />
            Một góc nhìn rõ ràng cho shop của bạn.
          </p>
          <a href="#dat-hang" className="text-link">
            Bắt đầu nhập hàng <ArrowUpRight size={17} />
          </a>
        </div>
      </Reveal>
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <span className="dashboard-monogram">
            NHT<span>.</span>
          </span>
          <span className="sidebar-caption">KHÔNG GIAN CỦA BẠN</span>
          <div
            role="tablist"
            aria-label="Xem trước quản lý tài khoản"
            onKeyDown={(e) => {
              const current = tabs.indexOf(tab);
              const next =
                e.key === "ArrowRight"
                  ? (current + 1) % tabs.length
                  : e.key === "ArrowLeft"
                    ? (current + tabs.length - 1) % tabs.length
                    : e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? tabs.length - 1
                        : -1;
              if (next >= 0) {
                e.preventDefault();
                setTab(tabs[next]);
                document.getElementById(`dashboard-tab-${next}`)?.focus();
              }
            }}
          >
            {tabs.map((name, i) => {
              const Icon = [LayoutDashboard, Box, Wallet, Bell][i];
              return (
                <button
                  role="tab"
                  tabIndex={tab === name ? 0 : -1}
                  id={`dashboard-tab-${i}`}
                  aria-selected={tab === name}
                  aria-controls="dashboard-content"
                  key={name}
                  onClick={() => setTab(name)}
                  className={tab === name ? "active" : ""}
                >
                  <Icon size={16} />
                  {name}
                  {name === "Thông báo" && <small>2</small>}
                </button>
              );
            })}
          </div>
          <div className="sidebar-profile">
            <span>MA</span>
            <div>
              Minh Anh<small>Tài khoản minh họa</small>
            </div>
          </div>
        </aside>
        <div
          className="dashboard-content"
          role="tabpanel"
          id="dashboard-content"
          aria-labelledby={`dashboard-tab-${tabs.indexOf(tab)}`}
          tabIndex={0}
        >
          <div className="dashboard-greeting">
            <div>
              <span>GÓC LÀM VIỆC / {tab.toLocaleUpperCase("vi-VN")}</span>
              <h3>
                Chào Minh Anh,
                <br className="mobile-break" /> sẵn sàng cho đơn hàng mới?
              </h3>
            </div>
            <span className="demo-label">Giao diện minh họa</span>
          </div>
          {(tab === "Tổng quan" || tab === "Đơn hàng") && (
            <>
              <div className="dashboard-metrics">
                {dashboardMetrics.map((m, i) => (
                  <div key={m.label}>
                    <span>0{i + 1} /</span>
                    <strong>{m.value.toString().padStart(2, "0")}</strong>
                    <small>{m.label}</small>
                  </div>
                ))}
              </div>
              <div className="dashboard-table-heading">
                <h4>
                  {tab === "Đơn hàng" ? "Đơn hàng của bạn" : "Đơn hàng gần đây"}
                </h4>
                <a href="#theo-doi-don">
                  Tra cứu hành trình <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Đơn hàng / Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá trị</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <strong>{order.id}</strong>
                          <small>
                            {order.name} · {order.market}
                          </small>
                        </td>
                        <td data-label="Số lượng">{order.count}</td>
                        <td data-label="Giá trị">{order.total}</td>
                        <td data-label="Trạng thái">
                          <span className={`order-state ${order.tone}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {(tab === "Tổng quan" || tab === "Tài chính") && (
            <div className="finance-preview">
              <div>
                <span>NGÂN SÁCH NHẬP HÀNG / THÁNG 09</span>
                <strong>
                  18.450.000 <small>đ</small>
                </strong>
                <p>Đã sử dụng 61,5% ngân sách dự kiến</p>
                <div className="budget-track">
                  <span />
                </div>
              </div>
              <div>
                <span>SỐ DƯ ĐẶT CỌC</span>
                <strong>
                  4.250.000 <small>đ</small>
                </strong>
                <p>Dữ liệu minh họa · Chưa kết nối ví</p>
                <a href="#bang-gia">
                  Dự tính chi phí đơn tiếp theo <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          )}
          {tab === "Thông báo" && (
            <div className="dashboard-notifications">
              {notifications.map((n) => (
                <article key={n.title}>
                  <span className="live-dot" />
                  <div>
                    <h4>{n.title}</h4>
                    <p>{n.detail}</p>
                    <time>{n.time}</time>
                  </div>
                  <a href="#theo-doi-don" aria-label={`Xem ${n.title}`}>
                    <ArrowUpRight size={18} />
                  </a>
                </article>
              ))}
            </div>
          )}
          <div className="dashboard-footnote">
            <span className="live-dot" /> Bản xem trước — chưa kết nối tài
            khoản, đơn hàng hoặc giao dịch thực tế.
          </div>
        </div>
      </div>
    </section>
  );
}
