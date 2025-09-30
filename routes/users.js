import express from 'express'
import { getAllUsers } from '../services/userServices.js'

const router = express.Router()

// 1 frist endpoint: get all users

router.get("/users", async (req, res) =>{
    try {
        const users = await getAllUsers(req.user)

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        })
    } catch (err) {
        res.status(400).json(err)
    }
})


export default router;
