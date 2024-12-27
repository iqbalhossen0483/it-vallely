interface SliderImg {
  _id: string;
  link: string;
  file: FileList;
  imgUrl: string;
  imgId: string;
}

interface BannerImg {
  _id: string;
  link: string;
  file: FileList;
  imgUrl: string;
  imgId: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  prevPrice?: number;
  orderPending: number;
  category: string;
  keyFeatures: string[];
  tags: string[];
  pImg: FileList;
  specifications: any[];
  stock: number;
  productCode: string;
  brand: string;
  quantity?: number;
  gImg: FileList;
  productImg: { imgId: string; imgUrl: string };
  productImgGallery: { imgUrl: string; imgId: string }[];
  description: string;
  created_at: Date;
}

type Cart = { productId: string; price: number; quantity: string };

type OrderedProducts = {
  _id: string;
  productCode: string;
  productImg: { imgUrl: string; imgId: string };
  name: string;
  price: number;
  quantity: number;
};

type OrderInfo = {
  _id: string;
  fname: string;
  lname: string;
  address: string;
  mobile: string;
  email: string;
  comment: string;
  delivaryMethod: string;
  paymentMethod: string;
  products: OrderedProducts[] | null;
  delivaryCost: number;
  subTotal: number;
  discount: number;
  total: number;
  status: string;
  created_at: Date;
  willDeleteImg?: string[];
};

type OrderStatus = "Pending" | "Approved" | "Cenceled" | "Delivered";

type UserRoles = "user" | "admin" | "manager";
