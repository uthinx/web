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
    'handlebars',
    'underscore',
    'models/entityModel',
    'collections/entityCollection'
], function ($, Charts, Swiper, Backbone, Handlebars, _, EntityModel,  EntityCollection) {
    "use strict";
    var uthinx = window.uthinx || {},
        templates = window.uthinx.templates || {},
        ProfileView = Backbone.View.extend({
            initialize: function () {
                _.bindAll(this);
            },
            el: "#uthinx-profile",
            swiper: null,
            yAngle: 0,
            cubeTimer : "",
            render: function render() {
                console.log("Entity call to RENDER");
                var self = this,
                    opts = self._getOptions();

                self.collection = new EntityCollection();
                opts.collection = self.collection;
                self.collection.fetch(self._getFetch(opts));
                return self;
            },
            _getOptions: function _getOptions() {

                var opts,
                    self = this,
                    user = uthinx.utils.getEntity(),
                    url = uthinx.ajax.url + "entity/";

                user = (user === null) ? {} : user;
                opts = {
                    el: self.el,
                    this : self,
                    url : (user.id) ? url + user.id : (user.entity_facebook_ID) ?  url + "facebook/" + user.entity_facebook_ID : url + "device/" + user.entity_device_ID,
                    params: "",
                    hack: self.forceRender,
                    collection: self.collection,
                    before: self.beforeProfilePage,
                    success: self.successProfilePage,
                    complete: self.completeProfilePage,
                    template: templates["app/templates/entityTemplate.hbs"]
                };
                console.log(JSON.stringify(user));
                console.log("URL:" + opts.url);
                return opts;
            },
            forceRender: function (opts) {
                var self = this;
                opts.collection.add({});
                $(opts.el).html(opts.template(opts.collection.toJSON()));
                clearTimeout(uthinx.utils.timer);
                self._startQuestionCube();
                self._setProfilePage();
                self._setPageNano();
            },
            _startQuestionCube: function _startQuestionCube() {
                var self = this;
                uthinx.utils.timer = setTimeout(function () {
                    self._cubeTurn(-1, 0, 0);
                }, 10000);
            },
            _cubeTurn: function cubeTure(direction, current, time) {
                var cube = document.getElementById('uthinx-question-cube'),
                    distance = 5 * direction,
                    curr = current + 5,
                    self = this;

                self.yAngle += distance;
                cube.style.webkitTransform = "rotateY(" + self.yAngle + "deg)";

                if (curr < 90) {
                    setTimeout(function () {
                        self._cubeTurn(direction, curr, time + 50);
                    }, 25);
                }
                else {
                    self._startQuestionCube();
                }
            },
            _getFetch: function _getFetch(opts) {
                return {
                    add: false,
                    type: "GET",
                    url: opts.url,
                    postData: false,
                    data: opts.params,
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
            /* <section id="uthinx-profile" class="uthinx-page uthinx-profile">showMMenu */
            events: {
                "click #mmenu-btn": "_showMMenu",
                "click #create-btn": "_showCreatePage",
                "click #search-btn": "_showSearchPage",
                "swipeLeft #uthinx-profile" : "_swipeLeftHandler"
            },
            beforeProfilePage: function beforeProfilePage() {
                console.log("beforeProfilePage");
            },
            successProfilePage: function successProfilePage(data, response, opts) {
                var self = this;

                console.log(JSON.stringify(response));

                if(response && response.ok && response.none){
                    console.log("SUCCESS CREATE");
                    self._createEntity(opts);
                }else{
                    // device
                    $(opts.el).html(opts.template(opts.collection.toJSON()));
                    clearTimeout(uthinx.utils.timer);
                    self._startQuestionCube();
                    self._setProfilePage();
                    self._setPageNano();
                };
            },
            completeProfilePage: function completeProfilePage() {
                console.log("completeProfilePage");
            },
            _createEntity : function _createEntity(opts){
                var self = this,
                    entity = new EntityModel();

                opts.type = "POST";
                opts.url = "http://0.0.0.0:1337/entity/";
                entity.save(uthinx.utils.getEntity(), entity.getModelCallbacks(opts));
            },
            _showMMenu: function (e) {
                console.log("_showMMenu");
                var page = document.getElementById("uthinx-profile");
                (page.classList.contains("open-mmenu")) ? page.classList.remove("open-mmenu") : page.classList.add("open-mmenu");
                /*
                    $(page).animate({
                        left: ["+=270px", "toggle"]
                    }, 500, function() {
                        console.log("animation complete");
                    });
                */
                e.preventDefault();
            },
            _showSearchPage: function (e) {
                console.log("_showSearchPage");
                console.log("routeChanger: " + (typeof this.routeChanger));
                this.routeChanger("entity/search");
                e.preventDefault();
            },
            _showCreatePage: function (e) {
                console.log("_showCreatePage");
                console.log("routeChanger: " + (typeof this.routeChanger));
                this.routeChanger("entity/create");
                e.preventDefault();
            },
            _swipeCallback: function _swipeCallback(e) {
                console.log("callback mySwipe");
            },
            _onSlideChangeEnd: function _onSlideChangeEnd(e) {
                var self = this;
                self._setSlideComplete(e);
            },
            _setProfilePage: function _setProfilePage() {
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
                        pagination: "#uthinx-profile-swiper-pagination",
                        onTouchStart: function () {
                            console.log("onTouchStart");
                        },
                        onSlideChangeEnd: function (e) {
                            self._onSlideChangeEnd(e);
                        },
                        onSlideChangeStart: function (e) {
                            console.log("onSlideChangeStart");
                        }
                    },
                    timeStamps = [].slice.call(document.querySelectorAll("[data-timestamp]"));

                self.swiper = new Swiper('#uthinx-profile-swiper', params);
                self._setSlideComplete();
                uthinx.utils.pollCounter(timeStamps);

                return false;
            },
            _setPageNano : function _setPageNano () {
                var self = this,
                    $scroll = $(self.el).find(".uthinx-nano");

                $scroll.nanoScroller();
            },
            _setSlideComplete : function _setSlideComplete(e){
                var self = this,
                    slideId = (e === undefined) ? 0 :  e.activeIndex,
                    slide = self.swiper.getSlide( slideId ),
                    cls = uthinx.utils.getSlideCatagoryCls( slide );

                //document.getElementById("uthinx-profile-slide-header").className = cls;
            },
            _swipeLeftHandler : function _swipeLeftHandler(e) {
                console.log("SWIPE LEFT ENTITY!!!");
                e.preventDefault();
            }
        });
    // Our module now returns an instantiated view
    // Sometimes you might return an un-instantiated view e.g. return projectListView
    return new ProfileView();
});



