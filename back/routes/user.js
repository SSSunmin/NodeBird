const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

//POST /user/login
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (serverErr, user, clientErr) => {
    if (serverErr) {
      console.error(serverErr);
      return next(serverErr);
    }
    if (clientErr) {
      return res.status(401).send(clientErr.reason);
    }
    //req.logIn -> passport에서 제공
    return req.logIn(user, async (loginErr) => {
      //혹시 로그인 과정에서 에러가 발생하면
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        //attributes:['id','nickname','email'], //원하는 정보만 받아오거나
        attributes: { exclude: ["password"] }, // 필요없는 정보를 제외하거나
        include: [
          { model: Post },
          { model: User, as: "Followings" },
          { model: User, as: "Followers" },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
  req.session.destroy();
  res.status(200).send("logout");
});

//POST /user
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    //이메일 중복 체크
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      //가입한 이메일이 있으면 403보내고 라우터 종료
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //password는 그대로 저장하면 보안의 위협이 있기때문에 bcrypt를 이용하여 암호화 진행
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).send("회원가입 성공!");
  } catch (error) {
    console.log(error);
    next(error); //next를 통해서 error를 보낼 수 있음 status 500
  }
});

module.exports = router;
