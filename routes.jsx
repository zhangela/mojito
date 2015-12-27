FlowRouter.route("/activities", {
    action() {
        ReactLayout.render(Layout, {
            content: <ActivitiesPage />
        })
    }
});