Meteor.methods({
  'products.delete'(productId) {
    Products.remove(productId);
  },
  'products.add'(product) {
    Products.insert({
      name: product.name
    });
  },
  'products.update'(productId, product) {
    Products.update(productId, {
      $set: { name: product.name
          }
        });
  }
});
