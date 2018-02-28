Meteor.methods({
  'customers.delete'(customerId) {
    Customers.remove(customerId);
  },
  'customers.add'(customer) {
    Customers.insert({
      name: customer.name,
      address: customer.address,
      mobile: customer.mobile,
      email: customer.email
    });
  },
  'customers.update'(customerId, customer) {
    Customers.update(customerId, {
      $set: { name: customer.name,
              address: customer.address,
              mobile: customer.mobile,
              email: customer.email
          }
        });
  }
});
