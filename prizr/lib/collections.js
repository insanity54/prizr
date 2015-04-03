Prizr = new Mongo.Collection("prizr", {idGeneration: "MONGO"}); // collection of prizes and game status
Transactions = new Mongo.Collection("transactions", {idGeneration: "MONGO"}); // collection of payment information, who bought what, etc.
Session = new Mongo.Collection("session", {idGeneration: "MONGO"}); // store active game sessions