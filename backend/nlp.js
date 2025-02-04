const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'] });

// Training data for NLP priority detection
manager.addDocument('en', 'This is urgent', 'priority.high');
manager.addDocument('en', 'Do this later', 'priority.low');
manager.addDocument('en', 'This is important', 'priority.medium');
manager.addDocument('en', 'Finish this as soon as possible', 'priority.high');
manager.addDocument('en', 'No rush, do it anytime', 'priority.low');
manager.addDocument('en', 'This needs to be done soon', 'priority.medium');

// Train the NLP model
(async () => {
    await manager.train();
    manager.save();
})();

// Function to determine priority based on NLP analysis
const getPriorityFromDescription = async (description) => {
    const response = await manager.process('en', description);
    
    // Default to 'medium' if NLP does not confidently classify
    return response.intent === 'priority.high' ? 'high' :
           response.intent === 'priority.low' ? 'low' : 'medium';
};

module.exports = { getPriorityFromDescription };