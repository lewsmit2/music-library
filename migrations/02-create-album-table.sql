CREATE TABLE Albums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    artistId INT NOT NULL
);

ALTER TABLE Albums
ADD CONSTRAINT fk_artistId
FOREIGN KEY (artistId) REFERENCES Artists(id);
