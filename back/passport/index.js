const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  // user에서 실행한 return req.logIn(user, async (loginErr)에서
  // user정보가 여기 밑에 user로 들어감
  passport.serializeUser((user, done) => {
    //유저 정보 중 쿠키랑 묶어줄 id만 저장
    done(null, user.id);
  });

  //id를 통해서 DB정보 가져옴
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
};
