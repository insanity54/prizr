Template.defaultLayout.helpers({
    isAdmin: function() {
        // if user is admin returns true
        console.log(Meteor.user());
        return true;
    }
});