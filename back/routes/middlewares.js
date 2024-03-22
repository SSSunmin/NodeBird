/*
    커스텀 미들웨어
    밑에 코드들을 직접 필요한 위치에 넣어서 사용해도 되지만
    코드의 중복을 줄이기 위해서 따로 만듬
 */
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // 안에 error를 넣어주면 에러 처리를 하고 아무것도 넣지 않으면 다음 미들웨어로 이동
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
