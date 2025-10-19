import { ProductForm } from '@/components/productForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-product')({
  component: NewProduct,
})
function NewProduct() {
  return (
    <div className="p-2 w-full flex justify-center">
      <ProductForm />
    </div>
  )
}