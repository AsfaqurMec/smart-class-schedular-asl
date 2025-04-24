'use client'
import withAuth from '../../middleware/withAuth';
//import withAuth from '../../middleware/withAuth';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow py-8 px-1 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
};

export default withAuth(Layout, ['admin']);
