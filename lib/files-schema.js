/*var fileStore = new FS.Store.GridFS("files");

Files = new FS.Collection("files", {
 stores: [fileStore]
});
*/

Files = new FS.Collection("files", {
  stores: [new FS.Store.FileSystem("files")]
});
