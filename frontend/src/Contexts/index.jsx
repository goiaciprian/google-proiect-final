import React from "react";
import Toast from "../Components/Alert";

export const Types = {
  Set_User: "SET_USER",
  Set_Token: "SET_TOKEN",
  Set_Auth: "SET_AUTH",
  Set_Tip_Apartament_List: "SET_TIP_APARTAMENT_LIST",
  Set_Apartament_List: "SET_APARTAMENT_LIST",
  Open_Modal: "OPEN_MODAL",
  Close_Modal: "CLOSE_MODAL",
  Open_Alert: "OPEN_ALERT",
  Close_Alert: "CLOSE_ALERT",
  Multiple_Changes: "MULTIPLE_CHANGES",
  Update_Tip_Apartament_Array: "UPDATE_TIP_APARTAMENT_ARRAY",
};

const _initial_state = {
  auth: {
    user: null,
    token: null,
  },
  tip_apartament_list: {
    items: [],
    loaded: false,
    error: null,
  },
  apartamente_list: {
    items: [],
    loaded: false,
    error: null,
  },
  modalState: {
    type: "login",
    open: false,
    message: "",
    id: null,
  },
  toastAlert: {
    open: false,
    message: "",
    type: "success",
  },
};

/** Export doar pentru auth is header components */
export const globalStateContext = React.createContext(_initial_state);
export const globalDispatchContext = React.createContext(() => {
  return _initial_state;
});

globalStateContext.displayName = "GlobalStateContext";
globalDispatchContext.displayName = "DispatchContext";

const _reducer = (state, action) => {
  switch (action.type) {
    case Types.Set_Apartament_List:
      return { ...state, apartamente_list: action.payload };
    case Types.Set_Tip_Apartament_List:
      return { ...state, tip_apartament_list: action.payload };

    case Types.Update_Tip_Apartament_Array:
      return {
        ...state,
        tip_apartament_list: {
          ...state.tip_apartament_list,
          items: action.payload,
        },
      };

    case Types.Set_Auth:
      return { ...state, auth: action.payload };

    case Types.Set_User:
      return { ...state, auth: { ...state.auth, user: action.payload } };
    case Types.Set_Token:
      return { ...state, auth: { ...state.auth, token: action.payload } };

    case Types.Open_Modal:
      return { ...state, modalState: { open: true, ...action.payload } };
    case Types.Close_Modal:
      return { ...state, modalState: { ...state.modalState, open: false } };

    case Types.Open_Alert:
      return { ...state, toastAlert: { ...action.payload, open: true } };
    case Types.Close_Alert:
      return { ...state, toastAlert: { ...state.toastAlert, open: false } };

    case Types.Multiple_Changes:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const withGlobalState = (Component) => (props) => {
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
        <Toast />
      </globalDispatchContext.Provider>
    </globalStateContext.Provider>
  );
};

export const useGlobalState = () => React.useContext(globalStateContext);
export const useGlobalStateDispatch = () =>
  React.useContext(globalDispatchContext);

export default withGlobalState;
