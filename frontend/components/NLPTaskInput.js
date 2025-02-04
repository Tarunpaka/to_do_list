import React, { useState } from 'react';
import axios from 'axios';

const NlpTaskInput = ({ onTaskAdded }) => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');

    const addTask = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/tasks/add', {
                title: task,
                description,
            });

            setPriority(response.data.task.priority); // Get NLP-determined priority
            onTaskAdded(response.data.task); // Callback function to update UI
            setTask('');
            setDescription('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold mb-2">Add Task (with NLP)</h2>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Task title"
                className="border p-2 w-full mb-2"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description (e.g., This is urgent)"
                className="border p-2 w-full mb-2"
            />
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
            {priority && <p className="mt-2">NLP-determined priority: <strong>{priority}</strong></p>}
        </div>
    );
};

export default NlpTaskInput;