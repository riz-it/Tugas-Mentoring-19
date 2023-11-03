-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 03, 2023 at 02:38 PM
-- Server version: 10.6.11-MariaDB-cll-lve
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doxxamyi_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Amunisi'),
(3, 'Makanan');

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `category_id`, `price`, `quantity`, `description`, `created_at`, `updated_at`, `product_code`) VALUES
(3, 'Pizza', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'P001'),
(4, 'Burger', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'B002'),
(5, 'Sushi', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'S003'),
(6, 'Noodles', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'N004'),
(7, 'Spaghetti', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'SP005'),
(8, 'Taco', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'T006'),
(9, 'Ice Cream', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'IC007'),
(10, 'Donuts', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'D008'),
(11, 'Salad', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'SC009'),
(12, 'Fried Chicken', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'FC010'),
(13, 'Pancakes', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'P011'),
(14, 'French Fries', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'FF012'),
(15, 'Steak', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'ST013'),
(16, 'Hot Dog', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'HD014'),
(17, 'Samosa', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'S015'),
(18, 'Pasta', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'P016'),
(19, 'Fish and Chips', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'FC017'),
(20, 'Shawarma', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'S018'),
(21, 'Curry', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'C019'),
(22, 'Sushi Roll', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'SR020'),
(23, 'Wilson', 3, '0.00', NULL, NULL, '2023-11-03 07:26:36', '2023-11-03 07:26:36', 'P021');

-- --------------------------------------------------------

--
-- Table structure for table `product_ingredients`
--

CREATE TABLE `product_ingredients` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `kode` varchar(50) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `product_ingredients`
--

INSERT INTO `product_ingredients` (`id`, `product_id`, `kode`, `nama`, `qty`) VALUES
(70, 4, 'FC012', 'Tepung', 1),
(69, 4, 'C020', 'Bumbu Curry', 40),
(67, 2, 'D008', 'Adonan Donat', 120);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) DEFAULT 'default.jpg',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_admin` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `is_confirmed` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `is_deleted` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `created_at`, `updated_at`, `is_admin`, `is_confirmed`, `is_deleted`) VALUES
(1, 'newUser1', 'user1@example.com', '$2y$10$4WVtMO0iCkXYVHLns4pd7u8BP.sHU/T3f/2USpYEhmUXG72uqtc4W', 'default.jpg', '2023-10-13 13:12:56', NULL, 0, 0, 0),
(4, 'newUser134', 'user1@examsdfple.com', '$2y$10$tr.hc7l2m6FglSHYWAs04eEJFUpK2gCq57pjHr36ZR69HOwaAKs.W', 'default.jpg', '2023-10-17 02:38:04', NULL, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ci_sessions_timestamp` (`timestamp`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_ingredients`
--
ALTER TABLE `product_ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `product_ingredients`
--
ALTER TABLE `product_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
