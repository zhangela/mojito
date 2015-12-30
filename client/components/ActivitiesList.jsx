ActivitiesList = React.createClass({
  propTypes: {
    activities: React.PropTypes.array.isRequired
  },
  render() {
    return (
      <div>
        {
          this.props.activities.map((activityItem) => {
            return <ActivityItem activityItem={activityItem} key={activityItem._id} />;
          })
        }
      </div>
    );
  }
});