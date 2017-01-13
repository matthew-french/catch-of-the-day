import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    // getinitialstate
    this.state = {
      fishes: {},
      order: {},
    }
  }

  addFish(fish) {
    // update state
    const fishes = {...this.state.fishes};
    //add in new fish
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;
    // set state
    this.setState({ fishes });

  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
      }
    )
  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order />
        <Inventory loadSamples={this.loadSamples} addFish={this.addFish}/>
      </div>
    )
  }
}

export default App;
