const axios = require('axios');
const { MongoClient } = require('mongodb');
const mongoURI = process.env.MONGO_URI;
exports.insertDetailLink = async (urls) => {
    console.log('insertDetailLink', urls);
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('SeiImposto');
        const detailUrlModel = database.collection('detailurls'); // Use the collection name you need
        console.log(urls)
        await detailUrlModel.insertOne(urls, { "ordered": false });
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
};
