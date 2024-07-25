


const dataDrogariaPatrocinio = require('./BrandDrogariaPatrocinio');
const os = require('os');
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI;

async function main(key, value) {
    console.log('main')
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(); // Use the default database specified in the URI
        const masterUrlModel = database.collection('masterUrlModel'); // Use the collection name you need

        await masterUrlModel.deleteMany({ store: { "$eq": key } });
        console.log(key);
        array = value;
       // console.log(array);
      
        for (const url of array.urls) {
            try {
                console.log('Inserting ' + url.link);
                const urlModel = {
                    "store": url.company,
                    "link": url.link,
                    "links": url.links,
                    "append": url.append || ''
                };
                await masterUrlModel.insertOne(urlModel);
            } catch (err) {
                console.log(err);
            }
        }
    } finally {
        await client.close();
    }
}

const eans = new Map();
eans.set('Drogaria Patrocinio', dataDrogariaPatrocinio);

async function main1(stores) {
    for (let [key, value] of stores) {
        console.log(key + " = " + value);
        console.log(process.argv);
        if (process.argv.includes(key)) {
            await main(key, value);
        }
    }
}

main1(eans);

