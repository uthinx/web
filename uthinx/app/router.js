define([
    'quo',
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
], function (quo, uthinx, Swiper, $, _, Backbone, Handlebars, mmenu, create, search, entity) {
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
            _defaultAction: function _defaultAction(actions) {
                var self = this,
                    $access = $("#uthinx-access");
                console.log("_defaultAction");

                if (uthinx.utils.checkConnection()) {
                    uthinx.utils.logDeviceInfo();
                }

                uthinx.facebook.isLoggedIn(function (login) {
                    console.log("LOGIN function called!!!!");
                    if (login) {
                        $access.hide();
                        //$("#uthinx-access").hide();
                        self.navigate("/entity", true);

                    } else {
                        //check device log now
                        $access.show();
                        console.log("NOT LOGGED IN");
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
                    //$access.removeClass("close");
                    console.log("LOGIN IN HANDLER");
                    self._defaultAction();
                });
            },
            _showEntityPage: function _showEntityPage() {
                console.log("showing Entity");
                entity.render();
                mmenu.render();
            },
            _showSearchPage: function _showSearchPage(e) {
                console.log("_showSearchPage");
                search.render();
            },
            _showCreatePage: function _showCreatePage(e) {
                console.log("_showCreatePage");
                create.render();
            },
            _showMMenuPage: function _showMMenuPage(e) {
                console.log("_showMMenuPage");
                mmenu.render();
            },
            showMobileMenu: function showMobileMenu(e) {
                console.log("MMenu Show");
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
                console.log("facebook click");
            });
            //
            $("#anonymousSignin").on("click", function (e) {
                app_router.accessHandler(e, this);
                console.log("Anonymous click");
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
