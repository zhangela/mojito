ActivitiesSearch = React.createClass({

    getInitialState() {
        return {};
    },

    handleSubmit() {
        this.props.onSubmit(this.unsubmittedSearchQuery());
    },

    clearSearch() {
        this.props.onClear();
        this.replaceState({});
    },

    handleChange(event) {
        let value = event.target.value;

        if (_.contains(["numPeople", "budget"], event.target.name)) {
            value = parseInt(value, 10);
        }

        this.setState({
            [event.target.name]: value
        });
    },

    unsubmittedSearchQuery() {
        // _.defaults would actually write directly to this.state
        // if we didn't clone it first, which causes race conditions
        // with this function executed multiple times
        return _.defaults(_.clone(this.state), this.props.searchQuery);
    },

    render() {
        const searchQuery = this.unsubmittedSearchQuery();

        return (
            <div className="activitiesSearch">
                <input type="text" name="numPeople" value={searchQuery.numPeople || null} placeholder="# People" onChange={this.handleChange} />
                <input type="text" name="budget" value={searchQuery.budget || null} placeholder="$ Budget" onChange={this.handleChange} />

                <CheckboxSelector
                    title="Duration"
                    name="durations"
                    options={this.props.durations}
                    optionsSelected={searchQuery.durations}
                    onChange={this.handleChange} />

                <CheckboxSelector
                    title="Activity Types"
                    name="activityTypes"
                    options={this.props.activityTypes}
                    optionsSelected={searchQuery.activityTypes}
                    onChange={this.handleChange} />

                <button onClick={this.handleSubmit}>Search</button>

                <button onClick={this.clearSearch}>Clear</button>

            </div>
        );
    }
});


CheckboxSelector = React.createClass({

    handleChange(event) {

        let optionsSelected = this.props.optionsSelected;

        if (event.target.checked) {
            optionsSelected = _.union(optionsSelected, [event.target.name]);
        } else {
            optionsSelected = _.difference(optionsSelected, [event.target.name]);
        }

        this.props.onChange({
            target: {
                name: this.props.name,
                value: optionsSelected,
            }
        });
    },

    renderOptions() {
        return this.props.options.map((option) => {
            return (
                <label key={option.name} className="option">
                    <input type="checkbox"
                        name={option.name}
                        checked={_.contains(this.props.optionsSelected, option.name)}
                        onChange={this.handleChange} />
                    {option.name}
                </label>
            )
        });
    },

    render() {
        return (
            <div>
                <div>{this.props.title}</div>
                {this.renderOptions()}
            </div>
        );
    }
});