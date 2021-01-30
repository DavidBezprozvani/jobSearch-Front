import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";

function App() {
  return (
      <Router>
        <Navbar/>
        <Content/>
        <Footer/>
      </Router>
  )
}

export default App;
