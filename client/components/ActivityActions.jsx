ActivityActions = React.createClass({
  propTypes: {
    activity: React.PropTypes.object.isRequired,
    searchQuery: React.PropTypes.object.isRequired,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const numPeople = this.getQuoteQuery("numPeople");
    let duration = FlowRouter.getQueryParam("duration") || null;

    if (duration && duration !== "unselected") {
      duration = parseInt(duration, 10);
      const perPerson = _.findWhere(this.props.activity.pricing, {duration: duration}).perPerson;
      const quote = numPeople * perPerson * (1 + this.props.activity.percentGratuity / 100);
      return {quote: quote}
    }
    return {quote: null};
  },

  getQuoteQuery(key) {
    if (FlowRouter.getQueryParam(key) === undefined) {
      return this.props.searchQuery[key];
    }
    return FlowRouter.getQueryParam(key);
  },

  getHourUnit(value) {
    if (value === 1) {
      return "hour";
    }
    return "hours";
  },

  handleChange(event) {
    console.log(event.target.value);
    FlowRouter.withReplaceState(function() {
      FlowRouter.setQueryParams({
          [event.target.name]: event.target.value,
      });
    });
  },

  render() {
    const searchQuery = this.props.searchQuery;
    const activity = this.props.activity;

    return (
      <div className="activityActions">
          <input type="text" name="numPeople" value={this.getQuoteQuery('numPeople') || null} placeholder="# People" onChange={this.handleChange} />
          <select name="duration" onChange={this.handleChange}>
            <option value="unselected" key="unselected">Select one</option>
            {activity.getSortedPricing().map((pricingObj, i) => {
              return (
                <option key={pricingObj.duration} value={pricingObj.duration}>
                  {pricingObj.duration} {this.getHourUnit(pricingObj.duration)}: ${pricingObj.perPerson}
                </option>
              );
            })}
          </select>
          <div>Gratuity: {activity.percentGratuity}%</div>
          <div>
            {this.data.quote}
          </div>
      </div>
    );
  }
});