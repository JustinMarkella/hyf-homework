CREATE DATABASE GameDB;

USE GameDB;

CREATE TABLE `Developer`(
    `developer_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL
);

CREATE TABLE `Genre`(
    `genre_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `Game`(
    `game_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `release_date` DATETIME NOT NULL,
    `platform_id` INT(10) UNSIGNED,
    `developer_id` INT(10) UNSIGNED,
    `genre_id` INT(10) UNSIGNED,
    FOREIGN KEY (developer_id) REFERENCES Developer (developer_id),
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `Player`(
    `player_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `regisration_date` DATETIME NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `Platform`(
    `platform_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `release_date` DATETIME NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `GamesPlatforms` (
    `game_id` INT(10) UNSIGNED,
    `platform_id` INT(10) UNSIGNED,
    PRIMARY KEY (game_id, platform_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
    FOREIGN KEY (platform_id) REFERENCES Platform(platform_id)
);

CREATE TABLE `GamesPlayers` (
    `game_id` INT(10) UNSIGNED,
    `player_id` INT(10) UNSIGNED,
    PRIMARY KEY (game_id, player_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
    FOREIGN KEY (player_id) REFERENCES Player(player_id)
);