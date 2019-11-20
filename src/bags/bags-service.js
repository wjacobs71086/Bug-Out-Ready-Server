const BagsService = {
    getAllBags(db) {
      return db
        .from('user_bags AS bags')
        .select('*');
    },
  
    getById(db, id) {
      return BagsService.getAllBags(db)
        .where('bag_id', id)
        .first();
    },
    getBagItems(db, id) {
      return db
        .select(
          'bag_id',
          'item_id',
          'item_name',
          'url',
          'description',
          'situation',
          'est_cost',
          'img',
          'owned'
        )
        .from('bag_items')
        .join('bugout_items', 'item_id', '=', 'bugout_items.id')
        .where('bag_id', id);
    },
    getUserBags(db,user_id) {
      return db
        .from('user_bags AS bags')
        .where('user_id', user_id);
    },
    createNewBag(db, bag_name, user_id){
      //inserts into the 'user_bags' table a new bag.
      return db('user_bags')
        .returning('bag_id')
        .insert({
          bag_name: bag_name,
          user_id: user_id
        });
    },
    fillBagWithItems(db, bag_id, user_id, situation){
        console.log('bag_id', bag_id);
        console.log('user_id', user_id);
        console.log('situation', situation);

      // let items = db('bugout_items')
      //   .returning('item_id')
      //   .select(
      //     'id',
      //     'situation'
      //   )
      //   .where('situation', 'any')
      //   .andWhere('situation', `%${situation}%`);
      //   items.map(item => db('bag_items')
      //     .insert({
      //       user_id,
      //       bag_id,
      //       item_id: item.id
      //     }));

      // return db.insert(
      //   db.select()
      //   .from('bugout_items')
      //   .where('situation', 'any')
      //   .andWhere('situation', `%${situation}%`)
      //   )
      //   .into('bag_items');
    },
      
  };
  
  module.exports = BagsService;
  //pg.insert(knex.select().from("tableNameToSelectDataFrom")).into("tableToInsertInto");

//psudo
  // select (userid), (bag_id), itemid from items where situation = 'any' or situation = 'whatever'

  // insert into user_bags (bag_name, user_id) values (?, ?) returning bag_id






    //pg.insert(knex.select().from("tableNameToSelectDataFrom")).into("tableToInsertInto");


      // let items = db('bugout_items')
      //   .returning('item_id')
      //   .select(
      //     'id',
      //     'situation'
      //   )
      //   .where('situation', 'any')
      //   .andWhere('situation', `%${situation}%`);
      //   items.map(item => db('bag_items')
      //     .insert({
      //       user_id,
      //       bag_id,
      //       item_id: item.id
      //     }));