
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
};

module.exports = ItemsService;
