-- CreateEnum
CREATE TYPE "User_role_enum" AS ENUM ('ADMIN', 'MECHANIC', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Bonus_type_enum" AS ENUM ('REFERRAL', 'LOYALTY', 'PROMO');

-- CreateEnum
CREATE TYPE "OTP_status_enum" AS ENUM ('PENDING', 'USED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "OTP_type_enum" AS ENUM ('VERIFICATION', 'PASSWORD_RESET', 'REGISTER');

-- CreateEnum
CREATE TYPE "History_status_enum" AS ENUM ('OPEN', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Register_car_status_enum" AS ENUM ('ACTIVE', 'INACTIVE', 'STOLEN');

-- CreateEnum
CREATE TYPE "Register_service_status_enum" AS ENUM ('SCHEDULED', 'DONE', 'NO_SHOW');

-- CreateTable
CREATE TABLE "User" (
    "User_ID" SERIAL NOT NULL,
    "User_last_name" TEXT NOT NULL,
    "User_first_name" TEXT NOT NULL,
    "User_email" TEXT NOT NULL,
    "User_phone" TEXT,
    "User_password" TEXT NOT NULL,
    "User_role" "User_role_enum" NOT NULL DEFAULT 'CUSTOMER',
    "User_create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "User_update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("User_ID")
);

-- CreateTable
CREATE TABLE "Car" (
    "Car_ID" SERIAL NOT NULL,
    "Car_list" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("Car_ID")
);

-- CreateTable
CREATE TABLE "Service" (
    "Service_ID" SERIAL NOT NULL,
    "Service_name" TEXT NOT NULL,
    "Service_description" TEXT,
    "Service_price" DOUBLE PRECISION NOT NULL,
    "Service_duration_min" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("Service_ID")
);

-- CreateTable
CREATE TABLE "Bonus" (
    "Bonus_ID" SERIAL NOT NULL,
    "Bonus_point" INTEGER NOT NULL,
    "Bonus_type" "Bonus_type_enum" NOT NULL,
    "Bonus_user_ID" INTEGER NOT NULL,

    CONSTRAINT "Bonus_pkey" PRIMARY KEY ("Bonus_ID")
);

-- CreateTable
CREATE TABLE "Multi_branch" (
    "Multi_branch_ID" SERIAL NOT NULL,
    "Multi_branch_name" TEXT NOT NULL,
    "Multi_branch_address" TEXT,
    "Multi_branch_phone" TEXT,
    "Multi_branch_email" TEXT,
    "Multi_branch_opening_hours" TEXT,
    "Multi_branch_create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Multi_branch_update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Multi_branch_pkey" PRIMARY KEY ("Multi_branch_ID")
);

-- CreateTable
CREATE TABLE "Commit" (
    "Commit_ID" SERIAL NOT NULL,
    "Commit_text" TEXT NOT NULL,
    "Commit_review" TEXT,
    "Commit_entity_id" INTEGER,
    "Commit_entity_name" TEXT,
    "Commit_create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Commit_user_ID" INTEGER NOT NULL,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("Commit_ID")
);

-- CreateTable
CREATE TABLE "Notification" (
    "Notification_ID" SERIAL NOT NULL,
    "Notification_text" TEXT NOT NULL,
    "Notification_is_read" BOOLEAN NOT NULL DEFAULT false,
    "Notification_create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Notification_user_ID" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("Notification_ID")
);

-- CreateTable
CREATE TABLE "OTP" (
    "OTP_ID" SERIAL NOT NULL,
    "OTP_code" TEXT NOT NULL,
    "OTP_type" "OTP_type_enum" NOT NULL,
    "OTP_status" "OTP_status_enum" NOT NULL,
    "OTP_create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "OTP_expires_at" TIMESTAMP(3) NOT NULL,
    "OTP_user_ID" INTEGER NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("OTP_ID")
);

-- CreateTable
CREATE TABLE "History" (
    "History_ID" SERIAL NOT NULL,
    "History_bonus" INTEGER,
    "History_price" DOUBLE PRECISION,
    "History_status" "History_status_enum" NOT NULL,
    "History_create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "History_multi_branch_ID" INTEGER NOT NULL,
    "History_user_ID" INTEGER NOT NULL,
    "History_service_ID" INTEGER NOT NULL,
    "History_register_car" INTEGER,
    "History_register_service_ID" INTEGER,
    "carCar_ID" INTEGER,

    CONSTRAINT "History_pkey" PRIMARY KEY ("History_ID")
);

-- CreateTable
CREATE TABLE "Register_car" (
    "Register_car_ID" SERIAL NOT NULL,
    "Register_car_manufacturer" TEXT,
    "Register_car_mark" TEXT,
    "Register_car_year" INTEGER,
    "Register_car_vin" TEXT,
    "Register_car_status" "Register_car_status_enum" NOT NULL,
    "Register_car_create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Register_car_update_at" TIMESTAMP(3) NOT NULL,
    "Register_car_user_ID" INTEGER NOT NULL,

    CONSTRAINT "Register_car_pkey" PRIMARY KEY ("Register_car_ID")
);

-- CreateTable
CREATE TABLE "Register_service" (
    "Register_service_ID" SERIAL NOT NULL,
    "Register_service_scheduled" TIMESTAMP(3),
    "Register_service_time_list" TEXT,
    "Register_service_status" "Register_service_status_enum" NOT NULL,
    "Register_service_create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Register_service_update_at" TIMESTAMP(3) NOT NULL,
    "Register_service_user_ID" INTEGER NOT NULL,
    "Register_service_car" INTEGER NOT NULL,
    "Register_service_service_ID" INTEGER NOT NULL,
    "Register_service_multi_branch_ID" INTEGER NOT NULL,

    CONSTRAINT "Register_service_pkey" PRIMARY KEY ("Register_service_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_User_email_key" ON "User"("User_email");

-- CreateIndex
CREATE UNIQUE INDEX "Register_car_Register_car_vin_key" ON "Register_car"("Register_car_vin");

-- AddForeignKey
ALTER TABLE "Bonus" ADD CONSTRAINT "Bonus_Bonus_user_ID_fkey" FOREIGN KEY ("Bonus_user_ID") REFERENCES "User"("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_Commit_user_ID_fkey" FOREIGN KEY ("Commit_user_ID") REFERENCES "User"("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_Notification_user_ID_fkey" FOREIGN KEY ("Notification_user_ID") REFERENCES "User"("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_OTP_user_ID_fkey" FOREIGN KEY ("OTP_user_ID") REFERENCES "User"("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_History_multi_branch_ID_fkey" FOREIGN KEY ("History_multi_branch_ID") REFERENCES "Multi_branch"("Multi_branch_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_History_user_ID_fkey" FOREIGN KEY ("History_user_ID") REFERENCES "User"("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_History_service_ID_fkey" FOREIGN KEY ("History_service_ID") REFERENCES "Service"("Service_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_History_register_car_fkey" FOREIGN KEY ("History_register_car") REFERENCES "Register_car"("Register_car_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_History_register_service_ID_fkey" FOREIGN KEY ("History_register_service_ID") REFERENCES "Register_service"("Register_service_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_carCar_ID_fkey" FOREIGN KEY ("carCar_ID") REFERENCES "Car"("Car_ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Register_car" ADD CONSTRAINT "Register_car_Register_car_user_ID_fkey" FOREIGN KEY ("Register_car_user_ID") REFERENCES "User"("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Register_service" ADD CONSTRAINT "Register_service_Register_service_user_ID_fkey" FOREIGN KEY ("Register_service_user_ID") REFERENCES "User"("User_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Register_service" ADD CONSTRAINT "Register_service_Register_service_car_fkey" FOREIGN KEY ("Register_service_car") REFERENCES "Car"("Car_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Register_service" ADD CONSTRAINT "Register_service_Register_service_service_ID_fkey" FOREIGN KEY ("Register_service_service_ID") REFERENCES "Service"("Service_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Register_service" ADD CONSTRAINT "Register_service_Register_service_multi_branch_ID_fkey" FOREIGN KEY ("Register_service_multi_branch_ID") REFERENCES "Multi_branch"("Multi_branch_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
