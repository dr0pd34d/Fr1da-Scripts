Java.perform(function () {
	// Get a class handler of the Base64 class
	// https://developer.android.com/reference/android/util/Base64
	const base64 = Java.use('android.util.Base64');
	// Overload the method "encodeToString" to capture the input parameters
	base64.encodeToString.overload('[B','int').implementation = function (input, flags) {
		// Log the successful hook to fridas console
		console.log('[+] new Base64 operation found!');
		// Log the Base64 input to the console after converting it to a string
		console.log('Content: '+stringFromUTF8Array(input));
		// Call the original function to keep the app working
		return this.encodeToString(input, flags);
	}
});

function stringFromUTF8Array(data)
{
	const extraByteMap = [ 1, 1, 1, 1, 2, 2, 3, 0 ];
	var count = data.length;
	var str = "";
	for (var index = 0;index < count;)
	{
	  var ch = data[index++];
	  if (ch & 0x80)
	  {
		var extra = extraByteMap[(ch >> 3) & 0x07];
		if (!(ch & 0x40) || !extra || ((index + extra) > count))
		  return null;	
		ch = ch & (0x3F >> extra);
		for (;extra > 0;extra -= 1)
		{
		  var chx = data[index++];
		  if ((chx & 0xC0) != 0x80)
			return null;
		  
		  ch = (ch << 6) | (chx & 0x3F);
		}
	  }
	  str += String.fromCharCode(ch);
	}
	return str;
}
