const activityTypes = ['sailing', 'paintball', 'gokart', 'wine and paint', 'cooking class', 'graffiti tour'];


if (Activities.find().count() === 0) {
    Meteor.call("resetCollection");
}

Meteor.methods({
    resetCollection() {
        Activities.remove({});
        ActivityTypes.remove({});

        activityTypes.forEach((activityType) => {
            ActivityTypes.insert({
                name: activityType
            });
        });

        _.range(20).forEach((index) => {
            const durationRange = _.range(1, 10);
            const durations = _.sample(durationRange, _.random(5));

            Activities.insert({
                company: faker.company.companyName(),
                activityType: _.sample(activityTypes),
                activityName: changeCase.title(faker.hacker.adjective() + ' ' + faker.hacker.noun() + ' ' + faker.hacker.ingverb()),
                tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus sagittis mauris, vel blandit elit dapibus sit amet. Nam volutpat eu nunc id faucibus.",
                description: `
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus sagittis mauris, vel blandit elit dapibus sit amet. Nam volutpat eu nunc id faucibus. Suspendisse sit amet vestibulum nibh. Vivamus ornare enim nec sem faucibus, sit amet venenatis est malesuada. Mauris efficitur augue sed accumsan ornare. Cras sit amet neque sed eros pulvinar porta id non risus. Curabitur mollis ligula vel nulla pharetra feugiat dictum fringilla neque. Vivamus accumsan venenatis venenatis. Nullam non interdum enim. Phasellus vel consequat nisl. Aliquam nec interdum dolor, sed volutpat mi.
                    Vivamus sapien urna, vulputate sit amet sapien vitae, efficitur commodo dolor. Phasellus tempor pellentesque quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pulvinar odio et arcu sagittis porta. Pellentesque eleifend libero dui, vitae maximus libero convallis non. Donec imperdiet gravida dapibus. Morbi eu libero condimentum, rutrum enim eget, bibendum velit. Aliquam quis cursus justo, eu ullamcorper leo. Duis iaculis quis mauris sit amet aliquam. Donec malesuada quam eget dui vehicula, non ultricies nisl tristique. Duis faucibus in nibh sed fermentum. Sed vulputate mattis massa.
                `,
                address: {
                    streetAddress: faker.address.streetAddress(),
                    city: faker.address.city(),
                    state: faker.address.state(),
                    zipCode: faker.address.zipCode(),
                    latitude: faker.address.latitude(),
                    longitude: faker.address.longitude()
                },
                pricing: durations.map((duration) => {
                    return {
                        duration: duration,
                        perPerson: _.random(4, 40) * 5,
                    }
                }),
                percentGratuity: _.sample([0, 15]),
                imageUrl: faker.image.imageUrl(),
                groupSize: {
                    min: _.sample([1, 5, 10]),
                    max: _.sample([10, 20, 100]),
                },
                yelpRating: _.random(2, 10)/2
            });
        });
    }
})