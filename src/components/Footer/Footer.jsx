import Styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={Styles["footer"]}>
      <div className="wrapper">
        <div className={Styles["footer__row"]}>
          <div className="logotype">
            <h1 className={Styles["logo"]}>Мир Похудения</h1>
          </div>

          <div className={Styles["copyright"]}>
            Данный сайт разрабатывается для курсовой работы.
          </div>

          <div className="social">
            <div className={Styles["social__row"]}>
              <a href="https://vk.com/">
                <div className={Styles["social__link"]}>
                  <img
                    src="/img/vk_icon.svg"
                    alt="Значок-ссылка для перехода на страницу ВК"
                  />
                </div>
              </a>

              <a href="https://telegram.org/">
                <div className={Styles["social__link"]}>
                  <img
                    src="/img/tg_icon.svg"
                    alt="Значок-ссылка для перехода на страницу ТГ"
                  />
                </div>
              </a>

              <a href="https://www.youtube.com/">
                <div className={Styles["social__link"]}>
                  <img
                    src="/img/youtube_icon.svg"
                    alt="Значок-ссылка для перехода на страницу Ютуб"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
