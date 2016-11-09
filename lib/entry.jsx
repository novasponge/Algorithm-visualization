import SticksView from './stick_view';
import { shuffle } from './sorting_algs/shuffle';
import { bubbleSort } from './sorting_algs/bubble_sort';
import { quickSort } from './sorting_algs/quick_sort';
import { insertionSort } from "./sorting_algs/insert_sort";
import { selectionSort } from './sorting_algs/select_sort';
import { heapSort } from './sorting_algs/heap_sort';
import { oddEvenSort } from './sorting_algs/odd_even_sort';
import { cocktailSort } from './sorting_algs/cocktail_sort';
import { bitonicSort } from './sorting_algs/bitonic_sort';
import { mergeSort } from './sorting_algs/merge_sort';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import InputRange from 'react-input-range';
import { modalStyle } from "./modal_style";
import "react-input-range/dist/react-input-range.css";
import SingleSort from "./single_sort";

class SortingVisualization extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      instructionOpen: false,
      value: 1,
      checkAvailability: true
    };

    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleQuickSort = this.handleQuickSort.bind(this);
    this.handleBubbleSort = this.handleBubbleSort.bind(this);
    this.handleMergeSort = this.handleMergeSort.bind(this);
    this.handleBitonicSort = this.handleBitonicSort.bind(this);
    this.handleHeapSort = this.handleHeapSort.bind(this);
    this.handleSelectionSort = this.handleSelectionSort.bind(this);
    this.handleInsertionSort = this.handleInsertionSort.bind(this);
    this.handleOddEvenSort = this.handleOddEvenSort.bind(this);
    this.handleCocktailSort = this.handleCocktailSort.bind(this);
    this.handleSortAll = this.handleSortAll.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleShuffleDemo = this.handleShuffleDemo.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentDidMount () {
    this.getCanvas();
  }

  getCanvas () {
    const shuffleCtx = this.refs.canvasShuffle.refs.canvas.getContext('2d');
    const shuffleView = new SticksView(shuffleCtx);

    const quickSortCtx = this.refs.canvasQuicksort.refs.canvas.getContext('2d');
    const quickSortView = new SticksView(quickSortCtx);

    const bubbleSortCtx = this.refs.canvasBubblesort.refs.canvas.getContext('2d');
    const bubbleSortView = new SticksView(bubbleSortCtx);
    //
    const mergeSortCtx = this.refs.canvasMergesort.refs.canvas.getContext('2d');
    const mergeSortView = new SticksView(mergeSortCtx);

    const bitonicSortCtx = this.refs.canvasBitonicsort.refs.canvas.getContext('2d');
    const bitonicSortView = new SticksView(bitonicSortCtx);

    const heapSortCtx = this.refs.canvasHeapsort.refs.canvas.getContext('2d');
    const heapSortView = new SticksView(heapSortCtx);

    const selectionSortCtx = this.refs.canvasSelectsort.refs.canvas.getContext('2d');
    const selectionSortView = new SticksView(selectionSortCtx);

    const insertionSortCtx = this.refs.canvasInsertsort.refs.canvas.getContext('2d');
    const insertionSortView = new SticksView(insertionSortCtx);

    const oddEvenSortCtx = this.refs.canvasOddevensort.refs.canvas.getContext('2d');
    const oddEvenSortView = new SticksView(oddEvenSortCtx);

    const cocktailSortCtx = this.refs.canvasCocktailsort.refs.canvas.getContext('2d');
    const cocktailSortView = new SticksView(cocktailSortCtx);

    this.setState({
      shuffle: shuffleView,
      quickSort: quickSortView,
      bubbleSort: bubbleSortView,
      mergeSort: mergeSortView,
      bitonicSort: bitonicSortView,
      heapSort: heapSortView,
      selectionSort: selectionSortView,
      insertionSort: insertionSortView,
      oddEvenSort: oddEvenSortView,
      cocktailSort: cocktailSortView,
      loaded: true
    });

    shuffleView.start();
    quickSortView.start();
    bubbleSortView.start();
    mergeSortView.start();
    bitonicSortView.start();
    heapSortView.start();
    selectionSortView.start();
    insertionSortView.start();
    oddEvenSortView.start();
    cocktailSortView.start();
  }

  handleShuffle () {
    const keys = Object.keys(this.refs);

    for (var i = 0; i < keys.length; i++) {
      let algorithm = keys[i];
      if (!this.refs[algorithm].state.quickShuffleDisabled) {
        let checkSortAvailability = this.refs[algorithm].checkSortAvailability;
        this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(null, shuffle, true, null, checkSortAvailability );
        this.refs[algorithm].setState({shuffling: true});
      }
    }
  }

  handleShuffleDemo (checkAvailabilityCB) {
    this.state.shuffle.sticks.adopAlgorithm(shuffle);
  }

  handleQuickSort (checkAvailabilityCB) {
    this.state.quickSort.sticks.adopAlgorithm(quickSort, false, null, checkAvailabilityCB);
  }

  handleBubbleSort (checkAvailabilityCB) {
    this.state.bubbleSort.sticks.adopAlgorithm(bubbleSort, false, null, checkAvailabilityCB);
  }

  handleMergeSort (checkAvailabilityCB) {
    this.state.mergeSort.sticks.adopAlgorithm(mergeSort, false, null, checkAvailabilityCB);
  }

  handleBitonicSort (checkAvailabilityCB) {
    this.state.bitonicSort.sticks.adopAlgorithm(bitonicSort, false, null, checkAvailabilityCB);
  }

  handleHeapSort (checkAvailabilityCB) {
    this.state.heapSort.sticks.adopAlgorithm(heapSort, false, null, checkAvailabilityCB);
  }

  handleSelectionSort (checkAvailabilityCB) {
    this.state.selectionSort.sticks.adopAlgorithm(selectionSort, false, null, checkAvailabilityCB);
  }

  handleInsertionSort (checkAvailabilityCB) {
    this.state.insertionSort.sticks.adopAlgorithm(insertionSort, false, null, checkAvailabilityCB);
  }

  handleOddEvenSort (checkAvailabilityCB) {
    this.state.oddEvenSort.sticks.adopAlgorithm(oddEvenSort, false, null, checkAvailabilityCB);
  }

  handleCocktailSort (checkAvailabilityCB) {
    this.state.cocktailSort.sticks.adopAlgorithm(cocktailSort, false, null, checkAvailabilityCB);
  }

  handleSortAll () {
    const keys = Object.keys(this.refs);

    for (var i = 0; i < keys.length; i++) {
      let algorithm = keys[i];
      if (!this.refs[algorithm].state.shuffling) {
        let checkAvailabilityCB = this.refs[algorithm].checkAvailabilityCB;
        switch (this.refs[algorithm].props.name) {
          case "Quick Sort":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(quickSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          case "Merge Sort":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(mergeSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          case "Bintonic Sort":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(bitonicSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          case "Heap Sort-Bottom Up":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(heapSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          case "Selection Sort":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(selectionSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          case "Insertion Sort":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(insertionSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          case "Bubble Sort":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(bubbleSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          case "Odd Even Sort":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(oddEvenSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          case "Cocktail Sort":
            this.refs[algorithm].props.algorithm.sticks.adopAlgorithm(cocktailSort, false, null, checkAvailabilityCB);
            this.refs[algorithm].setState({quickShuffleDisabled : true});
            break;
          default:
            break;
        }
      }
    }
  }

  closeModal () {
    this.setState({instructionOpen: false});
  }

  openModal () {
    this.setState({instructionOpen: true});
  }

  handleValuesChange(component, value) {
    this.setState({
      value: value,
    });
  }

  handlePause () {
    if (this.state.pause) {
      this.setState({shufflePause: false});
    } else {
      this.setState({shufflePause: true});
    }
  }

  formatLabel(labelValue) {
    return labelValue.toFixed(1);
  }

  render () {

    return (
      <div className="visualization-body">
        <header>
          <div className="header-content">
            <button className='open-instruction' onClick={this.openModal}>Instructions</button>
            <div className='title-container'>
              <h1>FORMATION</h1>
              <h6>created by <a href="http://www.zhuolizhang.com">Zhuoli Zhang</a></h6>
            </div>
            <a href='https://github.com/novasponge/formation' className="github">
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </div>
          <div className="shuffle-sort-button-container">
            <button className="shuffle-all-button" onClick={this.handleShuffle} disabled={!this.state.checkAvailability}>Shuffle All</button>
            <button onClick={this.handleSortAll}>Sort All</button>
            <h3>Speed Multiplier</h3>
            <InputRange maxValue={20}
              minValue={0}
              value={this.state.value}
              step={0.1}
              formatLabel={this.formatLabel.bind(this)}
              onChange={this.handleValuesChange.bind(this)}/>
          </div>
          <Modal className="instruction"
            isOpen={this.state.instructionOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}>
            <h3>Formation is the visualization of sorting algorithms.</h3>
            <p>Click shuffle all to shuffle all demos at once.</p>
            <p>Click sort all button to perform all sorting algorithms at once.</p>
            <p>Click algorithms name to perform specific sorting algorithm.</p>
            <p>Lines are shuffled first, then sorted by slope.</p>
            <h3 className='red'>Red</h3>
            <p>Red lines are swapping for either shuffling or sorting purposes.</p>
            <h3>Black</h3>
            <p>Black lines are comparing between two slopes.</p>
            <h3 className='speedAmplifier'>Speed Multiplier</h3>
            <p>Drag the blue circle to change the speed.</p>
            <button className='close-instruction' onClick={this.closeModal}>Close</button>
          </Modal>
        </header>
        <div className="main-content">
          <SingleSort ref="canvasShuffle"
                      handleAlgorithm={this.handleShuffleDemo}
                      algorithm={this.state.shuffle}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Shuffle Demo"
          />
          <SingleSort ref="canvasQuicksort"
                      handleAlgorithm={this.handleQuickSort}
                      algorithm={this.state.quickSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Quick Sort"
          />
          <SingleSort ref="canvasMergesort"
                      handleAlgorithm={this.handleMergeSort}
                      algorithm={this.state.mergeSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Merge Sort"
          />
          <SingleSort ref="canvasBitonicsort"
                      handleAlgorithm={this.handleBitonicSort}
                      algorithm={this.state.bitonicSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Bintonic Sort"
          />
          <SingleSort ref="canvasHeapsort"
                      handleAlgorithm={this.handleHeapSort}
                      algorithm={this.state.heapSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Heap Sort-Bottom Up"
          />
          <SingleSort ref="canvasSelectsort"
                      handleAlgorithm={this.handleSelectionSort}
                      algorithm={this.state.selectionSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Selection Sort"
          />
          <SingleSort ref="canvasInsertsort"
                      handleAlgorithm={this.handleInsertionSort}
                      algorithm={this.state.insertionSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Insertion Sort"
          />
          <SingleSort ref="canvasBubblesort"
                      handleAlgorithm={this.handleBubbleSort}
                      algorithm={this.state.bubbleSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Bubble Sort"
          />
          <SingleSort ref="canvasOddevensort"
                      handleAlgorithm={this.handleOddEvenSort}
                      algorithm={this.state.oddEvenSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Odd Even Sort"
          />
          <SingleSort ref="canvasCocktailsort"
                      handleAlgorithm={this.handleCocktailSort}
                      algorithm={this.state.cocktailSort}
                      speed={this.state.value}
                      loaded={this.state.loaded}
                      name="Cocktail Sort"
          />
        </div>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const root = document.getElementById("root");
  Modal.setAppElement(document.body);
  ReactDOM.render(<SortingVisualization />, root);
});
