ActivityPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {

        const activitySubscription = Meteor.subscribe("Activities.single", this.getActivityId());

        const data = {
            activityReady: activitySubscription.ready(),
            activity: Activities.findOne(this.getActivityId()),
            searchQuery: SearchQuery.get(),
        };

        return data;
    },


    getActivityId() {
        return FlowRouter.getParam("id");
    },

    render() {
        if (this.data.activityReady) {
            return (
                <ActivityDetailed
                    activity={this.data.activity}
                    searchQuery={this.data.searchQuery}
                />
            );
        } else {
            return <div></div>;
        }
    },
});