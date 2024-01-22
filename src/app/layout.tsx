import '~/styles/globals.css'

import { Inter } from 'next/font/google'

import { TRPCReactProvider } from '~/trpc/react'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Like twitter',
  description: 'Twitter clone',
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
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
