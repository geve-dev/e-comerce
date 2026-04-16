CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  email VARCHAR(255),
  password VARCHAR(255),
  role ENUM('user', 'mod', 'adm') NOT NULL DEFAULT 'user'
);

CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120),
  description VARCHAR(255),
  price DECIMAL(10, 2),
  stock INT,
  image VARCHAR(255)
);
