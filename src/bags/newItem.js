//------ This is under construction to bring the feature of adding custom items. This was not a feature originally intended but will be added soon.


// .post(requireAuth, (req, res, next) => {
//     const user_id = req.user.id;
//     console.log(req.user);
//     BagsService.createNewBagItem(
//       req.app.get('db'),
//       req.body.item_name,
//       req.body.url,
//       req.body.img,
//       req.body.description,
//       req.body.est_cost
//     )
//     .then(item => {
//       BagsService.insertSituationItems(
//         req.app.get('db'),
//         item.id,
//         user_id,
//         item.bag_id
//       );
//   });
//   })