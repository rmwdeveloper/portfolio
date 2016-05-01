import React from 'react';
import {IndexRoute, Route} from 'react-router';

import {
    App,
    About,
    Home,
    MapMaker,
    NotFound,
    Breakout
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      /* Routes*/
      <Route path="about" component={About}/>
      <Route path="breakout" component={Breakout}/>
      <Route path="mapmaker" component={MapMaker}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
