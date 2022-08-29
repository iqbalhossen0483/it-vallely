import { UserRecord } from "firebase-admin/lib/auth/user-record";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "@mui/material";
import useStore from "../../../contex/hooks/useStore";
import { useForm } from "react-hook-form";
import Spinner from "../../shared/Spinner";
import { initialFn } from "../../../clientServices/manageUser/initialFn";
import { updateUserRole } from "../../../clientServices/manageUser/updateUserRole";
import { disableAndEnable } from "../../../clientServices/manageUser/disableAndEnable";
import { addUser, AddUser } from "../../../clientServices/manageUser/addUser";
import { deleteUser } from "../../../clientServices/manageUser/deleteUser";
import TableHeader from "./component/TableHeader";
import Body from "./component/Body";
import AddUserForm from "./component/AddUser";

const ManageUser = () => {
  const [filterUser, setFilterUser] = useState<UserRecord[] | null>(null),
    [users, setUsers] = useState<UserRecord[] | null>(null),
    [updateUserForm, setUpdateUpdateuserForm] = useState(-1),
    [addUserform, setAddUserform] = useState(false),
    [filterRole, setFilterRole] = useState("All"),
    tableRef = useRef<HTMLTableElement>(null),
    [update, setUpdate] = useState(false),
    [loading, setLoading] = useState(false),
    store = useStore();

  // fetch data;
  useEffect(() => {
    initialFn(store, setUsers, setFilterUser, setFilterRole);

    document.addEventListener("click", (e) => {
      const isContain = tableRef.current?.contains(e.target as Node);
      if (!isContain) setUpdateUpdateuserForm(-1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  //toggle form
  function handleForm(index: number) {
    if (index !== updateUserForm) setUpdateUpdateuserForm(index);
    else setUpdateUpdateuserForm(-1);
  }

  //filter user by role;
  function handleFilterUser(role: string) {
    setFilterRole(role);
    if (role === "All") return setFilterUser(users);

    const filtered = users?.filter((user) =>
      user.customClaims?.role
        ? user.customClaims.role === role
        : "User" === role
    );
    setFilterUser(filtered || null);
  }

  //update user role
  async function handleupdateUserRole(uid: string, newRole: UserRoles) {
    setLoading(true);
    await updateUserRole(uid, newRole, store);
    setUpdate((prev) => !prev);
    setUpdateUpdateuserForm(-1);
    setLoading(false);
  }

  //disable and enable user;
  async function handledisableAndEnable(
    uid: string,
    value: "enable" | "disable"
  ) {
    setLoading(true);
    await disableAndEnable(uid, value, store);
    setUpdate((prev) => !prev);
    setLoading(false);
  }

  async function handleaddUser(data: AddUser) {
    setLoading(true);
    const result = await addUser(data, store);
    if (result && result.message) {
      setUpdate((prev) => !prev);
      setAddUserform(false);
    }
    setLoading(false);
  }

  async function handledeleteUser(uid: string) {
    setLoading(true);
    const result = await deleteUser(uid, store);
    if (result && result.msg) {
      setUpdate((prev) => !prev);
    }
    setLoading(false);
  }

  return (
    <div style={{ position: "relative" }} className='w-[80%]'>
      <Table ref={tableRef}>
        <TableHeader
          filterRole={filterRole}
          handleFilterUser={handleFilterUser}
          setAddUserform={setAddUserform}
        />
        <Body
          filterUser={filterUser}
          handleForm={handleForm}
          handledeleteUser={handledeleteUser}
          handledisableAndEnable={handledisableAndEnable}
          handleupdateUserRole={handleupdateUserRole}
          loading={loading}
          updateUserForm={updateUserForm}
        />
      </Table>

      <AddUserForm
        addUserform={addUserform}
        handleaddUser={handleaddUser}
        loading={loading}
      />

      {filterUser && !filterUser?.length && (
        <div className='empty-message'>
          <p>There is no user</p>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
