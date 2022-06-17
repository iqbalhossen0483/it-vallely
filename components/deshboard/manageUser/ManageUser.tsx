import { UserRecord } from "firebase-admin/lib/auth/user-record";
import React, { useEffect, useState } from "react";
import {
  fetchAPI,
  handleError,
} from "../../../clientServices/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
interface Props {
  value: number;
  index: number;
}
const ManageUser = ({ value, index }: Props) => {
  const [users, setUsers] = useState<UserRecord[] | null>(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      const token = await store?.firebase.user?.getIdToken();
      const users = await fetchAPI<UserRecord[]>("/api/user", {
        headers: {
          user_uid: `${store?.firebase.user?.uid}`,
          token: `${process.env.NEXT_PUBLIC_TOKEN_BEARRER} ${token}`,
        },
      });
      if (users.data) {
        setUsers(users.data);
      } else handleError(users, store?.State!);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div hidden={value !== index}>
      {users &&
        users.map((user) => (
          <div key={user.uid}>
            <p>{user.displayName}</p>
          </div>
        ))}
    </div>
  );
};

export default ManageUser;
