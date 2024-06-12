import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";
import DetailPage from './components/DetailPage';
import NotFoundPage from "./components/NotFoundPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='detail/:id' element={<DetailPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;
