import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { HomeIcon, Plus, Package, Server } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [replicaId, setReplicaId] = useState<string | null>(null)
  const [upstreamServer, setUpstreamServer] = useState<string | null>(null)

  useEffect(() => {
    // Poll for replica info every 2 seconds
    const interval = setInterval(() => {
      const replica = apiClient.getLastReplicaId()
      const upstream = apiClient.getLastUpstreamServer()
      if (replica) setReplicaId(replica)
      if (upstream) setUpstreamServer(upstream)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

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

            {/* Replica Info */}
            {replicaId && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Server className="h-3 w-3" />
                <span title={`Upstream: ${upstreamServer || 'unknown'}`}>
                  Replica: <span className="font-mono font-semibold">{replicaId}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}