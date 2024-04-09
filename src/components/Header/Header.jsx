import Styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const theme = createTheme({
    palette: {
      ochre: {
        main: "#f7f7be",
        light: "#EF4444",
        dark: "#CA3E3E",
        contrastText: "#242105",
      },
    },
  });

  const handleClickLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("isAuthorizated");
    setIsLoggedIn(false);
  };

  return (
    <header className={Styles["header"]}>
      <div className="wrapper">
        <div className={Styles["header__row"]}>
          <div className="logotype">
            <h1 className={Styles["logo"]}>Мир Похудения</h1>
          </div>

          <nav className="navigation">
            <ul className={Styles["navigation__list"]}>
              <Link to="/" className={Styles["navigation__item"]}>
                Главная
              </Link>

              <Link to="/programms" className={Styles["navigation__item"]}>
                Программы
              </Link>

              {isLoggedIn && (
                <Link to="/admin" className={Styles["navigation__item"]}>
                  Админка
                </Link>
              )}
            </ul>
          </nav>

          <div className="social">
            <div className={Styles["social__row"]}>
              <div className={Styles["btn-logIn"]}>
                {isLoggedIn ? (
                  <div className={Styles["btn-logIn__wrapper"]}>
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color="ochre"
                        className={Styles["btn-auth"]}
                        onClick={(e) => handleClickLogOut(e)}
                      >
                        Выйти
                      </Button>
                    </ThemeProvider>
                  </div>
                ) : (
                  <Link to={"/authForm"}>
                    <div className={Styles["btn-logIn__wrapper"]}>
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="ochre"
                          className={Styles["btn-auth"]}
                        >
                          Войти
                        </Button>
                      </ThemeProvider>
                    </div>
                  </Link>
                )}
              </div>

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
    </header>
  );
}
