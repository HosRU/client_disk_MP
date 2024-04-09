import Styles from "./Banner.module.css";

export default function Banner() {
  return (
    <section className={Styles["section-banner"]}>
      <div className="wrapper">
        <div className={Styles["banner"]}>
          <div className={Styles["banner__title"]}>
            <p>Качаи ягодицы — всегда пригодится!</p>
          </div>

          <div className={Styles["banner__content"]}>
            <p className={Styles["bold"]}>Выберите вариант для своего уровня подготовки, освойте правильную
            технику движений по фото и видео и приготовьтесь сделать спорт
            частью своей жизни.</p>

            <p className={Styles["italics"]}>Силовые упражнения с весом своего тела помогут прокачать мышцы с
            минимальным набором снаряжения. А интенсивные комплексы сожгут жир и
            повысят выносливость без всяких кардиотренажёров.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
