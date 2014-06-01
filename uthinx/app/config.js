// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    // allow cross-domain requests remote server allows CORS
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) { return true; }
        }
    },
    paths: {
        // Make vendor easier to access.
        "vendor" : "../vendor",
        // Almond is used to lighten the output filesize.
        "almond" : "../vendor/bower/almond/almond",
        "chartjs" : "../vendor/bower/chartjs/Chart.min",
        "uthinx" : "../vender/bower/uthinx/uthinx.min",
        "backbone" : "../vendor/bower/backbone/backbone",
        "jquery" : "../vendor/bower/jquery/jquery.all.min",
        "livestamp" : '../vendor/bower/livestampjs/livestamp.min',
        "moment" : '../vendor/bower/moment/min/moment-with-langs.min',
        "underscore" : "../vendor/bower/lodash/dist/lodash.underscore",
        "handlebars" : "../vendor/bower/handlebars/handlebars.amd.min",
        "bootstrap" : "../vendor/bower/bootstrap/dist/js/bootstrap.min"
    },

    shim : {
        // This is required to ensure Backbone works as expected within the AMD environment.
        "backbone" : {
            // These are the two hard dependencies that will be loaded first.
            deps : ["jquery", "underscore"],
            // This maps the global `Backbone` object to `require("backbone")`.
            exports : "Backbone"
        },
        "uthinx" : {
            deps : ["jquery", "handlebars"]
        },
        "handlebars" : {
            deps : ["jquery", "underscore"],
            exposts : "Handlebars"
        },
        "quo" : ["jquery"],
        "moment" : ["jquery"],
        "chartjs" : ["jquery"],
        "bootstrap" : ["jquery"],
        "livestamp" : ["jquery", "moment"]
    }
});