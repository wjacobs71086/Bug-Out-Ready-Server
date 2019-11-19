-- //psql -U dunder_mifflin -d blogful-auth -f ./seeds/seed.blogful_tables.sql
BEGIN;

INSERT INTO bugout_users (id, user_name, password, active)

VALUES
(1, 'dalinar', '$2a$10$LU1qO1B4TXSPM8Mhelpz1.UHVUC/D2zK9UwBHpDIRvfLy51cJ6jR2', true),
(2, 'kip', '$2a$10$LU1qO1B4TXSPM8Mhelpz1.UHVUC/D2zK9UwBHpDIRvfLy51cJ6jR2', true),
(3, 'readysetgo', '$2a$10$LU1qO1B4TXSPM8Mhelpz1.UHVUC/D2zK9UwBHpDIRvfLy51cJ6jR2', false)
;

INSERT INTO user_bags (bag_id, user_id, bag_name, completed)
VALUES
(1, 1, 'My ready set go bag', FALSE),
(2, 3, 'Doggie Bag', TRUE)
;

INSERT INTO bugout_items (id, item_name, url, img, description, situation, est_cost)
VALUES
(1,'Flashlight', 'www.amazon.com', 'www.amazon.com', 'A must have for any situation', 'any', 10),
(2,'Band-aids','www.amazon.com','www.amazon.com','For wounds','any',15),
(3,'Rope','www.amazon.com','www.amazon.com','quick tethering','any',10),
(4,'Batteries','www.amazon.com','www.amazon.com','Some items will require batteries. extra points for rechargable','any',20),
(5,'Matches','www.amazon.com','www.amazon.com','Fire starter','any',3),
(6,'Knife','www.amazon.com','www.amazon.com','You can never have too many knives','any',15),
(7,'Shovel','www.amazon.com','www.amazon.com','Dig out buried persons or items','Quake',20),
(8,'Tarp','www.amazon.com','www.amazon.com','Keep whats important dry','Flood',25),
(9,'Water','www.amazon.com','www.amazon.com','About a gallon a day per person','any',5)
;


INSERT INTO bag_items (item_id, user_id, bag_id, owned)
VALUES
(1, 1, 1, FALSE),
(2,1,1,false),
(6,1,1,false)
;

COMMIT;