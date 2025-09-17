// src/components/AddUserForm.tsx
import React, { useState, memo } from "react";
import { AddUserFormProps, User } from "../../Types/type";

function AddUserForm({ onAdd, onCancel }: AddUserFormProps) {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstNameTrimmed = firstname.trim();
    const lastNameTrimmed = lastname.trim();
    const fullName = `${firstNameTrimmed} ${lastNameTrimmed}`.trim();
    const ageNum = Number(age);

    // if (!) {
    //   alert("Name is required");
    //   return;
    // }
    if (!Number.isInteger(ageNum) || ageNum < 0) {
      alert("Enter a valid non-negative age");
      return;
    }

    onAdd({
      id: "",   
      name: firstNameTrimmed,   
      lastName: lastNameTrimmed,
      age: ageNum,   
    });   
    setFirstName("");
    setAge("");
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
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
