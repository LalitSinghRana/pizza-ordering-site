import { AddProduct } from "./AddProduct";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  const addProduct = () => {
    onAddProduct(product);
  };

  return (
    <div className="w-full p-4 m-2 rounded text-white bg-gradient-to-b from-slate-600 to-transparent text-center">
      <div className="w-full p-2 m-1 flex">
        <h2 className="pb-2 text-lg flex-1">{product.name}</h2>
        <AddProduct onAddProduct={addProduct} />
      </div>
      <img src={product.imageUrl} alt={product.name} />
    </div>
  );
};
