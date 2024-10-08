"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
import { revalidatePath } from "next/cache"
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

export const createChapter = authenticatedAction.schema(z.object({
    courseId: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
    videoUrl: z.string().optional(),
    freePreview: z.boolean().optional()
})).action(async ({ctx:{userId}, parsedInput:{courseId, title, content, videoUrl, freePreview}}) => {
    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
            authorId: userId
        }
    })

    if(!course) {
        throw new Error("Course not found")
    }

    await prisma.chapter.create({
        data: {
            title: title || "Untitled",
            content: content || "",
            videoUrl: videoUrl || "",
            freePreview: freePreview || false,
            courseId
        }
    })

    revalidatePath(`/teacher/courses/${courseId}`)
})

export const deleteChapter = authenticatedAction.schema(z.object({
    chapterId: z.string()
})).action(async ({ctx:{userId}, parsedInput:{chapterId}}) => {
    const chapter = await prisma.chapter.findUnique({
        where: {
            id: chapterId
        },
        select: {
            course: {
                select: {
                    authorId: true
                }
            }
        }
    })

    if (!chapter || chapter.course.authorId !== userId) {
        throw new Error("You are not authorized to delete this chapter")
    }

   const deletedChapter = await prisma.chapter.delete({
        where: {
            id: chapterId
        }
    })

    revalidatePath(`/teacher/courses/${deletedChapter.courseId}`)
})

export const updateChapter = authenticatedAction.schema(z.object({
    chapterId: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
    videoUrl: z.string().optional(),
    freePreview: z.boolean().optional()
})).action(async ({ ctx: { userId }, parsedInput: { chapterId, ...data } }) => {
    const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
        select: {
            course: { select: { authorId: true } }
        }
    })

    if (!chapter) {
        throw new Error("Chapter not found")
    }

    if (chapter.course.authorId !== userId) {
        throw new Error("You are not authorized to update this chapter")
    }

    const updatedChapter = await prisma.chapter.update({
        where: { id: chapterId },
        data: { ...data }
    })

    revalidatePath(`/teacher/courses/${updatedChapter.courseId}`)
})

// Publish the chapter
export const publishChapter = authenticatedAction.schema(z.object({
    chapterId: z.string(),
    isPublished: z.boolean()
})).action(async ({ctx:{userId}, parsedInput:{chapterId, isPublished}}) => {
    const chapter = await prisma.chapter.findUnique({
        where: {id: chapterId},
        select: {
            course: {
                select: {
                    authorId: true
                }
            }
        }
    })
    
    if(!chapter) {
        throw new Error("Chapter not found")
    }

    if(chapter.course.authorId !== userId) {
        throw new Error("You are not authorized to publish this chapter")
    }

    const updatedChapter = await prisma.chapter.update({
        where: {id: chapterId},
        data: {isPublished: isPublished}   
    })

    revalidatePath(`/teacher/courses/${updatedChapter.courseId}`)  
})

// Get the chapter by id
export const getChapterById = async ({chapterId}: {chapterId: string}) => {
    const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
        select: {
            id: true,
            title: true,
            content: true,
            videoUrl: true,
            freePreview: true,
            isPublished: true
        }
    })

    return chapter
}


export const markChapterAsCompleted = authenticatedAction
  .schema(z.object({
    chapterId: z.string(),
    courseId: z.string()
  }))
  .action(async ({ ctx: { userId }, parsedInput: { chapterId, courseId } }) => {
    if (!userId) throw new Error("User not authenticated");

    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_courseId_chapterId: {
          userId,
          courseId,
          chapterId
        }
      },
      update: {
        isCompleted: true
      },
      create: {
        userId,
        courseId,
        chapterId,
        isCompleted: true
      }
    });

    revalidatePath(`/courses/${courseId}/chapters/${chapterId}`);
    return userProgress;
  });