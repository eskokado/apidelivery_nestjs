-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `complement` VARCHAR(100) NULL,
    `number` VARCHAR(50) NOT NULL,
    `zip_code` VARCHAR(8) NOT NULL,
    `client_id` INTEGER NULL,

    INDEX `FKrf3c1s9gxxx0wubkv5maokv9y`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `name` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `UK_srv16ica2c1csub334bxjjb59`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `discount` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `price` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `quantity` INTEGER NULL,
    `product_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,

    INDEX `FKocimc7dtr037rh4ls4l95nlfi`(`product_id`),
    PRIMARY KEY (`order_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_date` DATETIME(6) NULL,
    `state_delivery` INTEGER NULL,
    `address_of_delivery_id` INTEGER NULL,
    `supplier_id` INTEGER NULL,

    INDEX `FK1capqbn2a8sdv25c9ly5ffl29`(`address_of_delivery_id`),
    INDEX `FKg2540vs5sg5b0uov81t6p0229`(`supplier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `price` DECIMAL(10, 2) NULL DEFAULT 0.00,

    UNIQUE INDEX `UK_o61fmio5yukmmiqgnxf8pnavn`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `name` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `UK_q5uvp89ra4ksaty5ghyaw4kjr`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `FKrf3c1s9gxxx0wubkv5maokv9y` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FK1capqbn2a8sdv25c9ly5ffl29` FOREIGN KEY (`address_of_delivery_id`) REFERENCES `addresses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `FKg2540vs5sg5b0uov81t6p0229` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
