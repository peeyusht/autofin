/*UploadServer.init({
  tmpDir: '/.uploads/tmp',
  uploadDir: '/.uploads/',
  checkCreateDirectories: true,
  uploadUrl: '/.uploads/',
  // *** For renaming files on server
  getFileName: function(file, formData) {
  	return new Date().getTime() + '-' + Math.floor((Math.random() * 10000) + 1) + '-' + file.name;
  	// we get this value in the ajax response
  }
});
*/
