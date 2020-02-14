class Timer {
  constructor(slength, blength) {
    this.slength = slength;
    this.blength = blength;
    this.state = 'start';
    this.currentTimer = 'session';
    this.total = 0;
    this.timeLeft = document.getElementById('time-left');
    this.timerLabel = document.getElementById('timer-label');
    this.audio = document.getElementById('beep');
    this.timer = null;
  }

  updateState(newState) {
    this.state = newState;
  }

  updateTime(slength, blength) {
    this.slength = slength;
    this.blength = blength;
  }
  startTime(slength, blength) {
    let sessionSeconds = Math.floor(slength * 60);
    let breakSeconds = Math.floor(blength * 60);
    this.state = 'running';
    this.intervalTimer(sessionSeconds, breakSeconds);
  }

  pauseTime() {
    this.state = 'paused';
    clearInterval(this.timer);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.state = 'start';
    this.currentTimer = 'session';
    this.timerLabel.textContent = 'Session';
    this.timeLeft.textContent = '25:00';
    this.slength = 25;
    this.blength = 5;
    this.audio.pause();
    this.audio.currentTime = 0;
    document.querySelector('#session-length').textContent = '25';
    document.querySelector('#break-length').textContent = '5';
  }

  resumeTime() {
    this.state = 'running';
    this.currentTimer === 'session'
      ? this.intervalTimer(this.total, this.blength)
      : this.intervalTimer(this.slength, this.total);
  }

  intervalTimer(sessionSeconds, breakSeconds) {
    let total, minutes, seconds;
    // Display Initial Value based on timer
    if (this.currentTimer === 'session') {
      total = sessionSeconds;
      this.total = sessionSeconds;
    } else {
      total = breakSeconds;
      this.total = breakSeconds;
    }
    // Call timer interval every second
    this.timer = setInterval(() => {
      // If timer has been paused, stop the interval
      if (total !== 0 && this.state === 'running') {
        total -= 1;
        this.total = total;
        // Convert total seconds to minutes and seconds
        minutes = Math.floor(total / 60);
        seconds = total - minutes * 60;
        this.timeLeft.textContent = `${
          minutes < 10 ? '0' + minutes : minutes
        }:${seconds < 10 ? '0' + seconds : seconds}`;
      }
      // If time has ran out, switch timers
      else if (total === 0 && this.state === 'running') {
        //clearInterval(timer);
        if (this.currentTimer === 'session') {
          total = breakSeconds;
          // Convert total seconds to minutes and seconds
          minutes = Math.floor(total / 60);
          seconds = total - minutes * 60;
          this.timeLeft.textContent = `${
            minutes < 10 ? '0' + minutes : minutes
          }:${seconds < 10 ? '0' + seconds : seconds}`;
          this.total = total;
          this.currentTimer = 'break';
          this.timerLabel.textContent = 'Break';
        } else {
          total = sessionSeconds;
          // Convert total seconds to minutes and seconds
          minutes = Math.floor(total / 60);
          seconds = total - minutes * 60;
          this.timeLeft.textContent = `${
            minutes < 10 ? '0' + minutes : minutes
          }:${seconds < 10 ? '0' + seconds : seconds}`;
          this.currentTimer = 'session';
          this.timerLabel.textContent = 'Session';
          this.total = total;
        }

        this.audio.play();
      }
    }, 1000);
  }
}

export const timer = new Timer();
