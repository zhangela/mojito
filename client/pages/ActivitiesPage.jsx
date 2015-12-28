ActivitiesPage = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            activities: Activities.find().fetch()
        };
    },

    render() {
        return (
            <ActivitiesList activities={this.data.activities}/>
        );
    }
});