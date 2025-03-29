'use client' // Required for Next.js client-side usage

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

interface ReactQueryProviderProps {
  children: ReactNode
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
