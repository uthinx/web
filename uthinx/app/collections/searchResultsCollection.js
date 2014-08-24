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
    'models/searchResultsModel'
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
], function( u, $, _, Backbone, Handlebars, model ){
    "use strict";
    var SearchResultsCollection = Backbone.Collection.extend({
        url: uthinx.ajax.url + "/polls",
        model: model,
        parse: function (data) {
            var self = this;
            console.log("SearchResultsCollection.parse");
            console.log("data: " + JSON.stringify(data));
            if (data) {
                self.add(data);
            }
            return this.models;
        }
    });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return SearchResultsCollection;
});

