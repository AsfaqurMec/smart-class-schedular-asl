'use client'
import Layout from "@/Components/Layout";



const Dashboard = () => {
 
  const StatCard = ({ title, value }) => (
    <div className="bg-white rounded-2xl shadow p-4 text-center">
      <div className="text-lg font-semibold text-gray-600">{title}</div>
      <div className="text-2xl font-bold text-purple-600">{value}</div>
    </div>
  );
  
  const CourseCard = ({ title, students, price }) => (
    <div className="border rounded-xl p-4 flex flex-col items-start">
      <div className="text-lg font-semibold mb-1">{title}</div>
      <div className="text-sm text-gray-600">({students} Students)</div>
      <div className="text-lg font-bold text-purple-600 my-2">{price}</div>
      <button className="mt-auto bg-purple-600 text-white px-4 py-1 rounded-md hover:bg-purple-700">
        ENROLL NOW
      </button>
    </div>
  );

  return (
     <Layout className="relative">
         <div className="p-6 bg-transparent min-h-screen">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Enrolled Courses" value="1" />
        <StatCard title="Total Class" value="50" />
        <StatCard title="Assignment" value="25" />
        <StatCard title="Quiz" value="10" />
      </div>

      {/* Calendar & New Courses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="font-semibold mb-2">Class schedule</h2>
          <div className="text-sm text-gray-600">January, 2024</div>
          <div className="grid grid-cols-7 gap-1 text-center mt-2">
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`p-1 rounded-md ${[4, 6, 20, 27].includes(i + 1) ? "bg-purple-500 text-white" : ""}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl p-4 shadow">
          <h2 className="font-semibold mb-4">New Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CourseCard title="Graphic Design" students="5000" price="$1500" />
            <CourseCard title="Web Development" students="5000" price="$1500" />
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="font-semibold mb-2">Course Activity</h2>
          <div className="text-center text-blue-600 font-semibold mb-2">54 Hours</div>
          <div className="h-40 bg-gray-100 rounded-lg flex items-end justify-between px-2 py-1">
            {[20, 40, 70, 50, 80, 60, 30].map((val, i) => (
              <div key={i} className="bg-blue-500 w-4" style={{ height: `${val}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-sm mt-2 text-gray-600">
            {["Jan", "Mar", "May", "July", "Sept", "Nov", "Dec"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow flex flex-col items-center justify-center">
          <h2 className="font-semibold mb-2">Daily Activity</h2>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full">
              <circle
                className="text-gray-300"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="64"
                cy="64"
              />
              <circle
                className="text-purple-600"
                strokeWidth="10"
                strokeDasharray="314"
                strokeDashoffset="62"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="64"
                cy="64"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-purple-700">
              80%
            </div>
          </div>
        </div>
      </div>
    </div>

      </Layout>
  );
};

export default Dashboard;