ActivityPage = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {

        const activitySubscription = Meteor.subscribe("Activities.single", this.getActivityId());

        const data = {
            activityReady: activitySubscription.ready(),
            activity: Activities.findOne(this.getActivityId()),
        };

        return data;
    },


    getActivityId() {
        return FlowRouter.getParam("id");
    },

    render() {
        if (this.data.activityReady) {
            return (
                <ActivityDetailed activity={this.data.activity} />
            );
        } else {
            return <div></div>;
        }
    },
});