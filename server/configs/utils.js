"use strict";

exports.isObjectId = function (id) {
    return id.match (/^[0-9a-fA-F]{24}$/) != null;
};