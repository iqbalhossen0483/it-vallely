import { StoreReturnType } from "../../contex/store/Store";
import { fetchAPI, handleError } from "../shared/sharedFunction";

export async function deleteUser(uid: string, store: StoreReturnType | null) {
  const token = await store?.firebase.user?.getIdToken();
  const result = await fetchAPI<{ message: string }>(`/api/user?uid=${uid}`, {
    method: "DELETE",
    headers: {
      user_uid: `${store?.firebase.user?.uid}`,
      token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
    },
  });
  if (result.data) {
    store?.State.setAlert({ msg: result.data.message, type: "success" });
    return { msg: "success" };
  } else handleError(result, store?.State!);
}
