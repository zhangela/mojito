Meteor.publish("ActivityTypes", function() {
    return ActivityTypes.find();
});

Meteor.publish("Activities", function() {
    return Activities.find();
});

Meteor.publish("Activities.single", function(id) {
    return Activities.find(id);
});