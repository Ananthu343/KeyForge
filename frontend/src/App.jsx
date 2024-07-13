import React from "react"
import Generator from "./components/Generator"
import Header from "./components/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Mypasswords from "./components/Mypasswords"

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <div className="w-screen flex justify-center pt-20">
      <Routes>
        <Route path="/" element={<Generator/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/mypasswords" element={<Mypasswords/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
