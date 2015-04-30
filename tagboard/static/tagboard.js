'use strict';

$(document).ready(function() {
    var SEED_URL = '/messages/approved';
    var UPDATE_URL = '/messages/approved/unseen/';
    var messages_tank = [];
    var last_timestamp = '';
    var tile_ids = ["c1", "#c2", "#c3", "#c4", "#c5", "#c6", "#c7", "#c8", "#c9"];
    var tile_objs = [];

    function random_delay() {
        return Math.random() * 2000;
    }

    function remove_random(arr) {
        var index = Math.floor(Math.random() * arr.length);
        //if (arr.length === 0) {
        //    return "";
        //} else {
        //    return arr.splice(index, 1)[0];
        //}
        return arr[index];
    }

    function Tile(id) {
        this.id = id;
        this.message = {};
    }

    Tile.prototype.run = function run() {
        var self = this;
        function load() {
            self.message = remove_random(messages_tank);
            var wait = random_delay() * 2 + 1000;
            $(self.id + " span").fadeIn(1000).text(self.message.text).delay(wait);
            window.setTimeout(close, 1000 + wait);
        }

        function close() {
            //messages_tank.push(self.message);
            var wait = random_delay() + 1000;
            $(self.id + " span").fadeOut(1000).delay(wait);
            window.setTimeout(load, 1000 + wait);
        }

        window.setTimeout(load, random_delay());
    };

    function update_tank() {
        $.get(UPDATE_URL + last_timestamp, function(data) {
            console.log(data.messages);
            messages_tank = messages_tank.concat(data.messages);
            last_timestamp = data.timestamp;

            window.setTimeout(update_tank, 2000);
        });
    }


    function seed_tank() {
        $.get(SEED_URL, function(data) {
            messages_tank = data.messages;
            last_timestamp = data.timestamp;

            tile_objs = tile_ids.map(function (id) {
                return new Tile(id);
            });
            tile_objs.forEach(function(tile) {
                tile.run();
            });

            window.setTimeout(update_tank, 2000);
        });
    }

    seed_tank();
});

