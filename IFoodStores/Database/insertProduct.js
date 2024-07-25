const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;

exports.insertProduct = async (products, store, state) => {
    const uri = mongoURI;
    console.log(uri);
   
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('SeiImposto');
        const collection = database.collection('products');

        const productDocuments = products.map(obj => ({
            "Products": [obj],
            "store": store,
            "state": state
        }));

        await collection.insertMany(productDocuments, { "ordered": false });
        console.log('Products inserted successfully');

    } catch (err) {
        console.error('Error inserting products:', err);
    } finally {
        await client.close();
        console.log('Database connection closed');
    }
};
