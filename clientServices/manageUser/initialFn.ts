import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { StoreReturnType } from "../../contex/store/Store";
import { fetchAPI, handleError } from "../shared/sharedFunction";

export async function initialFn(
  store: StoreReturnType | null,
  setUsers: React.Dispatch<React.SetStateAction<UserRecord[] | null>>,
  setFilterUser: React.Dispatch<React.SetStateAction<UserRecord[] | null>>,
  setFilterRole: React.Dispatch<React.SetStateAction<string>>
) {
  store?.State.setLoading(true);
  const token = await store?.firebase.user?.getIdToken();
  const users = await fetchAPI<UserRecord[]>("/api/user", {
    headers: {
      user_uid: `${store?.firebase.user?.uid}`,
      token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
    },
  });
  if (users.data) {
    setUsers(users.data);
    setFilterUser(users.data);
    setFilterRole("All");
    sessionStorage.setItem("users", JSON.stringify(users.data));
  } else handleError(users, store?.State!);
  store?.State.setLoading(false);
}
