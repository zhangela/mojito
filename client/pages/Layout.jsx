Layout = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        Meteor.subscribe("ActivityTypes");
        return {
            "loginModalState": loginStore.getModalState(),
        };
    },

    render() {
        return (
            <div className="container">
                {this.props.content}

                {this.data.loginModalState.modalOpen && <LoginModal state={this.data.loginModalState} />}
            </div>
        );
    }
});