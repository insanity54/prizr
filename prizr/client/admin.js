Template.admin.events({
    'click #add-sample-prizes': function(event) {
        Meteor.call('addSamplePrizes');
    },
    
    'click #delete-prizes': function(event) {
        Meteor.call('deletePrizes');
    },
    
    'click #delete-transactions': function(event) {
        Meteor.call('deleteTransactions');
    }
});