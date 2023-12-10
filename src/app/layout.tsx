'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppHeader from '../components/header/app.header'
import AppFooter from '../components/footer/app.footer'
import { Provider } from 'react-redux';
import store from '../states/configureStore'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <AppHeader />
          {children}
          <AppFooter />
        </body>
      </html>
    </Provider>
  )
}
