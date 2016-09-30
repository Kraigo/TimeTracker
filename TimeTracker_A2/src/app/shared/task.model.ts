import {debug} from 'util';
export class Task {
    _id: string;
    userId: string;
    time: number = 0;
    description: string;
    lastTrack: Date;
    isTracking: boolean = false;
    timer;

    constructor (
        public date?: Date
    ) {}

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
        // if (this.lastTrack instanceof Date === false) {
            // this.lastTrack = new Date(this.lastTrack);
        // }
        var now: Date = new Date();
        var trackTime: number = now.getTime() - this.lastTrack.getTime();
        this.lastTrack = now;
        this.time = Math.floor(this.time) + Math.floor(trackTime);
    }
}