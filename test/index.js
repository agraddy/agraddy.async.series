process.chdir('test');
var tap = require('agraddy.test.tap')(__filename);

var mod = require('../');

start();

function start() {
	var list = [];
	mod([
		function(cb) {
			list.push(1);
			cb();
		},
		function(cb) {
			list.push(2);
			cb();
		},
		function(cb) {
			list.push(3);
			cb();
		}
	], function(err) {
		tap.assert.deepEqual(list, [1,2,3], 'Should be equal.');
		endEarly();
	});
}

function endEarly() {
	var list = [];
	mod([
		function(cb) {
			list.push(1);
			cb();
		},
		function(cb) {
			list.push(2);
			cb(new Error('End early'), 'one', 'two');
		},
		function(cb) {
			list.push(3);
			cb();
		}
	], function(err) {
		tap.assert.equal(err.message, 'End early', 'An error should short circuit.');
		tap.assert.deepEqual(list, [1,2], 'Should be equal.');
		async();
	});
}


function async() {
	var i;
	var list = [];
	var func = function(cb) { cb() };
	var order;
	for(i = 0; i < 100; i++) {
		list.push(func);
	}

	order = 'before';
	mod(list, function(err) {
		tap.assert.equal(order, 'after', 'Make sure it is actually async.');
		end();
	});
	order = 'after';
}

function end() {
}



