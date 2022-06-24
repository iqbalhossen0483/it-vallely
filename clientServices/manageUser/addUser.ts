import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { StoreReturnType } from "../../contex/store/Store";
import { fetchAPI, handleError } from "../shared/sharedFunction";

export type AddUser = { name: string; email: string; password: string };

export async function addUser(data: AddUser, store: StoreReturnType | null) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  const token = await store?.firebase.user?.getIdToken();
  const result = await fetchAPI<UserRecord>("/api/user", {
    method: "POST",
    headers: {
      user_uid: `${store?.firebase.user?.uid}`,
      token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
    },
    body: formData,
  });
  if (result.data?.uid) {
    store?.State.setAlert({
      msg: "User added successfully",
      type: "success",
    });
    return { message: "success" };
  } else handleError(result, store?.State!);
}
