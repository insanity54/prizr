Template.game.helpers({
    prize: function() {
        var current = Router.current().params._id;
        var object = new Mongo.ObjectID(current);
        //console.log('PRISE TIME: ' + current);
        return Prizr.findOne({
            '_id': object
        });
    },
    qr: function() {
        Meteor.call("createGame", Router.current().params._id, function(err, res) {
            if (res.err) return res.message;
            return res.session.qr;
        });
    }
});

Template.game.events({
    'click #simulate-purchase': function(event) {
        // purchase a block
        //   add a block
        //   if blocks.length == blocksToWin, 
        //     winning client actions
        //       break wall
        //       notify of win
        //     losing client actions
        //       break wall
        //       notify of loss
        //     server actions
        //       mark prize as won
        //       add prize send notification to admin queue

        console.log(event);

        // add a block
        // var current = Router.current().params._id;
        var amt = 0.005;
        Meteor.call("receivePayment", {
            bitcoinAddress: '1234567890',
            amt: amt
        });
        //var object = new Mongo.ObjectID(current);
        //Prizr.insert({'_id': current}, {$push: {blocks: {}}});
    }
});

Template.game.rendered = function() {

    var current = Router.current().params._id;
    var object = new Mongo.ObjectID(current);
    var cursor = Prizr.find({
        '_id': object
    });

    this.handle = cursor.observeChanges({
        changed: function(id, prize) {
            //console.log('prize blocks: ' + prize.blocks);
            //console.dir(prize.blocks);            
            rects = prize.blocks;
            update();
            caps1.play();
        }
    });


    // Enable modal triggering with + button
    //var points = [3, 3, 3, 3, 3];
    var rects = [{}, {}, {}, {}, {}];

    var width = 500;
    var height = 500;

    // var pointGrid = d3.layout.grid()
    //   .points()
    //   .size([360, 360]);

    var rectGrid = d3.layout.grid()
        .bands()
        .size([360, 360])
        .padding([0.1, 0.1]);

    var svg = d3.select(".blocks").append("svg")
        .attr({
            width: width,
            height: height
        })
        .append("g")
        .attr("transform", "translate(70,70)");

    //var tick = setInterval(push, 500);

    function update() {
        //   var point = svg.selectAll(".point")
        //     .data(pointGrid(points));
        //   point.enter().append("circle")
        //     .attr("class", "point")
        //     .attr("r", 1e-6)
        //     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        //   point.transition()
        //     .attr("r", 5)
        //     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        //   point.exit().transition()
        //     .attr("r", 1e-6)
        //     .remove();

        var rect = svg.selectAll(".rect")
            .data(rectGrid(rects));
        rect.enter().append("rect")
            .attr("class", "rect")
            .attr("width", rectGrid.nodeSize()[0])
            .attr("height", rectGrid.nodeSize()[1])
            .attr("transform", function(d) {
                return "translate(" + (d.x) + "," + d.y + ")";
            })
            .style("opacity", 1e-6);
        rect.transition()
            .attr("width", rectGrid.nodeSize()[0])
            .attr("height", rectGrid.nodeSize()[1])
            .attr("transform", function(d) {
                return "translate(" + (d.x) + "," + d.y + ")";
            })
            .style("opacity", 1);
        rect.exit().transition()
            .style("opacity", 1e-6)
            .remove();
    }

    function push() {
        //   points.push({});
        rects.push({});
        update();
        //   if (points.length > 15) {
        //     clearInterval(tick);
        //     tick = setInterval(pop, 500);
        //   }
    }

    function pop() {
        //   points.pop();
        rects.pop();
        update();
        //if (points.length < 2) {
        //clearInterval(tick);
        //tick = setInterval(push, 500);
        //}
    }

    update();
};


Template.game.destroyed = function() {
    this.handle.stop();
};