import { useAddProduct } from "@/hooks/use-product";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"

export function AddProductButton() {

  const addProductMutation = useAddProduct();

  const handleAddProduct = () => {
    addProductMutation.mutate({
      name: "New Product", price: 100,
      description: "asdasd",
      in_stock: false
    });

    toast.success("Product added successfully!");
  };
  return (
    <Button
      onClick={handleAddProduct}
      disabled={addProductMutation.isPending}
      variant={"outline"}
    >
      {addProductMutation.isPending ? "Adding..." : "Add Product"}
    </Button>
  );
}