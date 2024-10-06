/*
  Warnings:

  - The primary key for the `balances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `balances` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "balances" DROP CONSTRAINT "balances_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "balances_pkey" PRIMARY KEY ("user_id", "workout_id");
