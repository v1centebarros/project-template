import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";


export const getProductOptions = () => queryOptions({
  queryKey: ['product'],
  queryFn: () => apiClient.get('/products')
});
