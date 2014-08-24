/**
 * Created by zolarichards on 2014/06/22.
 */
// JavaScript Document
define([
    'uthinx',
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'models/pollModel'
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
], function( u, $, _, Backbone, Handlebars, model ){
    var PollCollection = Backbone.Collection.extend({
        url: uthinx.ajax.url + "/poll",
        model: model
    });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return PollCollection;
});

