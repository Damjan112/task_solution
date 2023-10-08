import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './navBar';
import Home from './Home';
import TaskList from './TaskList';
import CreateTask from './createTask';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/create-task" element={<CreateTask/>} />
          <Route path="/task-list" element={<TaskList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
