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
        "charts" : "../vendor/bower/chartjs/Chart",
        "uthinx" : "../vendor/bower/uthinx/js/uthinx.min",
        "backbone" : "../vendor/bower/backbone/backbone",
        "jquery" : "../vendor/bower/jquery/jquery.all.min",
        "livestamp" : '../vendor/bower/livestampjs/livestamp.min',
        "moment" : '../vendor/bower/moment/min/moment-with-langs.min',
        "underscore" : "../vendor/bower/lodash/dist/lodash.underscore",
        "handlebars": '../vendor/bower/handlebars/handlebars',
        "swiper" : "../vendor/bower/swiper/dist/idangerous.swiper",
        "bootstrap" : "../vendor/bower/bootstrap/dist/js/bootstrap.min",
        "overthrow" : "../vendor/bower/overthrow/dist/overthrow",
        "nano" : "../vendor/bower/nanoscroller/bin/javascripts/jquery.nanoscroller"
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
            exports : "Handlebars"
        },
        "swiper" : {
            deps : ["jquery", "underscore"],
            exports : "Swiper"
        },
        "nano" : {
            deps : ["jquery", "overthrow"],
            exports : "nano"
        },
        "bootstrap" : ["jquery"],
        "livestamp" : ["jquery", "moment"]
    }
});