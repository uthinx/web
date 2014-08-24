/**
 * Created by zolarichards on 2014/06/22.
 */
// JavaScript Document
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone){
    "use strict";
    var CreateModel = Backbone.Model.extend({
        defaults: {
            id : 0
        }
    });
    //
    return CreateModel;
});

