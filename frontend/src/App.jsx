import React from "react"
import Generator from "./components/Generator"
import Header from "./components/Header"

function App() {
  return (
    <>
    <Header/>
    <div className="w-screen flex justify-center pt-20">
      <Generator/>
    </div>
    </>
  )
}

export default App
