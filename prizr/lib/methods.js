// 



Meteor.methods({
    addBlock: function(params) {
        // @todo only the server can call this
        // Make sure the user is logged in before inserting a task
        // if (! Meteor.userId()) {
        //   throw new Meteor.Error("not-authorized");
        // }
        
        // params are as follows
        // params.color
        // params.symbol
        // params.gameId

        console.log('add block called with params: ' + params);
        console.dir(params);
        // get the game id from the user (@todo this is testing porpoises only)
        var gameId = params.gameId.toLowerCase();
        var isValidId = /[0-9a-f]{24}$/i.test(gameId);
        if (!isValidId) throw new Meteor.Error("invalid game ID");
        console.log('game id is valid!');
        var obj = new Mongo.ObjectID(gameId);
        Prizr.update({
            '_id': obj
        }, {
            $push: {
                blocks: {}
            }
        });
    },
    createQr: function(gameId) {
        // generate a unique qr code when a user enters a game.
        // if user is not logged in/registered, generate an error message instead
        // generate an id to associate the payment with a user.
        // if user pays using the bitcoin qr code, match the id with the user now we know which user to attribute the block to
        console.log('creating qr code');
        var userId = Meteor.userId();
        if (!userId) return { err: true, message: "please log in to play!" };
        
        // @todo get bitcoin address from bitpay or bitcore
        //var bitcoinAddress = Math.floor(Math.random() * 1000000000000000000);
        var bitcoinAddress = '1234567890';
        
        //console.log('tid: ' + transactionId);
        console.log('bit: ' + bitcoinAddress);


        
        // create a new game session
        var sesh = Meteor.call('createSession', {userId: userId, gameId: gameId});
        
        return {err: false, session: sesh};
        
        // associate this qr code with user
        //console.log('associate user ' + Meteor.userId() + ' with tid ' + transactionId.valueOf() + ' and gid: ' + gameId);
        //Meteor.users.update({'_id': userId}, {$push: {transactions: transactionId.valueOf()}});
    
        //return {err: false, bitcoinAddress: bitcoinAddress};

    },
    /**
     * Creates a game session. session is only active while the user has the window open, and a few minutes after.
     * Session creates a transaction. transaction lets server know which bitcoin address is paired with which game.
     * Session is a reactive data source for the QR code on the user's screen. when a payment is sent to the qr code, the backend creates a new transaction,
     * and updates the session's qr code.
     * 
     * @param {Object} params - object containing parameters
     * @param {string} params.gameId - the ID of the current game
     * @param {string} params.userId - the ID of the current user
     */
    createGame: function(params) {
        
        
        // get a bitcoin address thru bitpay api
        // create new transaction
        // create new session
        
        ////
        
        // get bitcoin address from bitpay
        
        console.log(bitcoin.test());
        return true;
        
        var sesh = Session.insert({
            'qr': '1234567890'
        });
        
        
        return sesh;
    },
    receivePayment: function(params) {
        
        // from bitcoin address, find associated transaction id
        // from transaction id, find game and user

        
        // If this is a duplicate payment to a unique qr code, refund bitcoin, return.
        // If last block has already been purchased, refund bitcoin, return.
        // from user, find block color and block symbol
        // add block to appropriate game/prize
        
        ////

        // from bitcoin address, find associated tid, gid, uid.
        console.log('receiving payment. btc address: ' + params.bitcoinAddress + ' amt: ' + params.amt);
        var transaction = Transactions.findOne({bitcoinAddress: params.bitcoinAddress});
        if (!transaction) return Meteor.Error('no matching transaction for address ' + params.bitcoinAddress);
        console.log('found trans: ' + transaction);
        console.dir(transaction);
        var transactionId = transaction._id.valueOf();
        var gameId = transaction.gameId;
        
        // get user's other payments
        // get user's block color and symbol from user
        var user = Meteor.users.findOne({transactions: transactionId});
        if (!user) return Meteor.Error('no user has that transaction id ' + transactionId);
        
        // If this is a duplicate payment to a unique qr code, refund bitcoin, return.
        if (transaction.amt) return Meteor.Error('duplicate pmt'); // @todo be graceful

        // If last block has already been purchased, refund bitcoin, return.
        var prize = Prizr.findOne({'_id': new Mongo.ObjectID(gameId)});
        console.log('prize belonging to: ' + prize.title);
        //console.dir(prize);
        if (prize.blocks.length >= prize.blocksToWin) return Meteor.Error('no blocks available, prize already won.'); // @todo send refund
        
        // add a block
        return Meteor.call('addBlock', {gameId: gameId, color: user.color, symbol: user.symbol});
    },
    addSamplePrizes: function() {
        if (!Meteor.userId()) throw new Meteor.Error("not-authorized");
        console.log('adding sample prizes');
        Prizr.insert({
            title: "pebble",
            description: "earth crumb",
            picture: "https://placehold.it/150x150",
            rarity: 1,
            blocks: [],
            blocksToWin: 5,
            active: true
        });
        
        Prizr.insert({
            title: "stalagmite",
            description: "earth booger",
            picture: "https://placehold.it/150x150",
            rarity: 3,
            blocks: [],
            blocksToWin: 6,
            active: true            
        });
        
        Prizr.insert({
            title: "resistor",
            description: "10kOhm",
            picture: "https://placehold.it/150x150",
            rarity: 1,
            blocks: [{}, {}],
            blocksTowin: 5,
            active: true
        });
    },
    deletePrizes: function() {
        if (!Meteor.userId()) throw new Meteor.Error("not-authorized");
        Prizr.remove({}); // @todo get rid of this
    },
    deleteTransactions: function() {
        if (!Meteor.userId()) throw new Meteor.Error("not auth");
        Transactions.remove({}); 
    }
});
