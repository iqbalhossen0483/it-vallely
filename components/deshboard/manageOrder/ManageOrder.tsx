import { fetchAPI } from "../../../clientServices/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import React, { useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Orders from "../../HOC/Orders";

interface Props {
  value: number;
  index: number;
  updateOrder(id: string, status: OrderStatus): void;
  deleteOrder(id: string): Promise<void>;
}
const ManageOrder = ({ value, index, updateOrder, deleteOrder }: Props) => {
  const headData = ["Customer Info", "Product Info", "Delivary Info"];
  const status = ["Pending", "Approved", "Cenceled", "Delivered"];
  const [orders, setOrders] = useState<OrderInfo[] | null>(null);
  const [filterOrder, setFilterOrder] = useState("All");
  const filterStatus = ["All", ...status];
  const store = useStore();

  useEffect(() => {
    (async () => {
      const token = await store?.firebase.user?.getIdToken();
      const res = await fetchAPI<OrderInfo[]>("/api/order", {
        headers: {
          user_uid: `${store?.firebase.user?.uid}`,
          token: `${process.env.NEXT_PUBLIC_TOKEN_BEARRER} ${token}`,
        },
      });
      if (res.data) {
        setOrders(res.data);
        setFilterOrder("All");
      } else if (res.netProblem) {
        store?.State.setError(res.netProblem);
      } else {
        store?.State.setAlert(res.error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.State.update, store?.firebase.user]);

  async function handleFilterOrder(status: string) {
    setFilterOrder(status);
    const token = await store?.firebase.user?.getIdToken();
    const res = await fetchAPI<OrderInfo[]>(`/api/order?status=${status}`, {
      headers: {
        user_uid: `${store?.firebase.user?.uid}`,
        token: `${process.env.NEXT_PUBLIC_TOKEN_BEARRER} ${token}`,
      },
    });
    if (res.data) {
      setOrders(res.data);
    }
  }

  return (
    <div className={`${value !== index ? "hidden" : "w-full "}`}>
      <Table>
        <TableHead>
          <TableRow>
            {headData.map((item, index) => (
              <TableCell key={index}>
                <b>{item}</b>
              </TableCell>
            ))}
            <TableCell>
              <TextField
                sx={{ width: "100%", textAlign: "center" }}
                id='standard-select-currency'
                helperText='filter order'
                value={filterOrder}
                onChange={(e) => {
                  handleFilterOrder(e.target.value);
                }}
                variant='standard'
                select
              >
                {filterStatus.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </TableCell>
          </TableRow>
        </TableHead>
        {orders && (
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id} hover>
                <TableCell>
                  Name:{" "}
                  <b>
                    {order.fname} {order.lname}
                  </b>{" "}
                  <br />
                  Mobile: <b>{order.mobile}</b> <br />
                  Email: <b>{order.email}</b>
                </TableCell>
                <TableCell>
                  Total Product: {order.products?.length}
                  <br />
                  {order.products?.map((product, index) => (
                    <span key={index}>
                      Code:{" "}
                      <b className='text-primary'>{product.productCode}</b>{" "}
                      <br />
                      Name: <b>{product.name.slice(0, 15)}</b> <br />
                      Price: <b>{product.price}</b> <br />
                      Quantity: <b>{product.quantity}</b>
                      {order.products?.length &&
                        order.products?.length !== index + 1 && (
                          <>
                            <br /> <br />
                          </>
                        )}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  Payment Method: <b>{order.paymentMethod}</b> <br />
                  Delivary Method: <b>{order.delivaryMethod}</b> <br />
                  Sub-Total: <b>{order.subTotal}</b> <br />
                  {order.discount && (
                    <>
                      Discount: <b>{order.discount}</b> <br />
                    </>
                  )}
                  Delivary Cost: <b>{order.delivaryCost}</b> <br />
                  Total: <b className='text-primary'>{order.total}</b>
                  {order.comment && (
                    <>
                      <br /> Comment: <b>{order.comment}</b>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <TextField
                    className='col-span-3'
                    id='standard-select-currency'
                    sx={{ width: "100%", textAlign: "center" }}
                    helperText='Change Status'
                    value={order.status}
                    disabled={store?.State.loading}
                    onChange={(e) => {
                      updateOrder(order._id, e.target.value as OrderStatus);
                    }}
                    variant='standard'
                    select
                  >
                    {status.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant='outlined'
                    onClick={() => deleteOrder(order._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default Orders(ManageOrder);
