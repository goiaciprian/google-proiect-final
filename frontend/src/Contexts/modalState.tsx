import React from "react";

export type ModalState = {
  open: boolean;
  type: string;
};

type Action = {
  type: string;
  payload?: ModalState;
};

export enum ModalTypes {
  Open_Modal = "OPEN_MODAL",
  Close_Modal = "CLOSE_MODAL",
}

export const initial_state_modal = {
  open: false,
  type: "register",
};

const modalState = React.createContext(initial_state_modal);
const modalDispatch = React.createContext<React.Dispatch<Action>>(
  () => initial_state_modal
);

modalState.displayName = "ModalState";
modalDispatch.displayName = "ModalDispatch";

const reducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case ModalTypes.Open_Modal:
      console.log("open modal", action.payload);
      return action.payload ? { ...action.payload } : { ...state };
    case ModalTypes.Close_Modal:
      return { ...state, open: false };
    default:
      return state;
  }
};

const withModalState =
  (Component: React.FunctionComponent) =>
  (props: React.PropsWithChildren<any>) => {
    const [state, dispatch] = React.useReducer(
      reducer,
      initial_state_modal,
      () => initial_state_modal
    );

    return (
      <modalState.Provider value={state}>
        <modalDispatch.Provider value={dispatch}>
          <Component {...props} />
        </modalDispatch.Provider>
      </modalState.Provider>
    );
  };

export const useModalState = () => React.useContext(modalState);
export const useModalDispatch = () => React.useContext(modalDispatch);

export default withModalState;
