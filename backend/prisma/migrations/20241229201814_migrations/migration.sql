-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Customer', 'Coach');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Whatever');

-- CreateEnum
CREATE TYPE "Subway" AS ENUM ('Pionerskaya', 'Petrogradskaya', 'Udelnaya', 'Zvezdnaya', 'Sportivnaya');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('Beginner', 'Amateur', 'Professional');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Yoga', 'Running', 'Boxing', 'Stretching', 'Crossfit', 'Aerobics', 'Pilates');

-- CreateEnum
CREATE TYPE "Time" AS ENUM ('Short', 'Medium', 'Long', 'VeryLong');

-- CreateEnum
CREATE TYPE "Purchase" AS ENUM ('Subscription');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('Visa', 'Mir', 'Umoney');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL DEFAULT '',
    "password_hash" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "subway" "Subway" NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar_id" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "workout_types" "Type"[],
    "workout_time" "Time" NOT NULL,
    "calories_amount" INTEGER NOT NULL,
    "calories_day" INTEGER NOT NULL,
    "is_ready" BOOLEAN NOT NULL,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_interviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "workout_types" "Type"[],
    "coaching_merit" TEXT NOT NULL,
    "certificate_id" TEXT NOT NULL,
    "is_personal" BOOLEAN NOT NULL,

    CONSTRAINT "coach_interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "type" "Type" NOT NULL,
    "duration" "Time" NOT NULL,
    "price" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "video_url" TEXT NOT NULL,
    "coach" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,
    "is_special" BOOLEAN NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balances" (
    "user_id" TEXT NOT NULL,
    "workout_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("user_id","workout_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workout_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_type" "Purchase" NOT NULL,
    "service_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment" "Payment" NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "hash_name" TEXT NOT NULL,
    "sub_directory" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "first_id" TEXT NOT NULL,
    "second_id" TEXT NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("first_id","second_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "interviews_user_id_key" ON "interviews"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "coach_interviews_user_id_key" ON "coach_interviews"("user_id");

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_interviews" ADD CONSTRAINT "coach_interviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_sessions" ADD CONSTRAINT "refresh_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_first_id_fkey" FOREIGN KEY ("first_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_second_id_fkey" FOREIGN KEY ("second_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
