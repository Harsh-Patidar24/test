import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../components/UserTable.css";
import Modal from "./Modal";
import UserRow from "./UserRow";
import AddUserForm from "./form/AddUserForm";
import { CgAddR } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import { UserTableProps, Counts, User } from "../Types/type";

// Theme Toggle Icons (you can replace these with react-icons if available)
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
  </svg>
);

function UserTable({ data }: UserTableProps) {
  // Existing state
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("users");
    if (saved) {
      try {
        return JSON.parse(saved) as User[];
      } catch {
        return data.map((user) => ({ ...user, id: uuidv4() }));
      }
    }
    return data.map((user) => ({ ...user, id: uuidv4() }));
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  const handleAction = useCallback((user: User) => {
    setSelectedUser(user);
    setShowPopup(true);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedUser(null);
    setShowPopup(false);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      setUsers(users.filter((user) => user.id !== id));
      handleClose();
      // return <h1>delete was called</h1>
    },
    [handleClose]
  );

  const handleUpdate = useCallback(
    (updatedUser: User) => {
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      handleClose();
    },
    [handleClose]
  );

  const handleAdd = useCallback(
    ({ name, age }: { name: string; age: number }) => {
      const newUser: User = { id: uuidv4(), name, age: Number(age) };
      setUsers([...users, newUser]);
      setShowAddForm(false);
    },
    []
  );

  const counts: Counts = useMemo(() => {
    return users.reduce(
      (acc: Counts, user: User) => {
        if (user.age < 18) acc.childCount++;
        else if (user.age <= 60) acc.youngCount++;
        else acc.oldCount++;
        return acc;
      },
      { childCount: 0, youngCount: 0, oldCount: 0 }
    );
  }, [users]);

  const { childCount, youngCount, oldCount } = counts;

  return (
    <div>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        <span className="theme-toggle-icon">
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </span>
        <span className="theme-toggle-text">
          {isDarkMode ? "Light" : "Dark"}
        </span>
      </button>

      {/* Existing content (unchanged) */}
      <div className="header-row">
        <h2>User Table</h2>
        <button
          className="add-btn"
          onClick={() => setShowAddForm((s) => !s)}
          aria-label="Add user"
          title="Add user"
        >
          <CgAddR />
        </button>
      </div>

      

      {showAddForm && (
        <AddUserForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Age</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow
              key={user.id}
              user={user}
              index={index}
              onSelect={handleAction}
            />
          ))}
        </tbody>
      </table>

      <div className="summary">
        <h4>Statistics</h4>
        <p>
          <span>Child</span>
          <span>{childCount}</span>
        </p>
        <p>
          <span>Young</span>
          <span>{youngCount}</span>
        </p>
        <p>
          <span>Old</span>
          <span>{oldCount}</span>
        </p>
      </div>

      {showPopup && selectedUser && (
        <Modal
          user={selectedUser}
          onClose={handleClose}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default UserTable;
