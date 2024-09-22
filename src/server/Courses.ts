"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
import { getSession } from "@/components/utils/CacheSession"
import {cache} from "react"
/*
model Course {
  id String @id @default(cuid())
  title String
  description String
  image String?
  price Int
  published Boolean @default(false)
  levels String // beginner, intermediate, advanced
  category String

  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)

  chapters Chapter[]
  purchases Purchase[]
  userProgress UserProgress[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Chapter {
  id String @id @default(cuid())
  title String
  content String
  videoUrl String?
  freePreview Boolean @default(false)

  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  userProgress UserProgress[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Purchase {
  id String @id @default(cuid())
  userId String
  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, courseId])
}

model UserProgress {
  id String @id @default(cuid())
  userId String
  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  isCompleted Boolean @default(false)

  chapterId String
  chapter Chapter @relation(fields: [chapterId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, courseId, chapterId])
}
*/

// Get all courses published

export const getCourses = cache(async (category?: string, search?: string) => {
    const session = await getSession()
    const userId = session?.user?.id

    const courses = await prisma.course.findMany({
        where: {
            published: true,
            ...(category && {category: category}),
            ...(search && {title: {contains: search}})
        },
        select: {
            id: true,
            title: true,
            description: true,
            image: true,
            price: true,
            levels: true,          
            category: true,
            authorId: true,
            purchases: {
                where: {
                    userId: userId ?? undefined
                },
                select: {
                   id: true
                }
            },
            _count: {
                select: {
                    chapters: true
                }
            },
            ...(userId && {
                userProgress: {
                    where: {
                        userId: userId,
                        isCompleted: true
                    },
                    select: {
                        id: true
                    }
                }
            })
        },
        take: 10,
        orderBy: {
            createdAt: "desc"
        }
    })

    return courses.map((course) => ({
        ...course,
        isPurchased: course.purchases.length > 0,
        isCompleted: course.userProgress.length > 0,
        progressPercentage: course.userProgress.length > 0 ? (course.userProgress.length / course._count.chapters) * 100 : 0
    }))
})

// Get all courses purchases by the connected user
export const getPurchasesCourse = authenticatedAction
    .schema(z.object({}))
    .action(async ({ctx:{userId}}) => {
        const purchases = await prisma.purchase.findMany({
            where: {
                userId: userId ?? undefined
            },
            select: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        image: true,
                        price: true,
                        levels: true,
                        category: true,
                        authorId: true,
                        ...(userId && {
                            userProgress: {
                                where: {
                                    userId: userId,
                                    isCompleted: true
                                },
                                select: {
                                    id: true
                                }
                            }
                        }),
                        _count: {
                            select: {
                                chapters: true
                            }
                        }
                    },
                }
            },
            take: 10,
            orderBy: {
                createdAt: "desc"
            }
        })

        return purchases.map((purchase) => ({
            ...purchase,
            isCompleted: purchase.course.userProgress.length > 0,
            progressPercentage: purchase.course.userProgress.length > 0 ? (purchase.course.userProgress.length / purchase.course._count.chapters) * 100 : 0
        }))
    })
