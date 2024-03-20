module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      //MySQL에서는 users 테이블 생성
      //id가 기본적으로 들어있음!! pk : 1,2,3...
      email: {
        type: DataTypes.STRING(30), // STRING , TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, //필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
    // through:  중간테이블의 이름을 설정해줄 수 있음 ,
    // as : 별칭 설정 위에 db.User.hasMany(db.Post)와 구별하기 위하여 Liked라는 별칭 설정
  };
  return User;
};
