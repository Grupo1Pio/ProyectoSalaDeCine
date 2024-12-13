-- Crear la base de datos
CREATE DATABASE saladecine;

-- Conectar a la base de datos
\c saladecine;

-- Crear la tabla "Users"
CREATE TABLE Users (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Crear la tabla "movie_dates"
CREATE TABLE movie_dates (
    ID SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    movie_date TIMESTAMP NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(ID) ON DELETE CASCADE
);
