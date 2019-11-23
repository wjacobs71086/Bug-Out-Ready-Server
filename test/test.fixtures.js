// This will be the support functions for the testing suites. will need to fill data for the tests. The 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



function makeUsersArray() {
    return [
        {
            id: 1,
            user_name: 'test-user-1',
            password: 'password'
        },
        {
            id: 2,
            user_name: 'test-user-2',
            password: 'password'
        },
        {
            id: 3,
            user_name: 'test-user-3',
            password: 'password'
        },
    ];
}
function makeItemsArray() {
    return [
        {
            id: 1,
            item_name: 'Flashlight',
            url: 'www.abc@def.com',
            img: 'www.abc@def.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi.',
            situation: 'any',
            est_cost: 15
        },
        {
            id: 2,
            item_name: 'Tarp',
            url: 'www.abc@def.com',
            img: 'www.abc@def.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi.',
            situation: 'Flood',
            est_cost: 15
        },
        {
            id: 3,
            item_name: 'Rope',
            url: 'www.abc@def.com',
            img: 'www.abc@def.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi.',
            situation: 'any',
            est_cost: 15
        },
        {
            id: 4,
            item_name: 'Shovel',
            url: 'www.abc@def.com',
            img: 'www.abc@def.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi.',
            situation: 'Quake',
            est_cost: 15
        },
        {
            id: 5,
            item_name: 'Tarp',
            url: 'www.abc@def.com',
            img: 'www.abc@def.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi.',
            situation: 'Fire',
            est_cost: 15
        },
        {
            id: 6,
            item_name: 'Matches',
            url: 'www.abc@def.com',
            img: 'www.abc@def.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi.',
            situation: 'any',
            est_cost: 15
        },
        {
            id: 7,
            item_name: 'Flashlight',
            url: 'www.abc@def.com',
            img: 'www.abc@def.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi.',
            situation: 'Fire',
            est_cost: 15
        },
        {
            id: 8,
            item_name: 'Knife',
            url: 'www.abc@def.com',
            img: 'www.abc@def.com',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi.',
            situation: 'any',
            est_cost: 15
        }
    ];
}
function makeUserBagsArray() {
    return [
        {
            bag_id: 1,
            user_id: 1,
            bag_name: 'My-go-bag-1',
            completed: false
        },
        {
            bag_id: 2,
            user_id: 1,
            bag_name: 'My-go-bag-2',
            completed: false
        },
        {
            bag_id: 3,
            user_id: 2,
            bag_name: 'My-go-bag-3',
            completed: false
        },
        {
            bag_id: 4,
            user_id: 3,
            bag_name: 'My-go-bag-4',
            completed: false
        },
        {
            bag_id: 5,
            user_id: 3,
            bag_name: 'My-go-bag-5',
            completed: false
        },
    ];
}
//work on a function that will create this data. Thats a lot of typing.
function makeBagItemsArray() {
    return [
        {
            id: 1,
            user_id: 1,
            bag_id: 1,
            item_id: 1,
            owned: false
        },
        {
            id: 2,
            user_id: 1,
            bag_id: 1,
            item_id: 2,
            owned: false
        },
        {
            id: 3,
            user_id: 1,
            bag_id: 1,
            item_id: 3,
            owned: false
        },
        {
            id: 4,
            user_id: 1,
            bag_id: 2,
            item_id: 1,
            owned: false
        },
        {
            id: 5,
            user_id: 1,
            bag_id: 2,
            item_id: 2,
            owned: false
        },
        {
            id: 6,
            user_id: 1,
            bag_id: 2,
            item_id: 3,
            owned: false
        },
        {
            id: 7,
            user_id: 2,
            bag_id: 3,
            item_id: 4,
            owned: false
        },
        {
            id: 8,
            user_id: 2,
            bag_id: 3,
            item_id: 5,
            owned: false
        },
        {
            id: 9,
            user_id: 2,
            bag_id: 3,
            item_id: 1,
            owned: false
        },
        {
            id: 10,
            user_id: 2,
            bag_id: 3,
            item_id: 2,
            owned: false
        },
        {
            id: 11,
            user_id: 2,
            bag_id: 3,
            item_id: 3,
            owned: false
        },
        {
            id: 12,
            user_id: 2,
            bag_id: 3,
            item_id: 6,
            owned: false
        },
        {
            id: 13,
            user_id: 3,
            bag_id: 4,
            item_id: 1,
            owned: false
        },
        {
            id: 14,
            user_id: 3,
            bag_id: 4,
            item_id: 2,
            owned: false
        },
        {
            id: 15,
            user_id: 3,
            bag_id: 4,
            item_id: 3,
            owned: false
        },
    ];
}
function makeBagFixtures() {
    const testUsers = makeUsersArray();
    const testBags = makeUserBagsArray();
    const testBagItems = makeBagItemsArray();
    const testItems = makeItemsArray();

    return { testUsers, testBags, testBagItems, testItems }
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db
        .into('bugout_users')
        .insert(preppedUsers)
        .then(() =>
            db.raw(`SELECT setval('bugout_users_id_seq', ?)`, [users[users.length - 1].id],
            ));
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
              bugout_users,
              user_bags,
              bag_items,
              bugout_items
            `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE bugout_users_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE user_bags_bag_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE bag_items_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE bugout_items_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('bugout_users_id_seq', 0)`),
                    trx.raw(`SELECT setval('user_bags_bag_id_seq', 0)`),
                    trx.raw(`SELECT setval('bag_items_id_seq', 0)`),
                    trx.raw(`SELECT setval('bugout_items_id_seq', 0)`),
                ])
            )
    )
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    //console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.user_name,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

function seedBagsTables(db, users, items, bags, bagItems) {
    //console.log(items);
    return db.transaction(async trx => {
        await seedUsers(trx, users);
        await trx.into('bugout_items').insert(items);
        await trx.into('user_bags').insert(bags)
        await trx.into('bag_items').insert(bagItems);
        // await trx.raw(
        //     `SELECT setval('bugout_items_id_seq',?`,
        //     [items[items.length - 1].id],
        // )
    });
}


module.exports = {
    makeUsersArray,
    makeUserBagsArray,
    makeItemsArray,
    makeBagItemsArray,
    makeBagFixtures,
    makeAuthHeader,
    seedBagsTables,
    seedUsers,
    cleanTables
};


//------------Meeting with Akiva and these were the notes on maybe seeding the database.

// randomly generate bag instances
// id, user_id, bag_id, item_id, owned
// bag_id and item_id combo cannot duplicate

// let user_ids = [1,2,3];
// let bag_ids = [1,2,3,4,5];
// let item_ids = [1,2,3,4,5,6,7,8]
// let owned = [true, false];

// // bag_items, 

// function getRandomElement(list) {
//   return list[Math.floor(Math.random() * Math.floor(list.length))]
// }

// const items = []
// const bags = []
// const bags_items = []
// for (let i = 1; i <= 7; i++) {
//   bags.push(
//     { 
//       id: i,
//       userId: getRandomElement(user_ids),
//       name: `Bag #${i}`, 
//     }
//   )
//   items.push({
//     id: i,
//     name: `Item #${i}`,
//   })
// }
// for (let i = 1; i <= 10; i++) {
//   bags_items.push(
//     {
//       bagId: getRandomElement(bags).id,
//       itemId: getRandomElement(items).id,
//       owned: getRandomElement(owned)
//     }
//   )
// }

// // SELECT bag.id, bag.name, item.id, item.name 
// // FROM bags_items 
// // JOIN bags ON bags.id = bags_items.bag_id
// // JOIN item
// function getBagItems(id) {
//   const bag = bags.find(b => b.id === id)
//   return {
//     ...bag,
//     items: bags_items
//       .filter(bi => bi.bagId === id)
//       .map(bi => items.find(i => i.id === bi.itemId))
//   }
// }

// getBagItems(getRandomElement(bags).id)

// function makeUsersArray() {
//     return [
//         {
//             id: 1,
//             user_name: 'test-user-1',
//             password: 'password'
//         },
//         {
//             id: 2,
//             user_name: 'test-user-2',
//             password: 'password'
//         },
//         {
//             id: 3,
//             user_name: 'test-user-3',
//             password: 'password'
//         },
//     ];
// }

// // function fillBagItemsTable(){
// //  let results= bag_ids.map(bag => {
// //     return {
// //     user_id: 1,
// //     bag_id: 1,
// //     item_id: 1,
// //     owned: false
// //   }
// // });
// // 
// // return results;
// // }


// // fillBagItemsTable();
// // maybe another forEach loop after this to see the length and add an id level