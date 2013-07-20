PRAGMA foreign_keys = ON;

CREATE TABLE diagram(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT, 
    content TEXT,
    created DATE,
    updated DATE
);

CREATE TABLE revision(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    diagram_id INT
    content TEXT,
    changed DATE,
    FOREIGN KEY(diagram_id) REFERENCES diagram(id)  
);