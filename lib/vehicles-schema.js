Vehicles = new Meteor.Collection( 'vehicles' );
var Schemas = {};

Schemas.Vehicle = new SimpleSchema({
  tenantId: {
    type: String,
    optional: true
  },
    brand: {
        type: String,
        label: "Brand",
        max: 200
    },
    model: {
        type: String,
        label: "Model"
    },
    cc: {
        type: Number,
        label: "CC"
    },
    cost: {
        type: Number,
        label: "Last date this book was checked out",
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

Vehicles.attachSchema(Schemas.Vehicle);

Vehicles.allow({
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
