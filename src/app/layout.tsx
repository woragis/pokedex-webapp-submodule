import type { Metadata } from 'next'
import Navbar from '@/sections/Navbar'
import Wrapper from '@/sections/Wrapper'
import Footer from '@/sections/Footer'
import Background from '@/components/Background'
import '@/scss/index.scss'
import ReactQueryProvider from '@/features/QueryClient'

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Pokedex full-stack app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='vsc-initialized'>
        <ReactQueryProvider>
          <main className='main-container'>
            <Background />
            <div className='app'>
              <Navbar />
              <Wrapper>{children}</Wrapper>
              <Footer />
            </div>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
