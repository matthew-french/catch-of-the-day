import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
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

  addToOrder(key) {
    // take copy of state
    const order = {...this.state.order};
    // update or add the new number of fish-name
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({order});
  }

  render() {
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
              .map(key => <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory loadSamples={this.loadSamples} addFish={this.addFish}/>
      </div>
    )
  }
}

export default App;
