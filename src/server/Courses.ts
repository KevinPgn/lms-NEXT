"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
import { getSession } from "@/components/utils/CacheSession";
/*
model Course {
  id String @id @default(cuid())
  title String
  description String
  category String
  image String?
  price Int 
  language String
  public Boolean @default(false)

  levels Level[]
  wishlistItems WishlistItem[]
  ratings Rating[]
  lessons Lesson[]
  enrolledUsers EnrolledCourse[]

  instructorId String
  instructor User @relation(fields: [instructorId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Level {
  id String @id @default(cuid())
  name String // beginner, intermediate, advanced

  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model WishlistItem {
  id String @id @default(cuid())
  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, courseId])
}

model Lesson {
  id String @id @default(cuid())
  title String
  description String
  videoUrl String?

  lessonProgress LessonProgress[]

  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model LessonProgress {
  id String @id @default(cuid())
  lessonId String
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  isCompleted Boolean @default(false)
  completedAt DateTime?
  lastAccessedAt DateTime @default(now())
  progress Float @default(0) // 0 to 1

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, lessonId])
}

model Rating {
  id String @id @default(cuid())
  rating Int
  comment String?

  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, courseId])
}

model EnrolledCourse {
  id String @id @default(cuid())
  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, courseId])
}
*/

export const getFilteredCourses = async (category?: string) => {
  const where = category ? { category } : {};
  
  const [courses, totalCount] = await prisma.$transaction([
    prisma.course.findMany({
      where,
      select: {
        id: true,
        title: true,
        image: true,
        price: true,
        createdAt: true,
        levels: {
          select: {
            name: true,
          }
        },
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        _count: {
          select: {
            ratings: true,
            enrolledUsers: true,
          }
        },
        ratings: {
          select: {
            rating: true,
          }
        },
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.course.count({ where }),
  ]);

  const coursesWithAverageRating = courses.map(course => ({
    ...course,
    averageRating: course.ratings.length > 0
      ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length
      : 0,
  }));

  return {
    courses: coursesWithAverageRating,
    totalCount,
  };
};

// Get all courses created by the user, like the getFilteredCourses but for the instructor
export const getInstructorCourses = authenticatedAction
  .schema(z.object({
    category: z.string().optional(),
  }))
  .action(async ({parsedInput: {category}, ctx:{userId}}) => {
    const courses = await prisma.course.findMany({
      where: {
        category: category,
        instructorId: userId,
      },
      select: {
        id: true,
        title: true,
        image: true,
        price: true,
        createdAt: true,
        levels: {
          select: {
            name: true,
          }
        },
        instructor: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        _count: {
          select: {
            ratings: true,
            enrolledUsers: true,
          }
        },
        ratings: {
          select: {
            rating: true,
          }
        },
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
    });

    const coursesWithAverageRating = courses.map(course => ({
      ...course,
      averageRating: course.ratings.length > 0
        ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length
        : 0,
    }));

    return {
      courses: coursesWithAverageRating,
      totalCount: courses.length,
    };
  });