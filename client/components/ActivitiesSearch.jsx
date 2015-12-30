ActivitiesSearch = React.createClass({
    getInitialState() {
        return this.props.searchQuery;
    },

    handleSubmit() {
        this.props.onSubmit(this.state);
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

    render() {
        console.log(this.state);

        return (
            <div className="activitiesSearch">
                <input type="text" name="numPeople" value={this.state.numPeople || null} placeholder="# People" onChange={this.handleChange} />
                <input type="text" name="budget" value={this.state.budget || null} placeholder="$ Budget" onChange={this.handleChange} />

                <CheckboxSelector
                    title="Duration"
                    name="durations"
                    options={this.props.durations}
                    optionsSelected={this.state.durations}
                    onChange={this.handleChange} />

                <CheckboxSelector
                    title="Activity Types"
                    name="activityTypes"
                    options={this.props.activityTypes}
                    optionsSelected={this.state.activityTypes}
                    onChange={this.handleChange} />

                <button onClick={this.handleSubmit}>Search</button>
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