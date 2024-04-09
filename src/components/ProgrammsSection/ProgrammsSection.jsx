import Styles from "./ProgrammsSection.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function ProgrammsSection({ isLoggedIn }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "http://artemfakli.temp.swtest.ru/api_get/articles",
          {}
        );
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className={Styles["programms-section"]}>
      <div className="wrapper">
        <div className={Styles["programms-section__row"]}>
          <div className={Styles["programms-section__title"]}>
            <h1>Программы для худеющих</h1>
          </div>
          {isLoggedIn && (
            <div className={Styles["btn-add-articles"]}>
              <Link to={"/admin"}>
                  <Button
                    variant="contained"
                    color="success"
                    className={Styles["btn-add"]}
                  >
                    Добавить новый пост
                  </Button>
              </Link>
            </div>
          )}

          <ul className={Styles["programms__list"]}>
            {articles.map((item, index) => {
              return (
                <Link to={`/programms/${item.id__articles}`} key={index}>
                  <li className={Styles["programm-item"]}>
                    <div className={Styles["programm-item__prev"]}>
                      <img
                        src={"http://localhost:8081/" + item.image_articles}
                        alt="Изображение превью для программы"
                      />
                    </div>
                    <div className={Styles["programm-item__content"]}>
                      <p className={Styles["programm-item__title"]}>
                        {item.name_articles}
                      </p>

                      <span className="programm-item__type">
                        Тип упражнений: {item.type_articles}
                      </span>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
