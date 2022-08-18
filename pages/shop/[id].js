import ProductDeatails from "../../components/productDetails/ProductDeatails";
import { dbConnection } from "../../serverServices/mongodb/dbConnection";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import Spinner from "../../components/shared/Spinner";

const ProductDetailsLeyout = ({ data, error }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }
  return <ProductDeatails data={data} />;
};

export default ProductDetailsLeyout;

//next js functions;
export async function getStaticPaths() {
  const { database } = await dbConnection();
  const productsCollection = database?.collection("products");
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
  const { database } = await dbConnection();
  const productsCollection = database?.collection("products");
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
