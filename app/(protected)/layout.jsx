import Sidebar from '@/src/components/Sidebar';
import Header from '@/src/components/Header';

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      <Sidebar />
      <div className="ml-72 w-full flex flex-col">
        <div className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200">
          <Header />
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
