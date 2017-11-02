var express = require('express'),
	path = require('path'),
    formidable = require('formidable'),
	fs = require('fs'),
	User = require('./models/user'),
    Settings = require('./models/settings'),
	rootPath = path.normalize(__dirname + '/../'),
	apiRouter = express.Router(),
	router = express.Router();

module.exports = function(app, passport){	
	app.use('/api', apiRouter);
	app.use('/', router);

	// API routes
	require('./api/posts')(apiRouter);
    require('./api/settings')(apiRouter);

	// home route
	router.get('/', function(req, res) {
		res.render('index');
	});

	// admin route
	router.get('/admin', function(req, res) {
		if(req.isAuthenticated()){
            res.render('admin/dashboard', {user: req.user});
		}else{
            res.render('admin/login');
		}

	});

	router.get('/admin/register', function(req, res) {
        if(req.isAuthenticated()){
            res.render('admin/dashboard', {user: req.user});
        }else {
            res.render('admin/register');
        }
	});


	router.post('/register', function(req, res){

		// passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
		User.register(new User({
			email: req.body.email
		}), req.body.password, function(err, user) {
	        if (err) {
	            console.error(err);
	            return;
	        }

	        // log the user in after it is created
	        passport.authenticate('local')(req, res, function(){
	        	console.log('authenticated by passport');
	        	res.redirect('/admin');
	        });
	    });
	});

    router.post('/admin/upload', function(req, res){
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, '../public/media');
        form.parse(req, function(err, fields, files) {
            //console.log('parse');
            //console.log(files);
        });
        form.on('file', function(field, file) {
            var setting = new Settings();
            var id_exists = null;

            /*Settings.findOne({ logo: { $exists : true }}, function (err, doc){
                //console.log(doc._id);
				if(!err){
                    id_exists = doc._id;

                    fs.renameSync(file.path, path.join(form.uploadDir, file.name));
                    var Image = path.join('/media', file.name);

                    Settings.findById(id_exists, function (err, doc){

                        doc.logo = Image;
                        doc.save();
                    });
				}else {
                    fs.renameSync(file.path, path.join(form.uploadDir, file.name));
                    var Image = path.join('/media', file.name);
                    setting.logo = Image;
                    setting.save(function(err, post){
                        if(err) res.send(err);
                        res.json(post);
                    });
				}
            });*/

            Settings.findOne( {logo : { $exists : true } }).then(function(doc) {
                //console.log('doc');
                if(!doc){
                    //console.log('no data found, so insert new data.');
                    fs.renameSync(file.path, path.join(form.uploadDir, file.name));
                    var Image = path.join('/media', file.name);
                    setting.logo = Image;
                    setting.save(function(err, post){
                        if(err) res.send(err);
                        res.send(post);
                    });
				}else{
                    //console.log('logo data found, so update data.');
                    id_exists = doc._id;

                    fs.renameSync(file.path, path.join(form.uploadDir, file.name));
                    var Image = path.join('/media', file.name);

                    Settings.findById(id_exists, function (err, doc){
                        doc.logo = Image;
                        doc.save().then(function (doc) {
                            res.send(doc);
                        },function (err) {
                            res.send(err);
                        });

                    });
				}

			}, function(err) {
                res.send(err);
			});



        });
        //res.end();
    });


    router.post('/login', passport.authenticate('local'), function(req, res){
		res.redirect('/admin');
	});

    router.get('/admin/logout', isAdmin, function(req, res){
        req.logout();
        //res.send(401);
        res.redirect('/admin');
    });

	app.use(function(req, res, next){
		res.status(404);

		res.render('404');
		return;
	});
	
};

function isAdmin(req, res, next){
	if(req.isAuthenticated() && req.user.email === 'fahadali916@gmail.com'){
		//console.log('cool you are an admin, carry on your way');
		next();
	} else {
		//console.log('You are not an admin');
		res.redirect('/admin');
	}
}
