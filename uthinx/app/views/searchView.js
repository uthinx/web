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
    'collections/searchTypesCollection',
    'collections/searchResultsCollection'
], function ($, Charts, Swiper, Backbone, _, Handlebars, SearchTypesCollection, SearchResultsCollection) {
    "use strict";
    var uthinx = window.uthinx || {},
        templates = window.uthinx.templates || {},
        SearchView = Backbone.View.extend({
            initialize: function () {
                _.bindAll(this);
            },
            el: "#uthinx-search",
            ell: "uthinx-search-main",
            elll: "uthinx-search-swiper",
            collectionII: "",
            scroller: "#uthinx-search .uthinx-nana-scroll",
            events: {
                "click a.close-btn": "_closeSearchPage"
            },
            render: function () {
                console.log("search renderer CALLED");
                var self = this;

                $(self.el).addClass("open-page");

                self._searchShellRender();
                self._searchTypesRender();
                return self;
            },
            _closeSearchPage: function _closeSearchPage(e) {
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
            _searchShellRender: function () {
                var self = this;
                $(self.el).html(templates["app/templates/searchTemplate.hbs"]);
                self._setSearchSwiper();
                self._setPageNano();
            },
            _searchTypesRender: function () {
                var self = this,
                    entity = uthinx.utils.getEntity(),
                    url = uthinx.ajax.url + "polltypes/",
                    params = { entity : (entity.id) ? entity.id : 0 },
                    opts = {
                        url : url,
                        el: self.ell,
                        type: "GET",
                        params: params,
                        before: "",
                        complete: function () {  self._searchTypesCompleteCallback(); } ,
                        success: "",
                        template: templates["app/templates/searchTypesTemplate.hbs"],

                        collection: self.collection
                    };

                self.collection = new SearchTypesCollection();
                opts.collection = self.collection;
                self.collection.fetch(self._getFetch(opts));
            },
            _searchTypesCompleteCallback : function () {
                var self = this;
                self._searchResultsRender();

            },
            _searchResultsRender: function (id) {
                var self = this,
                    entity = uthinx.utils.getEntity(),
                    url = uthinx.ajax.url + "polls/" + id,
                    params = { entity : (entity.id) ? entity.id : 0 },
                    opts = {
                        url : url,
                        el: self.elll,
                        type: "GET",
                        params: params,
                        before: "",
                        complete: "",
                        success: "",
                        collection: self.collectionII,
                        template: templates["app/templates/searchResultsTemplate.hbs"]
                    };

                self.collectionII = new SearchResultsCollection();
                opts.collection = self.collectionII;
                self.collection.fetch(self._getFetch(opts));
            },
            _setSearchSwiper: function setProfilePage() {
                var self = this,
                    params = {
                        loop: true, //Switch to vertical mode
                        speed: 500, //Set animation duration to 500ms
                        freeMode: false, //Enable free mode
                        slidesPerView: 1,
                        mode: 'horizontal',
                        freeModeFluid: false, //Enable 'fluid' free mode,
                        createPagination: true,
                        slidesPerViewFit: true,
                        releaseFormElements: true,
                        pagination: "#uthinx-search-swiper-pagination",
                        onTouchStart: function () {
                            console.log("onTouchStart");
                        },
                        onSlideChangeEnd: function (e) {
                            self._onSlideChangeEnd(e);
                        },
                        onSlideChangeStart: function (e) {
                            console.log("onSlideChangeStart");
                        }
                    };

                self.swiper = new Swiper('#uthinx-search-swiper', params);

                return false;
            },
            _setPageNano: function _setPageNano() {
                var self = this,
                    $scroll = $(self.el).find(".uthinx-nano");

                $scroll.nanoScroller();
            },
            _onSlideChangeEnd: function __onSlideChangeEnd(e) {
                var self = this;
                self._setSlideComplete(e);
            },
            _setSlideComplete: function _setSlideComplete(e) {
                var slide = e.getSlide(e.activeIndex),
                    cls = uthinx.utils.getSlideCatagoryCls(slide);
                console.log("onSlideChangeEnd" + cls);
                console.log(cls);
                document.getElementById("uthinx-search-header").className = cls;
            }
        });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return new SearchView();
});






