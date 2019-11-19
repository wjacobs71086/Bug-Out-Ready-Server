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
  };
  
  module.exports = BagsService;