import '../src/styles/globals.css';

export const metadata = {
  title: 'Review UI - Reputation Management',
  description: 'Manage your online reputation with AI-powered review management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
