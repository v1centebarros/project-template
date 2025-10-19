# Web - Frontend Documentation

A modern React application built with TypeScript, Vite, and a comprehensive set of tools for building type-safe, performant web applications. This frontend demonstrates best practices for component architecture, state management, routing, and styling.

## 🏗️ Project Structure

```
web/
├── src/
│   ├── main.tsx              # Application entry point
│   ├── globals.css           # Global styles and Tailwind imports
│   ├── routeTree.gen.ts      # Auto-generated route tree
│   ├── components/           # React components
│   │   ├── navbar.tsx        # Navigation component
│   │   ├── productForm.tsx   # Example form component
│   │   ├── products-table.tsx # Example table component
│   │   └── ui/              # Reusable UI components (shadcn/ui style)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── table.tsx
│   │       └── ...
│   ├── hooks/               # Custom React hooks
│   │   └── use-product.ts   # Example: Product data hook
│   ├── lib/                 # Utilities and configuration
│   │   ├── api-client.ts    # API client with TanStack Query
│   │   ├── providers.tsx    # Application providers wrapper
│   │   ├── types.ts         # TypeScript type definitions
│   │   └── utils.ts         # Utility functions
│   └── routes/              # Page components (file-based routing)
│       ├── __root.tsx       # Root layout
│       ├── index.tsx        # Home page
│       └── new-product.tsx  # Example: New product page
├── public/                  # Static assets
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui configuration
├── Dockerfile              # Docker configuration for production
└── README.md              # This file
```

## 🚀 Technologies Explained

### Core Framework

#### **React 19**
**Why React 19?**
- 🎣 **Modern Hooks**: useState, useEffect, and new concurrent features
- ⚡ **Server Components**: Ready for future server-side rendering
- 🔄 **Automatic Batching**: Better performance with fewer re-renders
- 📦 **Built-in Features**: Suspense, Error Boundaries, improved hydration
- 🌍 **Industry Standard**: Huge ecosystem and community support

React is the most popular frontend framework, making it perfect for learning modern web development.

#### **TypeScript**
**Why TypeScript?**
- 🛡️ **Type Safety**: Catch errors at compile time, not runtime
- 🎯 **IntelliSense**: Better IDE autocomplete and suggestions
- 📚 **Self-Documenting**: Types serve as inline documentation
- 🔧 **Refactoring**: Safer code changes with type checking
- 🎓 **Industry Standard**: Most companies use TypeScript for production apps

TypeScript helps you write more maintainable and bug-free code.

### Build Tool

#### **Vite**
**Why Vite?**
- ⚡ **Lightning Fast**: Instant server start and hot module replacement (HMR)
- 🔥 **Modern**: Uses native ES modules in development
- 📦 **Optimized Builds**: Rollup-based production builds
- 🔌 **Plugin Ecosystem**: Rich set of plugins
- 🎯 **Zero Config**: Works out of the box

Vite is significantly faster than Create React App or Webpack for development.

### Routing

#### **TanStack Router**
**Why TanStack Router?**
- 🎯 **Type-Safe**: Full TypeScript integration with route params
- 📁 **File-Based**: Routes based on file structure (like Next.js)
- 🔍 **Search Params**: Built-in type-safe URL search params
- 📊 **Code Splitting**: Automatic code splitting per route
- 🎨 **Layouts**: Nested layouts and loading states
- 🔄 **Data Loading**: Built-in data loading and caching

Unlike React Router, TanStack Router provides complete type safety for your entire routing layer.

### State Management & Data Fetching

#### **TanStack Query (React Query)**
**Why TanStack Query?**
- 🔄 **Automatic Caching**: Smart caching and background refetching
- 📡 **Server State**: Perfect for managing API data
- 🎯 **Declarative**: Simple hooks-based API
- 🔌 **Optimistic Updates**: Update UI before server confirms
- 🐛 **DevTools**: Excellent debugging tools
- ⚡ **Performance**: Reduces unnecessary API calls

TanStack Query eliminates the need for Redux or similar state management for server data.

### UI Components

#### **TanStack Table**
**Why TanStack Table?**
- 🎨 **Headless**: Full control over styling
- 🎯 **Type-Safe**: TypeScript-first design
- 🔍 **Full Featured**: Sorting, filtering, pagination, grouping
- 📱 **Responsive**: Mobile-friendly tables
- ⚡ **Performance**: Virtual scrolling for large datasets

Build complex tables without sacrificing control or performance.

### Styling

#### **Tailwind CSS v4**
**Why Tailwind CSS?**
- 🎨 **Utility-First**: Compose designs using utility classes
- ⚡ **Fast Development**: No context switching between files
- 📦 **Small Bundle**: Only includes used classes
- 🎯 **Consistent Design**: Design system built-in
- 📱 **Responsive**: Mobile-first responsive design
- 🌙 **Dark Mode**: Built-in dark mode support

Tailwind speeds up development and ensures consistent styling.

#### **Radix UI**
**Why Radix UI?**
- ♿ **Accessible**: WCAG compliant components
- 🎨 **Unstyled**: Full styling control
- 🔧 **Composable**: Build complex components easily
- 📚 **Well-Documented**: Great examples and guides
- ⚡ **Performant**: Optimized for production

Radix provides accessible primitives that you style with Tailwind.

### Form Handling

#### **TanStack Form**
**Why TanStack Form?**
- 🎯 **Type-Safe**: Full TypeScript support
- ⚡ **Performant**: Minimal re-renders
- 🔧 **Flexible**: Works with any UI library
- ✅ **Validation**: Built-in validation with Zod
- 📦 **Lightweight**: Small bundle size

#### **Zod**
**Why Zod?**
- 🛡️ **Runtime Validation**: Validate data at runtime
- 🎯 **TypeScript Integration**: Infer types from schemas
- 📚 **Declarative**: Define schemas once, use everywhere
- 🔄 **Composable**: Build complex validation logic
- ⚡ **Fast**: Optimized for performance

Zod ensures your forms and API data match expected types.

### Developer Experience

#### **ESLint**
- Catches common mistakes
- Enforces code style
- React-specific rules

#### **Vite Plugins**
- **@tanstack/router-plugin**: Auto-generates route tree
- **@tailwindcss/vite**: Tailwind CSS integration
- **@vitejs/plugin-react**: React support with Fast Refresh

## 📦 Dependencies

Key dependencies from `package.json`:

```json
{
  "dependencies": {
    "react": "^19.1.1",                        // Core React library
    "react-dom": "^19.1.1",                    // React DOM rendering
    "@tanstack/react-router": "^1.133.13",     // Type-safe routing
    "@tanstack/react-query": "^5.90.5",        // Data fetching & caching
    "@tanstack/react-table": "^8.21.3",        // Headless table
    "@tanstack/react-form": "^1.23.7",         // Form management
    "tailwindcss": "^4.1.14",                  // Utility-first CSS
    "@radix-ui/react-*": "^x.x.x",            // Accessible UI primitives
    "zod": "^4.1.12",                          // Schema validation
    "next-themes": "^0.4.6",                   // Dark mode support
    "lucide-react": "^0.546.0",                // Icon library
    "sonner": "^2.0.7",                        // Toast notifications
    "clsx": "^2.1.1",                          // Conditional classes
    "tailwind-merge": "^3.3.1"                 // Merge Tailwind classes
  }
}
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm

### Setup Project

1. **Navigate to the web directory**
   ```bash
   cd web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables (optional)**
   
   Create a `.env` file in the `web/` directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at http://localhost:5173

Features:
- ⚡ Hot Module Replacement (HMR)
- 🔄 Auto-reload on file changes
- 🐛 Source maps for debugging

### Build for Production

```bash
npm run build
```

Outputs optimized files to `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Test the production build locally before deploying.

### Linting

```bash
npm run lint
```

Checks code quality and catches common errors.

## 🎨 Component Architecture

### Reusable UI Components (`components/ui/`)

Following the shadcn/ui pattern, UI components are:
- **Composable**: Built from Radix UI primitives
- **Customizable**: Styled with Tailwind CSS
- **Accessible**: WCAG compliant by default
- **Type-Safe**: Full TypeScript support

Example: Button component
```tsx
import { Button } from '@/components/ui/button'

<Button variant="primary" size="lg">
  Click me
</Button>
```

### Feature Components (`components/`)

Higher-level components that use UI components:
- **Domain-Specific**: Related to business logic
- **Reusable**: Can be used across multiple routes
- **Smart**: May contain hooks and state management

Example: ProductTable component
```tsx
import { ProductsTable } from '@/components/products-table'

<ProductsTable data={products} />
```

## 🛣️ Routing

TanStack Router uses file-based routing:

```
routes/
├── __root.tsx           → Layout wrapper for all routes
├── index.tsx           → / (Home page)
└── new-product.tsx     → /new-product
```

### Creating a New Route

1. Create a file in `src/routes/`:
   ```tsx
   // routes/about.tsx
   import { createFileRoute } from '@tanstack/react-router'
   
   export const Route = createFileRoute('/about')({
     component: About,
   })
   
   function About() {
     return <div>About Page</div>
   }
   ```

2. The route tree auto-generates on save!

### Nested Routes

```
routes/
├── __root.tsx
├── products/
│   ├── index.tsx       → /products
│   └── $id.tsx        → /products/:id
```

### Route Parameters

```tsx
// routes/products/$id.tsx
export const Route = createFileRoute('/products/$id')({
  component: ProductDetail,
})

function ProductDetail() {
  const { id } = Route.useParams() // Type-safe!
  return <div>Product {id}</div>
}
```

## 📡 Data Fetching

### Using TanStack Query

```tsx
// hooks/use-product.ts
import { useQuery } from '@tanstack/react-query'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/api/products')
      return res.json()
    },
  })
}
```

### Using in Components

```tsx
import { useProducts } from '@/hooks/use-product'

function ProductList() {
  const { data, isLoading, error } = useProducts()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <ul>
      {data.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}
```

### Mutations

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreateProduct() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return fetch('http://localhost:8000/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
      })
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
  
  return (
    <button onClick={() => mutation.mutate({ name: 'Product' })}>
      Create Product
    </button>
  )
}
```

## 🎨 Styling with Tailwind

### Utility Classes

```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>
```

### Responsive Design

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

### Dark Mode

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Automatically adapts to theme
</div>
```

### Custom Utilities

Use `clsx` and `tailwind-merge` for conditional classes:

```tsx
import { cn } from '@/lib/utils'

<Button 
  className={cn(
    "px-4 py-2",
    isActive && "bg-blue-500",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
/>
```

## 📋 Forms with TanStack Form & Zod

### Define Schema

```tsx
import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  price: z.number().positive('Price must be positive'),
  description: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>
```

### Create Form

```tsx
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'

function ProductForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      price: 0,
      description: '',
    },
    validators: {
      onChange: productSchema,
    },
    onSubmit: async ({ value }) => {
      // Submit to API
      await createProduct(value)
    },
  })
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.handleSubmit()
    }}>
      {/* Form fields */}
    </form>
  )
}
```

## 🔧 Configuration Files

### `vite.config.ts`
- Plugin configuration
- Path aliases (`@/` → `src/`)
- Build settings

### `tsconfig.json`
- TypeScript compiler options
- Path mappings
- Type checking settings

### `components.json`
- shadcn/ui component configuration
- Styling preferences
- Component paths

## 🐳 Docker

Build and run in production:

```bash
# Build image
docker build -t web:latest .

# Run container
docker run -p 80:80 web:latest
```

The Dockerfile:
1. Builds the app with `npm run build`
2. Serves static files with Nginx
3. Handles client-side routing

## 🧪 Testing (Future Enhancement)

Add testing with:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Example test:
```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

test('button renders with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

## 🎓 Learning Path

### Beginner
1. Understand React basics (components, props, state)
2. Learn TypeScript fundamentals
3. Explore Tailwind CSS utilities
4. Practice with UI components

### Intermediate
5. Master TanStack Router (routing, params, layouts)
6. Learn TanStack Query (fetching, caching, mutations)
7. Build forms with validation
8. Implement dark mode

### Advanced
9. Optimize performance (lazy loading, memoization)
10. Add testing coverage
11. Implement complex state patterns
12. Create custom hooks and utilities

## 🛠️ Common Tasks

### Add a New Page

1. Create file in `src/routes/`
2. Export a Route using `createFileRoute`
3. Link to it: `<Link to="/new-page">Go</Link>`

### Add a New Component

1. Create file in `src/components/`
2. Export the component
3. Import and use: `import { MyComponent } from '@/components/my-component'`

### Add a New UI Component

```bash
# If using shadcn/ui CLI (optional)
npx shadcn-ui@latest add button
```

Or create manually in `src/components/ui/`

### Connect to API

1. Update `VITE_API_URL` in `.env`
2. Use TanStack Query hooks
3. Handle loading/error states

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check TypeScript errors
npm run build
# Fix type errors before building
```

## 📖 Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vite.dev/guide/)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Table](https://tanstack.com/table/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs/primitives)
- [Zod Documentation](https://zod.dev/)


**Need help?** Check the main [project README](../README.md) or explore the TanStack documentation.
