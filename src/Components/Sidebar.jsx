import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-40 bg-gray-800 text-white h-screen flex flex-col relative">
      <div className="p-6 text-lg font-bold">Dashboard</div>
      <ul className="flex-grow">
        <li className="p-4 hover:bg-gray-700">
          <Link href="/dashboard">Home</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link href="/dashboard/users">Users</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link href="/dashboard/products">Courses</Link>
        </li>
        <li className="p-4 hover:bg-gray-700">
          <Link href="/dashboard/addProduct">Add Course</Link>
        </li>
        
        
      </ul>
      <div className="p-4 text-center bg-gray-900">Logout</div>
    </div>
  );
};

export default Sidebar;
