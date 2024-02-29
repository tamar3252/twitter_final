const mongooseDB = require('mongoose');


const main=async()=> {
    await mongooseDB.connect(
        `mongodb://db:27017/twitter`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    console.log("mongo connection")
}

main().catch((err:Error) => console.log(err));
