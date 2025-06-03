import styles from "./about.module.css";

const LOGOS = [
  { src: "/KYBlogo.png", alt: "KYB" },
  { src: "/ARB-logo.jpg", alt: "ARB" },
  { src: "/Toyo_Tire_Logo.png", alt: "Toyo Tires" },
  { src: "/Michelin-logo-2.png", alt: "Michelin" },
  { src: "/KYBlogo.png", alt: "KYB" },
  { src: "/ARB-logo.jpg", alt: "ARB" },
  { src: "/Toyo_Tire_Logo.png", alt: "Toyo Tires" },
  { src: "/Michelin-logo-2.png", alt: "Michelin" },
  { src: "/KYBlogo.png", alt: "KYB" },
  { src: "/ARB-logo.jpg", alt: "ARB" },
  { src: "/Toyo_Tire_Logo.png", alt: "Toyo Tires" },
  { src: "/Michelin-logo-2.png", alt: "Michelin" },
  { src: "/KYBlogo.png", alt: "KYB" },
  { src: "/ARB-logo.jpg", alt: "ARB" },
  { src: "/Toyo_Tire_Logo.png", alt: "Toyo Tires" },
  { src: "/Michelin-logo-2.png", alt: "Michelin" },
];

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mapFrame}>
          <h2 className={styles.sectionTitle}>Салбаруудын байршил</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d85575.78017856683!2d106.93603814999999!3d47.9123329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1smn!2smn!4v1748854579750!5m2!1smn!2smn"
            width="100%"
            height="348"
            style={{
              border: "none",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
            // allowfullscreen=""
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Текст */}
        <div className={styles.textBlock}>
          <h2 className={styles.sectionTitle}>Бүтээгдэхүүн & Үйлчилгээ</h2>
          <ul>
            <li>Салбар нэгжийн тоо: 16</li>
            <li>Жилд үйлчлүүлэгчид зочдын тоо: 750,000 (2025 оны байдлаар)</li>
            <li>- 4000 нэр төрлийн бараа худалдаалдаг автосупермаркет</li>
            <li>- Шевроле брэндийн албан ёсны дистрибьютор</li>
            <li>- Техник үйлчилгээ</li>
            <li>- Засвар, тохируулга</li>
            <li>- Жил тутам заавал хийх ёстой улсын үзлэг</li>
            <li>
              - Асаалт, хальс, түлхүүр зэрэг 20 орчим нэр төрлийн тусгай
              мэргэжлийн үйлчилгээ
            </li>
            <li>- Автын барааны бөөний худалдааны сүлжээ</li>
            <li>- Автын барааны интернет худалдаа</li>
          </ul>
        </div>
      </div>

      {/* Лого carousel */}
      <div className={styles.logoScroller}>
        <div className={styles.logoRow}>
          {LOGOS.map((logo, i) => (
            <div className={styles.logoBox} key={i}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
