Meteor.methods({
  'teamCommissions.delete'(teamCommissionId) {
    TeamCommissions.remove(teamCommissionId);
  },
  'teamCommissions.add'(teamCommission) {
    TeamCommissions.insert(teamCommission);
  },
  'teamCommissions.update'(teamCommissionId, teamCommission) {
    TeamCommissions.update(teamCommissionId, {
      $set: { commission: teamCommission }
    });
  }
});
