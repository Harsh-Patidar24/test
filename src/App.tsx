import { useState } from 'react'
import './App.css'
// import users from './components/data'
import UserTable from './components/UserTable'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
const users = [
  { id: "1", name: "Aarav", age: 57 },
  { id: "2", name: "Meera", age: 12 },
  { id: "3", name: "Karan", age: 89 },
  { id: "4", name: "Priya", age: 34 },
  { id: "5", name: "Ravi", age: 76 },
  { id: "6", name: "Sonia", age: 23 },
  { id: "7", name: "Arjun", age: 65 },
  { id: "8", name: "Neha", age: 48 },
  { id: "9", name: "Vikram", age: 91 },
  { id: "10", name: "Simran", age: 27 },
];

function App() {

  return (
      <>
      
        <UserTable data={users}/>

      </>
  )
}

export default App
