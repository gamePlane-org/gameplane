import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
// hello

export const authenticateToken = async(req, res, next) => {
    try {

        const tokenHeader = req.headers["authorization"]
        const token = tokenHeader && tokenHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Access token required"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "mysecret"
        )

        const user = await prisma.user.findUnique({
            where: {id:decoded.userId},
            select: {
                 id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true
            }
        })

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token - user not found",
            })
        }

        req.user = user
        next()

    } catch (error) {
        console.error("Auth middleware error:", error)
        return res.status(403).json({
            success: false,
            message: "Invalid or exprid token",
        })
    }
}