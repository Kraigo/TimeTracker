import {debug} from 'util';
export class Task {
    userId: string;
    date: Date;
    time: number = 0;
    description: string;
    lastTrack: Date;
    isTracking: boolean = false;
    timer;

    start(): void {
        var self = this;
        this.lastTrack = new Date();
        this.isTracking = true;

        this.timer = setInterval(function() {
            self.update()
        }, 1000);
    }

    stop(): void {
        clearInterval(this.timer);

        this.update();
        this.time -= this.time % 60000;                
        this.lastTrack = null;
        this.isTracking = false;
    }

    update(): void {        
        if (this.lastTrack instanceof Date === false) {
            this.lastTrack = new Date(this.lastTrack);
        }
        var now: Date = new Date();
        var trackTime: number = now.getTime() - this.lastTrack.getTime();
        this.lastTrack = now;
        this.time = parseInt(this.time) + parseInt(trackTime);
    }
}