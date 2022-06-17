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
import useStore from "../../contex/hooks/useStore";

export const thead = [
  "Product",
  "Product Code",
  "Quantity",
  "Unit Price",
  "Total",
];
type Props = {
  product: OrderedProducts[] | null;
  action: () => void;
  delivary?: string;
  discount?: number | null;
  setTotalAmount?: React.Dispatch<React.SetStateAction<number>>;
};

const OverViewProducts = ({
  product,
  action,
  delivary,
  discount,
  setTotalAmount,
}: Props) => {
  const [update, setUpdate] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    let total = 0;
    if (product) {
      for (const item of product) {
        const totalPrice = item.quantity
          ? item.quantity * item.price
          : item.price;
        total += totalPrice;
      }
      setTotal(total);
      if (setTotalAmount !== undefined) {
        setTotalAmount(total);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, update]);

  function updateTotal(q: number, id: string) {
    const find = product?.find((i) => i._id === id);
    if (find) {
      find.quantity = q;
    }
    store?.Carts.updateCart(id, q.toString());
    setUpdate(!update);
  }
  const delivaryCost = delivary && delivary === "home" ? 100 : 0.0;

  return (
    <>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow className='bg-slate-200'>
            {thead.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {router.pathname === "/account" ? (
                    <TableCell
                      colSpan={item === "Product" ? 2 : 1}
                      align='center'
                      className={`${item === "Product Code" && "hideOnPhone"}`}
                    >
                      {item}
                    </TableCell>
                  ) : (
                    item !== "Product Code" && (
                      <TableCell
                        key={index}
                        colSpan={item === "Product" ? 2 : 1}
                        align='center'
                        className={`${
                          item === "Product Code" && "hideOnPhone"
                        }`}
                      >
                        {item}
                      </TableCell>
                    )
                  )}
                </React.Fragment>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {product &&
            product.map((item: OrderedProducts) => {
              return (
                <TableRow hover key={item._id}>
                  <TableCell className='hideOnPhone'>
                    <Image
                      height={80}
                      width={80}
                      src={item.productImg.imgUrl}
                      alt=''
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  {router.pathname === "/account" && (
                    <TableCell align='center'>{item.productCode}</TableCell>
                  )}
                  <TableCell>
                    {router.pathname === "/account" ? (
                      <input
                        onChange={(e) =>
                          updateTotal(parseInt(e.target.value), item._id)
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            e.target.value = "1";
                            store?.Carts.updateCart(item._id, "1");
                          }
                        }}
                        style={{ width: "3.5rem", textAlign: "center" }}
                        defaultValue={item.quantity || 1}
                        type='text'
                      />
                    ) : (
                      <p>{item.quantity || 1}</p>
                    )}
                  </TableCell>
                  <TableCell>{item.price}৳</TableCell>
                  <TableCell>
                    {item.quantity ? item.quantity * item.price : item.price}৳
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className='price-table'>
        <Table>
          <TableBody>
            {router.pathname === "/account" ? (
              <TableRow hover>
                <TableCell>Total:</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#e8080a" }}>
                  {total}৳
                </TableCell>
              </TableRow>
            ) : (
              <>
                <TableRow hover>
                  <TableCell>Sub-Total:</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#e8080a" }}>
                    {total}৳
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Delivary Cost:</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#e8080a" }}>
                    {delivaryCost}৳
                  </TableCell>
                </TableRow>
                {discount && (
                  <TableRow hover>
                    <TableCell>Discount:</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#e8080a" }}>
                      {discount}৳
                    </TableCell>
                  </TableRow>
                )}
                <TableRow hover>
                  <TableCell>Total:</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#e8080a" }}>
                    {discount
                      ? total + delivaryCost - discount
                      : total + delivaryCost}
                    ৳
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <div className='btn-wrapper'>
          <Button
            onClick={action}
            disabled={store?.State.loading}
            variant='contained'
            style={{
              backgroundColor: "#0e66a8",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Confirm order
          </Button>
        </div>
      </div>
    </>
  );
};

export default OverViewProducts;
