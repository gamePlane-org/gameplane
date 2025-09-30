import prisma from "../lib/prisma.js";


// fetch function
export async function getAllUsers() {
    try {
        // return await prisma.user.findMany({
        //     orderBy: {
        //         createdAt: "desc"
        //     }
        // })

    } catch (err) {
        throw new Error("Error Fetching users ")
    }
}


// Post function


// Update function


//Delete function