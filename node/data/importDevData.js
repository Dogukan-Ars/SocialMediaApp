import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from "../models/User.js"
import Post from '../models/Post.js'
import { users, posts } from "./datas.js"

// Lkoad environment variables
dotenv.config()

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
})
.catch((error) => console.log(`${error} did not connect`))

const deleteData = async () => {
    try {
        await Post.deleteMany()
        await User.deleteMany()
        console.log('Data succesfully deleted!')
    } catch (err) {
        console.log('ERROR :boom:', err)
    }
}

const importData = async () => {
    try {
        await Post.insertMany(posts)
        await User.insertMany(users)
        console.log('Data succesfully loaded!')
    } catch (err) {
        console.log('ERROR :boom:', err)
    }
}

(async () => {
    switch (process.argv[2]) {
        case '--delete':
            await deleteData()
            break
        case '--import':
            await importData()
            break
        default:
            console.log('Option is either: --delete, --import')
    }
    process.exit(0)
})()