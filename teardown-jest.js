import mongoose from "mongoose";
import config from 'config'

export default async () => {
    const db = config.get('db')
    await mongoose.connect(db)
    if (process.env.NODE_ENV == 'test') {        
        await mongoose.connection.dropDatabase()
        console.log('deleting database ' + db)
    }
}