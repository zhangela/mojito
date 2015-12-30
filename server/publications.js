Meteor.publish("ActivityTypes", function() {
    return ActivityTypes.find();
});

Meteor.publish("Activities", function() {
    return Activities.find();
});