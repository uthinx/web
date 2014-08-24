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
    var MMenuModel = Backbone.Model.extend({
        defaults: {
            alerts : [],
            circles : [],
            friends : []
        },
        initialize : function () {
            console.log("MMenuModel.initialize");
        }
    });
    //
    return MMenuModel;
});

