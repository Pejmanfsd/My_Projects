-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 03:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `friendshotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `Suit Number` int(10) NOT NULL,
  `First name` varchar(100) NOT NULL,
  `Last name` varchar(100) NOT NULL,
  `Check-in Date` date NOT NULL,
  `Check-out Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`Suit Number`, `First name`, `Last name`, `Check-in Date`, `Check-out Date`) VALUES
(101, 'PEJMAN', 'SHAHMOHAMMADHAMEDANI', '2023-07-02', '2023-07-05'),
(102, 'Joey', 'Tribbiani', '2023-07-10', '2023-07-18'),
(102, 'Frank', 'Buffay', '2023-07-25', '2023-07-30'),
(103, 'Estelle', 'Leonard', '2023-07-04', '2023-07-14'),
(202, 'Phoebe', 'Buffay', '2023-07-09', '2023-07-17'),
(203, 'Mike', 'Hannigan', '2023-07-09', '2023-07-17'),
(301, 'Emily', 'Waltham', '2023-07-06', '2023-07-13'),
(301, 'Richard', 'Burke', '2023-07-23', '2023-07-27'),
(303, 'Rachel', 'Green', '2023-07-08', '2023-07-16'),
(304, 'Ross', 'Geller', '2023-07-08', '2023-07-16'),
(402, 'Monica', 'Geller', '2023-07-07', '2023-07-15'),
(403, 'Chandler', 'Bing', '2023-07-07', '2023-07-15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`Suit Number`,`Check-in Date`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
