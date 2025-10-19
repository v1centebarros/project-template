import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { type Product, type NewProduct } from "@/lib/types";


const useProduct = () =>
  useQuery<Product[]>({
    queryKey: ['product'],
    queryFn: () => apiClient.get('/products/')
  });



const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['addProduct'],
    mutationFn: (newProduct: NewProduct) =>
      apiClient.post('/products/', newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    }
  });
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: (productId: number) =>
      apiClient.delete(`/products/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    }
  });
};


export { useProduct, useAddProduct, useDeleteProduct };