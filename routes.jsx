FlowRouter.route("/activities", {
    action() {
        ReactLayout.render(Layout, {
            content: <ActivitiesPage />
        })
    }
});

FlowRouter.route("/activity/:id", {
    name: "activityPage",
    action() {
        ReactLayout.render(Layout, {
            content: <ActivityPage />
        })
    }
});