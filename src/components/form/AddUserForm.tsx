// src/components/AddUserForm.tsx
import React, { useState, memo } from "react";
import { userApi } from "../../api/axios";
import { User } from "../../Types/type";

type AddUserFormProps = {
  onAdd: (user: User) => void;
  onCancel: () => void;
};

function AddUserForm({ onAdd, onCancel }: AddUserFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const ageNum = Number(formData.age);
    if (!Number.isInteger(ageNum) || ageNum < 0) {
      setError("Enter a valid non-negative age");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await userApi.createUser({
        name: formData.name.trim(),
        lastName: formData.lastName.trim(),
        age: ageNum,
      });

      if (response?.data) {
        // Pass the correct data structure
        onAdd(response.data);
        setFormData({ name: "", lastName: "", age: "" });
        onCancel(); // Close the form after successful addition
      }
    } catch (err:any) {
      setError(err.response?.data?.message || "Failed to create user");
      console.error("Error creating user:", err);
    }finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="First Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        min="0"
        onChange={handleChange}
        required
      />

      <div className="flex gap-2">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={isSubmitting ? 'opacity-50' : ''}
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default memo(AddUserForm);
