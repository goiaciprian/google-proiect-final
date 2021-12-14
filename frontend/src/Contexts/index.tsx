import React from "react";
import { Apartament, TipApartament, User } from "../Utils";

export type GlobalState = {
  auth: {
    user: null | User;
    token: null | string;
  };
  tip_apartamente_list: TipApartament[];
  apartamente_list: Apartament[];
};

export const Types = {
  Set_User: "SET_USER",
  Set_Token: "SET_TOKEN",
  Set_Auth: "SET_AUTH",
  Set_Tip_Apartament_List: "SET_TIP_APARTAMENT_LIST",
  Set_Apartament_List: "SET_APARTAMENT_LIST",
};

export type Action = {
  type: string;
  payload: any;
};

const _initial_state = {
  auth: {
    user: null,
    token: null,
  },
  tip_apartament_list: [],
  apartamente_list: [],
} as unknown as GlobalState;

const globalStateContext = React.createContext<GlobalState>(_initial_state);
const globalDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {
    return _initial_state;
  }
);

globalStateContext.displayName = "GlobalStateContext";
globalDispatchContext.displayName = "DispatchContext";

const _reducer = (state: GlobalState, action: Action) => {
  switch (action.type) {
    case Types.Set_Apartament_List:
      return { ...state, apartamente_list: action.payload };
    case Types.Set_Tip_Apartament_List:
      return { ...state, tip_apartamente_list: action.payload };
    case Types.Set_Auth:
      return { ...state, auth: action.payload };

    case Types.Set_User:
      return { ...state, auth: { ...state.auth, user: action.payload } };
    case Types.Set_Token:
      return { ...state, auth: { ...state.auth, token: action.payload } };
    default:
      return state;
  }
};

const withGlobalState =
  (Component: React.FunctionComponent) =>
  (props: React.PropsWithChildren<any>) => {
    const [_state, _dispatch] = React.useReducer(
      _reducer,
      _initial_state,
      () => _initial_state
    );
    const _dispatchRef = React.createRef();

    //@ts-ignore
    _dispatchRef.current = _dispatch;

    const dispatch = React.useCallback(
      (action) => {
        //@ts-ignore
        _dispatchRef.current?.(action);
      },
      [_dispatchRef]
    );

    return (
      <globalStateContext.Provider value={_state}>
        <globalDispatchContext.Provider value={dispatch}>
          <Component {...props} />
        </globalDispatchContext.Provider>
      </globalStateContext.Provider>
    );
  };

export const useGlobalState = () => React.useContext(globalStateContext);
export const useDispatch = () => React.useContext(globalDispatchContext);

export default withGlobalState;
