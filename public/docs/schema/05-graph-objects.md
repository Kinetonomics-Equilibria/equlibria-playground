# 05 - Basic Graph Objects

Basic Graph Objects are the geometric primitives that make up interactive diagrams. They are instantiated inside a graph's `objects` array.

## `GraphObject` Base Properties

All graph objects share certain common definitions (from `GraphObjectDefinition`):

- `color`: The stroke/fill color (e.g., `blue`, `red`).
- `layer`: The z-index/drawing order layer.
- `show`: A math expression evaluating to boolean/number indicating whether to show the object (e.g. `show: (price > 10)`).
- `name`: Used to reference this object inside the math evaluations (`calcs.name.x`, etc.).
- `strokeWidth`, `lineStyle`: For objects with strokes (e.g. `dashed`, `dotted`).

## `Point`

A single coordinate pair, typically drawn as a visible circle.

```yaml
type: Point
def:
  x: 10
  y: 20
  r: 4 # radius
  draggable: true
  label:
    text: "Equilibrium"
    position: "bl" # bottom-left
  droplines:
    vertical: "Q*"
    horizontal: "P*"
```

- **Droplines**: A `Point` can automatically generate droplines down to the X or Y axis with optional text.
- **Draggability**: Setting `draggable: true` allows the user to click and pull the point, changing the underlying `params` indirectly.

## `Line` and `Segment`

A `Line` is infinite, drawn completely across the Graph bounds. A `Segment` is finite, drawn between two points.

```yaml
type: Line
def:
  point: [0, 50]
  slope: -1
  label:
    text: "Demand"
```

A `Segment` requires starting and ending definitions:
```yaml
type: Segment
def:
  a: [0, 5]
  b: [5, 10]
```

## `Curve`

A smooth curve plotted using an expression. It requires an array of sample points or a mathematical function.

```yaml
type: Curve
def:
  fn: "100 / x"
  min: 1
  max: 10
```

## Other Basic Objects

- **`Rectangle`** / **`Area`**: Fills a geometric boundary. Can accept vertices (`[x,y]` pairs) or function domains (`areaBelow`, `areaAbove` on a Curve).
- **`Circle`** / **`Ellipse`**: Standard basic shapes defined by center points and radii.
- **`Axis`** / **`Grid`**: Under-the-hood objects usually handled by the `Graph` itself. You rarely declare these manually in `objects`.
- **`Label`**: Floating text defined by `x`, `y`, and `text`.
- **`Arrow`** / **`Angle`**: Markers for geometric demonstrations.
