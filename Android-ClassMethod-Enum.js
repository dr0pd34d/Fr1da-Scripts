/*
 * Original filename: raptor_frida_android_enum.js
 * Copyright (c) 2017 Marco Ivaldi <raptor@0xdeadbeef.info>
 *
 * Example usage:
 * # frida -U -f com.target.app -l raptor_frida_android_enum.js --no-pause
 */

// Enumerate all Java classes
function enumAllClasses()
{
	var allClasses = [];
	// Enumerate all currently loaded classes
	var classes = Java.enumerateLoadedClassesSync();
	// Iterate over each loaded class
	classes.forEach(function(aClass) {
		try {
			var className = aClass.match(/[L](.*);/)[1].replace(/\//g, ".");
		}
		catch(err) {
			// Avoid TypeError: cannot read property 1 of null
		} 
		// Add class name to array
		allClasses.push(className);
	});
	// Return the array containing all class names
	return allClasses;
}

// Find all Java classes that match a pattern
function findClasses(pattern)
{
	// Enumerate all classes
	var allClasses = enumAllClasses();
	var foundClasses = [];

	// Iterate over each loaded class
	allClasses.forEach(function(aClass) {
		try {
			if (aClass.match(pattern)) {
				// Matching class name found and 
				foundClasses.push(aClass);
			}
		}
		catch(err) {
			// Avoid TypeError: cannot read property 'match' of undefined
		} 
	});
	// Return the array containing all matching class names
	return foundClasses;
}

// Enumerate all methods declared in a Java class
function enumMethods(targetClass)
{
	// Get a class handler of the target class
	var hook = Java.use(targetClass);
	// Get all methods exposed inside the class
	var ownMethods = hook.class.getDeclaredMethods();
	hook.$dispose;
	// Return the enumerated methods
	return ownMethods;
}

// avoid java.lang.ClassNotFoundException
setTimeout(function() { 
	Java.perform(function() {
		// enumerate all classes
		/*var a = enumAllClasses();
		a.forEach(function(s) { 
			console.log(s); 
		});*/
		

		// find classes that match a pattern
		/*var a = findClasses(/dbrunner/i);
		a.forEach(function(s) { 
			console.log(s); 
		});*/
		

		// enumerate all methods in a class
		/*var a = enumMethods("android.util.Base64")
		a.forEach(function(s) { 
			console.log(s); 
		});*/
	});
}, 0);
