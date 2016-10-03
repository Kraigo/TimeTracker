module.exports = function(app) {
    app.factory('Task', ['$interval',
        function($interval) {

            var Task = function(options) {
                this.userId = null;
                this.date = new Date();
                this.time = 0;
                this.description = '';
                this.lastTrack = null;
                this.isTracking = false;

                angular.extend(this, options);

                if (this.isTracking) {
                    this.update();
                    this.start();
                }
            };

            Task.prototype = {
                start: function(froDate) {
                    var self = this;
                    this.lastTrack = new Date();
                    this.isTracking = true;

                    this.timer = $interval(function() {
                        self.update();
                    }, 1000)
                },
                stop: function() {
                    $interval.cancel(this.timer);
                    this.update();
                    this.time -= this.time % 60000;
                    this.lastTrack = null;
                    this.isTracking = false;
                },
                update: function() {
                    if (this.lastTrack instanceof Date === false) {
                        this.lastTrack = new Date(this.lastTrack);
                    }
                    var now = new Date();
                    var trackTime = now - this.lastTrack;
                    this.lastTrack = now;
                    this.time = parseInt(this.time) + parseInt(trackTime);
                }
            }
            return Task;
        }
    ]);
}