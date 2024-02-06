export function unflatten(blok: Record<string, any>) {
  return Object.entries(blok).reduce((a, [k, v]) => {
    if (k.startsWith("_")) {
      a[k] = v;
      return a;
    }

    k.split("_").reduce((r, e, i, arr) => {
      return r[e] || (r[e] = arr[i + 1] ? {} : v);
    }, a);

    return a;
  }, {} as Record<string, any>);
}
