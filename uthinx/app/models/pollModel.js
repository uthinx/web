/**
 * Created by zolarichards on 2014/07/03.
 */
/**
 * Created by zolarichards on 2014/06/22.
 */
// JavaScript Document
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone){
    "use strict";
    var PollModel = Backbone.Model.extend({
        defaults: {
            poll_catagory : "Name",
            poll_catagory_id : "1",
            poll_catagory_decription : "Name",
            poll_catagory_avaliable : [{
                poll_id : 1,
                poll_entity_id : 0,
                poll_entity_name : "Bob Wilson",
                poll_entity_img : "",
                poll_catagory: "Second Event",
                poll_catagory_id: "1",
                poll_title: "Four Event",
                poll_description: "Title that is some thing tha tis long and will scroll along the screen",
                poll_timestamp: "1403973698286",
                poll_invitations: 41233,
                poll_participants: 13452,
                poll_privacy : "public",
                poll_questions: 1,
                poll_est_time : "10m",
                poll_user_status : 0 //if the user has participated
            }]
        }
    });
    //
    return PollModel;
});

