import '../src/styles/globals.css';

export const metadata = {
  title: 'Review UI - Reputation Management',
  description: 'Manage your online reputation with AI-powered review management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FAF9F5' }}>
        {children}
      </body>
    </html>
  );
}
