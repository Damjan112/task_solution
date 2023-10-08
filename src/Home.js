import React from 'react';
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Task Management App</h1>
        <p className="home-description">
          Using this Web application, you can manage your tasks efficiently. Create, update, and delete tasks with ease.
        </p>
      </div>
    </div>
  );
};

export default Home;
