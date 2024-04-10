import Styles from "./AdminPanel.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FileInput, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Message from "../Message/Message";
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useState({});
  const [codeIsVisible, setCodeIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    if (codeIsVisible) {
      timeout = setTimeout(() => {
        setCodeIsVisible(false);
        navigate("/programms")
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [codeIsVisible]);

  useEffect(() => {
    success.status == 200 && setCodeIsVisible(!codeIsVisible);
  }, [success]);

  const handleChange = (value) => {
    setText(value);
  };

  const handleChangeTitle = (value) => {
    setTitle(value);
  };
  const handleChangeAuthor = (value) => {
    setAuthor(value);
  };

  const handleChangeType = (value) => {
    setType(value);
  };

  const handleChangeImageTwo = (event) => {
    const value = event.target.files[0];
    setImage(value);
    console.log(value);
  };

  const handleClickForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("type", type);
    formData.append("text", text);
    formData.append("image", image);

    const request = await fetch("http://localhost:3003/api_post/articles", {
      method: "POST",
      body: formData,
    })
      .then((responce) => responce.json())
      .then((data) => setSuccess(data));
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

  return (
    <>
      <section className={Styles["admin-panel"]}>
        <div className="wrapper">
          <div className={Styles["admin-panel__content"]}>
            {codeIsVisible && (
              <div className={Styles["status-block"]}>
                <Message message={success.message} status={success.status} />
              </div>
            )}

            <div className={Styles["admin-panel__title"]}>
              <h1>Добавление статьи</h1>
            </div>

            <form className={Styles["form-add-articles"]}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="Upload file" />
                </div>
                <FileInput
                  id="file-upload"
                  helperText="PNG, JPG (540x270px)."
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleChangeImageTwo(e)}
                />
              </div>

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
                label="Заголовок статьи"
                variant="outlined"
                onChange={(e) => handleChangeTitle(e.target.value)}
              />

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
                label="Автор статьи"
                variant="outlined"
                onChange={(e) => handleChangeAuthor(e.target.value)}
              />

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
                label="Тип статьи"
                variant="outlined"
                onChange={(e) => handleChangeType(e.target.value)}
              />

              <ReactQuill
                className={Styles["ql-toolbar"]}
                theme="snow"
                value={text}
                onChange={handleChange}
                modules={{
                  toolbar: {
                    container: [
                      [{ header: [1, 2, 3, 4, 5] }, { font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      [{ color: [] }, { background: [] }],
                      [{ align: [] }],
                      ["clean"],
                    ],
                  },
                }}
                formats={formats}
              />

              <div className={Styles["btn__container"]}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={(e) => handleClickForm(e)}
                  >
                    Добавить статью
                  </Button>
                  <Button variant="outlined" color="error">
                    Очистка
                  </Button>
                </Stack>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
