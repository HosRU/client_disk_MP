import Styles from "./Message.module.css";

export default function Message({ message, status }) {
  return (
    <>
      {status == 404 ? (
        <div className={Styles["error"]}>
          <p>Произошла ошибка! {message}</p>
        </div>
      ) : (
        <div className={Styles["success"]}>
          <p>{message}</p>
        </div>
      )}
    </>
  );
}
