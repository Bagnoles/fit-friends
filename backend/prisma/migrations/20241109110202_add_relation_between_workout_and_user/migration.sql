/*
  Warnings:

  - Added the required column `coach_id` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "coach_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
