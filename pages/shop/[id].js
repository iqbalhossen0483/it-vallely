import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import ProductDeatails from "../../components/productDetails/ProductDeatails";
import Spinner from "../../components/shared/Spinner";
import { dbConnection } from "../../serverServices/mongodb/dbConnection";

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
  try {
    const { database } = await dbConnection();
    const productsCollection = database?.collection("products");
    if (!productsCollection) throw { message: "No products collection" };
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
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps(contex) {
  try {
    const { params } = contex;
    const { database } = await dbConnection();
    const productsCollection = database?.collection("products");
    if (!productsCollection) throw { message: "No products collection" };
    const singleProduct = await productsCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!singleProduct?._id) throw { message: "No product" };
    return {
      props: {
        data: JSON.parse(JSON.stringify(singleProduct)),
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
