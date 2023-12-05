/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `Password` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Skill" (
    "skillName" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserSkill" (
    "userId" INTEGER NOT NULL,
    "skillName" TEXT NOT NULL,
    "level" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "skillName"),
    CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserSkill_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "Skill" ("skillName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Website" (
    "type" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "UserWebsite" (
    "userId" INTEGER NOT NULL,
    "userWebsiteType" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "userWebsiteType"),
    CONSTRAINT "UserWebsite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserWebsite_userWebsiteType_fkey" FOREIGN KEY ("userWebsiteType") REFERENCES "Website" ("type") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "navTitle" TEXT NOT NULL DEFAULT 'Untitled',
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "bgImage" TEXT,
    "tldr" TEXT,
    "pageBlocks" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlockType" (
    "type" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "blockType" TEXT NOT NULL,
    "properties" TEXT NOT NULL DEFAULT '{}',
    "parentId" TEXT,
    CONSTRAINT "Block_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Block_blockType_fkey" FOREIGN KEY ("blockType") REFERENCES "BlockType" ("type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Block_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Block" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "H1" (
    "text" TEXT,
    "align" TEXT NOT NULL DEFAULT 'left',
    "embeddedUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "H2" (
    "text" TEXT,
    "align" TEXT NOT NULL DEFAULT 'left',
    "embeddedUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "H3" (
    "text" TEXT,
    "align" TEXT NOT NULL DEFAULT 'left',
    "embeddedUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Text" (
    "text" TEXT,
    "align" TEXT NOT NULL DEFAULT 'left',
    "embeddedUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BulletedList" (
    "text" TEXT,
    "align" TEXT NOT NULL DEFAULT 'left'
);

-- CreateTable
CREATE TABLE "NumberedList" (
    "text" TEXT,
    "align" TEXT NOT NULL DEFAULT 'left'
);

-- CreateTable
CREATE TABLE "Toggle" (
    "text" TEXT,
    "align" TEXT NOT NULL DEFAULT 'left',
    "embeddedUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Paragraph" (
    "align" TEXT NOT NULL DEFAULT 'left',
    "images" TEXT
);

-- CreateTable
CREATE TABLE "SkillsTable" (
    "techSkills" TEXT NOT NULL DEFAULT '[]',
    "softSkills" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "ContactBox" (
    "headline" TEXT,
    "image" TEXT,
    "websites" TEXT NOT NULL DEFAULT '[]',
    "hasEmailForm" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "BlogPostGallery" (
    "rssUrl" TEXT,
    "mediumUserName" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "profilePic" TEXT,
    "bio" TEXT,
    "intro" TEXT,
    "chatSimple" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "updatedAt") SELECT "createdAt", "email", "id", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("body", "createdAt", "id", "title", "updatedAt", "userId") SELECT "body", "createdAt", "id", "title", "updatedAt", "userId" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_Password" (
    "hash" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Password" ("hash", "userId") SELECT "hash", "userId" FROM "Password";
DROP TABLE "Password";
ALTER TABLE "new_Password" RENAME TO "Password";
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
