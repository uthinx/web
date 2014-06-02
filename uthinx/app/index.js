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
;(function (global, doc, undefined) {
    var init = function () {
            _bindEvents();
        },
        _bindEvents = function _bindEvents() {
            return;
            var it = doc.getElementById("it");
            it.innerHTML = "<br/><b>bindEvents</b>"
            doc.addEventListener('deviceready', _onDeviceReady, false);
        },
        _onDeviceReady = function _onDeviceReady() {
            var self = this,
                it = doc.getElementById("it");

            it.innerHTML += "<br/><b>init() was called<b/>";
            it.innerHTML += "<br/>device: <b>" + ( typeof device ) + "<b/>";
            it.innerHTML += "<br/>navigator: <b>" + ( typeof navigator ) + "<b/>";
            it.innerHTML += "<br/>navigator.geolocation: <b>" + ( typeof navigator.geolocation ) + "<b/>";
            it.innerHTML += "<br/>Connection: <b>" + ( typeof Connection ) + "<b/>";
            it.innerHTML += "<br/>self.getDeviceInfo: <b>" + ( typeof _getDeviceInfo ) + "<b/>";
            it.innerHTML += "<br/>self.checkConnection: <b>" + ( typeof _checkConnection ) + "<b/>";

            _getDeviceInfo();
        },
        _receivedEvent = function (id) {
            var events = doc.getElementById("events");
            events.innerHTML += "<br/>Received Event: " + id;
        },
        _getDeviceInfo = function _getDeviceInfo() {
            var element = doc.getElementById("deviceProperties"),
                store = doc.getElementById("storage");

            _checkConnection();
            _receivedEvent('deviceready');
            navigator.geolocation.getCurrentPosition(_onSuccess , _onError);

            element.innerHTML = 'Device Name: ' + device.name + '<br />' +
                'Device Model: ' + device.model + '<br />' +
                'Device Cordova: ' + device.cordova + '<br />' +
                'Device Platform: ' + device.platform + '<br />' +
                'Device UUID: ' + device.uuid + '<br />' +
                'Device Version: ' + device.version + '<br />';

            store.innerHTML = "<br/>global.localStorage: <b>" + (typeof global.localStorage) + "</b><br/>";
        },
        _onSuccess = function _onSuccess( position ) {
            var element = doc.getElementById('geolocation');
            element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                'Longitude: ' + position.coords.longitude + '<br />' +
                'Altitude: ' + position.coords.altitude + '<br />' +
                'Accuracy: ' + position.coords.accuracy + '<br />' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                'Heading: ' + position.coords.heading + '<br />' +
                'Speed: ' + position.coords.speed + '<br />' +
                'Timestamp: ' + position.timestamp + '<br />';
        },
        _onError = function _onError( error ) {
            var element = doc.getElementById('geolocation');

            element.innerHTML += '<br/>code: ' + error.code;
            element.innerHTML += '<br/>message: ' + error.message;
        },
        _checkConnection = function _checkConnection() {
            var networkState = navigator.connection.type,
                net = doc.getElementById("network");

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

            net.innerHTML = "<br />states[networkState]:" + states[networkState];
        };

    init();
}(window, document, undefined));