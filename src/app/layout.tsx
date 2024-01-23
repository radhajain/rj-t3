import '~/styles/globals.css'

import { Inter } from 'next/font/google'

import { TRPCReactProvider } from '~/trpc/react'
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Not twitter',
  description: 'Twitter clone made using the T3 stack',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`font-sans ${inter.variable}`}>
          <TRPCReactProvider>
            <Toaster />
            <main className='flex justify-center h-screen'>
              <div className='w-full md:max-w-6xl flex bg-white'>
                <div className='flex flex-col gap-3 flex-1 max-w-xs p-10'>
                  <div>
                    <UserButton afterSignOutUrl='/' showName={true} />
                  </div>
                </div>
                <div className='flex flex-col flex-2 gap-10 flex-grow p-10 border border-neutral-100'>
                  {children}
                </div>
              </div>
            </main>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
