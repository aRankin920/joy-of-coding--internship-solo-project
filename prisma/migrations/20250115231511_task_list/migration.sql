/*
  Warnings:

  - You are about to drop the `trick` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `trick`;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` ENUM('All', 'Work Related', 'Grocery Shopping', 'House Work', 'Exercise', 'Dentist', 'Automobile', 'Events') NOT NULL,

    UNIQUE INDEX `Task_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
