Activities = new Mongo.Collection('Activities');


Activities.helpers({
  getDurationRange() {
    const minDuration = _.min(_.pluck(this.pricing, "duration"));
    const maxDuration = _.max(_.pluck(this.pricing, "duration"));

    if (minDuration === maxDuration) {
      let unit = 'hours' ;
      if (minDuration === 1) {
        unit = 'hour';
      }
      return `${minDuration} ${unit}`
    }

    return `${minDuration} - ${maxDuration} hours`
  },

  getGroupSize() {
    if (this.groupSize.min === this.groupSize.max) {
      return `${this.groupSize.min} people`;
    } else {
      return `${this.groupSize.min} - ${this.groupSize.max} people`
    }
  },

  getSortedPricing() {
    return _.sortBy(this.pricing, 'duration');
  },

});