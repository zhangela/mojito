SearchQuery = {
    durations() {
        return [
            {
                name: "half day",
                minDuration: 1,
                maxDuration: 4,
            },
            {
                name: "full day",
                minDuration: 4,
                maxDuration: 10,
            },
        ];
    },

    generateQueryParam(query) {
        return encodeURIComponent(JSON.stringify(query));
    },

    set(query) {
        FlowRouter.setQueryParams({
            query: this.generateQueryParam(query)
        });
    },

    get() {
        const urlQuery = FlowRouter.getQueryParam("query");

        if (urlQuery) {
            return JSON.parse(urlQuery);
        } else {
            return {
                numPeople: 0,
                budget: 0,
                durations: _.pluck(this.durations(), "name"),
                activityTypes: _.pluck(ActivityTypes.find().fetch(), "name"),
            }
        }
    },

    clear() {
        FlowRouter.setQueryParams({
            query: null
        });
    }
}