/**
 * Created by zolarichards on 2014/07/22.
 */
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
    'models/searchTypesModel'
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
], function( u, $, _, Backbone, Handlebars, model ){
    "use strict";
    var SearchTypesCollection = Backbone.Collection.extend({
        url: uthinx.ajax.url + "/polltypes",
        model: model,
        parse: function (data) {
            var self = this;

            if (data) {
                self.add(data);
            }
            return this.models;
        }
    });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return SearchTypesCollection;
});

