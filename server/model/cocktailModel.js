'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cocktail Schema
 */
var cocktailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    spirit: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    glass: {
        type: String,
        required: true
    }
});

mongoose.model('cocktails', cocktailSchema)
