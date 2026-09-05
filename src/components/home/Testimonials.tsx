import { Star } from "lucide-react";
import { Reveal } from "./Animation";
import { reviews } from "@/data/home/reviews";
export function Testimonials() {
  return (
    <section className="section container">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow red">05 / CÙNG NHAU ĐI XA HƠN</span>
          <h2>
            Người bán hàng đã dùng
            <br />
            Nhập Hàng Trung như thế nào?
          </h2>
        </div>
        <p>Câu chuyện khách hàng minh họa.</p>
      </Reveal>
      <div className="reviews">
        {reviews.map((r) => (
          <Reveal className="review" key={r.name}>
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <blockquote>“{r.text}”</blockquote>
            <div className="review-person">
              <span>{r.initials}</span>
              <div>
                <strong>{r.name}</strong>
                <small>{r.role}</small>
              </div>
              <span className="quote">”</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
