
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;

exports.selectDetailLink = async (company, status) => {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(); // Use the default database specified in the URI
        const detailUrlModel = database.collection('detailurls'); // Use the collection name you need

        return await detailUrlModel.find({ store: company, status: status }).toArray();
    } finally {
        await client.close();
    }
};




