import { Box, TextField } from "@mui/material";
import Styles from "./AuthForm.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Message from "../Message/Message";
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ setIsLoggedIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState({});
  const [codeIsVisible, setCodeIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (codeIsVisible) {
      timeout = setTimeout(() => {
        setCodeIsVisible(false);
        navigate("/")
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [codeIsVisible]);

  useEffect(() => {
    if (success.status == 200) {
      localStorage.setItem("isAuthorizated", true);
      setIsLoggedIn(true);
      setCodeIsVisible(!codeIsVisible);
    } else if (success.status == 404) {
      setCodeIsVisible(!codeIsVisible);
    }
  }, [success]);

  const checkFormName = (value) => {
    setLogin(value);
  };

  const checkFormPassword = (value) => {
    setPassword(value);
  };

  const handleClickForm = (e) => {
    e.preventDefault();

    const data = {
      login: login,
      password: password,
    };

    fetch("http://localhost:8081/api_post/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((responce) => responce.json())
      .then((data) => setSuccess(data));
  };

  return (
    <section className={Styles["section-authorization"]}>
      <div className="wrapper">
        <div className={Styles["authorization__row"]}>
          <div className={Styles["authorizatio__title"]}>
            <h1>Авторизация</h1>
          </div>

          <form className={Styles["authorization-form"]}>
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              />

              <TextField
                id="outlined-basic"
                label="Логин"
                variant="outlined"
                onChange={(e) => checkFormName(e.target.value)}
                className={Styles["input"]}
              />
            </div>

            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              />

              <TextField
                id="outlined-basic"
                label="Пароль"
                variant="outlined"
                onChange={(e) => checkFormPassword(e.target.value)}
                className={Styles["input"]}
              />
            </div>

            <div>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={(e) => handleClickForm(e)}
                >
                  Войти
                </Button>
                <Button variant="outlined" color="error">
                  Очистка
                </Button>
              </Stack>
            </div>
          </form>

          {codeIsVisible && (
            <div className={Styles["status-block"]}>
              <Message message={success.message} status={success.status} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
