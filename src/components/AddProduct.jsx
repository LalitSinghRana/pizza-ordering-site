export const AddProduct = ({ onAddProduct }) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onAddProduct}
        className="bg-yellow-400 hover:bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-lg"
      >
        <span>+</span>
      </button>
    </div>
  );
};
