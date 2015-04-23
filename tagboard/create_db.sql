CREATE TABLE Messages(
    Id INTEGER PRIMARY KEY, 
    Text TEXT, 
    Status TEXT, 
    AddedTimestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ApprovedTimestamp DATETIME
);
