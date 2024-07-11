CREATE TABLE IF NOT EXISTS user
(
    id            VARCHAR(255) PRIMARY KEY,
    high_score    INT NOT NULL DEFAULT 0,
    last_login    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);