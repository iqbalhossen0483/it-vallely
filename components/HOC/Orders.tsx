import useStore from "../../contex/hooks/useStore";

type Props = {
  value: number;
  index: number;
  updateOrder: (id: string, status: OrderStatus) => void;
  deleteOrder(id: string, willDeleteImg: string[] | null): Promise<void>;
};
type Params = ({
  value,
  index,
  updateOrder,
  deleteOrder,
}: Props) => JSX.Element;

const Orders = (OriginalComponent: Params) => {
  return function NewComponent({ value, index }: Props) {
    const store = useStore();

    //update order start;;;
    async function updateOrder(id: string, status: OrderStatus) {
      store?.State.setLoading(true);
      const confirm = window.confirm(`Are sure to ${status} this order`);
      if (confirm) {
        const token = await store?.firebase.user?.getIdToken();
        const body = { id, status };
        const res = await fetch("/api/order", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            user_uid: `${store?.firebase.user?.uid}`,
            token: `${process.env.NEXT_PUBLIC_TOKEN_BEARRER} ${token}`,
          },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
          if (data.modifiedCount) {
            store?.State.setAlert(`This order has been ${status}`);
            store?.State.setUpdate((prev) => !prev);
          }
        } else {
          store?.State.setAlert(data.message);
        }
      }
      store?.State.setLoading(false);
    } //update order end;;

    //delete order start;;
    async function deleteOrder(id: string, willDeleteImg: string[] | null) {
      store?.State.setLoading(true);
      const token = await store?.firebase.user?.getIdToken();
      const confirm = window.confirm("Are you sure to delete this order");
      if (confirm) {
        const res = await fetch("/api/order", {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            user_uid: `${store?.firebase.user?.uid}`,
            token: `${process.env.NEXT_PUBLIC_TOKEN_BEARRER} ${token}`,
          },
          body: JSON.stringify({ id, willDeleteImg }),
        });
        const data = await res.json();
        if (res.ok && data.deletedCount > 0) {
          store?.State.setAlert("Deleted successfull");
          store?.State.setUpdate((prev) => !prev);
        } else {
          store?.State.setAlert(data.message);
        }
      }
      store?.State.setLoading(false);
    } //delete order end;;

    return (
      <OriginalComponent
        updateOrder={updateOrder}
        deleteOrder={deleteOrder}
        value={value}
        index={index}
      />
    );
  };
};

export default Orders;
