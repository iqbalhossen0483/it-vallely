import React, { useEffect, useState } from "react";
import { fetchAPI } from "../../services/shared/sharedFunction";
interface Props {
  value: number;
  index: number;
}
const MyOrder = ({ value, index }: Props) => {
  const [orders, setOrders] = useState<OrderInfo[] | null>(null);
  // useEffect(() => {
  //   async () => {
  //     const res = await fetchAPI<OrderInfo[]>(
  //       "/api/order?email=rayhan.senbag.bd@gmail.com"
  //     );
  //   };
  // }, []);
  return <div hidden={value !== index}>my orders</div>;
};

export default MyOrder;
