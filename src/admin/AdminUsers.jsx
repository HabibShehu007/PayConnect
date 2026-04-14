import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AdminSidebar from "./AdminSidebar";
import { FiSearch } from "react-icons/fi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("user_profile")
        .select("id, full_name, phone_number, email");

      if (!error) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone_number?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async () => {
    if (!selectedUser) return;
    const { error } = await supabase
      .from("user_profile")
      .delete()
      .eq("id", selectedUser.id);

    if (!error) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-slate-800 text-white">
        <h2 className="text-3xl font-bold text-violet-400 mb-6">Users</h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pr-10 rounded-lg bg-slate-700 text-white focus:outline-none"
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-violet-400">
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-600 hover:bg-slate-700"
              >
                <td className="p-3">{user.full_name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone_number}</td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h3 className="text-xl font-bold text-violet-400 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{selectedUser.full_name}</span>{" "}
                from PayConnect?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
