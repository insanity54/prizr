// Main route
Router.route('/',
    function() {
        this.layout('defaultLayout');
        this.render('games');
        this.render('defaultFooter', {to:  'footer' });
    }, {
        name: 'games.show'
    });


// Route for each individual line
// Router.route(
//     '/game/:_id',
//     function() {
//         // if the id is a valid prize, render.
//         var object = new Mongo.ObjectID(Router.params._id);
//         if (!Prizr.findOne({'_id': object})) throw new Meteor.Error('URL not valid');
//         this.render('game');
//     }, {
//         name: 'game.show'
//     });


//Router.plugin('dataNotFound', {notFoundTemplate: 'notfound'});
Router.route(
    '/game/:_id',
    function () {
        this.layout('defaultLayout');
        this.render('game');
        this.render('defaultFooter', {to: 'footer'});
    }, {
        data: function () {
            // if data is falsy the dataNotFoundPlugin above will render a not found
            // template. Change data to a non-falsy value to see the actual home
            // template.
            return null;
        },
        name: 'game.show'
    });