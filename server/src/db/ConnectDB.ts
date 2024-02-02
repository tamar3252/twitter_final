const mongooseDB = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongooseDB.connect(
        `mongodb://localhost:27017/twitter`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    console.log("mongo connection")
}