import { createFileRoute } from '@tanstack/react-router'
import { useProduct } from '@/hooks/use-product';
import { ProductsTable } from '@/components/products-table';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {

  const { data: products, isLoading, isError } = useProduct();
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <p>Loading products...</p>
          </div>
        )}
        
        {isError && (
          <div className="flex items-center justify-center py-8">
            <p className="text-destructive">Error loading products</p>
          </div>
        )}
        
        {products && products.length > 0 ? (
          <ProductsTable products={products} />
        ) : (
          !isLoading && !isError && (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}