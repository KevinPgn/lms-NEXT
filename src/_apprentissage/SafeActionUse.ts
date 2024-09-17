"use server"
import prisma from "@/lib/prisma"
import { authenticatedAction } from "@/lib/safe-actions"

/* 
    export const [nameAction] = authenticatedAction
        .schema(z.object({
            title: z.string().min(3),
            content: z.string().min(3),
            image: z.string().optional(),
        }))
        .action(async ({parsedInput: {title, content, image}, ctx}) => {
            const {user} = ctx
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    image,
                    authorId: user.id
                }
            })
            return post
        })
*/  