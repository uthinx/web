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
                this._registerHandleHelpers();
                _.bindAll(this);
            },
            el: "#uthinx-search",
            ell: "#uthinx-search-main-list",
            elll: "#uthinx-search-swiper-wrapper",
            swiper: "",
            collectionII: "",
            loader : "<li class='uthinx-search-main-loader'>Loading...</li>",
            scroller: "#uthinx-search .uthinx-nano-scroll",
            events: {
                "click a.close-btn": "_closeSearchPage",
                "touchstart #uthinx-search" : "_touchStartHandler"
            },
            render: function () {
                var self = this;

                $(self.el).addClass("open-page");

                self._searchShellRender();
                self._searchTypesRender();
                return self;
            },
            _touchStartHandler : function _touchStartHanlder(e) {
                console.log("_touchStartHandler((()))");
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
                    url: opts.url,
                    add: false,
                    type: opts.type,
                    postData: true,
                    beforeSend: function () {
                        console.log("searchView before");
                        uthinx.ajax.beforeHandler(opts);
                    },
                    complete: function (data, response) {
                        console.log("searchView complete");
                        uthinx.ajax.completeHandler(data, response, opts);
                    },
                    success: function (data, response) {
                        console.log("uthinx success searchView");
                        uthinx.ajax.successHandler(data, response, opts);
                    },
                    error: function (data, response) {
                        console.log("error search View");
                        uthinx.ajax.errorHandler(data, response, opts);
                    },
                    failure: function (data, response) {
                        console.log("searchView failure");
                        uthinx.ajax.errorHandler(data, response, opts);
                    }
                };
            },
            _searchShellRender: function () {
                var self = this;
                $(self.el).html(templates["app/templates/searchTemplate.hbs"]);
                self._setPageNano();
            },
            _searchTypesRender: function () {

                var self = this,
                    entity = uthinx.utils.getEntity(),
                    url = uthinx.ajax.url + "polltypes/",
                    params = { entity : (entity.id) ? entity.id : 0 },
                    opts = {
                        url : url,
                        el: self.elll,
                        type: "GET",
                        params: params,
                        success: self._searchTypesSuccessCallback,
                        template: templates["app/templates/searchTypesTemplate.hbs"],
                        collection: self.collection
                    };

                self.collection = new SearchTypesCollection();
                opts.collection = self.collection;
                self.collection.fetch(self._getFetch(opts));
                return false;
            },
            _searchTypesSuccessCallback : function _searchTypesSuccessCallback(data, response, opts) {
                var self = this;

                $(opts.el).html(opts.template(opts.collection.toJSON()));
                self._setSearchSwiper();

            },
            _searchResultsRender: function (catagory) {
                var self = this,
                    entity = uthinx.utils.getEntity(),
                    url = uthinx.ajax.url + "poll/" + entity.id,
                    params = { entity : (entity.id) ? entity.id : 0, id : catagory },
                    opts = {
                        url : url,
                        el: self.ell,
                        type: "GET",
                        params: params,
                        before: function () { self._setResultsLoader();},
                        complete: "",
                        success: "",
                        collection: self.collectionII,
                        template: templates["app/templates/searchResultsTemplate.hbs"]
                    };

                self.collectionII = new SearchResultsCollection();
                opts.collection = self.collectionII;
                self.collectionII.fetch(self._getFetch(opts));
            },
            _setResultsLoader : function _setResultsLoader() {
                var self = this;
                    $(self.ell).empty();
                    $(self.ell).html(templates["app/templates/searchResultsLoaderTemplate.hbs"]);
            },
            _setSearchSwiper: function setProfilePage() {

                var self = this,
                    swiper,
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
                        onTouchStart: function (e) {
                            console.log("onTouchStart");
                        },
                        onSlideChangeEnd: function (e) {
                            console.log("onSlideChangeEnd");
                            self._onSlideChangeEnd(e);
                        },
                        onSlideChangeStart: function (e) {
                            console.log("onSlideChangeStart");
                        }
                    };

                self.swiper = new Swiper('#uthinx-search-swiper', params);
                self._setSlideComplete("");
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

                var self = this,
                    slide = self.swiper.activeSlide(),
                    catagory = $(slide).attr("data-catagory"),
                    cls = uthinx.utils.getSlideCatagoryCls(slide);

                self._searchResultsRender(catagory);
                document.getElementById("uthinx-search-header").className = cls;
            },
            _registerHandleHelpers : function _registerHandleHelpers() {
                var self = this;

                if(Handlebars === undefined) return false;

                Handlebars.registerHelper('searchResultsEmpty', function (options) {
                    var template = templates["app/templates/searchResultsEmptyTemplate.hbs"],
                        slide = self.swiper.activeSlide(),
                        catagory = $(slide).attr("data-catagory");

                    return template({ id : catagory, type : uthinx.utils.getSearchTypeName(catagory) });
                });

                return true;
            }
        });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return new SearchView();
});






