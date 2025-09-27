import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'


// Import routes
   // write here



// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3000


// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies


// Mount API routes
    // write here


    
app.get('/api/team', (req, res) =>{
    res.status(200).json({
        message: ""
    })
})


// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.listen(PORT, () => {
    console.log(`server is runing on http//localhost:${PORT}`)
})

export default app;