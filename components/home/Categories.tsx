import { ListItem } from "@mui/material";
import React from "react";

const Categories = () => {
  const datas = [
    { name: "Laptop" },
    { name: "Destop" },
    { name: "Monitor" },
    { name: "Keyboard" },
    { name: "Mouse" },
    { name: "Watch" },
    { name: "Hard Disk (HHD, SSD)" },
    { name: "Mobile Phone" },
  ];
  return (
    <div className='categories'>
      <h3>Popular Categories</h3>
      {datas.map((category) => (
        <ListItem key={category.name}>{category.name}</ListItem>
      ))}
    </div>
  );
};

export default Categories;
