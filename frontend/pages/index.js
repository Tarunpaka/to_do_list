import React, { useState } from 'react';
import axios from 'axios';
import TaskTimer from '../components/TaskTimer';

const Home = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [taskId, setTaskId] = useState(null);

    const addTask = async () => {
        const response = await axios.post('http://localhost:5000/api/tasks/add', {
            title: task,
            description,
        });
        setTaskId(response.data.task._id);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">To-Do List App</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Task title"
                className="border p-2"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="border p-2"
            />
            <button onClick={addTask} className="bg-blue-500 text-white p-2">Add Task</button>

            {taskId && <TaskTimer taskId={taskId} />}
        </div>
    );
};

export default Home;