/**
 * Created by zolarichards on 2014/07/22.
 */
define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    "use strict";
    var SearchTypesModel = Backbone.Model.extend({
        defaults: {
            poll_type_title: '',
            poll_type_description: '',
            poll_type_deleted_date : '',
            poll_type_approved_date : '',
            poll_type_creator_entity_id : ''
        },
        initialize : function () {
            var self = this;
            self.setEntityImg();
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
    return SearchTypesModel;
});
