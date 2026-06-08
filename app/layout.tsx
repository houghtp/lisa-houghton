import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lisa Houghton Studio — Fashion Designer & Mentor",
  description:
    "Twenty years in fashion retail design. Portfolio evaluations, CV reviews, mentoring, and freelance design for graduates and early-career designers.",
  metadataBase: new URL("https://lisahoughtonstudio.com"),
  openGraph: {
    title: "Lisa Houghton Studio",
    description:
      "Portfolio evaluations, CV reviews, and mentoring for fashion graduates — from twenty years in the industry.",
    url: "https://lisahoughtonstudio.com",
    siteName: "Lisa Houghton Studio",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lisa Houghton Studio",
    description:
      "Portfolio evaluations, CV reviews, and mentoring for fashion graduates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          id="mailerlite-universal"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
              .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
              n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
              (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
              ml('account', '2411794');
            `,
          }}
        />
      </body>
    </html>
  );
}
