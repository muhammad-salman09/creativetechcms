var Setting = require('../models/settings');

// Posts API
module.exports = function(apiRouter){
	
	// get all posts
	apiRouter.get('/settings', function(req, res){
        Setting.find({}, function(err, data){
			if (err) res.send(err);

			res.json(data);
		});
	});

	// add a post
	apiRouter.post('/settings', function(req, res){
		//console.log(req);
		var post = new Setting();
		post.maintenance = req.body.maintenance;
        id_exists = req.body._id;
		//post.body = req.body.body;

        Setting.findById(id_exists, function (err, doc){
            doc.maintenance = req.body.maintenance;
            doc.save().then(function (doc) {
                res.send(doc);
            },function (err) {
                res.send(err);
            });

        });

		/*post.save(function(err, post){
			if(err) res.send(err);

			res.json(post);
		})*/
	});

	// get a single post
	apiRouter.get('/settings/:id', function(req, res){
        Setting.findById(req.params.id, function(err, post){
			if (err) res.send(err);

			res.json(post);
		});
	});

	// update a post
	apiRouter.put('/settings/:id', function(req, res){
        Setting.findById(req.params.id, function(err, post){
			if(err) res.send(err);

			post.title = req.body.title;
			post.body = req.body.body;

			post.save(function(err){
				if(err) res.send(err);

				res.json({ message: 'Post updated!' });
			})
		});
	});

	// delete a post
	apiRouter.delete('/settings/:id', function(req, res){
        Setting.remove({
			_id: req.params.id
		}, function(err, post){
			if(err) res.send(err);

			res.json({ message: 'Post deleted!' });
		})
	});
};