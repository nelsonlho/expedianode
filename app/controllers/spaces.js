
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Space = mongoose.model('Space')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Space.load(id, function (err, space) {
    if (err) return next(err);
    if (!space) return next(new Error('not found'));
    req.space = space;
    next();
  });
};

/**
 * List
 */

exports.index = function (req, res){
  var page = (req.params.page > 0 ? req.params.page : 1) - 1;
  var perPage = 30;
  var options = {
    perPage: perPage,
    page: page
  };

  Space.list(options, function (err, spaces) {
    if (err) return res.render('500');
    Space.count().exec(function (err, count) {
      res.render('spaces/index', {
        title: 'Spaces',
        spaces: spaces,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
};

/**
 * New space
 */

exports.new = function (req, res){
  res.render('spaces/new', {
    title: 'New Space',
    space: new Space({})
  });
};

/**
 * Create an space
 * Upload an image
 */

exports.create = function (req, res) {
  var space = new Space(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  space.user = req.user;
  space.uploadAndSave(images, function (err) {
    if (!err) {
      req.flash('success', 'Successfully created space!');
      return res.redirect('/spaces/'+space._id);
    }
    res.render('spaces/new', {
      title: 'New Space',
      space: space,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Edit an space
 */

exports.edit = function (req, res) {
  res.render('spaces/edit', {
    title: 'Edit ' + req.space.title,
    space: req.space
  });
};

/**
 * Update space
 */

exports.update = function (req, res){
  var space = req.space;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  space = extend(space, req.body);

  space.uploadAndSave(images, function (err) {
    if (!err) {
      return res.redirect('/spaces/' + space._id);
    }

    res.render('spaces/edit', {
      title: 'Edit Space',
      space: space,
      errors: utils.errors(err.errors || err)
    });
  });
};

exports.book = function(req, res){
  var space = req.space;
  var startDate = req.arrival;
  var endDate = req.departure;

  space.book.user = req.user;
  space.book.user.startDate = startDate;
  space.book.user.endDate = endDate;
  space.bookAndSave(function (err) {
    if (!err) {
      req.flash('success', 'Successfully booked space!');
      return res.redirect('/spaces/'+space._id);
    }
    res.render('spaces/new', {
      title: 'New Space',
      space: space,
      errors: utils.errors(err.errors || err)
    });
  });

};

/**
 * Show
 */

exports.show = function (req, res){
  res.render('spaces/show', {
    title: req.space.title,
    space: req.space
  });
};

/**
 * Delete an space
 */

exports.destroy = function (req, res){
  var space= req.space;
  space.remove(function (err){
    req.flash('info', 'Deleted successfully');
    res.redirect('/spaces');
  });
};


