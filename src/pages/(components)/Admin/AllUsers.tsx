import { Eye, Lock, Search, Trash2 } from "lucide-react";
import { useState } from "react";

interface User {
  id: number; name: string; email: string; username: string; status: 'Active' | 'Suspended' | 'Inactive'; balance: number; joined: string;
}

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe', status: 'Active', balance: 15000, joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith', status: 'Active', balance: 25000, joined: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', username: 'mikej', status: 'Suspended', balance: 8000, joined: '2024-03-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', username: 'sarahw', status: 'Active', balance: 32000, joined: '2024-01-05' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', username: 'tombrown', status: 'Inactive', balance: 5000, joined: '2023-12-20' },
  ]);

  const filteredUsers = users.filter((user:any) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = { 'Active': 'bg-green-100 text-green-700', 'Suspended': 'bg-red-100 text-red-700', 'Inactive': 'bg-gray-100 text-gray-700' };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Users</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Search by name, email, or username..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Balance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4"><p className="font-medium text-gray-900">{user.name}</p></td>
                  <td className="px-6 py-4"><p className="text-gray-600">{user.email}</p></td>
                  <td className="px-6 py-4"><p className="text-gray-600">@{user.username}</p></td>
                  <td className="px-6 py-4"><p className="font-semibold text-gray-900">${user.balance.toLocaleString()}</p></td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>{user.status}</span></td>
                  <td className="px-6 py-4"><p className="text-gray-600 text-sm">{user.joined}</p></td>
                  <td className="px-6 py-4"><div className="flex items-center justify-center gap-2"><button className="p-2 hover:bg-blue-100 rounded-lg transition" title="View"><Eye size={18} className="text-blue-600" /></button><button className="p-2 hover:bg-yellow-100 rounded-lg transition" title="Suspend"><Lock size={18} className="text-yellow-600" /></button><button className="p-2 hover:bg-red-100 rounded-lg transition" title="Delete"><Trash2 size={18} className="text-red-600" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && <div className="p-8 text-center"><p className="text-gray-500 text-lg">No users found</p></div>}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing {filteredUsers.length} of {users.length} users</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers