export class Task {
    userId: string;
    date: Date;
    time: number;
    description: string;
    lastTrack: Date;
    isTracking: boolean = false;
    timer: number;

    // start(): void {
    //     var self = this;
    //     this.lastTrack = new Date();
    //     this.isTracking = true;

    //     this.timer = setInterval(() => self.update());
    // }

    // stop(): void {
    //     clearInterval(this.timer);

    //     this.update();
    //     this.time -= this.time % 60000;                
    //     this.lastTrack = null;
    //     this.isTracking = false;
    // }

    // update(): void {        
    //     if (this.lastTrack instanceof Date === false) {
    //         this.lastTrack = new Date(this.lastTrack.toString());
    //     }
    //     var now = new Date();
    //     var trackTime = now - this.lastTrack;
    //     this.lastTrack = now;
    //     this.time = parseInt(this.time) + parseInt(trackTime);
    // }
}