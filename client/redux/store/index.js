import { applyMiddleware, compose, createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import Api from '../../api';
import reducer from './reducer';

let composeEnhancers = compose;

//Check if function running on the sever or client
if (typeof window !== 'undefined') {
  //Setup Redux Debuger
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// create a makeStore function
const makeStore = (context) =>
  createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ Api })) //Applying redux-thunk middleware
    )
  );

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
