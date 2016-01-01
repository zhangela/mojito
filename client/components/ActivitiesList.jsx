ActivitiesList = React.createClass({
  propTypes: {
    activities: React.PropTypes.array.isRequired,
    searchQuery: React.PropTypes.object.isRequired,
  },
  render() {
    return (
      <div>
        {
          this.props.activities.map((activityItem) => {
            return <ActivityItem
              activityItem={activityItem}
              key={activityItem._id}
              searchQuery={this.props.searchQuery}
              />;
          })
        }
      </div>
    );
  }
});