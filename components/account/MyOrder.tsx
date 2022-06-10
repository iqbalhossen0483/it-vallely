import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "../../clientServices/shared/sharedFunction";
import useStore from "../../contex/hooks/useStore";
import Orders from "../HOC/Orders";

interface Props {
  value: number;
  index: number;
  updateOrder: (id: string, status: OrderStatus) => void;
  deleteOrder(id: string): Promise<void>;
}

const MyOrder = ({ value, index, updateOrder, deleteOrder }: Props) => {
  const [orders, setOrders] = useState<OrderInfo[] | null>(null);
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = await store?.firebase.user?.getIdToken();
      const res = await fetchAPI<OrderInfo[]>(
        `/api/order?email=${store?.firebase.user?.email}`,
        {
          headers: {
            user_uid: `${store?.firebase.user?.uid}`,
            token: `${process.env.NEXT_PUBLIC_TOKEN_BEARRER} ${token}`,
          },
        }
      );
      if (res.data) {
        setOrders(res.data);
      } else {
        store?.State.setAlert(res.error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.firebase.user, store?.State.update]);

  return (
    <div className='bg-gray-100 p-5 rounded' hidden={value !== index}>
      <Table className='bg-white rounded'>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={2}>
              <b>Procuct info</b>
            </TableCell>
            <TableCell align='center'>
              <b>Order info</b>
            </TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                {item.products?.map((i) => (
                  <div key={i._id}>
                    <Image
                      height={50}
                      width={50}
                      src={i.productImg.imgUrl}
                      alt=''
                    />
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <p>
                  <b>Total product:</b> {item.products?.length}
                </p>
                <p>
                  <b>Product code:</b>{" "}
                  {item.products?.map((i) => (
                    <span key={i._id}>{i.productCode}, </span>
                  ))}
                </p>
                <p>
                  <b>Name:</b>{" "}
                  {item.products?.map((i) => (
                    <span
                      key={i._id}
                      className='link'
                      onClick={() => router.push(`/shop/${i._id}`)}
                    >
                      {i.name.length > 50
                        ? i.name.slice(0, 50) + "..."
                        : i.name}
                      <br />
                    </span>
                  ))}
                </p>
              </TableCell>
              <TableCell>
                <b>Payment Method:</b>{" "}
                {item.paymentMethod === "cash" && "Cash on delivary"} <br />
                <b>Delivary Method:</b> {item.delivaryMethod} <br />
                <b>Sub-Total:</b> {item.subTotal} <br />
                {item.discount && (
                  <>
                    <b>Discount:</b> {item.discount} <br />
                  </>
                )}
                <b>Delivary Cost:</b> {item.delivaryCost} <br />
                <b>Total:</b> <b className='text-mui'>{item.total}</b>
                <br />
                <b>Status:</b> <b className='text-mui'>{item.status}</b>
              </TableCell>
              <TableCell>
                {item.status === "Delivered" ? (
                  <b className='text-mui'>Thank you</b>
                ) : item.status === "Cenceled" ? (
                  <Button
                    onClick={() => deleteOrder(item._id)}
                    variant='outlined'
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    onClick={() => updateOrder(item._id, "Cenceled")}
                    variant='outlined'
                  >
                    Cencel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders(MyOrder);
