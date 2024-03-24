const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");

const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");

const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);
/*
  프론트에서 넘겨주는 데이터를 req.body에 넣어주는 역할 (Router보다 위에 위치해야함)
  express.json() 
  -> Json형식의 데이터를 넣어줌
  express.urlencoded({extended:true})
  -> FormData를 urlencoded방식으로 넘어오기때문에 이러한 형식의 데이터를 넣어줌
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/posts", postsRouter);
app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
