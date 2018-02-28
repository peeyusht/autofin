Logs = new Meteor.Collection( 'logs' );
var Schemas = {};

Schemas.Log = new SimpleSchema({
  userId: {
    type: String
  },
  userName: {
    type: String
  },
  module: {
    type: String
  },
  subModule: {
    type: String
  },
  status: {
    type: String
  },
  status: {
    type: String
  },
  remarks: {
    type: String,
    optional: true
  },
  referenceId: {
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

Logs.attachSchema(Schemas.Log);

Logs.allow({
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
