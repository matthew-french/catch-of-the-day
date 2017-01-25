import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    // getinitialstate
    this.state = {
      fishes: {},
      order: {},
    }
  }

  componentWillMount() {
    // run right before app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes',
      });

      // check if there is any ref in local storage
      const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

      if (localStorageRef) {
        // update our app component order state
        this.setState({
          order: JSON.parse(localStorageRef)
        });
      }

  }

  componentWillUnMount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));

    console.log('something changed');
    console.log({nextProps, nextState});

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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});
  }

  removeFish(key) {
    // update state
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes,
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

  removeFromOrder(key) {
    // take copy of state
    const order = {...this.state.order};
    // update or add the new number of fish-name
    delete order[key];
    // update our state
    this.setState({ order });
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
        <Order
          removeFromOrder={this.removeFromOrder}
          params={this.props.params}
          fishes={this.state.fishes}
          order={this.state.order} />
        <Inventory
            storeId={this.props.params.storeId}
            removeFish={this.removeFish}
            updateFish={this.updateFish}
            fishes={this.state.fishes}
            loadSamples={this.loadSamples} addFish={this.addFish}/>
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
