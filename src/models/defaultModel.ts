export const defaultYamlModel = `schema:
  params:
    - name: price
      value: 5
      min: 1
      max: 9
  layout:
    type: OneGraph
    def:
      graph:
        xAxis:
          title: "Quantity"
          min: 0
          max: 10
        yAxis:
          title: "Price"
          min: 0
          max: 10
        objects:
          - type: Line
            def:
              point: [0, 10]
              slope: -1
              color: blue
              label:
                text: "Demand"
          - type: Line
            def:
              point: [0, 0]
              slope: 1
              color: red
              label:
                text: "Supply"
          - type: Point
            def:
              x: 5
              y: 5
              r: 4
              color: purple
              label:
                text: "Equilibrium"
              droplines:
                vertical: "Q*"
                horizontal: "P*"
`;
