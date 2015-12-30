ActivityItem = React.createClass({
  propTypes: {
    activityItem: React.PropTypes.object.isRequired
  },

  getDurationRange(item) {
    const minDuration = _.min(_.pluck(item.pricing, "duration"));
    const maxDuration = _.max(_.pluck(item.pricing, "duration"));

    if (minDuration === maxDuration) {
      let unit = 'hours' ;
      if (minDuration === 1) {
        unit = 'hour';
      }
      return `${minDuration} ${unit}`
    }

    return `${minDuration} - ${maxDuration} hours`
  },

  getGroupSize(item) {
    if (item.groupSize.min === item.groupSize.max) {
      return `${item.groupSize.min} people`;
    } else {
      return `${item.groupSize.min} - ${item.groupSize.max} people`
    }
  },

  render() {
    const item = this.props.activityItem;
    return (
      <div className="activityItem">
        <div className="row">
          <div className="col-md-2 ">
            <div style={{backgroundImage: `url(${item.imageUrl})`}} className="activityThumbnail"></div>
          </div>
          <div className="col-md-7">
            <h3>{item.activityName}</h3>
            <div className="company"><i className="fa fa-building-o"/> {item.company}</div>
            <div className="tagline">{item.tagline}</div>
          </div>
          <div className="col-md-3">
            <div className="data">
              <div><i className="fa fa-tag"/> {item.activityType}</div>
              <div><i className="fa fa-dollar"/> {_.min(_.pluck(item.pricing, "perPerson"))}+ per person</div>
              <div><i className="fa fa-clock-o"/> {this.getDurationRange(item)}</div>
              <div><i className="fa fa-users"/> {this.getGroupSize(item)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});