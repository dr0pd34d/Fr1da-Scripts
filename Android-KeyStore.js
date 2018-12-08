Java.perform(function () {
	// Get a class handler of the KeyStore class
	// https://docs.oracle.com/javase/9/docs/api/java/security/KeyStore.html
	const keyStore = Java.use('java.security.KeyStore');
	// Overload the method "getKey" to capture the input parameters
	keyStore.getKey.overload('java.lang.String','[C').implementation = function (alias, pass) {
		// Log the successful hook to fridas console
		console.log('[+] new getKey operation found!');
		console.log('Password: ' + pass.join(""));
		// Call the original function to keep the app working
		return this.getKey(alias, pass);
	}
	keyStore.getInstance.overload('java.lang.String').implementation = function (s) {
		// Log the successful hook to fridas console
		console.log('[+] new keyStore.getInstance operation found!');
		console.log('Content: ' + s);
		// Call the original function to keep the app working
		return this.getInstance(s);
	}
	keyStore.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (s,p) {
		// Log the successful hook to fridas console
		console.log('[+] new keyStore.getInstance operation found!');
		console.log('Content: ' + s);
		// Call the original function to keep the app working
		return this.getInstance(s,p);
	}
	keyStore.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (s,s2) {
		// Log the successful hook to fridas console
		console.log('[+] new keyStore.getInstance operation found!');
		console.log('Content: ' + s);
		console.log('Content2: ' + s2);
		// Call the original function to keep the app working
		return this.getInstance(s,s2);
	}
	
	keyStore.$init.overload('java.security.KeyStoreSpi', 'java.security.Provider', 'java.lang.String').implementation = function (keyStoreSpi, securityProvider, s) {
		// Log the successful hook to fridas console
		console.log('[+] new keyStore.$init operation found!');
		// Call the original function to keep the app working
		return this.$init(keyStoreSpi, securityProvider, s);
	}
	
	keyStore.store.overload('java.io.OutputStream','[C').implementation = function (outputStream, pass) {
		// Log the successful hook to fridas console
		console.log('[+] new keyStore.store operation found!');
		console.log('Password: ' + pass.join(""));
		// Call the original function to keep the app working
		return this.store(outputStream, pass);
	}
	keyStore.load.overload('java.io.InputStream','[C').implementation = function (inputStream, pass) {
		// Log the successful hook to fridas console
		console.log('[+] new keyStore.load operation found!');
		if(pass != null)
		{
			console.log('Password Length: ' + pass.length());
			console.log('Password: ' + pass.join(""));
		}
		// Call the original function to keep the app working
		return this.load(inputStream, pass);
	}
});