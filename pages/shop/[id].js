import ProductDeatails from "../../components/productDetails/ProductDeatails";
import { dbConnection } from "../../serverServices/services/dbConnection";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import Spinner from "../../components/shared/Spinner";

const ProductDetailsLeyout = ({ data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Spinner />;
  }
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
    fallback: true,
  };
}

export async function getStaticProps(contex) {
  const { params } = contex;
  const db = await dbConnection();
  const productsCollection = db.collection("products");
  const singleProduct = await productsCollection.findOne({
    _id: ObjectId(params.id),
  });

  if (!singleProduct?._id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: JSON.parse(JSON.stringify(singleProduct)),
    },
    revalidate: 10,
  };
}
