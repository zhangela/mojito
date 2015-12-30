ActivityItem = (props) => {
  const item = props.activityItem;
  return (
    <div className="activityItem">
      <div className="row">
        <div className="col-md-2 ">
          <div style={{backgroundImage: `url(${item.imageUrl})`}} className="activityThumbnail"></div>
        </div>
        <div className="col-md-7">
          <h3><a href={`/activity/${item._id}`}>{item.activityName}</a></h3>
          <div className="company"><i className="fa fa-building-o"/> {item.company}</div>
          <div className="tagline">{item.tagline}</div>
        </div>
        <div className="col-md-3">
          <div className="data">
            <div><StarRating rating={item.yelpRating} /></div>
            <div><i className="fa fa-tag"/> {item.activityType}</div>
            <div><i className="fa fa-dollar"/> {_.min(_.pluck(item.pricing, "perPerson"))}+ per person</div>
            <div><i className="fa fa-clock-o"/> {item.getDurationRange()}</div>
            <div><i className="fa fa-users"/> {item.getGroupSize()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};