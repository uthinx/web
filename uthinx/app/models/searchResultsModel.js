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
    var SearchResultsModel = Backbone.Model.extend({
        defaults: {
                id : "",
                poll_type_title : "",
                poll_type_id : 0,
                poll_type_rank : 0,
                poll_type_badges: [],
                poll_title: "",
                poll_duration : 0,
                poll_description: "",
                poll_is_public : true,
                poll_entity_vote : false,
                poll_participants: 0,
                poll_invitation_circles : [],
                poll_start_timestamp : "1403973698286",
                poll_invitation_entities : [],
                poll_invitation_count : 0,
                poll_particitants_entities : [],
                poll_particitants_count : 0,
                poll_creator_entity_id : ""

        },
        initialize : function () {
            var self = this;
            console.log("model init svt");
        },
        getModelId : function getModelId() { return this.attributes.idAttribute; },
        getPollTypeTitle : function getPollTypeTitle() { return this.attributes.poll_type_title; },
        getPollTypeDesc : function getPollTypeDesc() { return this.attributes.poll_type_description; },
        getPollTypeDeleteDate : function getPollTypeDeleteDate() { return this.attributes.poll_type_deleted_date; },
        getPollTypeApprovedDate : function getPollTypeApprovedDate() { return this.attributes.poll_type_approved_date; },
        getPollTypeCreatorEntityId : function getPollTypeCreatorEntityId() { return this.attributes.poll_type_creator_entity_id; },
        getModelCallbacks : function (opts) {
            var self = this;
            return {
                patch: false,
                url : (opts.url) ? opts.url : self.url,
                type : (opts.type) ? opts.type : "POST",
                success: function (model, response, data) {
                    if (typeof opts.success === "function") {
                        opts.success(model, response, opts);
                    }
                },
                error: function (model, response, err) {
                    uthinx.ajax.globalERRORHandler(arguments);
                    if (typeof opts.error === "function") {
                        opts.error(model, response, opts);
                    }
                }
            };
        }
    });
    //
    return SearchResultsModel;
});

