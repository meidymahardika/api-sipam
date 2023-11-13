-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2023 at 05:11 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sipam`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `order_number` varchar(20) NOT NULL,
  `queue` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `total` int(11) NOT NULL,
  `status` enum('NEW_ORDER','WAITING','PAID','DONE','CANCEL') NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `order_number`, `queue`, `name`, `email`, `phone`, `total`, `status`, `created_at`, `updated_at`) VALUES
(1, 'TRK-1710230001', 1, 'Farhan ', 'farhandoe@gmail.com', '08881881772', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(2, 'TRK-1710230002', 2, 'Meidy ', 'Meidydoe@gmail.com', '08881881773', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(3, 'TRK-1710230003', 3, 'Indri ', 'Indridoe@gmail.com', '08881881773', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(4, 'TRK-1710230004', 4, 'Kardina ', 'Kardinadoe@gmail.com', '08881881774', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(5, 'TRK-1710230005', 5, 'Ulil ', 'Ulildoe@gmail.com', '08881881775', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(6, 'TRK-1710230006', 6, 'Fajar ', 'Fajardoe@gmail.com', '08881881776', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(7, 'TRK-1710230007', 7, 'Fauzan ', 'Fauzandoe@gmail.com', '08881881778', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(8, 'TRK-1710230008', 8, 'Ali ', 'Alidoe@gmail.com', '088818817764', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(9, 'TRK-1710230009', 9, 'Maya ', 'Maya@gmail.com', '08881881799', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29'),
(10, 'TRK-1710230010', 10, 'Khalista ', 'Khalista@gmail.com', '08881881712', 200000, 'NEW_ORDER', '2023-10-29', '2023-10-29');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `id_order`, `id_product`, `qty`) VALUES
(3, 1, 2, 10),
(4, 1, 9, 10),
(5, 1, 4, 10),
(6, 1, 5, 10),
(7, 2, 7, 10),
(8, 2, 6, 10),
(9, 2, 3, 10),
(10, 3, 8, 10),
(11, 3, 9, 10),
(12, 3, 4, 10);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `img` text NOT NULL,
  `desc` text NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_date` date NOT NULL,
  `updated_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `id_category_product`, `name`, `price`, `img`, `desc`, `is_active`, `created_date`, `updated_date`) VALUES
(2, 1, 'Nasi Goreng', 15000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(3, 1, 'Noodles', 15000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(4, 1, 'Pasta', 15000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(5, 1, 'Bread', 10000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(6, 3, 'Coffee', 15000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(7, 3, 'Tea', 15000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(8, 3, 'Iced Tea', 5000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(9, 3, 'Syrup', 10000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(10, 3, 'Juice', 5000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29'),
(11, 3, 'Milk', 7000, 'test', 'Lorem Ipsum Dolor', 1, '2023-10-29', '2023-10-29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ID_ORDER` (`id_order`),
  ADD KEY `FK_ID_PRODUCT` (`id_product`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `FK_ID_ORDER` FOREIGN KEY (`id_order`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `FK_ID_PRODUCT` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
