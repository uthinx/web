define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone, Handlebars) {
    "use strict";
    var $$ = window.$$ || {},
        AppRouter = Backbone.Router.extend({
            routes: {
                '*actions': 'defaultAction'
            },
            slideLock: false,
            defaultAction: function (actions) {
                var self = this,
                    start = "We Have init Backbone default router.";

                self._console(start);
                self._console("<b>bindEvents</b>");
                document.addEventListener('deviceready', self._onDeviceReady, false);

            },
            _onDeviceReady: function _onDeviceReady() {
                var self = this;

                self._console("<br/><b>init() was called<b/>");
                self._console("<br/>device: <b>" + ( typeof device ) + "<b/>");
                self._console("<br/>navigator: <b>" + ( typeof navigator ) + "<b/>");
                self._console("<br/>navigator.geolocation: <b>" + ( typeof navigator.geolocation ) + "<b/>");
                self._console("<br/>Connection: <b>" + ( typeof Connection ) + "<b/>");
                self._console("<br/>self.getDeviceInfo: <b>" + ( typeof self._getDeviceInfo ) + "<b/>");
                self._console("<br/>self.checkConnection: <b>" + ( typeof self._checkConnection ) + "<b/>");

                self._getDeviceInfo();
            },
            _receivedEvent: function (id) {
                this._console("<br/>Received Event: " + id);
            },
            _getDeviceInfo: function _getDeviceInfo() {
                var self = this,
                    result;

                self._checkConnection();
                self._receivedEvent('deviceready');
                navigator.geolocation.getCurrentPosition(self._onSuccess, self._onError);

                result = 'Device Name: ' + device.name + '<br />' +
                    'Device Model: ' + device.model + '<br />' +
                    'Device Cordova: ' + device.cordova + '<br />' +
                    'Device Platform: ' + device.platform + '<br />' +
                    'Device UUID: ' + device.uuid + '<br />' +
                    'Device Version: ' + device.version + '<br />' +
                    'global.localStorage: <b>' + (typeof global.localStorage) + "</b><br/>";

                self._console(result);
            },
            _onSuccess: function _onSuccess(position) {
                var self = this,
                    result = 'Latitude: ' + position.coords.latitude + '<br />' +
                    'Longitude: ' + position.coords.longitude + '<br />' +
                    'Altitude: ' + position.coords.altitude + '<br />' +
                    'Accuracy: ' + position.coords.accuracy + '<br />' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                    'Heading: ' + position.coords.heading + '<br />' +
                    'Speed: ' + position.coords.speed + '<br />' +
                    'Timestamp: ' + position.timestamp + '<br />';

                self._console(result);
            },
            _onError: function _onError(error) {
                var self = this;

                self._console('<br/>code: ' + error.code);
                self._console('<br/>message: ' + error.message);
            },
            _checkConnection: function _checkConnection() {
                var networkState = navigator.connection.type,
                    self = this,
                    states = {};

                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.CELL] = 'Cell generic connection';
                states[Connection.NONE] = 'No network connection';

                self._console("states[networkState]:" + states[networkState]);
            },
            /**/
            _console: function (text) {
                var $console = $("#console"),
                    val = $console.val() + "<br/>";
                $console.val(val + text);
            },
            showMobileMenu: function (e) {
                var self = this;

                self._console("showMobileMenu");

                if ($("#hos-ui-is-mobile").is(":visible") === false) return false;

                var self = this,
                    current = parseInt($("#hos-ui-master-body").css("marginLeft").replace(/px/g, ''), 10),
                    move = 0,
                    check = 0;
                if (e.type === "swipeLeft" && current !== 270) {
                    return;
                }
                if (e.type === "swipeRight" && current !== 0) {
                    return;
                }

                move = (current > 0) ? "-=" + current : "+=270px";
                check = (current === 0) ? false : true;

                if (self.slideLock) return false;
                self._console("Show mmenu!!!!!!!");
                self.slideLock = true;

                $("#hos-ui-master-body").animate({marginLeft: move}, 300, function () {
                    self.slideLock = false;
                });
                e.preventDefault();
            }
        }),
        initialize = function () {
            var app_router = new AppRouter(),
                self = this;

            self._console("Initialized");
            self._console($(".uthinx-nano"));
            $(".uthinx-nano").nanoScroller();
            self._console("jQuery ON: " + (typeof $.on));
            self._console("$.nanoScroller: " + (typeof $.nanoScroller));
            self._console("$.fn.nanoScroller: " + (typeof $.fn.nanoScroller));
            $(".uthinx-nano").nanoScroller();
            // Extend the View class to include a navigation method goTo
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

/*
 /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*
 var app = {
 // Application Constructor
 initialize: function() {
 this.bindEvents();
 },
 // Bind Event Listeners
 //
 // Bind any events that are required on startup. Common events are:
 // 'load', 'deviceready', 'offline', and 'online'.
 bindEvents: function() {
 document.addEventListener('deviceready', this.onDeviceReady, false);
 },
 // deviceready Event Handler
 //
 // The scope of 'this' is the event. In order to call the 'receivedEvent'
 // function, we must explicity call 'app.receivedEvent(...);'
 onDeviceReady: function() {
 app.receivedEvent('deviceready');
 },
 // Update DOM on a Received Event
 receivedEvent: function(id) {
 var parentElement = document.getElementById(id);
 var listeningElement = parentElement.querySelector('.listening');
 var receivedElement = parentElement.querySelector('.received');

 listeningElement.setAttribute('style', 'display:none;');
 receivedElement.setAttribute('style', 'display:block;');

 console.log('Received Event: ' + id);
 }
 };

 */
