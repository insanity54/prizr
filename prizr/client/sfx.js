var tap = new buzz.sound("/sounds/tap", { formats: [ "ogg", "mp3", "aac", "wav" ] });
var fail = new buzz.sound("/sounds/fail", { formats: [ "ogg", "mp3", "aac", "wav" ]});
var win = new buzz.sound("/sounds/tada", { formats: [ "ogg", "mp3", "aac", "wav" ]});
caps1 = new buzz.sound("/sounds/caps", { formats: [ "ogg", "mp3", "aac", "wav" ]});
var caps2 = new buzz.sound("/sounds/caps2", { formats: [ "ogg", "mp3", "aac", "wav" ]});

win.load().play();
caps1.load();