CoverNotes = new Meteor.Collection( 'cover-notes' );
var Schemas = {};

Schemas.CoverNote= new SimpleSchema({
  tenantId: {
    type: String,
    optional: true
  },
    insuranceCompany: {
      type: String,
      label: "Insurance Company"
    },
    startNo: {
      type: Number,
      label: "Start No."
    },
    endNo: {
      type: Number,
      label: "End No."
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

CoverNotes.attachSchema(Schemas.CoverNote);

CoverNotes.allow({
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
