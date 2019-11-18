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
          
        )
    },

  };
  
  module.exports = BagsService;

  // select bag_id, item_id, item_name from bag_items JOIN  bugout_items ON item_id = bugout_items.id where bag_id = 2;