import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { HomeIcon, Plus, Package } from 'lucide-react'

export function Navbar() {
  return (
    <>
      <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span className="font-semibold text-lg">Product Manager</span>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="[&.active]:bg-accent [&.active]:text-accent-foreground">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </Button>
              
              <Button variant="ghost" size="sm" asChild>
                <Link to="/new-product" className="[&.active]:bg-accent [&.active]:text-accent-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  New Product
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}