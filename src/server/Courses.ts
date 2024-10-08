"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
import { getSession } from "@/components/utils/CacheSession"
import {cache} from "react"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
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
            chapters: {
                select: {
                    id: true,
                },
                orderBy: {
                    createdAt: "asc"
                },
                take: 1
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
        isCompleted: userId ? course.userProgress.length > 0 : false,
        progressPercentage: userId ? course.userProgress.length > 0 ? (course.userProgress.length / course._count.chapters) * 100 : 0 : 0,
        firstChapterId: course.chapters[0]?.id
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
                        chapters: {
                            select: {
                                id: true
                            },
                            orderBy: {
                                createdAt: "asc"
                            }
                        },
                        userProgress: {
                            where: {
                                userId: userId,
                                isCompleted: true
                            },
                            select: {
                                id: true
                            }
                        },
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

        return purchases.map((purchase) => {
            const course = purchase.course;
            const totalChapters = course._count.chapters;
            const completed = course.userProgress.length;
            const progressPercentage = totalChapters > 0 ? (completed / totalChapters) * 100 : 0;
            const firstChapterId = course.chapters[0]?.id;
        
            return {
                ...course,
                isPurchased: true,
                isCompleted: completed === totalChapters,
                progressPercentage,
                firstChapterId
            }
        })
    })

// Get all courses created by the connected user
export const getCreatedCourses = authenticatedAction
    .schema(z.object({
        search: z.string().optional()
    }))
    .action(async ({ctx:{userId}, parsedInput:{search}}) => {
        const courses = await prisma.course.findMany({
            where: {
                authorId: userId,
                ...(search && {title: {contains: search}})
            },
            select: {
                id: true,
                title: true,
                price: true,
                published: true,
            },
            take: 10,
            orderBy: {
                createdAt: "desc"
            }
        })
        return courses
    })

// The author of the course can delete it
export const deleteCourse = authenticatedAction
    .schema(z.object({
        courseId: z.string()
    }))
    .action(async ({ctx:{userId}, parsedInput:{courseId}}) => {
        await prisma.course.delete({
            where: {
                id: courseId,
                authorId: userId
            }
        })

        revalidatePath("/teacher/courses")
    })

// L'author can publish or draft a course
export const publishCourse = authenticatedAction
    .schema(z.object({
        courseId: z.string(),
        published: z.boolean()
    }))
    .action(async ({ctx:{userId}, parsedInput:{courseId, published}}) => {
        await prisma.course.update({
            where: {
                id: courseId,
                authorId: userId
            },
            data: {
                published: published
            }
        })
          
        revalidatePath("/teacher/courses")
    })

// Create a new course, BUT, we need just to ender the title of the course
export const createCourse = authenticatedAction
    .schema(z.object({
        title: z.string()
    }))
    .action(async ({ctx:{userId}, parsedInput:{title}}) => {
        const course = await prisma.course.create({
            data: {
                title: title,
                authorId: userId,
                description: "",
                price: 0,
                levels: "",
                category: "",
            }
        })

        redirect(`/teacher/courses/${course.id}`)
    })

// Get a course by id
export const getCourseById = authenticatedAction
    .schema(z.object({
        courseId: z.string()
    }))
    .action(async ({ctx:{userId}, parsedInput:{courseId}}) => {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                authorId: userId
            },
            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                price: true,
                levels: true,
                category: true,
                published: true,
                chapters: {
                    select: {
                        id: true,
                        title: true,
                        isPublished: true,
                        freePreview: true
                    }
                }
            }
        })
        return course
    })

    // Update a course by id
    export const updateCourseById = cache(authenticatedAction
        .schema(z.object({
            courseId: z.string(),
            title: z.string().optional(),
            description: z.string().optional(),
            image: z.string().optional(),
            price: z.number().optional(),
            levels: z.string().optional(),
            category: z.string().optional(),
            published: z.boolean().optional()
        }))
        .action(async ({ctx:{userId}, parsedInput:{courseId, ...data}}) => {
            await prisma.course.update({
                where: {
                    id: courseId,
                    authorId: userId
                },
                data: {
                   ...data
                }
            })
            
            revalidatePath(`/teacher/courses/${courseId}`)
        })
    )

// Get the course Id
export const getCourseId = cache(async (courseId: string) => {
    const session = await getSession()
    const userId = session?.user?.id

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: {
            id: true,
            title: true,
            chapters: {
                where: {
                    isPublished: true
                },
                select: {
                    id: true,
                    title: true,
                    freePreview: true,
                    userProgress: {
                        where: {
                            userId: userId,
                            isCompleted: true
                        },
                        select: {
                            id: true
                        }
                    }
                }
            },
            purchases: {
                where: {
                    userId: userId
                },
                select: {
                    id: true
                }
            }
        }
    })
    
    return course ? {
        ...course,
        isPurchased: course.purchases.length > 0
    } : null
})


export const enrollCourse = authenticatedAction
    .schema(z.object({
        courseId: z.string()
    }))
    .action(async ({ctx:{userId}, parsedInput:{courseId}}) => {
        const course = await prisma.course.findUnique({
            where: { id: courseId },
        })

        if (!course) {
            throw new Error("Course not found")
        }

        await prisma.purchase.create({
            data: {
                userId: userId,
                courseId: courseId
            }
        })

        revalidatePath(`/courses/${courseId}`)
    })


