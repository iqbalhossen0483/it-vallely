import ProductDeatails from "../../components/productDetails/ProductDeatails";
import { dbConnection } from "../../serverServices/services/dbConnection";
import { ObjectId } from "mongodb";

const ProductDetailsLeyout = ({ data }) => {
  return <ProductDeatails data={data} />;
};

export default ProductDetailsLeyout;

//next js functions;
export async function getStaticPaths() {
  const db = await dbConnection();
  const productsCollection = db.collection("products");
  const allProduct = await productsCollection.find().toArray();
  const paths = allProduct.map((item) => {
    return {
      params: {
        id: item._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(contex) {
  const { params } = contex;
  const db = await dbConnection();
  const productsCollection = db.collection("products");
  const singleProduct = await productsCollection.findOne({
    _id: ObjectId(params.id),
  });
  return {
    props: {
      data: JSON.parse(JSON.stringify(singleProduct)),
    },
    revalidate: 10,
  };
}
