Meteor.methods({
  'insuranceCompanies.delete'(insuranceCompanyId) {
    InsuranceCompanies.remove(insuranceCompanyId);
  },
  'insuranceCompanies.add'(insuranceCompany) {
    var insuranceCompanyId = InsuranceCompanies.insert( insuranceCompany );

    addInsuranceCompanyCommission( insuranceCompanyId );
  },
  'insuranceCompanies.update'(insuranceCompanyId, insuranceCompany) {
    InsuranceCompanies.update(insuranceCompanyId, {
      $set: { name: insuranceCompany.name,
              address: insuranceCompany.address
            }
    });
  },
  'insuranceCompanies.resetCommission' (insuranceCompanyId) {
    InsuranceCompanyCommissions.remove( {insuranceCompany: insuranceCompanyId });
    addInsuranceCompanyCommission( insuranceCompanyId );
  },
  'insuranceCompanyCommissions.update'(insuranceCompanyCommissionId, insuranceCompanyCommission) {
    InsuranceCompanyCommissions.update(insuranceCompanyCommissionId, {
      $set: { commission: insuranceCompanyCommission }
    });
  }
});


function addInsuranceCompanyCommission( insuranceCompanyId ) {

//*****Add Insurance Category to each Insurance Company*****//

//  var insuranceCompany = InsuranceCompanies.find();
  var insuranceCategory = InsuranceCategories.find();

//  insuranceCompany.forEach(function ( insuranceCompany ) {
    insuranceCategory.forEach( function (insuranceCategory) {

//      console.log("Insurance Company ID: ", insuranceCompanyId, team, insuranceCategory);

      insuranceCompanyCommission = {
//        team: team._id,
        insuranceCompany: insuranceCompanyId,
        category: insuranceCategory._id,
        commission: 0
      };

      InsuranceCompanyCommissions.insert(insuranceCompanyCommission);
    })
//  })


//*****Add Insurance Company to each Team for Commission*****//
//Add Insurance Category to each Insurance Company for every team
var team = Teams.find();
var insuranceCompany = InsuranceCompanies.find();

team.forEach(function(team){
  insuranceCategory.forEach( function (insuranceCategory) {
    teamCommission = {
      team: team._id,
      insuranceCompany: insuranceCompanyId,
      category: insuranceCategory._id,
      commission: 0
    };

    TeamCommissions.insert(teamCommission);
  })
})

}
