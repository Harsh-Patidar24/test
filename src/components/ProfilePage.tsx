import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserById } from "../Utility/funcProp";
import { User } from "../Types/type";
import { FaArrowLeft, FaUserCircle, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>(
    JSON.parse(localStorage.getItem("users") || "[]")
  );

  const user = getUserById(users, id);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editAge, setEditAge] = useState(user?.age.toString() || "");

  if (!user)
    return <p className="p-6 text-red-600 font-semibold">User not found</p>;

  // ✅ Delete Profile
  const handleDelete = () => {
    const updatedUsers = users.filter((u) => u.id !== user.id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    navigate("/"); // back to table
  };

  // ✅ Save Update
  const handleSave = () => {
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, name: editName, age: Number(editAge) } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10 border border-gray-200 relative">
      {/* Back button top-left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Dummy Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle className="text-gray-400" size={80} />
        <h1 className="text-2xl font-bold text-gray-800 mt-2">User Profile</h1>
      </div>

      {!isEditing ? (
        <>
          {/* Show details */}
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Edit form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Age
              </label>
              <input
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Save / Cancel */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditName(user.name);
                setEditAge(user.age.toString());
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
