/**
 * Created by zolarichards on 2014/06/22.
 */
/*jslint nomen: true  */
/*global define: false, window: false, console: false, house: false, locationSetting: false,
 $$: false, document: false, undefined: false, typeof: false, parseInt: false, undefined: false,
 null: false, navigator: false, google: false, house: false
 */
// JavaScript Document
define([
    'jquery',
    'charts',
    'swiper',
    'backbone',
    'underscore',
    'handlebars',
    'collections/mmenuCollection'
], function ($, Charts, Swiper, Backbone, _, Handlebars, MMenuCollection) {
    "use strict";
    var uthinx = window.uthinx || {},
        templates = window.uthinx.templates || {},
        MMenuView = Backbone.View.extend({
            initialize: function () {
                _.bindAll(this);
            },
            el: "#uthinx-mmenu",
            events: {
                "click #facebook-logout-mmenu": "_facebookLogout"
            },
            render: function () {

                var self = this,
                    opts = {
                        el: self.el,
                        params: "",
                        before: "",
                        complete: "",
                        success: self.successMMenu,
                        hack: self.forceRender,
                        template: templates["app/templates/mmenuTemplate.hbs"],
                        collection: self.collection
                    };

                self.collection = new MMenuCollection();
                opts.collection = self.collection;

                self.collection.fetch(self._getFetch(opts));
                return self;
            },
            _getFetch: function _getFetch(opts) {
                return {
                    data: opts.params,
                    url: "/",
                    add: false,
                    type: "GET",
                    postData: true,
                    beforeSend: function () {
                        console.log("uthinx beforeSend");
                        uthinx.ajax.beforeHandler(opts);
                    },
                    complete: function (data, response) {
                        console.log("uthinx complete");
                        uthinx.ajax.completeHandler(data, response, opts);
                    },
                    success: function (data, response) {
                        console.log("uthinx success");
                        uthinx.ajax.successHandler(data, response, opts);
                    },
                    error: function (data, response) {
                        console.log("uthinx error");
                        uthinx.ajax.errorHandler(data, response, opts, true);
                    },
                    failure: function (data, response) {
                        console.log("uthinx failure");
                        uthinx.ajax.errorHandler(data, response, opts);
                    }
                };
            },
            successMMenu: function successMMenu(data, response, opts) {
                var self = this;
            },
            forceRender: function (opts) {

                $(opts.el).html(opts.template(opts.collection.toJSON()));

                var self = this,
                    $scroll = $(self.el).find(".uthinx-nano");

                $scroll.nanoScroller();


                var data = [
                    {
                        value: 300,
                        color: "#F7464A",
                        highlight: "#FF5A5E",
                        label: "Red"
                    },
                    {
                        value: 50,
                        color: "#46BFBD",
                        highlight: "#5AD3D1",
                        label: "Green"
                    },
                    {
                        value: 100,
                        color: "#FDB45C",
                        highlight: "#FFC870",
                        label: "Yellow"
                    }
                ];
                var options = {
                    segmentShowStroke: true,
                    segmentStrokeColor: "rgba(255, 255, 255, 0.0)",
                    segmentStrokeWidth: 1,
                    percentageInnerCutout: 50, // This is 0 for Pie charts
                    animationSteps: 100,
                    animationEasing: "easeOutBounce",
                    animateRotate: true,
                    animateScale: false,
                    legendTemplate: ""
                };

                var ctx = document.getElementById("myChart").getContext("2d");
                var myDoughnutChart = new Chart(ctx).Doughnut(data, options);

            },
            _facebookLogout : function _facebookLogout(e){
                var $access = $("#uthinx-access"),
                    page = document.getElementById("uthinx-profile");
                console.log("_facebookLogout CALLBACK");

                uthinx.facebook.logout(function(){
                    (page.classList.contains("open-mmenu")) ? page.classList.remove("open-mmenu") : page.classList.add("open-mmenu");
                    $access.show();
                    //self.routeChanger("/");
                });

                e.preventDefault();
            }
        });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return new MMenuView();
});



