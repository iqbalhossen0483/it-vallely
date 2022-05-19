import { Store } from "@mui/icons-material";
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
import React, { useCallback, useEffect, useState } from "react";
import useStore from "../../contex/hooks/useStore";

export const thead = [
  "Image",
  "Product Name",
  "Product Code",
  "Quantity",
  "Unit Price",
  "Total",
];
type Props = {
  product: Product[] | null;
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
          ? item.quantity * parseInt(item.price)
          : parseInt(item.price);
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
      <Table>
        <TableHead>
          <TableRow className='bg-slate-200'>
            {thead.map((item, index) =>
              router.pathname !== "/account/viewcart" ? (
                item !== "Image" ? (
                  item !== "Product Code" ? (
                    <TableCell key={index}>{item}</TableCell>
                  ) : null
                ) : null
              ) : (
                <TableCell key={index}>{item}</TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {product &&
            product.map((item: Product) => {
              return (
                <TableRow hover key={item._id}>
                  {router.pathname === "/account/viewcart" && (
                    <TableCell>
                      <Image
                        height={80}
                        width={80}
                        src={item.productImg.imgUrl}
                        alt=''
                      />
                    </TableCell>
                  )}
                  <TableCell>{item.name}</TableCell>
                  {router.pathname === "/account/viewcart" && (
                    <TableCell>{item.productCode}</TableCell>
                  )}
                  <TableCell>
                    {router.pathname === "/account/viewcart" ? (
                      <input
                        onChange={(e) =>
                          updateTotal(parseInt(e.target.value), item._id)
                        }
                        className='w-14 text-center'
                        onBlur={(e) => {
                          if (!e.target.value) {
                            e.target.value = "1";
                            store?.Carts.updateCart(item._id, "1");
                          }
                        }}
                        defaultValue={item.quantity || 1}
                        type='text'
                      />
                    ) : (
                      <p>{item.quantity || 1}</p>
                    )}
                  </TableCell>
                  <TableCell>{item.price}৳</TableCell>
                  <TableCell>
                    {item.quantity
                      ? item.quantity * parseInt(item.price)
                      : item.price}
                    ৳
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className='price-table'>
        <Table className='w-72 ml-auto'>
          <TableBody>
            {router.pathname === "/account/viewcart" ? (
              <TableRow hover>
                <TableCell>Total:</TableCell>
                <TableCell className='font-semibold text-primary'>
                  {total}৳
                </TableCell>
              </TableRow>
            ) : (
              <>
                <TableRow hover>
                  <TableCell>Sub-Total:</TableCell>
                  <TableCell className='font-semibold text-primary'>
                    {total}৳
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Delivary Cost:</TableCell>
                  <TableCell className='font-semibold text-primary'>
                    {delivaryCost}৳
                  </TableCell>
                </TableRow>
                {discount && (
                  <TableRow hover>
                    <TableCell>Discount:</TableCell>
                    <TableCell className='font-semibold text-primary'>
                      {discount}৳
                    </TableCell>
                  </TableRow>
                )}
                <TableRow hover>
                  <TableCell>Total:</TableCell>
                  <TableCell className='font-semibold text-primary'>
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
        <div className='w-72 ml-auto flex justify-center mt-5'>
          <Button
            onClick={action}
            variant='contained'
            className='bg-mui mx-auto'
          >
            Confirm order
          </Button>
        </div>
      </div>
    </>
  );
};

export default OverViewProducts;
