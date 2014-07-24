/**
 * Created by zolarichards on 2014/06/22.
 */
// JavaScript Document
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function ($, _, Backbone) {
    "use strict";
    var EntityModel = Backbone.Model.extend({
        url: uthinx.ajax.url + "/entity",
        urlRoot: uthinx.ajax.url + "/entity",
        defaults: {
            entity_email : '',
            entity_link : '',
            entity_age : '',
            entity_phone : '',
            entity_gender : '',
            entity_locale : '',
            entity_last_name : '',
            entity_name : '',
            entity_device_ID : '',
            entity_first_name : '',
            entity_middle_name : '',
            entity_facebook_ID : '',
            entity_profile_img : '',
            entity_birth_date : '',
            entity_polls: []
        },
        initialize : function () {
            var self = this;
            self.setEntityImg();
        },
        getModelId : function getModelId() { return this.attributes.idAttribute; },
        getEntityName : function getEntityName() { return this.attributes.entity_name; },
        getEnityType : function getEntityPhone() { return (this.attributes.entity_facebook_ID) ? "facebook" : "device"; },
        getEntityPhone : function () { return this.attributes.entity_phone; },
        getEntityGender : function getEntityGender() { return this.attributes.entity_gender; },
        getEntityFirstName : function getEntityFirstName() { return this.attributes.entity_first_name; },
        getEntityLastName : function getEntityLastName() { return this.attributes.entity_last_name; },
        getEntityMiddleName : function getEntityMiddleName() { return this.attributes.entity_middle_name; },
        getEntityPolls : function getEntityPolls () { return this.attributes.entity_polls; },
        getFacebookId : function getFacebookId() { return this.attributes.entity_facebook_ID; },
        getEntityEntityImg : function getEntityProfileImg() {
            var img = "http://placehold.it/40x40";
            if(this.attributes.entity_has_profile_image === true || this.attributes.entity_has_profile_image === "true"){
                img = this.attributes.entity_profile_image;
            }
            return img;
        },
        getModelCallbacks : function (opts) {
            var self = this;
            return {
                patch: false,
                url : (opts.url) ? opts.url : self.url,
                type : (opts.type) ? opts.type : "POST",
                success: function (model, response, data) {
                    var entity = uthinx.utils.getEntity();
                    entity.id = data.id;
                    uthinx.utils.setEntity(entity);

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
        },
        setEntityName : function(){
            var self = this;
            self.attributes.entity_name = (self.getEnityType() === 2 || self.getEnityType() === "2") ? self.getEntityFirst() + " " + self.getEntityLast() : self.getEntityName();
        },
        setEntityImg : function setEntityImg(url) {
            var self = this;

            if(!this.attributes.entity_profile_img){
                if(self.getFacebookId() !== null) {  this.attributes.entity_profile_img = "http://graph.facebook.com/" + self.getFacebookId() + "/picture?height=65&type=normal&width=65"; }
            }
        }
    });
    //
    return EntityModel;
});