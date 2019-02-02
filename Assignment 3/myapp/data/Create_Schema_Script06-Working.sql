-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ags_03
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ags_03` ;

-- -----------------------------------------------------
-- Schema ags_03
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ags_03` DEFAULT CHARACTER SET utf8 ;
USE `ags_03` ;

-- -----------------------------------------------------
-- Table `ags_03`.`games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ags_03`.`games` ;

CREATE TABLE IF NOT EXISTS `ags_03`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `description` VARCHAR(255) NULL,
  `genre` VARCHAR(45) NULL,
  `cost` INT NULL,
  `releaseDate` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ags_03`.`players`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ags_03`.`players` ;

CREATE TABLE IF NOT EXISTS `ags_03`.`players` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `screenName` VARCHAR(128) NULL,
  `firstName` VARCHAR(64) NULL,
  `lastName` VARCHAR(64) NULL,
  `password` VARCHAR(64) NULL,
  `encryptedPassword` VARCHAR(256) NULL,
  `plaintextPassword` VARCHAR(64) NULL,
  `email` VARCHAR(128) NULL,
  `dob` DATETIME NULL,
  `gamesPlayed` INT NULL,
  `gamesPurchased` INT NULL,
  `dateJoined` DATETIME NULL,
  `lastLogin` DATETIME NULL,
  `role` ENUM("guest", "member", "gameDev", "admin", "superAdmin") NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ags_03`.`gameplayer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ags_03`.`gameplayer` ;

CREATE TABLE IF NOT EXISTS `ags_03`.`gameplayer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gameId` INT NULL,
  `gameNowPlaying` INT NULL,
  `gameHighScore` INT NULL,
  `gameState` LONGTEXT NULL,
  `players_id` INT NOT NULL,
  `games_id` INT NOT NULL,
  CONSTRAINT `fk_gameplayer_players1`
    FOREIGN KEY (`id`)
    REFERENCES `ags_03`.`players` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_gameplayer_games1`
    FOREIGN KEY (`id`)
    REFERENCES `ags_03`.`games` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ags_03`.`gameReviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ags_03`.`gameReviews` ;

CREATE TABLE IF NOT EXISTS `ags_03`.`gameReviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dateReviewed` DATETIME NULL,
  `reviewText` TINYTEXT NULL,
  `players_id` INT NOT NULL,
  `games_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_gameReviews_players1`
    FOREIGN KEY (`id`)
    REFERENCES `ags_03`.`players` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_gameReviews_games1`
    FOREIGN KEY (`id`)
    REFERENCES `ags_03`.`games` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

GRANT ALL PRIVILEGES  ON *.* TO 'agsroot'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'agsroot'@'localhost' identified by 'ags';

insert into players (screenName, firstName,lastName,email,dob, encryptedPassword, dateJoined, lastLogin)
values ('Mohini', 'Mohini', 'Salunke', 'mohinims22@gmail.com', '1993-05-22', '12345678', '2018-11-24', '2017-11-24 00:00:00');

