const axios = require('axios');
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;
exports.selectMasterLink = async (company) => {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('SeiImposto');
        const masterUrlModel = database.collection('masterurls'); // Use the collection name you need

        return await masterUrlModel.find({ store: company }).toArray();
    } finally {
        await client.close();
    }
};
