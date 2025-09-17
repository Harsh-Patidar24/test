import { useState } from 'react'
import './App.css'
// import users from './components/data'
import UserTable from './components/UserTable'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";





const users = [
  { id: "1", name: "Aarav", lastName: "Singh", age: 57 },
  { id: "2", name: "Meera", lastName: "Farm", age: 12 },
  { id: "3", name: "Karan", lastName: "Prajapat", age: 89 },
  { id: "4", name: "Priya", lastName: "Chawda", age: 34 },
  { id: "5", name: "Ravi", lastName: "Maheshwari", age: 76 },
  { id: "6", name: "Sonia", lastName: "Roy", age: 23 },
  { id: "7", name: "Arjun", lastName: "Reddy", age: 65 },
  { id: "8", name: "Neha", lastName: "Sharma", age: 48 },
  { id: "9", name: "Vikram", lastName: "Rathod", age: 91 },
  { id: "10",name: "Simran", lastName: "Sharma", age: 27 },
];


function App() {

  return (
      <>
      
        <UserTable data={users}/>

      </>
  )
}

export default App
