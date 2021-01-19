-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 19, 2021 at 07:57 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

DROP TABLE IF EXISTS `data`;
CREATE TABLE IF NOT EXISTS `data` (
  `auto_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(233) NOT NULL,
  `user_name` varchar(233) NOT NULL,
  `user_contact` varchar(233) NOT NULL,
  `user_email` varchar(233) NOT NULL,
  `user_type` enum('Male','Female') NOT NULL,
  `user_location` varchar(233) NOT NULL,
  `user_hobbies` varchar(233) NOT NULL,
  `user_status` enum('Active','Inactive') NOT NULL,
  `user_password` varchar(233) NOT NULL,
  `date_added` varchar(233) NOT NULL,
  `time_added` varchar(233) NOT NULL,
  PRIMARY KEY (`auto_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`auto_id`, `user_id`, `user_name`, `user_contact`, `user_email`, `user_type`, `user_location`, `user_hobbies`, `user_status`, `user_password`, `date_added`, `time_added`) VALUES
(1, 'AKRO-1n974f', 'Okyere Osei-Akoto', '0544720636', 'okyereworkmail22@gmail.com', 'Male', 'Accra', 'Dancing,Sleeping', 'Active', '81dc9bdb52d04dc20036dbd8313ed055', '2020-11-22', '09:27:45'),
(2, 'AKRO-6b84e9', 'Okyere Yaw Baah', '0244785236', 'obaah@gmail.com', 'Male', 'Accra', 'Dancing,Sleeping', 'Active', '81dc9bdb52d04dc20036dbd8313ed055', '2020-11-22', '10:11:02');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
