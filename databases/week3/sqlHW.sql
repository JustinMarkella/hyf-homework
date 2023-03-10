CREATE DATABASE Homework3DB;

USE Homework3DB;

CREATE TABLE Meal (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `location` VARCHAR(255) NOT NULL,
    `when` DATETIME NOT NULL,
    `maxreservation` INT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `created_date` DATE NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Reservation(
    `id` INT NOT NULL AUTO_INCREMENT,
    `number_of_guests` INT NOT NULL,
    `meal_id` INT NOT NULL,
    `created_date` DATE NOT NULL,
    `contact_phone_number` VARCHAR(255) NOT NULL,
    `contact_name` VARCHAR(255) NOT NULL,
    `contact_email` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (meal_id) REFERENCES `Meal` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Review(
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `meal_id` INT NOT NULL,
    `stars` INT NOT NULL,
    `created_date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (meal_id) REFERENCES `Meal` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    Meal (
        `title`,
        `description`,
        `location`,
        `when`,
        `maxreservation`,
        `price`,
        `created_date`
    )
VALUES
    (
        'Borsch',
        'Ukrainian soup',
        'Vangvej 12, 7950 Erslev',
        '2023-03-01 18:00:00',
        12,
        55.50,
        '2023-02-28'
    );

INSERT INTO
    Meal (
        `title`,
        `description`,
        `location`,
        `when`,
        `maxreservation`,
        `price`,
        `created_date`
    )
VALUES
    (
        'Varenyky',
        'Ukrainian dumplings',
        'Morsøvej 2A, 8800 Viborg',
        '2023-03-01 14:00:00',
        36,
        38.00,
        '2023-02-27'
    );

INSERT INTO
    Meal (
        `title`,
        `description`,
        `location`,
        `when`,
        `maxreservation`,
        `price`,
        `created_date`
    )
VALUES
    (
        'Frikadeller med brun sauce og kartofler',
        'Danish meal',
        'Klotrupvej 8, 8832 Skals',
        '2023-03-03 12:00:00',
        8,
        45.50,
        '2023-03-01'
    );

INSERT INTO
    Reservation (
        number_of_guests,
        meal_id,
        created_date,
        contact_phone_number,
        contact_name,
        contact_email
    )
VALUES
    (
        4,
        2,
        '2023-03-01',
        50123456,
        'Mr.Andreson',
        'abrakadabra@gmail.com'
    );

INSERT INTO
    Reservation (
        `number_of_guests`,
        `meal_id`,
        `created_date`,
        `contact_phone_number`,
        `contact_name`,
        `contact_email`
    )
VALUES
    (
        12,
        3,
        '2023-02-28',
        50654321,
        'Eleonora Doubt',
        'e.doubt@gmail.com'
    );

INSERT INTO
    Reservation (
        `number_of_guests`,
        `meal_id`,
        `created_date`,
        `contact_phone_number`,
        `contact_name`,
        `contact_email`
    )
VALUES
    (
        6,
        1,
        '2023-02-27',
        50132435,
        'Tina Terner',
        't.terner@gmail.com'
    );

INSERT INTO
    Review (
        `title`,
        `description`,
        `meal_id`,
        `stars`,
        `created_date`
    )
VALUES
    (
        'Best borsch',
        'It is the best borsch I have ever tried!!1',
        1,
        5,
        '2022-02-12'
    );

INSERT INTO
    Review (
        `title`,
        `description`,
        `meal_id`,
        `stars`,
        `created_date`
    )
VALUES
    (
        'Good but...',
        'It is delicious, but could be better',
        2,
        4,
        '2022-02-02'
    );

INSERT INTO
    Review (
        `title`,
        `description`,
        `meal_id`,
        `stars`,
        `created_date`
    )
VALUES
    (
        'Not good, not bad',
        'Like a regular potato and frikadeles',
        3,
        4,
        '2022-02-15'
    );

SELECT
    `id`
FROM
    `Reservation`
WHERE
    contact_name = 'Tina Terner';

SELECT
    *
FROM
    `Review`
WHERE
    stars > 4;

SELECT
    *
FROM
    `Meal`
WHERE
    maxreservation < 10;

SELECT
    `contact_email`
FROM
    `Reservation`
WHERE
    created_date >= '2023-02-28';

SELECT
    *
FROM
    `Meal`
ORDER BY
    created_date DESC
LIMIT
    2;