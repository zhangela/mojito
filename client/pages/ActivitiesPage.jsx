ActivitiesPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        const activitiesSubscription = Meteor.subscribe("Activities");
        const activityTypesSubscription = Meteor.subscribe("ActivityTypes");

        const data = {
            activitiesReady: activitiesSubscription.ready(),
            activities: this.getFilteredActivities(),
            activityTypesReady: activityTypesSubscription.ready(),
            activityTypes: ActivityTypes.find().fetch(),
        };

        return data;
    },

    getFilteredActivities() {
        const searchQuery = this.getSearchQuery();

        const mongoQuery = {};

        if (searchQuery.numPeople > 0) {
            _.extend(mongoQuery, {
                "groupSize.min": {
                    $lte: searchQuery.numPeople,
                },
                "groupSize.max": {
                    $gte: searchQuery.numPeople,
                },
            });
        }

        _.extend(mongoQuery, {
            "activityType": {
                $in: searchQuery.activityTypes
            }
        });

        const matchingDurations = searchQuery.durations.map((durationName) => {
            return _.findWhere(this.durations(), {name: durationName});
        });

        const minDuration = _.min(_.pluck(matchingDurations, "minDuration"));
        const maxDuration = _.max(_.pluck(matchingDurations, "maxDuration"));

        const budget = searchQuery.budget || Infinity;

        _.extend(mongoQuery, {
            "pricing": {
                $elemMatch: {
                    "duration": {
                        $lte: maxDuration,
                        $gte: minDuration,
                    },
                    "perPerson": {
                        $lte: budget,
                    },
                }
            }
        });

        return Activities.find(mongoQuery).fetch();
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
                activityTypes: _.pluck(ActivityTypes.find().fetch(), "name"),
            }
        }
    },

    handleSubmit(query) {
        FlowRouter.setQueryParams({
            query: JSON.stringify(query)
        });
    },

    clearSearch() {
        FlowRouter.setQueryParams({
            query: null,
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
                        onSubmit={this.handleSubmit}
                        onClear={this.clearSearch}
                        />
                </div>
                <div className="col-md-9">
                    <ActivitiesList activities={this.data.activities}/>
                </div>
            </div>
        );
    }
});