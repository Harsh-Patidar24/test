import React from "react";
import Category from "./Category";
import { userRowProps } from "../Types/type";
import { motion } from "framer-motion";

function UserRow({ user, onSelect, index }: userRowProps) {
  return (
    <motion.tr
      onClick={() => onSelect(user)}
      initial={{ opacity: 0, y: -10 }}   // start slightly above
      animate={{ opacity: 1, y: 0 }}    // animate into place
      exit={{ opacity: 0, y: 10 }}      // animate out
      transition={{ duration: 0.3 }}    // smooth transition
      whileHover={{ scale: 1.02, backgroundColor: "#ddd6d6ff", color:"black" }} // hover effect
      style={{ cursor: "pointer" }}
      // color="black"
    >
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td><Category age={user.age} /></td>
    </motion.tr>
  );
}

export default UserRow;
