import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { getProductOptions } from '@/hooks/use-product';
import { Product } from '@/lib/types';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {

  const { data: products, isLoading, isError } = useQuery<Product[]>(getProductOptions());
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading products</p>}
      {products && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}