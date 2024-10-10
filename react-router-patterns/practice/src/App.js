import React from "react";
import CounterClassBased from "./CounterClassBased";
import CounterClassBasedInlineArrow from "./CounterClassBasedInlineArrow";
import CounterClassBasedNewer from "./CounterClassBasedNewer";
import CounterClassBasedBroken from "./CounterClassBasedBroken";
import CounterUsingHOC from "./CounterUsingHOC";
import CounterHooks from "./CounterHooks";

import CounterRenderProps from "./CounterRenderProps";
import Effects from "./Effects";
import LifeCycle from "./LifeCycle";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CounterClassBasedInlineArrow />
      <CounterClassBasedBroken />
      <CounterClassBased />
      <CounterClassBasedNewer />

      <CounterUsingHOC />
      <CounterHooks />
      <CounterRenderProps />
      <Effects />
      <LifeCycle />
    </div>
  );
}

export default App;


// function justScope(){
//   const secret = 42

//   function share(){
//     return secret
//   }

//   return share
// }

////////////////////

// function closure(){
//   let secret = 42

//   function share(){
//     return secret
//   }

//   function change(newSecret){
//     secret = newSecret
//   }

//   return {share, change}
// }

// function counter(initialVal){
//   let count = initialVal

//   function getCount(){
//     return count
//   }

//   function increment(n){
//     count += n
//   }

//   return {getCount, increment}
// }

// const {getCount, increment} = counter(99)

// getCount()
// 99

// increment(4)
// undefined

// getCount()
// 103