import { StoreReturnType } from "../../contex/store/Store";
import { fetchAPI, handleError } from "../shared/sharedFunction";

export async function updateUserRole(
  uid: string,
  newRole: UserRoles,
  store: StoreReturnType | null
) {
  const formData = new FormData();
  formData.append("uid", uid);
  formData.append("newRole", newRole);
  const token = await store?.firebase.user?.getIdToken();
  const result = await fetchAPI<{ message: string }>("/api/user", {
    method: "PUT",
    headers: {
      user_uid: `${store?.firebase.user?.uid}`,
      token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
    },
    body: formData,
  });
  if (result.data) {
    store?.State.setAlert({
      msg: "User role has been modified",
      type: "success",
    });
  } else handleError(result, store?.State!);
}
