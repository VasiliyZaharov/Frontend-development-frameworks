interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
}

interface LoginSuccessAction {
  type: 'LOGIN_SUCCESS';
  payload: { token: string };
}

interface LogoutAction {
  type: 'LOGOUT';
}

interface SetLoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
}

type AuthActionTypes = LoginSuccessAction | LogoutAction | SetLoadingAction;

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
};

export const authReducer = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                token: null,
              };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            }
        default:
            return state;
    }
};

export default authReducer;
export { AuthState };
