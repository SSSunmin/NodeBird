export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "선녀니",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fkstar.kbs.co.kr%2Fperson_view.html%3Fidx%3D49996&psig=AOvVaw1BDEtTYsOIAwmLKw55ALG_&ust=1684226556827000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPicyf_29v4CFQAAAAAdAAAAABAE",
        },
        {
          src: "https://i.namu.wiki/i/edzPMDde5GjKCojqDh8hhxLyYE-SOf9bcOkf9Ft6crwucnBIsczPtQjHp8xEPO07PZlHc02fLJB5FDxInaLYoA.webp",
        },
        {
          src: "https://res.heraldm.com/content/image/2021/11/12/20211112000423_0.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "복치",
          },
          content: "우와~~",
        },
        {
          User: {
            nickname: "요미",
          },
          content: "우와~~ 개쩐당",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터",
  User: {
    id: 1,
    nickname: "선녀니",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};
export default reducer;
