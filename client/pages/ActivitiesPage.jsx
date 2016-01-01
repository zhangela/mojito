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
            searchQuery: SearchQuery.get(),
        };

        return data;
    },

    getFilteredActivities() {
        const searchQuery = SearchQuery.get();
        console.log(searchQuery);

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
            return _.findWhere(SearchQuery.durations(), {name: durationName});
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

    handleSubmit(query) {
        SearchQuery.set(query);
    },

    clearSearch() {
        SearchQuery.clear();
    },

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <ActivitiesSearch
                        searchQuery={this.data.searchQuery}
                        activityTypes={this.data.activityTypes}
                        durations={SearchQuery.durations()}
                        onSubmit={this.handleSubmit}
                        onClear={this.clearSearch}
                        />
                </div>
                <div className="col-md-9">
                    <ActivitiesList
                        activities={this.data.activities}
                        searchQuery={this.data.searchQuery}
                    />
                </div>
            </div>
        );
    }
});