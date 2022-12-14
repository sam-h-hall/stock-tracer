import "./globals.css";
import { Navbar } from "../components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by next app" />
        <link rel="icon" href="favicon.ico" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
