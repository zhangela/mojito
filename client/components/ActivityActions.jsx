ActivityActions = React.createClass({
  propTypes: {
    activity: React.PropTypes.object.isRequired,
    searchQuery: React.PropTypes.object.isRequired,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const numPeople = this.getQuoteQuery("numPeople");
    let duration = FlowRouter.getQueryParam("duration") || null;

    let quote = null;

    if (duration && duration !== "unselected") {
      duration = parseInt(duration, 10);
      const perPerson = _.findWhere(this.props.activity.pricing, {duration: duration}).perPerson;
      quote = numPeople * perPerson * (1 + this.props.activity.percentGratuity / 100);
    }

    return {
      quote: quote,
      duration: duration,
      numPeople: numPeople
    };
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
      <div className="ActivityActions">
        <div className="QuoteBox">
          <InputRow label="Number of people">
            <input
              className="numPeople form-control"
              type="text"
              name="numPeople"
              value={this.data.numPeople || null}
              placeholder="# People"
              onChange={this.handleChange} />
          </InputRow>

          <InputRow label="Duration">
            <select
                className="duration form-control"
                name="duration"
                onChange={this.handleChange}>
              <option value="unselected" key="unselected">Select one</option>

              {activity.getSortedPricing().map((pricingObj, i) => {
                return (
                  <option
                      key={pricingObj.duration}
                      value={pricingObj.duration}
                      selected={pricingObj.duration === this.data.duration}>
                    {pricingObj.duration} {this.getHourUnit(pricingObj.duration)}: ${pricingObj.perPerson}/person
                  </option>
                );
              })}
            </select>
          </InputRow>

          <InputRow label="Gratuity">
            <div className="gratuity">
              {activity.percentGratuity}%
            </div>
          </InputRow>

          <hr />

          <InputRow label="Quote">
            <div className="quote">
              ${this.data.quote.toFixed(2) || "N/A"}
            </div>
          </InputRow>
        </div>

        <button className="contactHost btn btn-primary btn-lg btn-block">Contact Host</button>
      </div>
    );
  }
});

InputRow = React.createClass({
  render() {
    return (
      <div className="row InputRow">
        <div className="col-xs-5 inputRowLabel">{this.props.label}</div>
        <div className="col-xs-7">{this.props.children}</div>
      </div>
    );
  }
});