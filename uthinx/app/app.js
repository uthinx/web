// JavaScript Document
/*jslint nomen: true  */
/*global define: false, window: false, console: false, house: false, locationSetting: false,
 $$: false, document: false, undefined: false, typeof: false, parseInt: false, undefined: false,
 null: false, nomen: false, require: false, requirejs: false
 */
define([
    'router'
], function ( Router ) {
    "use strict";
    var initialize = function () {
        Router.initialize();
    };
    return { initialize: initialize };
});