Java.perform(function () {
	// Get a class handler of the SecretKeySpec class
	// https://developer.android.com/reference/javax/crypto/spec/SecretKeySpec
    var SecretKeySpec = Java.use('javax.crypto.spec.SecretKeySpec');
	// Overload the method "$init" to capture the input parameters
    SecretKeySpec.$init.overload('[B', 'java.lang.String').implementation = function(bytes, keyspec) {
        // Log the successful hook to fridas console
		console.log('SecretKeySpec.$init("' + bytes2hex(bytes) + '", "' + keyspec + '")');
        // Call the original function to keep the app working
		return this.$init(bytes, keyspec);
    };
});

// This function converts the byte array to a hex array
function bytes2hex(array) {
    var result = '';
    console.log('len = ' + array.length);
    for(var i = 0; i < array.length; ++i)
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    return result;
}

// This function can be used inside Java.perform to enumerate strings being used as keys
// WARNING: Non printable characters may crash the frida server
function hex2ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
