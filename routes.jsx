FlowRouter.route("/activities", {
    action() {
        ReactLayout.render(Layout, {
            content: <ActivitiesPage />
        })
    }
});

FlowRouter.route("/activity/:id", {
    action() {
        ReactLayout.render(Layout, {
            content: <ActivityPage />
        })
    }
});