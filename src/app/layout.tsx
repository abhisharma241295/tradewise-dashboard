import ReduxWrapper from "@/components/ReduxWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>{children}</ReduxWrapper>
      </body>
    </html>
  );
}
