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
  model: string;
  keyFeatures: string[];
  tags: string[];
  brand: string;
  productImg: { imgId: string; imgUrl: string };
  imgGallery: { imgUrl: string; imgId: string }[];
  description: string;
}

type Cart = { productId: string; price: number };
