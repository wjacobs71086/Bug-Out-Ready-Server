
const ItemsService = {
  getAllItems(db) {
    return db
      .from('bugout_items AS itm')
      .select('*');
  },

  getById(db, id) {
    return ItemsService.getAllItems(db)
      .where('itm.id', id)
      .first();
  },
  createNewBagItem(db, item_name, url, img, description, est_cost){
    return db('bugout_items')
      .insert({
        item_name,
        url,
        img,
        description,
        situation: null,
        est_cost
      })
      .returning('id').then(rows => rows[0]);
  },
};

module.exports = ItemsService;
