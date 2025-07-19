import _ from "lodash";
import Head from "next/head";
import ProductCardComponent from "../../components/ProductCardComponent";
import { getEntriesByContentType } from "../../lib/helpers";

const CategoryPage = (props) => {
  const category = _.get(props, "category.items[0]");
  const categoryName = _.get(category, "fields.name");
  const products = _.get(props, "products.items", []);

  return (
    <>
      <Head>
        <title>{categoryName} - Jumpstart Shop</title>
      </Head>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center">{categoryName}</h1>
        <div className="flex flex-col space-y-8">
          {products.length > 0 ? (
            products.map((product, productIndex) => {
              const productId = _.get(product, "sys.id");
              const fields = _.get(product, "fields");
              return (
                <ProductCardComponent
                  productIndex={productIndex}
                  key={productId}
                  id={productId}
                  fields={fields}
                />
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const categoryEntries = await getEntriesByContentType("category");

  let paths = [];
  if (categoryEntries) {
    try {
      paths = categoryEntries.items.map((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        return { params: { slug: slugVal } };
      });
    } catch (error) {
      console.error("Error generating category paths:", error);
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = _.get(context, "params.slug");

  // Get the category
  const category = await getEntriesByContentType("category", slug);

  // Get products that belong to this category
  // Note: This assumes your product content type has a categories field that references category entries
  const products = await getEntriesByContentType("product");

  // Filter products by category (you might need to adjust this based on your content model)
  const filteredProducts = {
    items:
      products?.items?.filter((product) => {
        const productCategories = _.get(product, "fields.categories", []);
        return productCategories.some(
          (cat) => _.get(cat, "fields.slug") === slug
        );
      }) || [],
  };

  return {
    props: {
      category,
      products: filteredProducts,
    },
  };
}

export default CategoryPage;
