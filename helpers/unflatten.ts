/* @ts-expect-error */
export function unflatten(blok): any {
  return Object.entries(blok).reduce((a, [k, v]) => {
    if (k.startsWith("_")) {
      return a;
    }

    k.split("_").reduce((r, e, i, arr) => {
      /* @ts-expect-error */
      return r[e] || (r[e] = arr[i + 1] ? {} : v);
    }, a);

    return a;
  }, {});
}
