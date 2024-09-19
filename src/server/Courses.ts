"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
/*
model Courses {
  id String @id @default(cuid())
  title String?
  description String?
  image String?
  category String?
  price Int? @default(0)
  published Boolean @default(false)
  rating Int @default(0)

  creatorId String
  creator User @relation(fields: [creatorId], references: [id], onDelete: Cascade)

  members Members[]
  lessons Lessons[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Members {
  id String @id @default(cuid())

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  coursesId String
  courses Courses @relation(fields: [coursesId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, coursesId])
}

model Lessons {
  id String @id @default(cuid())
  title String
  content String
  video String?
  free Boolean @default(false)

  coursesId String
  courses Courses @relation(fields: [coursesId], references: [id], onDelete: Cascade)

  completedBy CompletedLessons[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt 
}

model CompletedLessons {
  id String @id @default(cuid())

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  lessonId String
  lesson Lessons @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  completedAt DateTime @default(now())
  
  @@unique([userId, lessonId])
}

*/

export const getFilteredCoursesPublished = async (category?: string) => {
    const courses = await prisma.courses.findMany({
        where: {
            published: true,
            ...(category && category !== "All" ? { category } : {})
        },
        select: {
            id: true,
            title: true,
            description: true,
            image: true,
            category: true,
            price: true,
            rating: true,
            _count: {
                select: {
                    lessons: true
                }
            }
        },
        take: 20,
        orderBy: {
            createdAt: "desc"
        }
    })

    return courses
}