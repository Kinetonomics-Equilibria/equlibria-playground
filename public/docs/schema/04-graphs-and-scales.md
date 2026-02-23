# 04 - Graphs and Scales

A `Graph` object is typically instantiated as part of a `Layout`. It defines an individual coordinate system (with independent X and Y scales) and acts as the container for all geometric or economic objects plotted within it.

## Graph Definition

When defining a graph, you must provide the configuration for its axes and an array of objects to draw.

### `GraphDefinition` Interface

```yaml
xAxis:
  min: 0
  max: 10
  title: "X Axis Title"
  orient: "bottom" # or "top"
  log: false
  intercept: 0     # Where this axis crosses the other axis
yAxis:
  min: 0
  max: 10
  title: "Y Axis Title"
  orient: "left"   # or "right"
  log: false
  intercept: 0    
objects:
  # Array of elements to draw
```

### `Position` (Under the Hood)

When a `Layout` generates a `Graph`, it automatically assigns it a `position` property defining `x`, `y`, `width`, and `height` as percentages of the total canvas area. *You typically do not need to configure `position` manually when using standard Layouts*.

## Scales

Under the hood, a `Graph` expands into a `PositionedObject` containing an `xScale` and a `yScale`.

These scales automatically map the mathematical domain defined by your `xAxis` and `yAxis` (`min` / `max`) to the physical SVG pixel range dictated by the layout's assigned `position`.

When authoring, `KGAuthor` handles the complexities of scales automatically for common setups. If you create an object inside a graph's `objects` array, all coordinates passed to that object (e.g. `x: 5`, `y: 8`) map effortlessly using the containing graph's scales.

## Objects Array

The `objects` array contains the physical shapes, text, or economic concepts to render. Each item should have a `type` and a `def`.

```yaml
objects:
  - type: Point
    def:
      x: 5
      y: 5
      r: 4
      color: blue
  - type: Line
    def:
      point: [0, 0]
      slope: 1
```

See [05 - Basic Graph Objects](./05-graph-objects.md) and [06 - Economic Components](./06-econ-objects.md) for full lists of components you can place within a graph's `objects` array.
