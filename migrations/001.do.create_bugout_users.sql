CREATE TABLE bugout_users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL
);