CREATE DATABASE  IF NOT EXISTS `employee_directory`;
USE `employee_directory`;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_name` varchar(45) DEFAULT NULL,
  `author_name` varchar(45) DEFAULT NULL,
  `isbn` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Data for table `employee`
--

INSERT INTO `employee` VALUES 
	(1,'The Dip','Seth Godin','1591841666'),
	(2,'Ready, Fire, Aim','Michael Masterson','111908685X'),
	(3,'The Compound Effect','Darren Hardy','9390924634'),
	(4,'Hooked','Nir Eyal','0670069329'),
	(5,'Do What You Are','Paul D. Tieger','0316497142');
    
select * from `users`;
select * from `authorities`;
select * from `employee`;