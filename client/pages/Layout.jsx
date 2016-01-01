Layout = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        Meteor.subscribe("ActivityTypes");
        return {};
    },

    render() {
        return (
            <div className="container">
                {this.props.content}
            </div>
        );
    }
});