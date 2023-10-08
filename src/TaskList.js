import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './TaskList.css'
import EditTask from './editTask';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // State to store the selected task
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // State for EditTask modal

  useEffect(() => {
    // Make a GET request to fetch tasks from your .NET Core API endpoint
    axios.get('https://localhost:7222/api/Task')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to handle card click and open the modal
  const handleCardClick = (taskId) => {
    // Make a GET request to retrieve the task details by ID
    axios.get(`https://localhost:7222/api/Task/${taskId}`)
      .then(response => {
        setSelectedTask(response.data);
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error fetching task details:', error);
      });
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle the delete button click
  const handleDeleteClick = (taskId) => {
    // Make a DELETE request to remove the task by ID
    axios.delete(`https://localhost:7222/api/Task/${taskId}`)
      .then(() => {
        // Remove the deleted task from the local state
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        setShowModal(false);

        // Fetch all tasks again to refresh the list
        axios.get('https://localhost:7222/api/Task')
          .then(response => {
            setTasks(response.data);
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleEditClick = () => {
    setShowModal(false);
    setShowEditModal(true);
  };


  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Task List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.taskId}>
              <td>{index + 1}</td>
              <td onClick={() => handleCardClick(task.taskId)} style={{ cursor: 'pointer' }}>{task.taskName}</td>
              <td>{formatDate(task.dueDate)}</td>
              <td className={`status-cell ${task.status === 'Complete' ? 'bg-success' : 'bg-danger'}`}>
                {task.status}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(task.taskId)}
                  
                >
                  Delete Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      {/* Task Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <div style={{ textAlign: 'left' }}>
              <p><strong>Task Name:</strong> {selectedTask.taskName}</p>
              <p><strong>Date:</strong> {formatDate(selectedTask.dueDate)}</p>
              <p><strong>Status:</strong> {selectedTask.status}</p>
              <p><strong>Description:</strong> {selectedTask.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleEditClick}>
            Edit Task
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EditTask Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render the EditTask component */}
          <EditTask
            task={selectedTask}
            onClose={() => setShowEditModal(false)}
            onUpdate={updatedTask => {
              // Update the local tasks array with the edited task
              setTasks(prevTasks => prevTasks.map(task =>
                task.taskId === updatedTask.taskId ? updatedTask : task
              ));
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskList;
