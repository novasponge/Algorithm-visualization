import Stick from './stick';
import { Util } from './util';
import { merge } from 'lodash';

class Sticks {
  constructor () {
    this.DIM_X = 1024;
    this.DIM_Y = 110;
    this.sticks = [];
    this.NUM_STICK = 99;
    this.MID_NUM = (this.NUM_STICK - 1) / 2;
    this.dangle = Math.PI/180;
    this.addSticks(this.ctx);
    this.cons = 0;
    this.traces = [];
    this.operationState = "";
    this.numComparisons = 0;
    this.numSwaps = 0;
    this.shuffle = false;
  }

  getNumComparisons () {
    return this.numComparisons;
  }

  getNumSwaps () {
    return this.numSwaps;
  }

  addSticks () {
    const mid_stick = new Stick({lineHead:[512, 80], lineTail:[512,20]});
    this.sticks.push(mid_stick);

    for (let i = 1; i < this.MID_NUM+1; i++) {
      let leftOne = merge({},this.sticks[0]);
      let leftAngle = Math.PI/2 - (this.dangle * i);
      let rightOne =  merge({}, this.sticks[this.sticks.length-1]);
      let rightAngle = Math.PI/2 + (this.dangle * i);

      leftOne.lineHead = [leftOne.lineHead[0] - 8, leftOne.lineHead[1]];
      leftOne.lineTail = Util.findLineTail(leftOne.lineHead, leftAngle);
      this.sticks.unshift(new Stick(leftOne));

      rightOne.lineHead = [rightOne.lineHead[0] + 8, rightOne.lineHead[1]];
      rightOne.lineTail = Util.findLineTail(rightOne.lineHead, rightAngle);
      this.sticks.push(new Stick(rightOne));
    }

    for (var i = 0; i < this.sticks.length; i++) {
      this.sticks[i].pos = i;
      this.sticks[i].prePos = i;
    }

  }

  step (timeDelta, speedAmplifier) {
    this.updateSticks(timeDelta, speedAmplifier);
  }

  updateSticks (timeDelta, speedAmplifier) {
    if (this.shuffle) {
      this.quickVersion(timeDelta, speedAmplifier);
    } else {
      this.stepVersion(timeDelta, speedAmplifier);
    }
  }

  quickShuffle () {
    const sticks = {};
    let stick;

    for (let i = 0; i < this.sticks.length; i++) {
      stick = this.sticks[i];
      sticks[stick.prePos] = stick;
    }

    for (var j = 0; j < this.sticks.length; j++) {
      stick = this.sticks[j];
      stick.getEndpos(sticks[j]);
      this.sticks[j].prePos = j;
    }
  }

  checkAllFinishMove () {
    for (var i = 0; i < this.sticks.length; i++) {
      if (this.sticks[i].endPos) {
        return false;
      }
    }

    return true;
  }

  quickVersion (timeDelta, speedAmplifier) {
    for (let i = 0; i < this.sticks.length; i++) {
      if (this.sticks[i].endPos) {
        this.sticks[i].moveTo(timeDelta, speedAmplifier);
      }
    }
    if (this.checkAllFinishMove()) {
      if (this.sortingCallback) {
        this.sortingCallback(true);
      }
    }
  }

  stepVersion (timeDelta, speedAmplifier) {
    let stick1;
    let stick2;
    let operation;

    let traces = this.traces;
    if (this.cons < traces.length) {
      const trace = traces[this.cons];
      operation = trace[0];
      for (var i = 0; i < this.sticks.length; i++) {
        if (this.sticks[i].pos === trace[1]) {
          stick1 = this.sticks[i];
        }
        if (this.sticks[i].pos === trace[2]) {
          stick2 = this.sticks[i];
        }
      }

      this.operationState = trace[3];
      if (this.operationState === 'Shuffling') {
        this.numSwaps = 0;
        this.numComparisons = 0;
      }

      if (this.cons === traces.length - 1) {
        if (this.operationState === 'Sorting') {
          this.operationState = 'Sorted';
        } else {
          this.operationState = 'Shuffled';
        }
      }

      if (operation === 'compare') {
        this.compare(stick1, stick2, timeDelta, speedAmplifier);
      } else if (operation === 'swap') {
        if (stick1 !== stick2) {
          stick1.getEndpos(stick2);
          stick2.getEndpos(stick1);
          this.swap(stick1, stick2, timeDelta, speedAmplifier);
        } else {
          this.cons++;
          if (this.operationState !== 'Shuffling' && this.operationState !== 'Shuffled') {
            this.numSwaps++ ;
          }
        }
      }
    } else {
      if (this.quickShuffleCallback) {
        this.quickShuffleCallback(true);
      }
      return;
    }
  }

  adopAlgorithm (algorithm, shuffle, quickShuffle = false, quickShuffleCallback, sortingCallback) {
    this.shuffle = quickShuffle;
    if (quickShuffle) {
      if (this.checkAllFinishMove()) {
        this.sortingCallback = sortingCallback;
        shuffle(this.sticks);
        this.quickShuffle();
      } else {
        return;
      }
    } else {
      this.quickShuffleCallback = quickShuffleCallback;
      const traces = algorithm(this.sticks);
      this.traces = this.traces.concat(traces);
    }
  }

  checkFinishSwap (stick1, stick2) {
    if (stick1.checkFinishMove() && stick2.checkFinishMove()) {
      this.cons++;
      if (this.operationState !== 'Shuffling' && this.operationState !== 'Shuffled' ) {
        this.numSwaps++;
      }
      return true;
    } else {
      return false;
    }
  }

  swap (stick1, stick2, timeDelta, speedAmplifier) {
    if (!this.checkFinishSwap(stick1, stick2)) {
      stick1.moveTo(timeDelta, speedAmplifier);
      stick2.moveTo(timeDelta, speedAmplifier);
    }
  }

  checkFinishCompare (stick1, stick2) {
    if (stick1.checkFinishCompare() && stick2.checkFinishCompare()) {
      this.cons++;
      this.numComparisons++;
      return true;
    } else {
      return false;
    }
  }

  compare (stick1, stick2, timeDelta, speedAmplifier) {
    if (!this.checkFinishCompare(stick1, stick2)) {
      stick1.compare(timeDelta, speedAmplifier);
      stick2.compare(timeDelta, speedAmplifier);
    }
  }

  draw (ctx) {
    ctx.clearRect(0,  0,  this.DIM_X, this.DIM_Y);

    ctx.font = "13px Varela Round";
    ctx.fillStyle = "#000";
    ctx.fillText(`State: ${this.operationState}`, 470, 10);

    ctx.fillStyle = "#147ee0";
    ctx.fillText(`Number of Comparisons: ${this.numComparisons}`, 570, 10);

    ctx.fillStyle = "#dd6417";
    ctx.fillText(`Number of Swaps: ${this.numSwaps}`, 320, 10);

    this.sticks.forEach(stick => {
      stick.draw(ctx);
    });
  }
}

export default Sticks;
