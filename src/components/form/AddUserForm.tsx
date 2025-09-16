// src/components/AddUserForm.tsx
import React, { useState, memo } from "react";
import { AddUserFormProps, User } from "../../Types/type";

function AddUserForm({ onAdd, onCancel }: AddUserFormProps) {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = name.trim();
    const ageNum = Number(age);

    if (!trimmed) {
      alert("Name is required");
      return;
    }
    if (!Number.isInteger(ageNum) || ageNum < 0) {
      alert("Enter a valid non-negative age");
      return;
    }

    onAdd({ id: '', name: trimmed, age: ageNum });
    setName("");
    setAge("");
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        min="0"
        onChange={(e) => setAge(e.target.value)}
      />

      <button type="submit">Add</button>
      <button type="button" onClick={onCancel} className="btn-secondary">
        Cancel
      </button>
    </form>
  );
}

export default memo(AddUserForm);
