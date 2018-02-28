InsuranceCompanyCommissions = new Meteor.Collection( 'insurance-companies-commissions', {
  transform: function(doc) {
    doc.insuranceCompanyObj = InsuranceCompanies.findOne(doc.insuranceCompany);
    doc.categoryObj = InsuranceCategories.findOne(doc.category);
    return doc;
  }
});

var Schemas = {};

Schemas.InsuranceCompanyCommission = new SimpleSchema({
  tenantId: {
    type: String,
    optional: true
  },
    insuranceCompany: {
        type: String
    },
    category: {
      type: String
    },
    commission: {
      type: String
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

InsuranceCompanyCommissions.attachSchema(Schemas.InsuranceCompanyCommission);

InsuranceCompanyCommissions.allow({
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
