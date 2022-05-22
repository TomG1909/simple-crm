export class Event {
    title: string;
    date!: Date;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.date = obj ? obj.date : '';

    }


    public toJSON() {
        return {
            title: this.title,
            date: this.date,

        }

    }
}