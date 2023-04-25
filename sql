INSERT INTO guests (first_name, last_name, email, password) 
VALUES ('John', 'Doe', 'johndoe@example.com', 'mypassword');
CREATE TABLE guests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50)
  last_name VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(255)
);



CREATE TABLE points (
  id INT PRIMARY KEY AUTO_INCREMENT,
  guest_id INT,
  points INT,
  date_earned DATETIME,
  FOREIGN KEY (guest_id) REFERENCES guests(id)
);

CREATE TABLE rewards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  description TEXT,
  points_required INT,
  quantity INT
);