import { useAddProduct } from "@/hooks/use-product";


export function AddProductButton() {

  const addProductMutation = useAddProduct();

  const handleAddProduct = () => {
    addProductMutation.mutate({
      name: "New Product", price: 100,
      description: "asdasd",
      in_stock: false
    });
  };
  return (
    <button
      onClick={handleAddProduct}
      disabled={addProductMutation.isPending}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {addProductMutation.isPending ? "Adding..." : "Add Product"}
    </button>
  );
}