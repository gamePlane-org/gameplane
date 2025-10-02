import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
// import { PrismaClient, Prisma } from '@prisma/client'


const router = express.Router();


// Register
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        if(!firstName || !lastName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "firstName lastName email and password are required",
            })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email}
        })

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "user with this email already exists"
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: prisma.role.COACH
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true
            }
        });

        const token = jwt.sign( 
            {userId: newUser.id},
            process.env.JWT_SECTER || "mysecret",
            {expiresIn: "24h"}
        )

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                student: newUser,
                token: token
            }
        })


    } catch(err) {
        console.log('Registration error', err);
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: err.message
        });
    }
});



// login
router.post('/login', async (req, res) =>{
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            })
        }

        const user = await prisma.findUnique({
            where: { email: email}
        })

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const IsPasswordValid = await bcrypt.compare(password, user.password)

        if(!IsPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Sorry your password is wrong"
            })
        }

        const token = jwt.sign( 
            { userId: user.id },
            process.env.JWT_SECTER || "mysecret",
            { expiresIn: "24h"} 
        )

        const {password: _, ...userData} = user;

        res.status(200).json({
            success: true,
            message: "Loggin successfully",
            data: {
                user: userData,
                token: token
            }
        })


    } catch (error) {
        console.log('Login error:', rttot);
        res.status(500).json({
            success: false,
            message: "Error during login",
            error: error.message
        })
    }
})


// User

export default router;