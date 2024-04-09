import { Link } from "react-router-dom";
import Styles from "./HardProgrammsList.module.css";

export default function HardList({ articles }) {
  const hard = articles.filter(
    (article) => article.type_articles === "Сложный"
  );

  return (
    <ul className={Styles["hard-list"]}>
      {hard.map((item, index) => {
        return (
          <Link to={`/programms/${item.id__articles}`} key={index}>
            <li className={Styles["list__item"]}>
              <article className={Styles["card"]}>
                <img
                  src={`http://localhost:8081/${item.image_articles}`}
                  alt=""
                  className={Styles["card__prev"]}
                />

                <div className={Styles["card__content"]}>
                  <p className={Styles["card__title"]}>{item.name_articles}</p>
                </div>
              </article>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
