import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

const HomePage = () => {
  return (
    <>
      <ProductList title="Newest Arrivals" data={sampleData.products} />
    </>
  );
};
export default HomePage;
