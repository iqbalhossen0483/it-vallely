import { ListItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Categories = () => {
  const router = useRouter();

  const datas = [
    "Laptop",
    "Destop",
    "Monitor",
    "Keyboard",
    "Mouse",
    "Watch",
    "Hard Disk (HHD, SSD)",
    "Mobile Phone",
  ];
  return (
    <div className='categories'>
      <h3>Popular Categories</h3>
      {datas.map((category) => (
        <ListItem
          onClick={() => router.push(`/shop/category/${category}`)}
          key={category}
        >
          {category}
        </ListItem>
      ))}
    </div>
  );
};

export default Categories;
