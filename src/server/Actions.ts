"use server"
import prisma from "@/lib/prisma"
import {z} from "zod"
import { authenticatedAction } from "@/lib/safe-actions"
/*
// LMs course education website
model Group {
  id String @id @default(cuid())
  title String
  content String?
  image String?
  videoUrl String?
  price Int?

  ownerId String
  owner User @relation(fields: [ownerId], references: [id], onDelete: Cascade)

  channels Channel[]
  courses Course[]
  members Member[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Channel {
  id String @id @default(cuid())
  title String

  posts Post[]

  groupId String
  group Group @relation(fields: [groupId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id String @id @default(cuid())
  title String
  content String
  image String?

  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)

  channelId String
  channel Channel @relation(fields: [channelId], references: [id], onDelete: Cascade)

  comments Comment[]
  likes Like[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Comment {
  id String @id @default(cuid())
  content String

  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)

  postId String
  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Like {
  id String @id @default(cuid())
  authorId String
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)

  postId String
  post Post @relation(fields: [postId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([authorId, postId])
}

model Course {
  id String @id @default(cuid())
  name String
  description String?
  image String?
  published Boolean @default(false)

  groupId String
  group Group @relation(fields: [groupId], references: [id], onDelete: Cascade)

  lessons Lesson[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Lesson {
  id String @id @default(cuid())
  title String
  content String?
  videoUrl String?

  courseId String
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  progress LessonProgress[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model LessonProgress {
  id String @id @default(cuid())
  completed Boolean @default(false)

  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  lessonId String
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, lessonId])
}

model Member {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  groupId String
  group Group @relation(fields: [groupId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

*/
