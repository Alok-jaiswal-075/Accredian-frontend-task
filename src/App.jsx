import React from 'react';
import './App.css';
import SignUp from './components/signup';
import Login from './components/login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './components/homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
