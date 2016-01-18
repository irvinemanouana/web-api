"use strict"

module.exports = function(app){
    return {
        create:         require('./create')(app),
        list:           require('./list')(app),
        show:           require('./show')(app),
        update:         require('./update')(app),
        remove:         require('./remove')(app),
        uploadIcon:     require('./uploadIcon')(app),
        showIcon:       require('./showIcon')(app),
        subscribe:      require('./subscribe')(app),
    };
};