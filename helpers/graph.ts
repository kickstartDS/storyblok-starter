import {
  DirectedEdge,
  DirectedGraph,
  DirectedVertex,
} from "directed-graph-typed";
import { FullCustomPropertyValues } from "custom-property-extract/dist/types";

export type VertexKey = string | number;
export type IEdgeData = {
  selector: string;
  purpose: string;
};
export class CssCustomPropertyVertex<
  V = FullCustomPropertyValues
> extends DirectedVertex<V> {
  private _data: V | undefined;

  public constructor(key: VertexKey, val?: V) {
    super(key, val);
    this._data = val;
  }

  public get data(): V | undefined {
    return this._data;
  }

  public set data(value: V | undefined) {
    this._data = value;
  }
}

export class CssCustomPropertyEdge<E = IEdgeData> extends DirectedEdge<E> {
  private _data: E | undefined;

  public constructor(v1: VertexKey, v2: VertexKey, val?: E, weight?: number) {
    super(v1, v2, weight, val);
    this._data = val;
  }

  public get data(): E | undefined {
    return this._data;
  }

  public set data(value: E | undefined) {
    this._data = value;
  }
}

export class CssCustomPropertyDirectedGraph<
  V = FullCustomPropertyValues,
  E = IEdgeData
> extends DirectedGraph<
  V,
  E,
  CssCustomPropertyVertex<V>,
  CssCustomPropertyEdge<E>
> {
  public constructor(
    vertices?: CssCustomPropertyVertex<V>[],
    edges?: CssCustomPropertyEdge<E>[]
  ) {
    super();

    for (const vertex of vertices || []) {
      this.addVertex(vertex);
    }
    for (const edge of edges || []) {
      this.addEdge(edge);
    }
  }

  public addEdge(edge: CssCustomPropertyEdge<E>): boolean;
  public addEdge(
    src?: CssCustomPropertyVertex<V> | VertexKey,
    dest?: CssCustomPropertyVertex<V> | VertexKey,
    weight?: number,
    data?: E
  ): boolean;
  public addEdge(
    srcOrEdge?:
      | CssCustomPropertyVertex<V>
      | VertexKey
      | CssCustomPropertyEdge<E>,
    dest?: CssCustomPropertyVertex<V> | VertexKey,
    weight?: number,
    data?: E
  ): boolean {
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

  public getEdge(
    srcOrKey: CssCustomPropertyVertex<V> | VertexKey | undefined,
    destOrKey: CssCustomPropertyVertex<V> | VertexKey | undefined
  ): CssCustomPropertyEdge<E> | undefined {
    return super.getEdge(srcOrKey, destOrKey);
  }

  public getVertex(
    vertexKey: VertexKey
  ): CssCustomPropertyVertex<V> | undefined {
    return super.getVertex(vertexKey);
  }

  public getSubGraphStartingFrom(
    vertexKey: VertexKey
  ): CssCustomPropertyDirectedGraph<V, E> {
    const connectedGraph = new CssCustomPropertyDirectedGraph<V, E>();
    const visited: Set<VertexKey> = new Set();
    const queue: VertexKey[] = [vertexKey];

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

export function deepMerge<T extends Record<string, any>>(obj1: T, obj2: T): T {
  const keys = Array.from(
    new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  );

  return keys.reduce((acc, key) => {
    const val1 = obj1[key] as any;
    const val2 = obj2[key] as any;

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
  }, {} as any) as T;
}
