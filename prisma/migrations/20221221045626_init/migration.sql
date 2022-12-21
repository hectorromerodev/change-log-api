-- CreateEnum
CREATE TYPE "UPDATE_STATUS" AS ENUM ('IN_PROGRESS', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'DEPRECATED', 'DEPLOYED');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "belongsToId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Updates" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "status" "UPDATE_STATUS" NOT NULL DEFAULT 'IN_PROGRESS',
    "version" VARCHAR(20),
    "assetUrl" VARCHAR(255),
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpdatePoints" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "updateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UpdatePoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Updates" ADD CONSTRAINT "Updates_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpdatePoints" ADD CONSTRAINT "UpdatePoints_updateId_fkey" FOREIGN KEY ("updateId") REFERENCES "Updates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
