import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Form from './pages/Form.jsx';
import Register from './pages/Register.jsx';
import Protected from './components/Protected';


function App() {

  return (
    <div className="App mt-5 pt-2">
        <BrowserRouter>
        <Toaster/>       
            <Routes> 
                <Route path="/" element={< Form />} />           
                <Route path="/register" element={< Register />} />       
                <Route path="/dashboard" element={<Protected />} />                                    
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
