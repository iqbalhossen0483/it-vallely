import { fetchAPI } from "../../../services/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import Input from "../../shared/utilitize/Input";
import EditIcon from "@mui/icons-material/Edit";
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

interface Props {
  value: number;
  index: number;
}
const ManageOrder = ({ value, index }: Props) => {
  const [orders, setOrders] = useState<OrderInfo[] | null>(null);
  const [filterOrder, setFilterOrder] = useState("All");
  const store = useStore();
  const headData = ["Customer Info", "Product Info", "Delivary Info"];
  const status = ["Pending", "Approved", "Cenceled", "Delivered"];
  const filterStatus = ["All", ...status];

  useEffect(() => {
    (async () => {
      const res = await fetchAPI<OrderInfo[]>("/api/order");
      if (res.data) {
        setOrders(res.data);
        setFilterOrder("All");
      } else if (res.error) {
        store?.State.setAlert(res.data);
      } else if (res.netProblem) {
        store?.State.setError(res.netProblem);
      }
    })();
  }, [store?.State]);

  async function updateOrder(id: string, status: string) {
    store?.State.setLoading(true);
    const body = { id, status };
    const res = await fetch("/api/order", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      store?.State.setAlert("Update successfull");
    } else {
      store?.State.setAlert(data.message || "Opps! an error occurs");
    }
    store?.State.setLoading(false);
  }

  async function deleteOrder(id: string) {
    store?.State.setLoading(true);
    const confirm = window.confirm("Are you sure to delete");
    if (confirm) {
      const res = await fetch("/api/order", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          id,
        },
      });
      const data = await res.json();
      if (res.ok) {
        store?.State.setAlert("Deleted successfull");
      } else {
        store?.State.setAlert(data.message || "Opps! an error occurs");
      }
    }
    store?.State.setLoading(false);
  }

  async function handleFilterOrder(status: string) {
    setFilterOrder(status);
    const res = await fetchAPI<OrderInfo[]>(`/api/order?status=${status}`);
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
              <TableCell key={index}>{item}</TableCell>
            ))}
            <TableCell>
              <TextField
                className='flex justify-self-center'
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
                <TableCell className='grid grid-cols-4 items-center border-none'>
                  <TextField
                    className='col-span-3'
                    id='standard-select-currency'
                    helperText='Change Status'
                    value={order.status}
                    disabled={store?.State.loading}
                    onChange={(e) => {
                      updateOrder(order._id, e.target.value);
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
                  <Button onClick={() => deleteOrder(order._id)}>
                    <DeleteIcon />
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

export default ManageOrder;
