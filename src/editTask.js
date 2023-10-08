import React, { useState } from 'react';
import axios from 'axios';

const EditTask = ({ task, onClose, onUpdate }) => {
    const [editedTask, setEditedTask] = useState({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-CA') : '',
      });

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a PUT request to update the task
            const response = await axios.put(
                `https://localhost:7222/api/Task/${task.taskId}`,
                editedTask
            );

            // Handle success
            console.log('Task updated:', response.data);

            // Close the modal
            onClose();

            // Trigger a callback to refresh the task list
            onUpdate(response.data);
        } catch (error) {
            // Handle error
            console.error('Error updating task:', error);
        }
    };

    // Function to handle form field changes
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
      
        if (e.target.type === 'date') {

          const date = new Date(value);
          // Format the date as "yyyy-MM-dd"
          newValue = date.toLocaleDateString('en-CA'); 
        }
      
        setEditedTask((prevTask) => ({
          ...prevTask,
          [name]: newValue,
        }));
      };
      


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Form fields for editing task properties */}
                {/* Task Name */}
                <div className="form-group">
                    <label>Task Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="taskName"
                        value={editedTask.taskName}
                        onChange={handleFieldChange}
                        required
                    />
                </div>
                {/* Due Date */}
                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dueDate"
                        value={editedTask.dueDate}
                        onChange={handleFieldChange}
                        required
                    />
                </div>
                {/* Description */}
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={editedTask.description}
                        onChange={handleFieldChange}
                    ></textarea>
                </div>
                {/* Status */}
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className="form-control"
                        name="status"
                        value={editedTask.status} 
                        onChange={handleFieldChange}
                        required
                    >
                        <option value="Complete">Complete</option>
                        <option value="Incomplete">Incomplete</option>
                    </select>
                </div>

                {/* Save button */}
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditTask;
