CREATE TABLE bugout_items (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    item_name TEXT NOT NULL,
    url TEXT NOT NULL,
    img TEXT NOT NULL,
    description varchar(500),
    situation TEXT NULL,
    est_cost numeric
);