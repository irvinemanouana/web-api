"use strict"

module.exports = function(app){
    return {
        create:         require('./create')(app),
        show:           require('./show')(app),
        update:         require('./update')(app),
        remove:         require('./remove')(app),
        uploadAvatar:   require('./uploadAvatar')(app),
        showAvatar:     require('./showAvatar')(app),
    };
};