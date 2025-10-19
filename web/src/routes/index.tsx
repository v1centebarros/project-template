import { createFileRoute } from '@tanstack/react-router'
import { useProduct } from '@/hooks/use-product';
import { AddProductButton } from '@/components/addProductButton';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {

  const { data: products, isLoading, isError } = useProduct();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <AddProductButton />
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