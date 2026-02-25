export const metadata = {
  title: "OrgIntel Demo",
  description: "AI Organizational Intelligence Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}