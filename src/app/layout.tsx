import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { MySWRProvider } from "@/context/swr-provider";
import Head from "next/head";

const danaRegular = localFont({
  src: '../../public/fonts/DanaFaNum-Regular.woff2',
  variable: '--font-dana-Regular',
  display: "swap"
})

const danaMedium = localFont({
  src: '../../public/fonts/DanaFaNum-Medium.woff2',
  variable: '--font-dana-Medium',
  display: "swap"
})

const danaBold = localFont({
  src: '../../public/fonts/DanaFaNum-DemiBold.woff2',
  variable: '--font-dana-Bold',
  display: "swap"
})

export const metadata: Metadata = {
  title: "خرید قهوه اینترنتی بن‌مانو | انواع دانه و پودر قهوه تازه با بهترین کیفیت و قیمت",
  description: "از فروشگاه آنلاین قهوه انواع پودر قهوه ترک، اسپرسو، فرانسه، کپسول اسپرسو، پودرهای نوشیدنی و قهوه‌ فوری را با بهترین قیمت خریداری کنید!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="fa" dir="rtl">
      <body
        className={` font-danaRegular ${danaRegular.variable} ${danaMedium.variable} ${danaBold.variable}`}
      >
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <MySWRProvider>
          {children}
        </MySWRProvider>
      </body>
    </html>
  );
}
