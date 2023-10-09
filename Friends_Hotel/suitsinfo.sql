-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 03:44 PM
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
-- Table structure for table `suitsinfo`
--

CREATE TABLE `suitsinfo` (
  `Suit Number` int(10) NOT NULL,
  `Floor` int(10) NOT NULL,
  `Price per Day` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suitsinfo`
--

INSERT INTO `suitsinfo` (`Suit Number`, `Floor`, `Price per Day`) VALUES
(101, 1, 10),
(102, 1, 12),
(103, 1, 16),
(104, 1, 19),
(105, 1, 21),
(201, 2, 24),
(202, 2, 26),
(203, 2, 29),
(204, 2, 30),
(205, 2, 32),
(301, 3, 33),
(302, 3, 34),
(303, 3, 34),
(304, 3, 37),
(305, 3, 40),
(401, 4, 42),
(402, 4, 43),
(403, 4, 47),
(404, 4, 49),
(405, 4, 50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `suitsinfo`
--
ALTER TABLE `suitsinfo`
  ADD PRIMARY KEY (`Suit Number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
