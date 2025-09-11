// src/components/UserRow.jsx
import React from "react";
import Category from "./Category";
import{userRowProps, User} from "../Types/type";




function UserRow({ user, onSelect, index }: userRowProps) {
  return (
    <tr onClick={() => onSelect(user)} > 
      <td>{index+1}</td>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td><Category age={user.age} /></td>
      {/* <td>
        <button onClick={() => onSelect(user)} className="action-btn">
          View
        </button>
      </td> */}
    </tr>
  );
}

export default UserRow;