import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import blogRoutes from "./routes/blogs.js"
import auditRoutes from "./routes/audits.js";

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use('/api/uploads', express.static('uploads'))
app.use(cors())
app.use("/static", express.static('./uploads/images'))

app.use("/api/blogs", blogRoutes)
app.use("/api/users", userRoutes)
app.use('/api/audits', auditRoutes)


app.get('/api', (req, res) => {
    res.send('<h1>welcom to Thirld world backend</h2>')
})


const CONNECTION_URL = 'mongodb+srv://dev_code94labs:dev@code94labs@cluster0.pcmyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error))

mongoose.set('useFindAndModify', false)


mongoose.connection.once('open', () => {
    console.log('mongodb successfull');
})


