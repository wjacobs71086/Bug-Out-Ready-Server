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
  getUserBags(db, user_id) {
    return db
      .from('user_bags AS bags')
      .where('user_id', user_id);
  },
  createNewBag(db, bag_name, user_id) {
    return db('user_bags')
      .insert({
        bag_name: bag_name,
        user_id: user_id
      })
      .returning('bag_id').then(rows => rows[0]);
  },
  getSituationItems(db, situation) {
    console.log('situation is entered in as', situation,'with type of', typeof situation);
    return db.select('id')
      .from('bugout_items')
      .whereRaw('situation = ?', [situation])
      .orWhere('situation', 'any')
      .returning('id');
  },
  insertSituationItems(db, item_id, user_id, bag_id) {
    //console.log('inside the insert situation items function');
    return db('bag_items')
      .insert({
        user_id,
        bag_id,
        item_id
      });
  },
  deleteBag(db,id){
    return BagsService.getById(db, id)
      .delete();
  }
};

module.exports = BagsService;
