ActivitiesPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            activities: Activities.find().fetch(),
            activityTypes: ActivityTypes.find().fetch(),
        };
    },

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

    getSearchQuery() {
        const urlQuery = FlowRouter.getQueryParam("query");

        if (urlQuery) {
            return JSON.parse(urlQuery);
        } else {
            return {
                numPeople: 0,
                budget: 0,
                durations: _.pluck(this.durations(), "name"),
                activityTypes: _.pluck(this.data.activityTypes, "name"),
            }
        }
    },

    handleSubmit(query) {
        FlowRouter.setQueryParams({
            query: JSON.stringify(query)
        });
    },

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <ActivitiesSearch
                        searchQuery={this.getSearchQuery()}
                        activityTypes={this.data.activityTypes}
                        durations={this.durations()}
                        onSubmit={this.handleSubmit} />
                </div>
                <div className="col-md-9">
                    <ActivitiesList activities={this.data.activities}/>
                </div>
            </div>
        );
    }
});