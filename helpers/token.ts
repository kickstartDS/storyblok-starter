import { calc } from "@csstools/css-calc";
import allToken from "@/token/components";
import { CssCustomPropertyDirectedGraph, deepMerge } from "@/helpers/graph";
import {
  FullCustomPropertyValues,
  FullExtractResult,
} from "custom-property-extract/dist/types";

type Breakpoints = {
  phone: number;
  tablet: number;
  laptop: number;
  desktop: number;
};

type SectionWidths = {
  narrow: number;
  default: number;
  wide: number;
  max: number;
  full: number;
};

export const varRegExp = /var\(([^,)]+)[^)]*\)/g;
export const fromCssCustomProperties = (
  customProperties: FullExtractResult
): CssCustomPropertyDirectedGraph => {
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

export const graph = fromCssCustomProperties(
  allToken.reduce((acc, extractResult) => {
    return deepMerge(acc, extractResult);
  }, {})
);

export const getVertexValue = (propertyName: string): string => {
  const vertex = graph.getVertex(propertyName);
  if (!vertex || !vertex.value || !vertex.value[0] || !vertex.value[0].value)
    throw new Error(`Property ${propertyName} not found`);

  return vertex.value[0].value;
};

export const breakpointsString = getVertexValue("--ks-breakpoints");
export const breakpoints: Breakpoints = JSON.parse(
  breakpointsString.replaceAll("'", "").replaceAll(/"([0-9]+)em"/g, "$1")
);

export const findIndexByBreakpoint = (
  values: FullCustomPropertyValues,
  breakpoint: keyof Breakpoints = "desktop"
): number => {
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

export const baseFontSizePx = 16;

export const getPxSize = (size: string): number => {
  return Math.ceil(
    parseInt(calc(`calc(${baseFontSizePx} * ${size.replace("rem", "")})`))
  );
};

export const getPropertyValue = (
  propertyName: string,
  breakpoint: keyof Breakpoints = "desktop"
): string => {
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

export const sectionWidthRems: SectionWidths = {
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

export const getSectionWidth = (
  sectionWidthName: keyof SectionWidths
): number => {
  return sectionWidthRems[sectionWidthName];
};
