ActivityItem = React.createClass({
  propTypes: {
    activityItem: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.activityItem.activityName}</li>
    );
  }
});