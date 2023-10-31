// Create web server
var express = require('express');
var router = express.Router();
var db = require('../models/db');
var Comment = require('../models/comment');

// GET /comments
// Get all comments
router.get('/', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) {
            return next(err);
        }
        res.json(comments);
    });
});

// POST /comments
// Create a comment
router.post('/', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }
        res.status(201).json(comment);
    });
});

// GET /comments/:id
// Get a comment
router.get('/:id', function(req, res, next) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            return next(err);
        }
        res.json(comment);
    });
});

// PUT /comments/:id
// Update a comment
router.put('/:id', function(req, res, next) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            return next(err);
        }
        comment.text = req.body.text;
        comment.save(function(err) {
            if (err) {
                return next(err);
            }
            res.json(comment);
        });
    });
});

// DELETE /comments/:id
// Delete a comment
router.delete('/:id', function(req, res, next) {
    Comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) {
            return next(err);
        }
        res.json(comment);
    });
});

module.exports = router;