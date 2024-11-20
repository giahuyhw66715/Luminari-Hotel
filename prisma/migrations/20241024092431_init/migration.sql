-- CreateEnum
CREATE TYPE "ViewType" AS ENUM ('GARDEN_VIEW', 'CITY_VIEW', 'BEACH_VIEW');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('DINE', 'EVENTS', 'FACILITIES');

-- CreateEnum
CREATE TYPE "Classfication" AS ENUM ('STANDARD', 'SUITE');

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "price" INTEGER NOT NULL,
    "bed" TEXT NOT NULL,
    "classification" "Classfication" NOT NULL DEFAULT 'STANDARD',
    "view" "ViewType" NOT NULL DEFAULT 'GARDEN_VIEW',
    "occupancy" INTEGER NOT NULL DEFAULT 2,
    "roomSize" INTEGER NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,
    "images" TEXT[],
    "openingHours" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '(555) 123-4567',
    "email" TEXT NOT NULL DEFAULT 'reservations@luminarihotel.com',

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingItem" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "bookingId" TEXT NOT NULL,
    "accommodationId" TEXT NOT NULL,

    CONSTRAINT "BookingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "customerClerkId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "method" "PaymentMethod" NOT NULL DEFAULT 'CASH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccommodationToAmenity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_slug_key" ON "Accommodation"("slug");

-- CreateIndex
CREATE INDEX "Accommodation_id_slug_idx" ON "Accommodation"("id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateIndex
CREATE INDEX "Collection_id_slug_idx" ON "Collection"("id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_id_slug_idx" ON "Service"("id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "_AccommodationToAmenity_AB_unique" ON "_AccommodationToAmenity"("A", "B");

-- CreateIndex
CREATE INDEX "_AccommodationToAmenity_B_index" ON "_AccommodationToAmenity"("B");

-- AddForeignKey
ALTER TABLE "BookingItem" ADD CONSTRAINT "BookingItem_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingItem" ADD CONSTRAINT "BookingItem_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccommodationToAmenity" ADD CONSTRAINT "_AccommodationToAmenity_A_fkey" FOREIGN KEY ("A") REFERENCES "Accommodation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccommodationToAmenity" ADD CONSTRAINT "_AccommodationToAmenity_B_fkey" FOREIGN KEY ("B") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
