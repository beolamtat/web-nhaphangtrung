export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  moq: number;
  marketplace: string;
  image: string;
};
export const products: Product[] = [
  {
    id: 1,
    name: "Balo canvas tối giản",
    category: "Thời trang",
    price: 12.8,
    moq: 3,
    marketplace: "1688",
    image: "photo-1553062407-98eeb64c6a62",
  },
  {
    id: 2,
    name: "Tai nghe không dây",
    category: "Điện tử",
    price: 45,
    moq: 2,
    marketplace: "1688",
    image: "photo-1505740420928-5e560c06d30e",
  },
  {
    id: 3,
    name: "Đèn bàn phong cách Bắc Âu",
    category: "Trang trí",
    price: 38,
    moq: 2,
    marketplace: "Taobao",
    image: "photo-1507473885765-e6ed057f782c",
  },
  {
    id: 4,
    name: "Bình giữ nhiệt hằng ngày",
    category: "Đồ gia dụng",
    price: 18.5,
    moq: 5,
    marketplace: "Tmall",
    image: "photo-1602143407151-7111542de6e8",
  },
  {
    id: 5,
    name: "Kính mát gọng acetate",
    category: "Phụ kiện",
    price: 16,
    moq: 3,
    marketplace: "Taobao",
    image: "photo-1511499767150-a48a237f0083",
  },
  {
    id: 6,
    name: "Bộ chăm sóc da hằng ngày",
    category: "Làm đẹp",
    price: 32,
    moq: 2,
    marketplace: "Tmall",
    image: "photo-1608571423902-eed4a5ad8108",
  },
];
