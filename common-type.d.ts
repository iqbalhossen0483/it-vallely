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
  price: string;
  prevPrice?: number;
  category: string;
  keyFeatures: string[];
  tags: string[];
  pImg: FileList;
  specifications: {}[];
  stock: number;
  productCode: string;
  brand: string;
  quantity?: number;
  gImg: FileList;
  productImg: { imgId: string; imgUrl: string };
  productImgGallery: { imgUrl: string; imgId: string }[];
  description: string;
}

type Cart = { productId: string; price: number; quantity: string };

type OrderInfo = {
  id?: string;
  fname: string;
  lname: string;
  address: string;
  mobile: string;
  email: string;
  comment: string;
  delivaryMethod: string;
  paymentMethod: string;
  products: Product[] | null;
  delivaryCost: number;
  subTotal: number;
  discount: number;
  total: number;
};
