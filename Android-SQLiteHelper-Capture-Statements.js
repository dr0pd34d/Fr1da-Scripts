Java.perform(function () {
	// Get a class handler of the SQLiteDatabase class
	// https://developer.android.com/reference/android/database/sqlite/SQLiteDatabase
	const sQLiteDatabase = Java.use('android.database.sqlite.SQLiteDatabase');
	// Overload the method "executeSql" to capture the input parameters
	sQLiteDatabase.executeSql.overload('java.lang.String','[Ljava.lang.Object;').implementation = function (query, object) {
		// Log the successful hook to fridas console
		console.log('[+] new SQLite Statement captured!');
		console.log('Query: '+ query);
		// Call the original function to keep the app working
		return this.executeSql(query, object);
	}
});