import React, { useState } from 'react';
import axios from 'axios';

const TaskTimer = ({ taskId }) => {
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = async () => {
        await axios.post(`http://localhost:5000/api/tasks/start/${taskId}`);
        setIsRunning(true);
    };

    const stopTimer = async () => {
        const response = await axios.post(`http://localhost:5000/api/tasks/stop/${taskId}`);
        alert(`Time spent: ${response.data.timeSpent} minutes`);
        setIsRunning(false);
    };

    return (
        <div>
            {isRunning ? (
                <button onClick={stopTimer} className="bg-red-500 text-white p-2">Stop Timer</button>
            ) : (
                <button onClick={startTimer} className="bg-green-500 text-white p-2">Start Timer</button>
            )}
        </div>
    );
};

export default TaskTimer;