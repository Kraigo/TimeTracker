interface TaskOptions {
    _id?: string;
    user?: string;
    time?: number
    description?: string;
    lastTrack?: Date;
    isTracking?: boolean;
    project?: string;
    date?: Date;
}

export class Task implements TaskOptions {
    _id: string;    
    user: string;
    time: number = 0;    
    description: string;
    lastTrack: Date;
    isTracking: boolean = false;
    project: string;
    category: string;
    date: Date = new Date();
    private timer;

    constructor (
        options: TaskOptions
    ) {
        Object.assign(this, {}, options);

        if (this.date && !(this.date instanceof Date)) {
            this.date = new Date(this.date);
        }

        if (this.lastTrack) {
            this.lastTrack = new Date(this.lastTrack);
        }
        
        if (this.isTracking) {
            this.update();
            this.start();
        }
    }

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

        if (!this.lastTrack) return;
        
        var now: Date = new Date();
        var trackTime: number = now.getTime() - this.lastTrack.getTime();
        this.lastTrack = now;
        this.time = Math.floor(this.time) + Math.floor(trackTime);
    }
}