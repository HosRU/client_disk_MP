import { Link } from "react-router-dom";
import Styles from "./MediumProgrammsList.module.css";

export default function MediumList({ articles }) {
  const medium = articles.filter(
    (article) => article.type_articles === "Средний"
  );

  return (
    <ul className={Styles["medium-list"]}>
      {medium.map((item, index) => {
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
