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

-- CreateIndex
CREATE UNIQUE INDEX "coach_interviews_user_id_key" ON "coach_interviews"("user_id");

-- AddForeignKey
ALTER TABLE "coach_interviews" ADD CONSTRAINT "coach_interviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
