
Template.games.helpers({
    prizes: function() {
        var prizes = Prizr.find({});
        if (prizes.count() === 0) return null;
        console.log('there are ' + prizes.count() + ' prizes.');
        return prizes;
    },
    getId: function() {
      return this._id.valueOf();
    },
    progressWidth: function() {
        return this.blockProgress/this.blocksToWin*100; // css progress bar width
    }
});

Template.games.events({
    'click img': function() {
        // go to the game the user clicked
        //render('game', {prize: this._id});
    }
});
