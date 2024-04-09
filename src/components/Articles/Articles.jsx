import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Styles from "./Articles.module.css";
import Button from "@mui/material/Button";
import Message from "../Message/Message";
import { useNavigate } from "react-router-dom";

export default function Articles({ isLoggedIn }) {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [success, setSuccess] = useState({});
  const [codeIsVisible, setCodeIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        await fetch("http://localhost:8081/api_get/articles")
          .then((responce) => responce.json())
          .then((data) => setArticles(data));
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    let timeout;
    if (codeIsVisible) {
      timeout = setTimeout(() => {
        setCodeIsVisible(false);
        navigate("/programms");
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [codeIsVisible]);

  useEffect(() => {
    if (success.status == 200) {
      setCodeIsVisible(!codeIsVisible);
    }
  }, [success]);

  const article = articles.find((element) => element.id__articles == id);

  const handleClickDelete = (e) => {
    e.preventDefault();

    fetch("http://localhost:8081/api_post/articles/id", {
      method: "POST",
      body: JSON.stringify({ id_article: article.id__articles }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((responce) => responce.json())
      .then((data) => setSuccess(data));
  };

  return (
    <>
      {loading ? (
        <h1>Идёт загрузка</h1>
      ) : (
        <article className={Styles["article"]}>
          <div className="wrapper">
            <div className={Styles["article__row"]}>
              {codeIsVisible && (
                <div className={Styles["status-block"]}>
                  <Message message={success.message} status={success.status} />
                </div>
              )}

              <span className={Styles["created-articles"]}>
                Дата создания: {article.created_articles}
              </span>
              {isLoggedIn && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={(e) => handleClickDelete(e)}
                >
                  Удалить статью
                </Button>
              )}

              <h1 className="name-articles">{article.name_articles}</h1>
              <span className={Styles["type-articles"]}>
                Вид упражнения: {article.type_articles}
              </span>

              <div className="text-articles__wrapper">
                {parse(article.text_articles)}
              </div>

              <p className={Styles["author-articles"]}>
                Автор статьи: <b>{article.author_articles}</b>
              </p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
