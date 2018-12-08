Java.perform(function () {
	// Get a class handler of the StringBuilder class
	// https://docs.oracle.com/javase/10/docs/api/java/lang/StringBuilder.html
	const stringBuilder = Java.use('java.lang.StringBuilder');
	// Overload the method "toString" to capture the input parameters
	stringBuilder.toString.overload().implementation = function () {
		// Log the successful hook to fridas console
		console.log('[+] stringBuilder.toString found!');
		console.log('Content: ' + this.toString());
		// Call the original function to keep the app working
		return this.toString();
	}
});