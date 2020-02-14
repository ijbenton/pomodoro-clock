import { timer } from './timer';

// UI Selectors
const playPauseBtn = document.getElementById('start_stop');
const resetBtn = document.getElementById('reset');
const breakIncrementBtn = document.getElementById('break-increment');
const breakDecrementBtn = document.getElementById('break-decrement');
const sessionIncrementBtn = document.getElementById('session-increment');
const sessionDecrementBtn = document.getElementById('session-decrement');
const timeLeft = document.getElementById('time-left');
const breakLengthEl = document.getElementById('break-length');
const sessionLengthEl = document.getElementById('session-length');

// Event listeners
// Increment click events
breakIncrementBtn.addEventListener('click', function(e) {
  incrementTime('break');
  e.preventDefault();
});
sessionIncrementBtn.addEventListener('click', function(e) {
  incrementTime('session');
  e.preventDefault();
});
// Decrement click events
breakDecrementBtn.addEventListener('click', function(e) {
  decrementTime('break');
  e.preventDefault();
});
sessionDecrementBtn.addEventListener('click', function(e) {
  decrementTime('session');
  e.preventDefault();
});
// Play/Pause click event
playPauseBtn.addEventListener('click', handlePlayPauseClick);
// Reset click event
resetBtn.addEventListener('click', handleResetClick);

function handlePlayPauseClick(e) {
  //   const breakLength = document.getElementById('break-length');
  //   const sessionLength = document.getElementById('session-length');
  if (timer.state === 'start') {
    timer.startTime(
      parseInt(sessionLengthEl.textContent),
      parseInt(breakLengthEl.textContent)
    );
  } else if (timer.state === 'running') {
    timer.pauseTime();
  } else if (timer.state === 'paused') {
    timer.resumeTime();
  }

  e.preventDefault();
}

function handleResetClick(e) {
  timer.resetTimer();
  e.preventDefault();
}

function incrementTime(timerType) {
  if (timer.state === 'running') return; // If timer is running time cannot be changed
  //   const breakLengthEl = document.getElementById('break-length');
  //   const sessionLengthEl = document.getElementById('session-length');
  let breakLength = parseInt(breakLengthEl.textContent);
  let sessionLength = parseInt(sessionLengthEl.textContent);
  if (timerType === 'break' && breakLength < 60) {
    breakLengthEl.textContent = ++breakLength;
    timer.updateTime(sessionLength, breakLength);
    if (timer.currentTimer === 'break') {
      timeLeft.textContent = `${
        breakLength < 10 ? '0' + breakLength : breakLength
      }:00`;
      timer.updateState('start');
    }
  } else if (timerType === 'session' && sessionLength < 60) {
    sessionLengthEl.textContent = ++sessionLength;
    timer.updateTime(sessionLength, breakLength);
    if (timer.currentTimer === 'session') {
      timeLeft.textContent = `${
        sessionLength < 10 ? '0' + sessionLength : sessionLength
      }:00`;
      timer.updateState('start');
    }
  }
}
function decrementTime(timerType) {
  if (timer.state === 'running') return; // If timer is running time cannot be changed
  //   const breakLengthEl = document.getElementById('break-length');
  //   const sessionLengthEl = document.getElementById('session-length');
  let breakLength = parseInt(breakLengthEl.textContent);
  let sessionLength = parseInt(sessionLengthEl.textContent);
  if (timerType === 'break' && breakLength > 1) {
    breakLengthEl.textContent = --breakLength;
    timer.updateTime(sessionLength, breakLength);
    if (timer.currentTimer === 'break') {
      timeLeft.textContent = `${
        breakLength < 10 ? '0' + breakLength : breakLength
      }:00`;
      timer.updateState('start');
    }
  } else if (timerType === 'session' && sessionLength > 1) {
    sessionLengthEl.textContent = --sessionLength;
    timer.updateTime(sessionLength, breakLength);
    if (timer.currentTimer === 'session') {
      timeLeft.textContent = `${
        sessionLength < 10 ? '0' + sessionLength : sessionLength
      }:00`;
      timer.updateState('start');
    }
  }
}
