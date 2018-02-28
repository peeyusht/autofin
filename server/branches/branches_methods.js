Meteor.methods({
  'branches.delete'(branchId) {
    Branches.remove(branchId);
  },
  'branches.add'(branch) {
    Branches.insert({
      name: branch.name,
      address: branch.address
    });
  },
  'branches.update'(branchId, branch) {
    Branches.update(branchId, {
      $set: { name: branch.name,
              address: branch.address
          }
        });
  }
});
