/*
  Warnings:

  - The values [All] on the enum `task_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `category` ENUM('Work Related', 'Grocery Shopping', 'House Work', 'Exercise', 'Dentist', 'Automobile', 'Events') NOT NULL;
