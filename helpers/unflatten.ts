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

// TODO test this for content automation (GTP -> Storyblok)
export function flatten(blok: Record<string, any>) {
  return Object.entries(blok).reduce((a, [k, v]) => {
    if (k.startsWith("_")) {
      a[k] = v;
      return a;
    }

    const keys = k.split("_");
    let r = a;
    keys.forEach((e, i) => {
      if (i === keys.length - 1) {
        r[e] = v;
      } else {
        r[e] = r[e] || {};
        r = r[e];
      }
    });

    return a;
  }, {} as Record<string, any>);
}
