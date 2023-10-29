/* @ts-expect-error */
export function unflatten(blok) {
  return Object.entries(blok).reduce((a, [k, v]) => {
    k.split("_").reduce((r, e, i, arr) => {
      /* @ts-expect-error */
      return r[e] || (r[e] = arr[i + 1] ? {} : v);
    }, a);

    return a;
  }, {});
}
