import { asyncReducer } from 'redux-promise-middleware-actions';

class SimpleReducer {
  constructor(dataType, cacheName, metaName, fetchAction, parse) {
    this.initialState = {};
    this.dataType = dataType;
    this.cacheName = cacheName || "";
    this.metaName = metaName || dataType;
    this.fetchAction = fetchAction;
    this.parse = parse;
    this.extraHandlers = [];

    this.initialState[this.dataType] = {};

    //Now fetch from cache
    let cache = this.getCache();
    let keys = Object.keys(cache);
    for(let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let item = cache[key];
      this.initialState[dataType][key] = this.parse(item);
    }
  }

  getReducer() {return this.reducer.bind(this);}
  getCache(cacheName) {
    if(!cacheName) cacheName = this.cacheName;
    if(!window) return  {};
    return window[cacheName] || {};
  }


  addEntry(cacheName, fetchAction, entry) {
    //Setup handling functions bound object
    let x = {
      entry,
      fetchAction,
      self: this
    };

    //Handling functions

    //Parser (takes in raw parent data and maps child data)
    let parser = function(data, appendTo) {
      //Requires an appended object
      if(!appendTo) return;
      //Requires parent to have entry point
      if(!data || !data[this.entry]) return;

      //Iterate over each "item" in parent
      data[this.entry].forEach( function(y) {
        //Parse as normal
        let z = this.parse(y);
        if(!z) return;

        //Treat as regular "has been fetched"
        this.appendTo[z.handle] = {
          ...z,
          pending: false,
          error: undefined
        }
      }.bind({
        parse: this.self.parse,
        appendTo
      }) );

    }.bind(x);
    x.parser = parser;

    //Action handler (for reducer itself)
    let actionHandler = function(state, type, action) {
      if(type == String(this.fetchAction.fulfilled)) {
        this.parser(action.payload, state[this.self.dataType]);
      }
    }.bind(x);

    //Read from cache
    let cache = this.getCache(cacheName);
    Object.keys(cache).forEach((key) => {
      let o = cache[key];
      parser(o, this.initialState[this.dataType]);
    });

    //Append action handler
    this.extraHandlers.push(actionHandler);
  }


  reducer(state, action) {
    let { type, meta, payload, error } = action;

    //Initial State
    if(!state) {
      state = this.initialState;
    } else {
      //Clone the state
      state = { ...state };
    }

    let data = state[this.dataType] || {};
    meta = meta ? meta[this.metaName] : meta;

    //Switch standard action types
    if( type == String(this.fetchAction.pending) && meta ) {
      //Pending
      data[meta] = {
        ...data[meta], pending: true
      };
      state[this.dataType] = Object.assign({}, data);

    } else if( type == String(this.fetchAction.fulfilled) && meta) {
      //Fulfilled
      data[meta] = {
        ...this.parse(payload),
        pending: false,
        error: undefined
      };
      state[this.dataType] = Object.assign({}, data);

    } else if( type == String(this.fetchAction.rejected) && meta ) {
      //Error/Rejected
      data[meta] = {
        pending: false,
        error: error
      };
      state[this.dataType] = Object.assign({}, data);
    } else {
      this.extraHandlers.forEach((handler) => {
        handler(state, type, action);
      });
      if(this.onAction) this.onAction(state, type, action);
    }

    //Return the updated state
    return state;
  }
}

export default SimpleReducer;
