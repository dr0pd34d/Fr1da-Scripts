Java.perform(function () {
	// Get a class handler of the File class
	// https://docs.oracle.com/javase/9/docs/api/java/io/File.html
	const file = Java.use('java.io.File');
	// Overload the constructor "File" to capture the input parameters
	file.$init.overload('java.lang.String').implementation = function (filename) {
		// Log the successful hook to fridas console
		console.log('[+] new file access operation found!');
		// Log the file path to the console
		console.log('Path: ' + filename);
		// Call the original function to keep the app working
		return this.$init(filename);
	}
});