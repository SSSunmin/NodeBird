export const initialState = {
  isLoggedIn: false,
  mydata: null,
  signUpData: {},
  loginData: {},
};

//action creator
export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

//(이전상태, 액션)=>다음상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        mydata: action.data,
      };

    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        mydata: null,
      };
    default:
      return state;
  }
};
export default reducer;
