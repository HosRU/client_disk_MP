import { useEffect, useState } from "react";
import EasyList from "./EasyProgrammsList";
import HardList from "./HardProgrammsList";
import MediumList from "./MediumProgrammsList";
import Styles from "./ProgramsList.module.css"

export default function ProgramsList({children}) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        await fetch("http://localhost:8081/api_get/articles")
        .then(responce => responce.json())
        .then(data => setArticles(data))
        // setLoading(false)
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchArticles();
  }, [])

  return (
    <section className={Styles["programs-list"]}>
      <div className="wrapper">
        <div className="programs-list__row">
            <h3 className={Styles["programs-list__title"]}>Программа простых тренировок</h3>

            <EasyList articles={articles}>
                {children}
            </EasyList>

            <h3 className={Styles["programs-list__title"]}>Программа тренировок в зале</h3>

            <MediumList articles={articles}>
                {children}
            </MediumList>

            <h3 className={Styles["programs-list__title"]}>Программа тренировок в нагрузку</h3>

            <HardList articles={articles}>
                {children}
            </HardList>
        </div>
      </div>
    </section>
  );
}
