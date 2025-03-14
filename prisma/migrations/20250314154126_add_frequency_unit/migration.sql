/*
  Warnings:

  - You are about to drop the column `endDate` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Medication` table. All the data in the column will be lost.
  - Added the required column `frequencyUnit` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isControlled` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FrequencyUnit" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_userId_fkey";

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "endDate",
DROP COLUMN "photoUrl",
ADD COLUMN     "frequencyUnit" "FrequencyUnit" NOT NULL,
ADD COLUMN     "isControlled" BOOLEAN NOT NULL,
ADD COLUMN     "prescriptionExpiration" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
