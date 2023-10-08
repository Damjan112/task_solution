import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';


const CreateTask = () => {
  // Defining state variables for form fields
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a task object from form data
    const newTask = {
      taskName,
      dueDate,
      description,
      status: 'Incomplete',
    };

    try {
      //POST request to API to create the task
      const response = await axios.post('https://localhost:7222/api/Task', newTask);

      // Handle success
      setAlertVariant('success');
      setAlertMessage('Task successfully created'); // 
      console.log('Task created:', response.data);

      // Clear the form fields after submission
      setTaskName('');
      setDueDate('');
      setDescription('');
    } catch (error) {
      // Handle error
      setAlertVariant('danger');
      setAlertMessage('Error creating task. Please try again.');
      console.error('Error creating task:', error);
    }
  };

  // Function to hide the alert
  const closeAlert = () => {
    setAlertVariant('');
    setAlertMessage('');
  };

  useEffect(() => {
    //Timeout to clear the alert message after 3 seconds
    const timeout = setTimeout(() => {
      closeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alertMessage]);
  const handleGoBack = () => {
    window.location.href = '/task-list';
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div>
        <h2>Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label>Task Name</label>
            <input
              type="text"
              className="form-control"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label>Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
            Create Task
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
            Go back to the list
          </button>
          {/* Alert */}
          {alertVariant && alertMessage && (
            <div className="position-absolute bottom-0 end-0 p-3">
              <Alert variant={alertVariant} onClose={closeAlert} dismissible>
                {alertMessage}
              </Alert>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
