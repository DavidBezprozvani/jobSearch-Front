import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import { Provider } from "react-redux";
import store from "./store"

function App() {
  return (
      <Provider store={store}>
      <Router>
        <Navbar/>
        <Content/>
        <Footer/>
      </Router>
      </Provider>
  )
}

export default App;
