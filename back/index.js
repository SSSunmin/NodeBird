const express = require("express");
const postRouter = require("./routes/post");
const app = express();

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/posts", (req, res) => {
  res.json([
    {
      id: 1,
      contene: "hello",
    },
    {
      id: 2,
      contene: "post",
    },
    {
      id: 2,
      contene: "api",
    },
  ]);
});

app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});
