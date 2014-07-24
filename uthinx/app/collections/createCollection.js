/**
 * Created by zolarichards on 2014/06/22.
 */
// JavaScript Document
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'models/createModel'
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
], function($, _, Backbone, Handlebars, model){
    var CreateCollection = Backbone.Collection.extend({
        //url: "",
        model: model
    });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return CreateCollection;
});

