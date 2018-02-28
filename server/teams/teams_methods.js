Meteor.methods({
  'teams.delete'(teamId) {
    Teams.remove(teamId);
  },
  'teams.add'(team) {
    var teamId = Teams.insert(team);

    addTeamCommission(teamId);

    return teamId;
  },
  'teams.update'(teamId, team) {
    Teams.update(teamId, {
      $set: { name: team.name,
              type: team.type,
              branch: team.branch,
              contact: team.contact,
              email: team.email,
              address: team.address,
              panCard: team.panCard,
              bankName: team.bankName,
              bankBranch: team.bankBranch,
              bankAccountName: team.bankAccountName,
              bankAccountNo: team.bankAccountNo,
              ifscCode: team.ifscCode
          }
    });
  },
  'teams.resetCommission' (teamId) {
    TeamCommissions.remove( {team: teamId });
    addTeamCommission( teamId );
  }
});

function addTeamCommission(teamId) {
  var insuranceCompany = InsuranceCompanies.find();
  var insuranceCategory = InsuranceCategories.find();

  insuranceCompany.forEach(function(insuranceCompany){
    insuranceCategory.forEach( function (insuranceCategory) {
      teamCommission = {
        team: teamId,
        insuranceCompany: insuranceCompany._id,
        category: insuranceCategory._id,
        commission: 0
      };

      TeamCommissions.insert(teamCommission);
    })
  })
}
