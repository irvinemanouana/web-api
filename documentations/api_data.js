define({ "api": [  {    "type": "POST",    "url": "/api/category",    "title": "Create category",    "name": "Create",    "group": "Category",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "ContentTypes:application/json",            "description": ""          }        ]      }    },    "description": "<p>Allow to create category. This API is available for admin.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Category",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/category/create.js",    "groupTitle": "Category"  },  {    "type": "GET",    "url": "/api/category/all",    "title": "List categories",    "name": "List",    "group": "Category",    "permission": [      {        "name": "none"      }    ],    "version": "1.0.0",    "description": "<p>Allow to get all categories.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Category[]",            "description": "<p>List</p>"          }        ]      }    },    "filename": "server/actions/category/list.js",    "groupTitle": "Category"  },  {    "type": "DELETE",    "url": "/api/category/:id",    "title": "Remove category",    "name": "Remove",    "group": "Category",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          }        ]      }    },    "description": "<p>Allow to delete category.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Category",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/category/remove.js",    "groupTitle": "Category"  },  {    "type": "GET",    "url": "/api/category/:id",    "title": "Show category",    "group": "Category",    "name": "Show",    "permission": [      {        "name": "none"      }    ],    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          }        ]      }    },    "description": "<p>Allow to show one category.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Category",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/category/show.js",    "groupTitle": "Category"  },  {    "type": "PUT",    "url": "/api/category/:id",    "title": "Update category",    "name": "Update",    "group": "Category",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "ContentTypes:application/json",            "description": ""          }        ]      }    },    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          }        ]      }    },    "description": "<p>Allow to update category. This API is available for admin.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Category",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/category/update.js",    "groupTitle": "Category"  },  {    "type": "POST",    "url": "/api/event",    "title": "Create event",    "name": "Create",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "ContentTypes:application/json",            "description": ""          }        ]      }    },    "description": "<p>Allow to create event.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/create.js",    "groupTitle": "Event"  },  {    "type": "GET",    "url": "/api/event",    "title": "List events",    "name": "List",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "description": "<p>Allow to get all events.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/list.js",    "groupTitle": "Event"  },  {    "type": "GET",    "url": "/api/event/:id",    "title": "Remove event",    "name": "Remove",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          }        ]      }    },    "description": "<p>Allow to remove event.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/remove.js",    "groupTitle": "Event"  },  {    "type": "GET",    "url": "/api/event/:id",    "title": "Show event",    "name": "Show",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          }        ]      }    },    "description": "<p>Allow to show event.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/show.js",    "groupTitle": "Event"  },  {    "type": "GET",    "url": "/api/event/:id/icon",    "title": "Show icon",    "name": "Show_icon",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          }        ]      }    },    "description": "<p>Allow to upload icon's event.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/showIcon.js",    "groupTitle": "Event"  },  {    "type": "POST",    "url": "/api/event/:id/subscribe/:user",    "title": "Subscribe user",    "name": "Subscribe_user",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user",            "description": ""          }        ]      }    },    "description": "<p>Allow to subscribe user to event.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/subscribe.js",    "groupTitle": "Event"  },  {    "type": "DELETE",    "url": "/api/event/:id/unsubscribe/:user",    "title": "Unsubscribe user",    "name": "Unsubscribe_user",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user",            "description": ""          }        ]      }    },    "description": "<p>Allow to unsubscribe user to event.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/unsubscribe.js",    "groupTitle": "Event"  },  {    "type": "PUT",    "url": "/api/event",    "title": "Update event",    "name": "Update",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "ContentTypes:application/json",            "description": ""          }        ]      }    },    "description": "<p>Allow to update event.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/update.js",    "groupTitle": "Event"  },  {    "type": "POST",    "url": "/api/event/:id/icon",    "title": "Upload icon",    "name": "Upload_icon",    "group": "Event",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": ""          }        ]      }    },    "description": "<p>Allow to create event.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Event",            "description": "<p>Model</p>"          }        ]      }    },    "filename": "server/actions/event/uploadIcon.js",    "groupTitle": "Event"  },  {    "type": "GET",    "url": "/api/user",    "title": "Show user",    "name": "Show",    "group": "User",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "description": "<p>Allow to show user.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "User",            "description": "<p>Model without password</p>"          }        ]      }    },    "filename": "server/actions/user/show.js",    "groupTitle": "User"  },  {    "type": "GET",    "url": "/api/user/avatar",    "title": "Show avatar",    "name": "Show_avatar",    "group": "User",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "description": "<p>Allow to show avatar's user.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "Image",            "description": "<p>Represent avatar's user</p>"          }        ]      }    },    "filename": "server/actions/user/showAvatar.js",    "groupTitle": "User"  },  {    "type": "POST",    "url": "/api/user",    "title": "Subscribe user",    "name": "Subscribe",    "group": "User",    "permission": [      {        "name": "none"      }    ],    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "ContentTypes:application/json",            "description": ""          }        ]      }    },    "description": "<p>Allow to register user. Password must be hashed in SHA512.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "User",            "description": "<p>Model without password</p>"          }        ]      }    },    "filename": "server/actions/user/create.js",    "groupTitle": "User"  },  {    "type": "DELETE",    "url": "/api/user",    "title": "Unsubscribe user",    "name": "Unsubscribe",    "group": "User",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "description": "<p>Allow to remove user.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "User",            "description": "<p>Model without password</p>"          }        ]      }    },    "filename": "server/actions/user/remove.js",    "groupTitle": "User"  },  {    "type": "PUT",    "url": "/api/user",    "title": "Update user",    "name": "Update",    "group": "User",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "description": "<p>Allow to update user.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "User",            "description": "<p>Model without password</p>"          }        ]      }    },    "filename": "server/actions/user/update.js",    "groupTitle": "User"  },  {    "type": "POST",    "url": "/api/user/avatar",    "title": "Upload avatar",    "name": "Upload_avatar",    "group": "User",    "permission": [      {        "name": "OAuth2User"      }    ],    "version": "1.0.0",    "description": "<p>Allow to upload avatar's user.</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "User",            "description": "<p>Model without password</p>"          }        ]      }    },    "filename": "server/actions/user/uploadAvatar.js",    "groupTitle": "User"  }] });
