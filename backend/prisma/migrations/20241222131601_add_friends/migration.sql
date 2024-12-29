-- CreateTable
CREATE TABLE "Friends" (
    "first_id" TEXT NOT NULL,
    "second_id" TEXT NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("first_id","second_id")
);

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_first_id_fkey" FOREIGN KEY ("first_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_second_id_fkey" FOREIGN KEY ("second_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
