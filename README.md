# Nhập Hàng Trung

Homepage tiếng Việt theo phong cách cổ trang Trung Hoa: giấy ngà, mực, chu sa và tranh sơn thủy. Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4, Motion, React Three Fiber và Lucide. Package manager: npm.

## Chạy và kiểm tra

```bash
npm install
npm run dev
```

Truy cập http://localhost:3000.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Cấu trúc

- `src/app/page.tsx`: ghép các section homepage.
- `src/app/layout.tsx`: font tiếng Việt tự host, metadata và canonical.
- `src/app/globals.css`: nền tảng layout và responsive.
- `src/components/home/commerce.css`: layout marketplace, logistics, dashboard.
- `src/components/home/heritage.css`: theme cổ trang, typography serif và responsive.
- `public/images/heritage-landscape.png`: tranh sơn thủy tạo riêng cho hero.
- `src/components/home/`: Navbar, Hero, Hero3D, ProductLinkInput, Stats, ShippingCalculator, HowItWorks, Services, Marketplace, TrendingProducts, LogisticsJourney, TrackingPreview, DashboardPreview, Testimonials, FinalCTA và Footer.
- `src/components/home/Animation.tsx`: reveal, counter, tilt dùng chung.
- `src/components/home/Modal.tsx`: dialog gốc, khóa focus và khôi phục focus.
- `src/data/home/`: services, marketplaces, products, reviews, stats, tracking, dashboard và pricing tách riêng.
- `src/lib/shipping.ts`: hàm tính phí thuần, tách khỏi UI.
- `src/lib/marketplace.ts`: nhận diện chính xác hostname của sàn.

## Các tương tác

- Nhận diện link 1688, Taobao, Tmall và Pinduoduo; từ chối domain giả có tên sàn làm tiền tố.
- Calculator realtime theo giá, số lượng nguyên, tổng kg và hình thức vận chuyển.
- Lọc sản phẩm theo danh mục.
- Tracking demo với mã `NHT-2026-3821`, trạng thái không tìm thấy và khôi phục mã mẫu.
- Chọn checkpoint trên hành trình để xem trạng thái/thời gian.
- Dashboard preview: tổng quan, đơn hàng, tài chính và thông báo. Tab hỗ trợ bàn phím.
- Timeline dọc trên mobile, menu mobile, modal hỗ trợ Escape và trả focus về nút mở.

## Phạm vi dữ liệu minh họa

Chưa kết nối đăng nhập, đặt đơn, ví, thanh toán, tra cứu vận đơn thật hoặc API marketplace. Tỷ giá, phí, thống kê, sản phẩm, đánh giá, tracking và dashboard đều là dữ liệu minh họa, được ghi rõ trên giao diện. Thông tin liên hệ và QR Zalo chưa có dữ liệu chính thức.

Calculator: giá × số lượng × 3.580 đ/CNY + phí dịch vụ 3% + tổng kg × đơn giá vận chuyển (28.000 đ đường bộ hoặc 65.000 đ đường bay). Chưa gồm thuế, phí nội địa Trung Quốc và phụ phí. Đầu vào được giới hạn và làm tròn số lượng nguyên.

Dữ liệu người dùng nhập được xử lý trong trình duyệt. Ảnh minh họa từ Unsplash qua Next Image; font Be Vietnam Pro tự host từ Fontsource. Canonical hiện đặt theo tên miền trong brief: https://www.nhaphangtrung.com/.

## Hiệu năng

Hero render ở server với tranh sơn thủy qua Next Image. Ma Shan Zheng dùng cho chữ Hán/thư pháp, Noto Serif cho tiếng Việt, Be Vietnam Pro cho trường dữ liệu; tất cả tự host. Theme cổ trang không tải canvas Three.js; các component 3D cũ còn trong source để có thể tái sử dụng. Tranh WebP tối ưu ~300 KB. Cuộn gốc trên touch; không magnetic/pointer handler toàn trang, không blur/noise toàn nền. Reveal chỉ chạy một lần trên desktop; counter cập nhật text node tối đa 30 lần/giây, không render lại cây React. Animation tôn trọng reduced motion. Chưa có kết quả Core Web Vitals thực địa; cần đo lại trên môi trường production và thiết bị thật.

## Đưa vào vận hành

1. Kết nối tài khoản, tạo đơn và lưu đơn vào backend có xác thực.
2. Thay dữ liệu demo bằng API nguồn hàng, biểu phí/tỷ giá được duyệt và sự kiện vận chuyển thực tế.
3. Hoàn thiện thanh toán, chính sách, liên hệ, giám sát lỗi và kiểm thử hiệu năng trước khi triển khai.
