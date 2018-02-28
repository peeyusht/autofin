Teams = new Meteor.Collection( 'teams', {
  transform: function(doc) {
    doc.branchObj = Branches.findOne(doc.branch);
    return doc;
  }
});

var Schemas = {};

Schemas.Team = new SimpleSchema({
  tenantId: {
    type: String,
    optional: true
  },
    name: {
      type: String
    },
    type: {
      type: String
    },
    branch: {
      type: String,
    },
    contact: {
      type: Number
    },
    email: {
      type: String,
      optional: true
    },
    address: {
      type: String
    },
    panCard: {
      type: String,
      optional: true
    },
    bankName: {
      type: String,
      optional: true
    },
    bankBranch: {
      type: String,
      optional: true
    },
    bankAccountName: {
      type: String,
      optional: true
    },
    bankAccountNo: {
      type: String,
      optional: true
    },
    ifscCode: {
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

Teams.attachSchema(Schemas.Team);

Teams.allow({
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
