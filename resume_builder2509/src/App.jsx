import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ResumeBuilder from "./pages/ResumeBuilder.jsx"
import Login from "./pages/Login.jsx"
import Layout from "./pages/Layout.jsx"
import Preview from "./pages/Preview.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />  
        <Route path="builder/:resumeid" element={<ResumeBuilder />} />
      </Route>

      <Route path="view/:resumeid" element={<Preview />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

