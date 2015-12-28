const activityTypes = ['sailing', 'paintball', 'gokart', 'wine and paint', 'cooking class', 'graffiti tour'];


if (Activities.find().count() === 0) {
    _.range(20).forEach((index) => {
        Activities.insert({
            company: faker.company.companyName(),
            activityType: _.sample(activityTypes),
            activityName: changeCase.title(faker.hacker.adjective() + ' ' + faker.hacker.noun() + ' ' + faker.hacker.ingverb()),
            description: faker.lorem.paragraphs(),
            address: {
                streetAddress: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zipCode: faker.address.zipCode(),
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
            },
            pricing: _.range(_.random(1, 5)).map((numDurations) => {
                return {
                    duration: _.random(1, 8),
                    perPerson: _.random(4, 40) * 5,
                }
            }),
            percentGratuity: _.sample([0, 15]),
            imageUrl: faker.image.imageUrl(),
            groupSize: {
                min: _.sample([1, 5, 10]),
                max: _.sample([10, 20, 100]),
            }
        });
    });
}
