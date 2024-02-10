USE clinic_management;

`CREATE TABLE IF NOT EXISTS users (
  id int(11) AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'doctor', 'nurse', 'laboratory', 'finance', 'reception') NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  middle_name VARCHAR(100),
  phone_number VARCHAR(15),
  email VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ,`

`CREATE TABLE IF NOT EXISTS patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cardNumber INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  sex VARCHAR(5) NOT NULL,
  age INT NOT NULL,
  address VARCHAR(50) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  doctor INT NOT NULL
);`

-- CREATE TABLE IF NOT EXISTS patients (
--   user_id int(11) NOT NULL AUTO_INCREMENT,
--   cardNumber int(11) NOT NULL,
--   firstName VARCHAR(50) NOT NULL,
--   lastName VARCHAR(50) NOT NULL,
--   middleName VARCHAR(50) NOT NULL,
--   sex VARCHAR(5) NOT NULL,
--   age int(11) NOT NULL,
--   woreda VARCHAR(50) NOT NULL,
--   keble VARCHAR(50) NOT NULL,
--   phoneNumber VARCHAR(20) NOT NULL,
--   date DATE NOT NULL,
--   spot VARCHAR(30) NOT NULL,
--   cardType VARCHAR(30) NOT NULL,
--   admitted BOOLEAN NOT NULL,
--   physician int(11) NOT NULL,
--   PRIMARY KEY (user_id),
--   FOREIGN KEY (physician) REFERENCES users(id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci