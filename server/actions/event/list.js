"use strict"

module.exports = function(app) {
    /**
     * @api {GET} /api/event List events
     * @apiName List
     * @apiGroup Event
     * @apiPermission OAuth2User
     *
     * @apiVersion 1.0.0
     *
     * @apiDescription Allow to get all events.
     *
     * @apiSuccess Event Model
     */
    return function(req, res, next){
        var count           = parseInt(req.query.count),
            page            = parseInt(req.query.page),
            sort            = req.query.sort,
            categoryId      = req.query.categoryId,
            dateFilter      = req.query.date,
            filter          = {};

        if (!global.isNullOrEmpty(categoryId)) {
            filter.category = categoryId;
        }

        if (!global.isNullOrEmpty(dateFilter)) {
            var dateNow = new Date();
            switch(dateFilter) {
                case 'passed':
                    filter.date = { $lt: dateNow};
                    break;
                case 'future':
                    filter.date = { $gt: dateNow};
                    break;
            }
        }

        var query = app.models.Event.find(filter);

        if (!isNaN(count) && !isNaN(page)) {
            var first = ((count * page) - count);
            query.limit(count).skip(first);
        }

        if (!global.isNullOrEmpty(sort) && (sort === 'asc' || sort === 'desc')) {
            query.sort({ date: sort });
        } 

        query.populate('category').exec()
        .then(function(instances) {
            res.json(instances);
        })
        ;
    }
};