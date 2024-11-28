const fs = require("node:fs");
const { calc } = require("@csstools/css-calc");
const {
  DirectedEdge,
  DirectedGraph,
  DirectedVertex,
} = require("directed-graph-typed");
const allToken = require("../token/components.js");

/**
 * Please add all CSS Custom Properties / Design Token you need evaluated here
 */
const required = {
  desktop: [
    "--dsa-logos__grid--gap-horizontal",
    "--dsa-blog-teaser__avatar--size",
  ],
  phone: ["--dsa-image-story--horizontal-padding"],
  sectionWidths: ["narrow", "default", "wide", "max", "full"],
};

class CssCustomPropertyVertex extends DirectedVertex {
  _data;

  constructor(key, val) {
    super(key, val);
    this._data = val;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }
}

class CssCustomPropertyEdge extends DirectedEdge {
  _data;

  constructor(v1, v2, val, weight) {
    super(v1, v2, weight, val);
    this._data = val;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }
}

class CssCustomPropertyDirectedGraph extends DirectedGraph {
  constructor(vertices, edges) {
    super();

    for (const vertex of vertices || []) {
      this.addVertex(vertex);
    }
    for (const edge of edges || []) {
      this.addEdge(edge);
    }
  }

  addEdge(srcOrEdge, dest, weight, data) {
    if (srcOrEdge instanceof CssCustomPropertyEdge) {
      return super.addEdge(srcOrEdge);
    } else if (srcOrEdge instanceof CssCustomPropertyVertex && dest) {
      return super.addEdge(srcOrEdge, dest, weight, data);
    } else if (typeof srcOrEdge === "string" && typeof dest === "string") {
      return super.addEdge(srcOrEdge, dest, weight, data);
    } else {
      return false;
    }
  }

  getEdge(srcOrKey, destOrKey) {
    return super.getEdge(srcOrKey, destOrKey);
  }

  getVertex(vertexKey) {
    return super.getVertex(vertexKey);
  }

  getSubGraphStartingFrom(vertexKey) {
    const connectedGraph = new CssCustomPropertyDirectedGraph();
    const visited = new Set();
    const queue = [vertexKey];

    while (queue.length > 0) {
      const currentKey = queue.shift();
      if (currentKey && !visited.has(currentKey)) {
        visited.add(currentKey);
        const currentVertex = this.getVertex(currentKey);
        if (currentVertex) {
          connectedGraph.addVertex(currentVertex);
          for (const edge of this.edgesOf(currentKey)) {
            connectedGraph.addEdge(edge);
            if (!visited.has(edge.dest)) {
              queue.push(edge.dest);
            }
          }
        }
      }
    }

    return connectedGraph;
  }
}

function deepMerge(obj1, obj2) {
  const keys = Array.from(
    new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  );

  return keys.reduce((acc, key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      acc[key] = acc[key] = [...val1, ...val2].filter((value, index, self) => {
        return self.findIndex((v) => v === value) === index;
      });
    } else if (
      typeof val1 === "object" &&
      val1 !== null &&
      typeof val2 === "object" &&
      val2 !== null
    ) {
      acc[key] = deepMerge(val1, val2);
    } else if (key in obj2) {
      acc[key] = structuredClone(val2);
    } else {
      acc[key] = structuredClone(val1);
    }

    return acc;
  }, {});
}

const varRegExp = /var\(([^,)]+)[^)]*\)/g;
const fromCssCustomProperties = (customProperties) => {
  const graph = new CssCustomPropertyDirectedGraph();

  for (const [propertyName, propertyValues] of Object.entries(
    customProperties
  )) {
    if (!graph.hasVertex(propertyName)) {
      graph.addVertex(propertyName.trim(), propertyValues);
    } else {
      const vertex = graph.getVertex(propertyName);
      if (vertex) {
        vertex.value = vertex.value
          ? [...vertex.value, ...propertyValues]
          : propertyValues;
      }
    }

    for (const propertyValue of propertyValues) {
      if (propertyValue.value.includes("var(")) {
        const matches = Array.from(propertyValue.value.matchAll(varRegExp));
        for (const match of matches) {
          if (match.length > 0) {
            if (!graph.hasVertex(match[1])) {
              graph.addVertex(match[1].trim());
            }

            graph.addEdge(propertyName, match[1], undefined, {
              selector: propertyValue.selector || "",
              purpose: "reference",
            });
          }
        }
      }
    }
  }

  return graph;
};

const graph = fromCssCustomProperties(
  allToken.reduce((acc, extractResult) => {
    return deepMerge(acc, extractResult);
  }, {})
);

const getVertexValue = (propertyName) => {
  const vertex = graph.getVertex(propertyName);
  if (!vertex || !vertex.value || !vertex.value[0] || !vertex.value[0].value)
    throw new Error(`Property ${propertyName} not found`);

  return vertex.value[0].value;
};

const breakpointsString = getVertexValue("--ks-breakpoints");
const breakpoints = JSON.parse(
  breakpointsString.replaceAll("'", "").replaceAll(/"([0-9]+)em"/g, "$1")
);

const findIndexByBreakpoint = (values, breakpoint = "desktop") => {
  const bpFactorIndex = values.findIndex((value) =>
    value.value.includes(`bp-factor-${breakpoint}`)
  );
  if (bpFactorIndex > -1) return bpFactorIndex;

  switch (breakpoint) {
    case "desktop":
      const desktopIndex = values.findIndex(
        (value) => value.media === `(min-width: ${breakpoints["desktop"]}em)`
      );
      if (desktopIndex > -1) return desktopIndex;
    case "laptop":
      const laptopIndex = values.findIndex(
        (value) => value.media === `(min-width: ${breakpoints["laptop"]}em)`
      );
      if (laptopIndex > -1) return laptopIndex;
    case "tablet":
      const tabletIndex = values.findIndex(
        (value) => value.media === `(min-width: ${breakpoints["tablet"]}em)`
      );
      if (tabletIndex > -1) return tabletIndex;
    case "phone":
      const phoneIndex = values.findIndex(
        (value) => value.media === `(min-width: ${breakpoints["phone"]}em)`
      );
      if (phoneIndex > -1) return phoneIndex;
    default:
      return 0;
  }
};

const baseFontSizePx = 16;

const getPxSize = (size) => {
  return Math.ceil(
    parseInt(calc(`calc(${baseFontSizePx} * ${size.replace("rem", "")})`))
  );
};

const getPropertyValue = (propertyName, breakpoint = "desktop") => {
  const vertex = graph.getVertex(propertyName);
  const index =
    vertex && vertex.value && vertex.value.length > 1
      ? findIndexByBreakpoint(vertex.value, breakpoint)
      : 0;

  if (
    vertex &&
    vertex.value &&
    vertex.value[index] &&
    vertex.value[index].value
  ) {
    if (vertex.value[index].value.includes("calc(")) {
      const matches = Array.from(vertex.value[index].value.matchAll(varRegExp));
      let calcString = vertex.value[index].value;
      for (const match of matches) {
        const variable = match[1];
        const value = getPropertyValue(variable, breakpoint);
        calcString = calcString.replaceAll(match[0], value);
      }
      return calc(calcString);
    }
    if (vertex.value[index].value.includes("var(")) {
      const variable = Array.from(
        vertex.value[index].value.matchAll(varRegExp)
      )[0][1];
      return getPropertyValue(variable, breakpoint);
    }

    return vertex.value[index].value;
  } else {
    throw new Error(`Property ${propertyName} not found`);
  }
};

const sectionWidthRems = {
  narrow: parseInt(
    getVertexValue("--dsa-section__content--width_narrow").replace("rem", "")
  ),
  default: parseInt(
    getVertexValue("--dsa-section__content--width_default").replace("rem", "")
  ),
  wide: parseInt(
    getVertexValue("--dsa-section__content--width_wide").replace("rem", "")
  ),
  max: parseInt(
    getVertexValue("--dsa-section__content--width_max").replace("rem", "")
  ),
  full: parseInt(
    getVertexValue("--dsa-section__content--width_full").replace("rem", "")
  ),
};

const getSectionWidth = (sectionWidthName) => {
  return sectionWidthRems[sectionWidthName];
};

const calculated = {
  desktop: {},
  phone: {},
  sectionWidths: {},
  baseFontSizePx,
};

for (const breakpoint of ["desktop", "phone"]) {
  for (const property of required[breakpoint]) {
    calculated[breakpoint][property] = getPxSize(
      getPropertyValue(property, breakpoint)
    );
  }

  for (const sectionWidth of required.sectionWidths) {
    calculated.sectionWidths[sectionWidth] = getSectionWidth(sectionWidth);
  }
}

fs.writeFileSync(
  "token/calculated.js",
  `
// This file is generated by scripts/calculateCssProperties.js, regenerate by running a build:
// npm run build
// In case of missing variables, please check the top of scripts/calculateCssProperties.js

const token = ${JSON.stringify(calculated)};
export default token;
  `
);
