import '../src/styles/globals.css';
import Sidebar from '@/src/components/Sidebar';
import Header from '@/src/components/Header';

export const metadata = {
  title: 'Review UI - Reputation Management',
  description: 'Manage your online reputation with AI-powered review management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
