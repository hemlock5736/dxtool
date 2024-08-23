import { Dispatch, useContext, useEffect } from "react";
import { Members } from "../../../types/Member";
import { GasContext } from "../../gas/GasContext";
import { SeatingAction } from "../reducers/seatingReducer";

export const useMembers = (dispatch: Dispatch<SeatingAction>) => {
  const { serverFunctions } = useContext(GasContext);

  useEffect(() => {
    serverFunctions
      .getMembers()
      .then((members) => {
        dispatch({ type: "set", key: "members", value: members as Members });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [serverFunctions, dispatch]);
};
