define([
    'nano',
    'uthinx',
    'swiper',
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'views/mmenuView',
    'views/createView',
    'views/searchView',
    'views/entityView'
], function (nano, uthinx, Swiper, $, _, Backbone, Handlebars, mmenu, create, search, entity) {
    "use strict";
    var $$ = window.$$ || {},
        uthinx = window.uthinx || uthinx,
        AppRouter = Backbone.Router.extend({
            routes: {
                'entity': '_showEntityPage',
                'entity/create': '_showCreatePage',
                'entity/search': '_showSearchPage',
                'entity/mmenu': '_showMMenuPage',
                'entity/settings': '_showSettingsPage',
                '*actions': '_defaultAction'
            },
            _defaultAction: function _defaultAction() {
                var self = this,
                    $access = $("#uthinx-access");

                if (uthinx.utils.checkConnection()) {
                    uthinx.utils.logDeviceInfo();
                }

                uthinx.facebook.isLoggedIn(function (login) {

                    if (login) {
                        $access.hide();
                        self.navigate("/entity", true);
                    } else {
                        //check device log now
                        $access.show();

                    }
                });
            },
            _showAccess: function _showAccess() {
                console.log("show access buttons and what not");
            },
            _showSettings: function _showSettings() {
                _slideShow();
            },
            accessHandler: function accessHandler(e, caller) {
                var self = this;
                //
                uthinx.facebook.login(function () {
                    self._defaultAction();
                });
            },
            _showEntityPage: function _showEntityPage() {
                entity.render();
                mmenu.render();
            },
            _showSearchPage: function _showSearchPage() {
                search.render();
            },
            _showCreatePage: function _showCreatePage() {
                create.render();
            },
            _showMMenuPage: function _showMMenuPage() {
                mmenu.render();
            },
            showMobileMenu: function showMobileMenu(e) {

                var self = this,
                    page = document.getElementById("uthinx-profile");

                if (page.classList.contains("show-mmenu")) {
                    page.classList.remove("show-mmenu");
                }
                else {
                    page.classList.add("show-mmenu");
                }

                return false;

                if (e.type === "swipeLeft" && current !== 270) {
                    return;
                }
                if (e.type === "swipeRight" && current !== 0) {
                    return;
                }

                e.preventDefault();
            }
        }),
        initialize = function () {
            var app_router = new AppRouter(),
                self = this;

            $(".uthinx-nano").nanoScroller();
            //
            $(".uthinx-nano").nanoScroller();
            // Extend the View class to include a navigation method goTo
            $("#mmenuShowBtn").on("click", function (e) {
                app_router.showMobileMenu(e);
            });
            Backbone.View.prototype.routeChanger = function (location) {
                app_router.navigate(location, true);
            };
            Backbone.View.prototype.renderChanger = function (view) {
                app_router.reRenderControl(view);
            };
            //
            Backbone.View.prototype.showMobileMenu = function (e, caller) {
                app_router.showMobileMenu(e, caller);
            };
            //
            $("#mmenuShowBtn").on("click", function (e) {

            });
            //
            $("#facebookSignin").on("click", function (e) {
                app_router.accessHandler(e, this);
            });
            //
            $("#anonymousSignin").on("click", function (e) {
                app_router.accessHandler(e, this);
            });
            //
            $('body').on('touchmove', function(e) {
                console.log("STOPPING body touchmove");
                e.preventDefault();
            });
            //
            Backbone.history.start();
            // Trigger the initial route and enable HTML5 History API support, set the
            // root folder to '/' by default.  Change in app.js.
            //Backbone.history.start({
            //    pushState: true,
            //    root: app.root
            //});
        };

    return { initialize: initialize };
});
