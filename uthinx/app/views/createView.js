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
    'collections/createCollection'
], function($, Charts, Swiper, Backbone, _, Handlebars, CreateCollection){
    "use strict";
    var uthinx = window.uthinx || {},
        templates = window.uthinx.templates || {},
        CreateView = Backbone.View.extend({
            initialize: function(){
                _.bindAll(this);
            },
            el: "#uthinx-create",
            header : "#uthinx-search-header",
            swiper: "#uthinx-search-swiper-container",
            events:{
                "click a.close-btn" : "_closeSearchPage"
            },
            render: function () {
                console.log("create renderer CALLED");
                var self = this,
                    params = "",
                    opts = {
                        params: params,
                        before: "",
                        complete: "",
                        success: "",
                        hack: self.forceRender,
                        template: templates["app/templates/createTemplate.hbs"],
                        el: self.el,
                        collection: self.collection
                    };

                $(self.el).addClass("open-page");

                self.collection = new CreateCollection();
                opts.collection = self.collection;
                self.collection.fetch(self._getFetch(opts));
                return self;
            },
            _closeSearchPage : function _closeSearchPage(e) {
                var self = this;

                $(self.el).removeClass("open-page");
                self.routeChanger("entity");
                e.preventDefault();
            },
            _getFetch: function _getFetch(opts) {
                return {
                    data: opts.params,
                    url: "/",
                    add: false,
                    type: "GET",
                    postData: true,
                    beforeSend: function () {
                        uthinx.ajax.beforeHandler(opts);
                    },
                    complete: function (data, response) {
                        uthinx.ajax.completeHandler(data, response, opts);
                    },
                    success: function (data, response) {
                        uthinx.ajax.successHandler(data, response, opts);
                    },
                    error: function (data, response) {
                        uthinx.ajax.errorHandler(data, response, opts, true);
                    },
                    failure: function (data, response) {
                        uthinx.ajax.errorHandler(data, response, opts);
                    }
                };
            },
            forceRender: function (opts) {
                var self = this;
                console.log(opts);
                $(opts.el).html(opts.template(opts.collection.toJSON()));
                self._setCreateSwiper();
                self._setPageNano();
            },
            _setCreateSwiper: function _setProfilePage() {
                var self = this,
                    params = {
                        loop: false, //Switch to vertical mode
                        speed: 500, //Set animation duration to 500ms
                        freeMode: false, //Enable free mode
                        slidesPerView: 1,
                        mode: 'horizontal',
                        freeModeFluid: false, //Enable 'fluid' free mode,
                        createPagination: true,
                        slidesPerViewFit: true,
                        releaseFormElements: true,
                        pagination: "#uthinx-create-swiper-pagination",
                        onTouchStart: function (e) {
                            console.log("onTouchStart");
                        },
                        onSlideChangeEnd: function (e) {
                            console.log("onSlideChangeEnd");
                        },
                        onSlideChangeStart: function (e) {
                            console.log("onSlideChangeStart");
                        }
                    };

                self.swiper = new Swiper('#uthinx-create-swiper', params);

                return false;
            },
            _setPageNano : function _setPageNano () {
                var self = this,
                    $scroll = $(self.el).find(".uthinx-nano");
                console.log("self.el: " + (typeof self.el));
                console.log(self.el);
                console.log("forceRender->> Create");
                console.log($scroll);
                console.log("nanoScroller: " + (typeof $.fn.nanoScroller));
                $scroll.nanoScroller();
            }
        });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return new CreateView();
});



