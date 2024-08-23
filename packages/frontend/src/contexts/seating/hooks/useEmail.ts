import { Dispatch, useContext, useEffect } from "react";
import { GasContext } from "../../gas/GasContext";
import { SeatingAction } from "../reducers/seatingReducer";

export const useEmail = (dispatch: Dispatch<SeatingAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions
      .getEmail()
      .then((email) => {
        dispatch({ type: "set", key: "email", value: email });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [serverFunctions, dispatch]);
};
