export class Clock {
    private hour: number;
    private minute: number;
  
    constructor(hour: number, minute: number = 0) {
      this.hour = hour;
      this.minute = minute;
      this.normalizeTime();
    }
  
    public toString(): string {
      const addHour = this.hour < 10 ? '0' : '';
      const addMinute = this.minute < 10 ? '0' : '';
      return `${addHour}${this.hour}:${addMinute}${this.minute}`;
    }
  
    public plus(minutes: number): Clock {
      this.minute += minutes;
      this.normalizeTime();
      return this;
    }
  
    public minus(minutes: number): Clock {
      this.minute -= minutes;
      this.normalizeTime();
      return this;
    }
  
    public equals(other: Clock): boolean {
      return this.minute === other.minute && this.hour === other.hour;
    }
  
    private normalizeTime(): void {
      while (this.minute >= 60) {
        this.minute -= 60;
        this.hour++;
      }
  
      while (this.minute < 0) {
        this.minute += 60;
        this.hour--;
      }
  
      while (this.hour >= 24) {
        this.hour -= 24;
      }
  
      while (this.hour < 0) {
        this.hour += 24;
      }
    }
  }
  