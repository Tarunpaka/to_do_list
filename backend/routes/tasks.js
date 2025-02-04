const express = require('express');
const Task = require('../models/Task');
const { NlpManager } = require('node-nlp');
const router = express.Router();

const manager = new NlpManager({ languages: ['en'] });

manager.addDocument('en', 'This is urgent', 'priority.high');
manager.addDocument('en', 'Do this later', 'priority.low');
manager.addDocument('en', 'This is important', 'priority.medium');

manager.train().then(() => console.log("NLP Model Trained"));

router.post('/add', async (req, res) => {
    const { title, description } = req.body;
    const response = await manager.process('en', description);
    const priority = response.intent === 'priority.high' ? 'high' :
                     response.intent === 'priority.low' ? 'low' : 'medium';

    const newTask = new Task({ title, description, priority });
    await newTask.save();
    res.json({ message: 'Task added', task: newTask });
});

router.post('/start/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.startTime = new Date();
    await task.save();
    res.json({ message: 'Task timer started', task });
});

router.post('/stop/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task.startTime) return res.status(400).json({ message: 'Timer not started' });

    const timeSpent = (new Date() - task.startTime) / (1000 * 60);
    task.timeSpent += Math.round(timeSpent);
    task.startTime = null;
    await task.save();

    res.json({ message: 'Task timer stopped', timeSpent: task.timeSpent, task });
});

module.exports = router;
