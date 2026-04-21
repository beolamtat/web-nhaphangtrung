export interface ProductImage {
  gradient: string;
  blockA: string;
  blockB: string;
  label: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  theme: string;
  accent: string;
  description: string;
  specs: string[];
  sold: number;
  rating: number;
  shop: string;
  images: ProductImage[];
}

const img = (g: string, a: string, b: string, l: string): ProductImage => ({
  gradient: g,
  blockA: a,
  blockB: b,
  label: l,
});

export const products: Product[] = [
  {
    id: "1",
    title:
      "Móc treo acrylic nhân vật đặt trước, tông màu ấm nổi bật cho góc bàn học",
    price: "15.000đ",
    priceNum: 15000,
    theme: "gold",
    accent: "Đặt trước",
    description:
      "Móc treo acrylic in hình nhân vật anime/chibi với tông màu ấm áp, chất liệu acrylic trong suốt cao cấp, bền đẹp. Phù hợp trang trí bàn học, balo, túi xách.",
    specs: [
      "Chất liệu: Acrylic trong suốt",
      "Kích thước: 6x8cm",
      "Độ dày: 3mm",
      "In UV 2 mặt",
    ],
    sold: 2340,
    rating: 4.8,
    shop: "Anime Corner VN",
    images: [
      img(
        "linear-gradient(135deg,#6b2d12,#f59e0b,#fff1d6)",
        "rgba(255,236,179,0.85)",
        "rgba(124,45,18,0.82)",
        "Mặt trước",
      ),
      img(
        "linear-gradient(135deg,#f59e0b,#fff1d6,#6b2d12)",
        "rgba(255,251,235,0.9)",
        "rgba(180,83,9,0.7)",
        "Mặt sau",
      ),
      img(
        "linear-gradient(135deg,#fef3c7,#f59e0b,#92400e)",
        "rgba(254,243,199,0.88)",
        "rgba(245,158,11,0.6)",
        "Chi tiết",
      ),
      img(
        "linear-gradient(135deg,#fff7ed,#fdba74,#c2410c)",
        "rgba(255,237,213,0.85)",
        "rgba(251,146,60,0.75)",
        "Đóng gói",
      ),
    ],
  },
  {
    id: "2",
    title:
      "Hộp nhựa trong suốt có nắp lật, chuyên dùng đựng thực phẩm và trái cây",
    price: "5.500đ",
    priceNum: 5500,
    theme: "slate",
    accent: "Mua nhiều giá tốt",
    description:
      "Hộp nhựa PET trong suốt có nắp lật tiện lợi, an toàn thực phẩm. Dùng đựng trái cây, bánh, salad. Chịu nhiệt tốt, không BPA.",
    specs: [
      "Chất liệu: Nhựa PET an toàn",
      "Dung tích: 500ml",
      "Không chứa BPA",
      "Có nắp lật tiện lợi",
    ],
    sold: 15800,
    rating: 4.6,
    shop: "Gia Dụng Xanh",
    images: [
      img(
        "linear-gradient(135deg,#111827,#475569,#cbd5e1)",
        "rgba(255,255,255,0.78)",
        "rgba(203,213,225,0.75)",
        "Tổng quan",
      ),
      img(
        "linear-gradient(135deg,#1e293b,#64748b,#e2e8f0)",
        "rgba(241,245,249,0.85)",
        "rgba(148,163,184,0.7)",
        "Nắp lật",
      ),
      img(
        "linear-gradient(135deg,#334155,#94a3b8,#f1f5f9)",
        "rgba(226,232,240,0.82)",
        "rgba(71,85,105,0.65)",
        "Kích thước",
      ),
      img(
        "linear-gradient(135deg,#0f172a,#334155,#cbd5e1)",
        "rgba(248,250,252,0.9)",
        "rgba(100,116,139,0.72)",
        "Đóng gói",
      ),
    ],
  },
  {
    id: "3",
    title: "Bộ giấy gấp máy bay 3D cho bé, đồ chơi thủ công sáng tạo bán chạy",
    price: "10.220đ",
    priceNum: 10220,
    theme: "orange",
    accent: "Đồ chơi sáng tạo",
    description:
      "Bộ giấy gấp máy bay 3D gồm 50 tờ với 25 mẫu khác nhau, kèm hướng dẫn chi tiết. Giúp bé phát triển tư duy sáng tạo.",
    specs: [
      "Số lượng: 50 tờ / 25 mẫu",
      "Giấy dày 120gsm",
      "Kèm hướng dẫn gấp",
      "Phù hợp trẻ từ 3 tuổi",
    ],
    sold: 8920,
    rating: 4.9,
    shop: "Đồ Chơi Sáng Tạo",
    images: [
      img(
        "linear-gradient(135deg,#7c2d12,#fb923c,#ffedd5)",
        "rgba(255,255,255,0.74)",
        "rgba(253,186,116,0.92)",
        "Bộ sản phẩm",
      ),
      img(
        "linear-gradient(135deg,#ea580c,#fdba74,#fff7ed)",
        "rgba(255,247,237,0.88)",
        "rgba(249,115,22,0.65)",
        "Mẫu máy bay",
      ),
      img(
        "linear-gradient(135deg,#9a3412,#f97316,#fed7aa)",
        "rgba(254,215,170,0.85)",
        "rgba(234,88,12,0.7)",
        "Hướng dẫn",
      ),
      img(
        "linear-gradient(135deg,#431407,#c2410c,#fb923c)",
        "rgba(255,237,213,0.82)",
        "rgba(194,65,12,0.75)",
        "Chi tiết giấy",
      ),
    ],
  },
  {
    id: "4",
    title:
      "Trọn bộ tiểu thuyết thanh xuân 3 tập, bản in đẹp phù hợp làm quà tặng",
    price: "28.000đ",
    priceNum: 28000,
    theme: "lime",
    accent: "Sách bán chạy",
    description:
      "Bộ 3 tập tiểu thuyết thanh xuân vườn trường, bản in đặc biệt bìa cứng, kèm bookmark và postcard.",
    specs: [
      "Số tập: 3",
      "Bìa cứng, giấy trắng mịn",
      "Kèm bookmark + postcard",
      "Tác giả: Nhiều tác giả",
    ],
    sold: 5670,
    rating: 4.7,
    shop: "Nhà Sách Online",
    images: [
      img(
        "linear-gradient(135deg,#f8fafc,#fde68a,#65a30d)",
        "rgba(255,255,255,0.82)",
        "rgba(132,204,22,0.85)",
        "Bìa sách",
      ),
      img(
        "linear-gradient(135deg,#ecfccb,#a3e635,#4d7c0f)",
        "rgba(236,252,203,0.88)",
        "rgba(101,163,13,0.7)",
        "Tập 1",
      ),
      img(
        "linear-gradient(135deg,#fef9c3,#84cc16,#365314)",
        "rgba(254,249,195,0.85)",
        "rgba(132,204,22,0.72)",
        "Tập 2",
      ),
      img(
        "linear-gradient(135deg,#f7fee7,#bef264,#4d7c0f)",
        "rgba(247,254,231,0.9)",
        "rgba(163,230,53,0.68)",
        "Bookmark",
      ),
    ],
  },
  {
    id: "5",
    title:
      "Ốp lưng họa tiết Á Đông cho Huawei, có nam châm và chân đỡ tiện dụng",
    price: "168.000đ",
    priceNum: 168000,
    theme: "violet",
    accent: "Mall",
    description:
      "Ốp lưng Huawei họa tiết Á Đông sang trọng, tích hợp nam châm MagSafe và chân đỡ gập. Chất liệu TPU + PC.",
    specs: [
      "Chất liệu: TPU + PC",
      "Tích hợp nam châm",
      "Chân đỡ gập tiện lợi",
      "Chống sốc 4 góc",
    ],
    sold: 3210,
    rating: 4.5,
    shop: "Phụ Kiện Điện Thoại Pro",
    images: [
      img(
        "linear-gradient(135deg,#5b21b6,#d8b4fe,#1f2937)",
        "rgba(255,255,255,0.8)",
        "rgba(196,181,253,0.86)",
        "Mặt trước",
      ),
      img(
        "linear-gradient(135deg,#7c3aed,#c4b5fd,#312e81)",
        "rgba(237,233,254,0.88)",
        "rgba(139,92,246,0.7)",
        "Mặt sau",
      ),
      img(
        "linear-gradient(135deg,#4c1d95,#a78bfa,#e9d5ff)",
        "rgba(245,243,255,0.85)",
        "rgba(167,139,250,0.72)",
        "Chân đỡ",
      ),
      img(
        "linear-gradient(135deg,#6d28d9,#ddd6fe,#4c1d95)",
        "rgba(221,214,254,0.9)",
        "rgba(109,40,217,0.65)",
        "Nam châm",
      ),
    ],
  },
  {
    id: "6",
    title: "Khăn ướt tinh khiết gói nhỏ 10 tờ x 5, thiết kế mèo dễ thương",
    price: "11.900đ",
    priceNum: 11900,
    theme: "mint",
    accent: "Mới",
    description:
      "Khăn ướt tinh khiết không cồn, không hương liệu, an toàn cho da nhạy cảm và trẻ em. Set 5 gói.",
    specs: [
      "Số lượng: 5 gói x 10 tờ",
      "Không cồn, không hương liệu",
      "An toàn cho trẻ em",
      "Bao bì thiết kế mèo",
    ],
    sold: 42100,
    rating: 4.8,
    shop: "Mẹ & Bé Store",
    images: [
      img(
        "linear-gradient(135deg,#d1fae5,#93c5fd,#fde68a)",
        "rgba(255,255,255,0.84)",
        "rgba(253,224,71,0.78)",
        "Bao bì",
      ),
      img(
        "linear-gradient(135deg,#a7f3d0,#67e8f9,#fef08a)",
        "rgba(236,254,255,0.88)",
        "rgba(167,243,208,0.72)",
        "Gói nhỏ",
      ),
      img(
        "linear-gradient(135deg,#6ee7b7,#7dd3fc,#fde047)",
        "rgba(240,253,244,0.85)",
        "rgba(125,211,252,0.68)",
        "Chất liệu",
      ),
      img(
        "linear-gradient(135deg,#bbf7d0,#bae6fd,#fef9c3)",
        "rgba(254,252,232,0.9)",
        "rgba(110,231,183,0.7)",
        "Set 5 gói",
      ),
    ],
  },
  {
    id: "7",
    title:
      "Túi bảo quản thực phẩm dùng một lần loại dày, tiện cho tủ lạnh và nhà bếp",
    price: "9.800đ",
    priceNum: 9800,
    theme: "forest",
    accent: "1000 chiếc",
    description:
      "Túi bảo quản thực phẩm PE loại dày, chịu lạnh tốt. Gói 1000 chiếc nhiều kích cỡ.",
    specs: [
      "Chất liệu: PE food-grade",
      "Số lượng: 1000 chiếc",
      "Nhiều kích cỡ",
      "Chịu lạnh -20°C",
    ],
    sold: 28500,
    rating: 4.6,
    shop: "Gia Dụng Tiện Ích",
    images: [
      img(
        "linear-gradient(135deg,#14532d,#4ade80,#ecfccb)",
        "rgba(255,255,255,0.82)",
        "rgba(34,197,94,0.84)",
        "Tổng quan",
      ),
      img(
        "linear-gradient(135deg,#166534,#86efac,#f0fdf4)",
        "rgba(240,253,244,0.88)",
        "rgba(74,222,128,0.7)",
        "Kích cỡ",
      ),
      img(
        "linear-gradient(135deg,#15803d,#bbf7d0,#dcfce7)",
        "rgba(220,252,231,0.85)",
        "rgba(22,163,74,0.68)",
        "Độ dày",
      ),
      img(
        "linear-gradient(135deg,#052e16,#22c55e,#bbf7d0)",
        "rgba(187,247,208,0.9)",
        "rgba(21,128,61,0.72)",
        "Đóng gói",
      ),
    ],
  },
  {
    id: "8",
    title: "Chân váy phong cách nghỉ dưỡng, thiết kế xẻ tà nhẹ và tôn dáng",
    price: "32.000đ",
    priceNum: 32000,
    theme: "rose",
    accent: "Mẫu xuân mới",
    description:
      "Chân váy dài phong cách resort, chất vải voan mềm mại thoáng mát. Xẻ tà nhẹ tôn dáng.",
    specs: [
      "Chất liệu: Voan cao cấp",
      "Lưng thun co giãn",
      "Xẻ tà nhẹ",
      "Size: S/M/L/XL",
    ],
    sold: 7890,
    rating: 4.7,
    shop: "Thời Trang Nữ Hàn Quốc",
    images: [
      img(
        "linear-gradient(135deg,#881337,#fb7185,#ffe4e6)",
        "rgba(255,255,255,0.78)",
        "rgba(251,113,133,0.82)",
        "Mặt trước",
      ),
      img(
        "linear-gradient(135deg,#9f1239,#fda4af,#fff1f2)",
        "rgba(255,241,242,0.88)",
        "rgba(244,63,94,0.68)",
        "Mặt sau",
      ),
      img(
        "linear-gradient(135deg,#be123c,#fecdd3,#ffe4e6)",
        "rgba(254,205,211,0.85)",
        "rgba(190,18,60,0.65)",
        "Chi tiết xẻ",
      ),
      img(
        "linear-gradient(135deg,#e11d48,#fda4af,#fce7f3)",
        "rgba(252,231,243,0.9)",
        "rgba(251,113,133,0.72)",
        "Chất vải",
      ),
    ],
  },
  {
    id: "9",
    title: "Bông lấy ráy tai lông mềm cao cấp, đầu êm và không rụng sợi",
    price: "6.600đ",
    priceNum: 6600,
    theme: "sage",
    accent: "Loại mềm",
    description:
      "Bông lấy ráy tai đầu lông mềm siêu mịn, thiết kế xoắn kép giữ bông chắc. Hộp 200 que.",
    specs: [
      "Số lượng: 200 que/hộp",
      "Đầu lông mềm siêu mịn",
      "Thiết kế xoắn kép",
      "An toàn cho trẻ em",
    ],
    sold: 56200,
    rating: 4.9,
    shop: "Chăm Sóc Sức Khỏe",
    images: [
      img(
        "linear-gradient(135deg,#3f6212,#84cc16,#f7fee7)",
        "rgba(255,255,255,0.78)",
        "rgba(187,247,208,0.72)",
        "Hộp sản phẩm",
      ),
      img(
        "linear-gradient(135deg,#4d7c0f,#a3e635,#ecfccb)",
        "rgba(236,252,203,0.88)",
        "rgba(132,204,22,0.68)",
        "Đầu bông",
      ),
      img(
        "linear-gradient(135deg,#365314,#bef264,#f7fee7)",
        "rgba(247,254,231,0.85)",
        "rgba(163,230,53,0.72)",
        "Xoắn kép",
      ),
      img(
        "linear-gradient(135deg,#4d7c0f,#d9f99d,#ecfccb)",
        "rgba(217,249,157,0.9)",
        "rgba(77,124,15,0.65)",
        "Đóng gói",
      ),
    ],
  },
  {
    id: "10",
    title: "Nước giặt dịu nhẹ cho em bé và trẻ nhỏ, ít bọt và lưu hương lâu",
    price: "25.000đ",
    priceNum: 25000,
    theme: "lavender",
    accent: "Chăm bé",
    description:
      "Nước giặt chuyên dụng cho quần áo em bé, công thức dịu nhẹ từ thực vật. An toàn cho da nhạy cảm.",
    specs: [
      "Dung tích: 1.5L",
      "Chiết xuất thực vật",
      "Không chất tẩy mạnh",
      "Hương lavender nhẹ",
    ],
    sold: 18900,
    rating: 4.8,
    shop: "Mẹ & Bé Store",
    images: [
      img(
        "linear-gradient(135deg,#c4b5fd,#f5d0fe,#dbeafe)",
        "rgba(255,255,255,0.88)",
        "rgba(196,181,253,0.84)",
        "Chai sản phẩm",
      ),
      img(
        "linear-gradient(135deg,#a78bfa,#e9d5ff,#ede9fe)",
        "rgba(237,233,254,0.9)",
        "rgba(167,139,250,0.68)",
        "Thành phần",
      ),
      img(
        "linear-gradient(135deg,#8b5cf6,#d8b4fe,#f3e8ff)",
        "rgba(243,232,255,0.85)",
        "rgba(139,92,246,0.65)",
        "Hướng dẫn",
      ),
      img(
        "linear-gradient(135deg,#ddd6fe,#fbcfe8,#c4b5fd)",
        "rgba(251,207,232,0.88)",
        "rgba(221,214,254,0.72)",
        "Đóng gói",
      ),
    ],
  },
  {
    id: "11",
    title: "Nước tương đậm nhạt nhiều dung tích, phù hợp nấu ăn và trộn salad",
    price: "16.800đ",
    priceNum: 16800,
    theme: "amber",
    accent: "Chính hãng",
    description:
      "Nước tương đậu nành lên men tự nhiên, vị đậm đà thơm ngon. Chai 500ml tiện dụng.",
    specs: [
      "Dung tích: 500ml",
      "Đậu nành lên men tự nhiên",
      "Nắp rót chống tràn",
      "Hạn sử dụng: 18 tháng",
    ],
    sold: 34500,
    rating: 4.5,
    shop: "Thực Phẩm Sạch",
    images: [
      img(
        "linear-gradient(135deg,#fef3c7,#93c5fd,#d97706)",
        "rgba(255,255,255,0.88)",
        "rgba(120,53,15,0.8)",
        "Chai sản phẩm",
      ),
      img(
        "linear-gradient(135deg,#fde68a,#60a5fa,#b45309)",
        "rgba(254,243,199,0.9)",
        "rgba(217,119,6,0.68)",
        "Nhãn hiệu",
      ),
      img(
        "linear-gradient(135deg,#fbbf24,#3b82f6,#92400e)",
        "rgba(253,230,138,0.85)",
        "rgba(59,130,246,0.6)",
        "Nắp rót",
      ),
      img(
        "linear-gradient(135deg,#f59e0b,#7dd3fc,#78350f)",
        "rgba(254,249,195,0.88)",
        "rgba(245,158,11,0.72)",
        "Đóng gói",
      ),
    ],
  },
  {
    id: "12",
    title: "Sách từ vựng luyện thi JLPT từ N1 đến N5, bản cập nhật mới",
    price: "42.000đ",
    priceNum: 42000,
    theme: "sky",
    accent: "Bản mới",
    description:
      "Sách tổng hợp từ vựng JLPT từ N5 đến N1, bản cập nhật mới nhất. Bố cục rõ ràng, dễ ôn tập.",
    specs: [
      "Số trang: 480",
      "Bao gồm N5 đến N1",
      "Kèm ví dụ mỗi từ",
      "Bản cập nhật 2025",
    ],
    sold: 12300,
    rating: 4.9,
    shop: "Nhà Sách Nhật Bản",
    images: [
      img(
        "linear-gradient(135deg,#ffffff,#dbeafe,#fca5a5)",
        "rgba(255,255,255,0.92)",
        "rgba(59,130,246,0.2)",
        "Bìa sách",
      ),
      img(
        "linear-gradient(135deg,#eff6ff,#93c5fd,#fecaca)",
        "rgba(239,246,255,0.9)",
        "rgba(147,197,253,0.65)",
        "Nội dung",
      ),
      img(
        "linear-gradient(135deg,#dbeafe,#60a5fa,#f87171)",
        "rgba(219,234,254,0.85)",
        "rgba(96,165,250,0.6)",
        "Mục lục",
      ),
      img(
        "linear-gradient(135deg,#bfdbfe,#3b82f6,#ef4444)",
        "rgba(191,219,254,0.88)",
        "rgba(59,130,246,0.72)",
        "Ví dụ",
      ),
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
