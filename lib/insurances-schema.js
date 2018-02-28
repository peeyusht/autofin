Insurances = new Meteor.Collection( 'insurances', {
  transform: function(doc) {
    doc.teamObj = Teams.findOne(doc.team);
    doc.insuranceCompanyObj = InsuranceCompanies.findOne(doc.insuranceCompany);
    doc.insuranceCategoryObj = InsuranceCategories.findOne(doc.insuranceCategory);
    return doc;
  }
});

var Schemas = {};

Schemas.Insurance = new SimpleSchema({
  tenantId: {
    type: String,
    optional: true
  },
    coverNote: {
      type: String,
      optional: true
    },
    policyNo: {
      type: String,
      optional: true
    },
    issueDate: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
      type: String
    },
    insuranceCompany: {
      type: String
    },
    insuranceCategory: {
      type: String
    },
    product: {
      type: String
    },
    team: {
      type: String
    },
    branch: {
      type: String
    },
    customerName: {
      type: String
    },
    customerEmail: {
      type: String,
      optional: true
    },
    customerMobile: {
      type: String,
      optional: true
    },
    customerAddress: {
      type: String
    },
    vehicleMake: {
      type: String,
      optional: true
    },
    vehicleModel: {
      type: String,
      optional: true
    },
    vehicleCC: {
      type: String,
      optional: true
    },
    idv: {
      type: String
    },
    manufactureYear: {
      type: String,
      optional: true
    },
    registrationDate: {
      type: String,
      optional: true
    },
    registrationNo: {
      type: String,
      optional: true
    },
    engineNo: {
      type: String,
      optional: true
    },
    chassisNo: {
      type: String,
      optional: true
    },
    hypothication: {
      type: String,
      optional: true
    },
    rate: {
      type: String
    },
    odDiscount: {
      type: String,
      optional: true
    },
    ncbDiscount: {
      type: String,
      optional: true
    },
    cngIdv: {
      type: String,
      optional: true
    },
    antiTheft: {
      type: String,
      optional: true
    },
    totalBasicPremium: {
      type: Number,
      optional: true
    },
    zeroDep: {
      type: String,
      optional: true
    },
    consumables: {
      type: String,
      optional: true
    },
    hydrostaticLock: {
      type: String,
      optional: true
    },
    tyres: {
      type: String,
      optional: true
    },
    rti: {
      type: String,
      optional: true
    },
    totalDepCover: {
      type: Number,
      optional: true
    },
    compulsaryAdditions: {
      type: Number,
      optional: true
    },
    keyConsumablesRSA: {
      type: Number,
      optional: true
    },
    paidDriver: {
      type: Number,
      optional: true
    },
    passenger: {
      type: Number,
      optional: true
    },
    cngThirdParty: {
      type: Number,
      optional: true
    },
    ownerDriver: {
      type: Number,
      optional: true
    },
    thirdParty: {
      type: Number,
      optional: true
    },
    totalAdditions: {
      type: Number,
      optional: true
    },
    odPremium: {
      type: Number,
      optional: true
    },
    commissionPaid: {
      type: Number,
      optional: true
    },
    totalABC: {
      type: Number
//      optional: true
    },
    serviceTax: {
      type: Number
    },
    grandTotal: {
      type: Number
    },
    chequeFrom1: {
      type: String,
      optional: true
    },
    chequeNo1: {
      type: String,
      optional: true
    },
    chequeDate1: {
      type: String,
      optional: true
    },
    chequeAmount1: {
      type: Number,
      optional: true
    },
    bankNBranch1: {
      type: String,
      optional: true
    },
    chequeSource1: {
      type: String,
      optional: true
    },
    remarks1: {
      type: String,
      optional: true
    },
    chequeFrom2: {
      type: String,
      optional: true
    },
    chequeNo2: {
      type: String,
      optional: true
    },
    chequeDate2: {
      type: String,
      optional: true
    },
    chequeAmount2: {
      type: String,
      optional: true
    },
    bankNBranch2: {
      type: String,
      optional: true
    },
    chequeSource2: {
      type: String,
      optional: true
    },
    remarks2: {
      type: String,
      optional: true
    },
    chequeFrom3: {
      type: String,
      optional: true
    },
    chequeNo3: {
      type: String,
      optional: true
    },
    chequeDate3: {
      type: String,
      optional: true
    },
    chequeAmount3: {
      type: String,
      optional: true
    },
    bankNBranch3: {
      type: String,
      optional: true
    },
    chequeSource3: {
      type: String,
      optional: true
    },
    remarks3: {
      type: String,
      optional: true
    },
    finalPremium: {
      type: Number
    },
    shortPremium: {
      type: Number
    },
    prevPolicyNo: {
      type: String,
      optional: true
    },
    prevPolicyInsuranceCompany: {
      type: String,
      optional: true
    },
    prevPolicyNCBDiscount: {
      type: String,
      optional: true
    },
    prevPolicyPremiumAmount: {
      type: String,
      optional: true
    },
    status: {
      type: String
    },
    policyFile: {
      type: String,
      optional: true
    },
    createdAt: {
    type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }
    },
    updatedAt: {
      type: Date,
      autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
      denyInsert: true,
      optional: true
    }
});

Insurances.attachSchema(Schemas.Insurance);

Insurances.allow({
  insert: function (userId, doc) {
  // the user must be logged in, and the document must be owned by the user
  return (true); //userId && Meteor.users.find({_id: this.userId}, {fields: {'roles': 0}}));
  },
  update: function (userId, doc, fields, modifier) {
  // can only change your own documents
  return doc.owner === userId;
  },
  remove: function (userId, doc) {
  // can only remove your own documents
  return doc.owner === userId;
  },
  fetch: ['owner']
});
