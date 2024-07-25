const axios = require('axios');
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;
exports.deleteDetailLink = async (data) => {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('SeiImposto');
        const detailUrlModel = database.collection('detailurls'); // Use the collection name you need

        console.log(data);
        await detailUrlModel.deleteMany({ store: { "$eq": data } });
    } finally {
        await client.close();
    }
};
