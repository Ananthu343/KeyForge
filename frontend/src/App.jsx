import React from "react"
import Generator from "./components/Generator"
import Header from "./components/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <div className="w-screen flex justify-center pt-20">
      <Routes>
        <Route path="" element={<Generator/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
