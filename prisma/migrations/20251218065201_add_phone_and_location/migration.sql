-- CreateTable
CREATE TABLE "Emergency" (
    "id" TEXT NOT NULL,
    "emergencyTypeId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "locationAccuracy" INTEGER NOT NULL,
    "locationSource" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assignedRole" TEXT,
    "responderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Emergency_pkey" PRIMARY KEY ("id")
);
