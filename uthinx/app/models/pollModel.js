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
            id: "",
            poll_type : "",
            poll_title: "",
            poll_type_id : 0,
            poll_duration : 0,
            poll_type_rank : 0,
            poll_type_badges: [],
            poll_description: "",
            poll_participants: 0,
            poll_is_public : true,
            poll_entity_vote : false,
            poll_start_timestamp : 0,
            poll_invitation_count : 0,
            poll_particitants_count : 0,
            poll_creator_entity_id : "",
            poll_invitation_circles : [],
            poll_invitation_entities : [],
            poll_particitants_entities : []
        },
        initialize : function () {
            var self = this;
            console.log("poll model init");
        },
        getModelId : function getModelId() { return this.attributes.idAttribute; },
        getPollType : function getPollType() { return this.attributes.poll_type; },
        getPollTypeId : function getPollTypeId() { return this.attributes.poll_type_id; },
        getPollTypeTitle : function getPollTypeTitle() { return this.attributes.poll_title; },
        getPollDuration : function getPollDuration() { return this.attributes.poll_duration; },
        getPollTypeRank: function getPollTypeRank() { return this.attributes.poll_type_rank; },
        getPollIsPublic : function getPollIsPublic() { return this.attributes.poll_is_public; },
        getPollEntityVote : function getPollEntityVote() { return this.attributes.poll_entity_vote; },
        getPollTypeBadges : function getPollTypeBadges() { return this.attributes.poll_type_badges; },
        getPollDescription : function getPollDescription() { return this.attributes.poll_description; },
        getPollParticipants : function getPollParticipants() { return this.attributes.poll_participants; },
        getPollStartTimestamp : function getPollStartTimestamp() { return this.attributes.poll_start_timestamp; },
        getParticitantsCount : function getParticitantsCount() { return this.attributes.poll_particitants_count; },
        getPollInvitationCount : function getPollInvitationCount() { return this.attributes.poll_invitation_count; },
        getPollCreatorEntityId : function getPollCreatorEntityId() { return this.attributes.poll_creator_entity_id; },
        getPollInvitationCircles : function getPollInvitationCircles() { return this.attributes.poll_invitation_circles; },
        getPollInvitationEntities : function getPollInvitationEntities() { return this.attributes.poll_invitation_entities; },
        getPollParticitantsEntities : function getPollParticitantsEntities() { return this.attributes.poll_particitants_entities; },
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
    return PollModel;
});

