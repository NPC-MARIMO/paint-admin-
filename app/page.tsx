import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Paintbrush, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
            <Paintbrush className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Ashirwaad Coating</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Premium paint e-commerce admin dashboard for managing products, orders, and customers.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/admin/login">
            Access Admin Panel
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
       
      </div>
    </main>
  )
}
