ActivityActions = React.createClass({
  propTypes: {
    activity: React.PropTypes.object.isRequired,
    searchQuery: React.PropTypes.object.isRequired,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const numPeople = this.getNumPeopleFromUrl();
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

  getInitialState() {
    return {
      errors: {}
    };
  },

  getNumPeopleFromUrl() {
    if (FlowRouter.getQueryParam("numPeople") === undefined) {
      return this.props.searchQuery["numPeople"];
    }
    return parseInt(FlowRouter.getQueryParam("numPeople"), 10);
  },

  getHourUnit(value) {
    if (value === 1) {
      return "hour";
    }
    return "hours";
  },

  handleChange(event) {
    const fieldName = event.target.name;

    const errors = this.state.errors;
    delete errors[fieldName];
    this.setState({
      errors: errors
    });

    FlowRouter.withReplaceState(function() {
      FlowRouter.setQueryParams({
        [fieldName]: event.target.value,
      });
    });
  },

  onContactHost() {
    Activities.methods.contactHost.call({
      activityId: this.props.activity._id,
      numPeople: this.data.numPeople,
      duration: this.data.duration,
    }, (err, res) => {
      if (err) {
        this.setState({
          errors: _.indexBy(err.details, "name")
        });

        return;
      }

      // Method call succeeded, so there are no validation errors
      this.setState({
        errors: null
      });

      // TODO: do something useful
    });
  },

  errorMessage(field) {
    if (! this.state.errors[field]) {
      return null;
    }

    const activity = this.props.activity;

    return {
      numPeople: `Please enter a number between
        ${activity.groupSize.min} and ${activity.groupSize.max}.`,
      duration: "Please select an option from the dropdown."
    }[field];
  },

  render() {
    const searchQuery = this.props.searchQuery;
    const activity = this.props.activity;

    return (
      <div className="ActivityActions">
        <div className="QuoteBox">
          <InputRow
              label="Number of people"
              errorMsg={this.errorMessage("numPeople")}>
            <input
              className="numPeople form-control"
              type="text"
              name="numPeople"
              value={this.data.numPeople || null}
              placeholder="# People"
              onChange={this.handleChange} />
          </InputRow>

          <InputRow
              label="Duration"
              errorMsg={this.errorMessage("duration")}>
            <select
                className="duration form-control"
                name="duration"
                onChange={this.handleChange}
                value={this.data.duration}>
              <option value="unselected" key="unselected">Select one</option>

              {activity.getSortedPricing().map((pricingObj, i) => {
                return (
                  <option
                      key={pricingObj.duration}
                      value={pricingObj.duration}>
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
              {(this.data.quote && `$${this.data.quote.toFixed(2)}`) || "N/A"}
            </div>
          </InputRow>
        </div>

        <button className="contactHost btn btn-primary btn-lg btn-block" onClick={this.onContactHost}>
          Contact Host
        </button>
      </div>
    );
  }
});

InputRow = React.createClass({
  render() {
    return (
      <div className="row InputRow">
        <div className="col-xs-5 inputRowLabel">{this.props.label}</div>
        <div className="col-xs-7">
          {this.props.children}
          <div className="error">
            {this.props.errorMsg}
          </div>
        </div>
      </div>
    );
  }
});