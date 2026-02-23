# 03 - Layouts

The `layout` property of an Equilibria schema defines the overall canvas and visual arrangement of the graphs within it. Each layout expects standard keys representing the graphs it contains.

Under the hood, layouts inherit from a base `Layout` class and dictate the `aspectRatio` of the canvas. For example, a `SquareLayout` maintains an aspect ratio close to 1:1, while a `WideRectangleLayout` creates a wider canvas.

## Available Layouts

Here are the built-in layouts parsed by the Equilibria engine.

### Single Graph Layouts

These layouts feature a single graph that fills the container.

*   `OneGraph`: A standard, slightly wide graph container. Expects a definition for `graph`.
*   `OneTree`: Specialized layout (often for game theory trees). Expects a definition for `tree`.
*   `OneWideGraph`: A wider aspect ratio standard graph. Expects a definition for `graph`.

### Two Graph Layouts

These layouts place two graphs side-by-side or stacked.

*   `TwoHorizontalGraphs`: Places graphs horizontally. Expects definitions for `leftGraph` and `rightGraph`.
*   `TwoVerticalGraphs`: Puts one graph on top of another. Expects definitions for `topGraph` and `bottomGraph`.
*   `GameMatrixPlusGraph`: A specialization that provides layout space for a game matrix and an accompanying graph.

### Three and Four Graph Layouts

*   `ThreeHorizontalGraphs`: Three graphs in a row. Expects definitions for `leftGraph`, `middleGraph`, and `rightGraph`.
*   `FourGraphs`: A 2x2 grid in a square layout. Expects definitions for `topLeftGraph`, `bottomLeftGraph`, `topRightGraph`, and `bottomRightGraph`.

### Complex Multi-Graph Layouts

*   `SquarePlusTwoVerticalGraphs` / `TwoVerticalSquaresOneBigSquare`: Creates an asymmetrical layout with one larger prominent graph and two smaller stacked graphs. Expects definitions for `bigGraph`, `topGraph`, and `bottomGraph`.

## Example Usage

Here is how you specify a layout with multiple graphs inside your schema `def`:

```yaml
layout:
  type: TwoHorizontalGraphs
  def:
    leftGraph:
      xAxis:
        title: "Quantity (Left)"
      yAxis:
        title: "Price"
    rightGraph:
      xAxis:
        title: "Quantity (Right)"
      yAxis:
        title: "Price"
```

## Economic Addons

There are additional specialised layouts located under the `econ` schema namespace, such as `EdgeworthBox` and `EdgeworthBoxPlusSidebar`. These are covered in the [06 - Economic Components](./06-econ-objects.md) guide.
