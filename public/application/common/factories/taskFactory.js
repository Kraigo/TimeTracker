module.exports = function(app) {
    app.factory('Task', ['$interval',
        function($interval) {

            var Task = function(options) {
                this.userId = null;
                this.date = new Date();
                this.time = 0;
                this.description = '';
                this.track = null;
                this.isTracking = false;

                angular.extend(this, options);
            };

            Task.prototype = {
                start: function() {
                    var self = this;
                    this.track = new Date();
                    this.isTracking = true;

                    this.timer = $interval(function() {
                        self.update();
                    }, 1000)
                },
                stop: function() {
                    $interval.cancel(this.timer);
                    this.update();
                    this.track = null;
                    this.isTracking = false;
                },
                update: function() {
                    var trackTime = new Date() - this.track;
                    this.time += parseInt(trackTime / 1000);
                    this.track = new Date();
                }
            }
            return Task;
        }
    ]);
}