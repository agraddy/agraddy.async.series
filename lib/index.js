require('setimmediate');

var mod = function(list, cb) {
	var index = 0;
	var funcs = list;
	var finish = cb;
	loop();

	function loop() {
		funcs[index].call(this, callback);

		function callback(err) {
			index++;

			if(err) {
				finish(err);
			} else {
				if(index < funcs.length) {
					setImmediate(function() {
						loop();
					});
				} else {
					setImmediate(function() {
						finish();
					});
				}
			}
		}
	}

}

module.exports = mod;
