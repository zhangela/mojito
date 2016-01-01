ActivityDetailed = (props) => {
  const activity = props.activity;
  return (
    <div className="activityDetailed">
    <div style={{backgroundImage: `url(${activity.imageUrl})`}} className="banner"></div>

      <div className="row">
        <div className="col-md-8">
          <h1>{activity.activityName}</h1>
            <div className="company"><i className="fa fa-building-o"/> {activity.company}</div>

          <div className="data">
            <div className="dataItem"><StarRating rating={activity.yelpRating} /></div>
            <div className="dataItem"><i className="fa fa-tag"/> {activity.activityType}</div>
            <div className="dataItem"><i className="fa fa-dollar"/> {_.min(_.pluck(activity.pricing, "perPerson"))}+ per person</div>
            <div className="dataItem"><i className="fa fa-clock-o"/> {activity.getDurationRange()}</div>
            <div className="dataItem"><i className="fa fa-users"/> {activity.getGroupSize()}</div>
          </div>

          <hr />

          <div className="tagline">{activity.tagline}</div>
          <div className="description">{activity.description}</div>
        </div>
        <div className="col-md-4">
            <ActivityActions activity={activity} searchQuery={props.searchQuery} />
        </div>
      </div>
    </div>
  );
};