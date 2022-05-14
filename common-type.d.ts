interface SliderImg {
  _id: string;
  url: string;
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
  gImg: FileList;
  productImg: { imgId: string; imgUrl: string };
  productImgGallery: { imgUrl: string; imgId: string }[];
  description: string;
}

type Cart = { productId: string; price: number };
