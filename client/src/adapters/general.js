import { somethingIsWrong, success, error, SIGN_IN_ROUTE } from "../constants";
import { signOutEndPoint } from "./endpoint";

export const signOut = (navigate, handleCreateToast,setisLoading) => {
  fetch(signOutEndPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    setisLoading(true)
    let data = await res.json();
    if (res.status === 200) {
      navigate(SIGN_IN_ROUTE);
      handleCreateToast(data.message, success);
    } else if (res.status === 201) {
      handleCreateToast(data.message, error);
    } else {
      handleCreateToast(somethingIsWrong, error);
    }
    setisLoading(false)
  });
};
