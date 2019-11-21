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
      return db('user_bags')
        .returning('bag_id', 'user_id')
        .insert({
          bag_name: bag_name,
          user_id: user_id
        });
    },
    getSituationItems(db, situation){
        return db.select('id')
        .from('bugout_items')
        .whereRaw('situation = ?', [situation])
        .orWhere('situation', 'any')
        .returning('id');
    },
    insertSituationItems(db,item_ids, user_id, bag_id){
      console.log('item_id in insert function',item_ids);
      console.log('bag_id',bag_id);
      console.log('user_id in insert function',user_id);
      // item_ids.map(item =>
      //     db('bag_items')
      //   .insert({
      //     item_id: item.id,
      //     bag_id: bag_id,
      //     user_id: user_id
      //   }));
    },
  };
  
  module.exports = BagsService;


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




              // .then(function(rows) {
        //   return db.insert({item_id:`${id}`, user_id: `${user_id}`, bag_id: `${bag_id}`}, 'id').into('bag_items');
        // })
        // .then(function(id) {
        //   console.log('Inserted item with ' + id);
        // })
        // .catch(function(error) { console.error(error); });




      // return db.insert(
      //   db.select('user_id, bag_id, item_id')
      //     .from('bugout_items')
      //     .where('situation', 'any')
      //     .orWhere('situation', `%${situation}%`),
      //     bag_id,
      //     user_id
      //   )
      //   .into('bag_items');