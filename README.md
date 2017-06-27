# Redux Typed Action Reducer

## introduction

Typescript Redux Reducer Helper.

## Example

```typescript
import TypedReducer from 'redux-typed-action-reducer';
const ASwitch = TypedReducer<boolean>({ ns: 'switch', init: false })({
  set: (b:boolean) => orgState => b,
});

// => (type: 'switch', args: [true])
ASwitch.toggle(true);

// => 'switch::toggle' 
ASwitch.toggle['type'];

// => roughly
// (pr = false, {type, args}) => {
// const actions = {
//  toggle: (arg) => (org) => arg;
// } 
// if (actions[type]) return actions[type](...args)(pr);
// return pr;
// }
ASwitch.reducer
```