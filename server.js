import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// initialize
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())

app.get('/api/team', (req, res) =>{
    res.status(200).json({
        message: ""
    })
})

app.listen(PORT, () => {
    console.log(`server is runing on http//localhost:${PORT}`)
})

export default app;