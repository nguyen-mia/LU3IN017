CREATE TABLE IF NOT EXISTS follows(
  follower_id VARCHAR(256) NOT NULL,
  followee_id VARCHAR(256) NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(follower_id, followee_id)
);

CREATE TABLE IF NOT EXISTS users(
  username VARCHAR(256) NOT NULL PRIMARY KEY,
  password VARCHAR(256) NOT NULL,
  lastname VARCHAR(256) NOT NULL,
  firstname VARCHAR(256) NOT NULL
);