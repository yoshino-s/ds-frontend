-- CreateTable
CREATE TABLE `Paragraph` (
    `id` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(191) NULL,
    `markdown` BOOLEAN NULL,
    `tags` VARCHAR(191) NOT NULL,
    `time` DATE NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    INDEX `Paragraph_author_idx`(`author`),
    INDEX `Paragraph_time_idx`(`time`),
    INDEX `Paragraph_title_idx`(`title`),
    FULLTEXT INDEX `Paragraph_content_author_title_tags_idx`(`content`, `author`, `title`, `tags`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
