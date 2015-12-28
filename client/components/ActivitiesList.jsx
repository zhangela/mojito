ActivitiesList = React.createClass({
  propTypes: {
    activities: React.PropTypes.array.isRequired
  },
  render() {
    return (
      <ul>
        {
          this.props.activities.map((activityItem) => {
            return <ActivityItem activityItem={activityItem} key={activityItem._id} />;
          })
        }
      </ul>
    );
  }
});