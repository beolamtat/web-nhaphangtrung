/** Demo shipment shown in the journey map toolbar. Illustrative, not live carrier data. */
export const demoOrder = {
  id: "NHT-2026-3821",
  packages: "3 kiện",
  weight: "12,5 kg",
};

/**
 * Road route Quảng Châu → Hà Nội. Coordinates are plotted in the map's
 * lon/lat frame (103–116°E, 17,5–25,5°N) so the stops sit where they belong.
 */
export const checkpoints = [
  {
    code: "CN / 01",
    city: "Quảng Châu",
    cn: "广州",
    x: 951,
    y: 168,
    status: "Nhận hàng & kiểm đếm",
    detail:
      "Kho NHT Quảng Châu nhận hàng từ nhà cung cấp, đếm đủ số kiện, chụp ảnh thực tế và đóng gói lại trước khi lên chuyến.",
    time: "03/09 · 10:20",
    leg: "Điểm khởi hành",
  },
  {
    code: "CN / 02",
    city: "Nam Ninh",
    cn: "南宁",
    x: 489,
    y: 189,
    status: "Ghép chuyến, xuất kho",
    detail:
      "Hàng được ghép cùng các đơn khác lên chuyến xe NHT-08 chạy thẳng hướng biên giới Lạng Sơn.",
    time: "04/09 · 16:05",
    leg: "≈ 570 km · 1 ngày",
  },
  {
    code: "CN → VN",
    city: "Hữu Nghị",
    cn: "友谊关",
    x: 342,
    y: 238,
    status: "Thông quan cửa khẩu",
    detail:
      "Khai báo hải quan, kiểm hoá và sang xe Việt Nam ngay tại cửa khẩu Hữu Nghị, Lạng Sơn.",
    time: "05/09 · 08:45",
    leg: "≈ 230 km · 6 giờ",
  },
  {
    code: "VN / 01",
    city: "Hà Nội",
    cn: "河内",
    x: 263,
    y: 313,
    status: "Về kho Việt Nam",
    detail:
      "Kho Hà Nội đối soát mã vận đơn, cân lại thực tế và chốt cước trước khi chia tuyến giao.",
    time: "Dự kiến 06/09",
    leg: "≈ 170 km · 4 giờ",
  },
  {
    code: "VN / 02",
    city: "Giao tận nơi",
    cn: "送货上门",
    x: 205,
    y: 405,
    status: "Giao đến tận tay bạn",
    detail:
      "Nội thành Hà Nội giao trong 24 giờ; các tỉnh thành khác 1–3 ngày qua đối tác vận chuyển.",
    time: "Dự kiến 06–07/09",
    leg: "Toàn quốc",
  },
];
