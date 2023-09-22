import "./globals.css";

export const metadata = {
  title: "Studio-M",
  description:
    "Web application that allows the purchase of courses and monitoring of the purchased courses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}