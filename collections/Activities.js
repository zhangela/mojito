Activities = new Mongo.Collection('Activities');

Activities.helpers({
  activityType() {
    return ActivityTypes.findOne({_id: this.activityTypeId});
  }
});