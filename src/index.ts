export interface IReduxTypedReducer {
  <R>(opt?: { ns?: string, init?: R, nsFormatter?: (ns: string, type: string) => string }): {
    <A extends Record<string, ((...args: any[]) => (r: R) => R) & { type?: string }>>(a: A): A & {
      reducer: (
        pr: R, action: any) => R
    }
  };
}

// @internal
function toPairs (obj: Record<string, any>) {
  return Object.keys(obj).map(k => [k, obj[k]]);
}

let nsFormatter = (ns, type) => `${ns}::${type}`;

export function setDefaultTypeFormatter (newFormatter: (ns: string, type: string) => string) {
  nsFormatter = newFormatter;
}

const TypedReducer: IReduxTypedReducer =
  function TypedReducer ({ ns, init }: { ns?, init?, nsFormatter } = { ns: '', nsFormatter }) {
    return function RegisterActions (a) {
      const [action$, actionCreators] = toPairs(a).reduce((pr, [k, v]) => {
        const type = nsFormatter(ns, k);
        pr[0][type] = v;
        pr[0][type]['type'] = type;
        pr[1][k] = (...args) => ({ type, args });
        return pr;
      }, [{}, {}]);

      function reducer (pr = init, { type, args }) {
        const t = action$[type];
        return t ? t(...args)(pr) : pr;
      }

      return {
        ...actionCreators,
        reducer,
      };
    };
  };

export default TypedReducer;