import { useState } from "react";
import useStore from "../../contex/hooks/useStore";

type Props = {
  value: number;
  index: number;
  loading: string;
  updateOrder: (id: string, status: OrderStatus) => void;
  deleteOrder(id: string, willDeleteImg: string[] | null): Promise<void>;
};
type Params = ({
  value,
  index,
  updateOrder,
  deleteOrder,
  loading,
}: Props) => JSX.Element | null;

const Orders = (OriginalComponent: Params) => {
  return function NewComponent({ value, index }: Props) {
    const [loading, setLoading] = useState("");
    const store = useStore();

    //update order start;;;
    async function updateOrder(id: string, status: OrderStatus) {
      setLoading(id);
      const confirm = window.confirm(`Are sure to ${status} this order`);
      if (confirm) {
        const token = await store?.firebase.user?.getIdToken();
        const body = { id, status };
        const res = await fetch("/api/order", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            user_uid: `${store?.firebase.user?.uid}`,
            token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
          },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
          if (data.modifiedCount) {
            store?.State.setAlert({
              msg: `This order has been ${status}`,
              type: "success",
            });
            store?.State.setUpdate((prev) => !prev);
          }
        } else {
          store?.State.setAlert({ msg: data.message, type: "error" });
        }
      }
      setLoading("");
    } //update order end;;

    //delete order start;;
    async function deleteOrder(id: string, willDeleteImg: string[] | null) {
      setLoading(id);
      const token = await store?.firebase.user?.getIdToken();
      const confirm = window.confirm("Are you sure to delete this order");
      if (confirm) {
        const res = await fetch("/api/order", {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            user_uid: `${store?.firebase.user?.uid}`,
            token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
          },
          body: JSON.stringify({ id, willDeleteImg }),
        });
        const data = await res.json();
        if (res.ok && data.deletedCount > 0) {
          store?.State.setAlert({
            msg: "Deleted successfull",
            type: "success",
          });
          store?.State.setUpdate((prev) => !prev);
        } else {
          store?.State.setAlert(data.message);
        }
      }
      setLoading("");
    } //delete order end;;

    return (
      <OriginalComponent
        updateOrder={updateOrder}
        deleteOrder={deleteOrder}
        loading={loading}
        value={value}
        index={index}
      />
    );
  };
};

export default Orders;
