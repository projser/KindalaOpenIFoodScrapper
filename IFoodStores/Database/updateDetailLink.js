
const { MongoClient, ObjectId } = require('mongodb');

const mongoURI = process.env.MONGO_URI;
exports.updateDetailLink = async (link, status) => {
    console.log(id);
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db('SeiImposto');
        const detailUrlModel = database.collection('detailurls'); // Use the collection name you need
        console.log(link)
       
        return await detailUrlModel.updateOne({ link: link}, { $set: { status: status } });
    } finally {
        await client.close();
    }
};



