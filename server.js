var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended' : 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));
app.use(methodOverride());


// define model ===============

var WeekMenu = mongoose.model('WeekMenu', {
	startDate: Date,
	endDate: Date,
});

// end of define model

// routes ==============

// API =================

app.get('/api/weekmenus', function(req, res){
	WeekMenu.find(function(err, weekMenus) {
		if (err) {
			res.send(err);
		} else {
			res.json(weekMenus);
		}
	})
})

app.post('/api/weekmenus', function(req, res){
	WeekMenu.create({
		startDate : new Date(),
		endDate : new Date()
	}, function(err, weekMenus) {
		if (err) {
			res.send(err);
		} else {
			WeekMenu.find(function(err, weekMenus) {
				if (err) {
					res.send(err);
				} else {
					res.json(weekMenus);
				}
			});
		};
	});
});

app.delete('/api/weekmenus/:weekmenu_id', function(req, res) {
	WeekMenu.remove({
		_id : req.params.weekmenu_id 
	}, function(err, weekMenu) {
		if (err)
			res.send(err);

		WeekMenu.find(function(err, weekmenus){
			if (err)
				res.send(err);
			res.json(weekmenus);
		});
	});
});

// end of API

// application routes

app.get('*', function(req, res){
	res.sendFile('./public/index.html');
});

// end of application routes

// end of routes

app.listen(8080);
console.log("App listening on port 8080");