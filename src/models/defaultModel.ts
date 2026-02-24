export const defaultYamlModel = `params:
  - name: price
    value: 5
    min: 1
    max: 9
    round: 0.1
calcs:
  demandQ: "(10 - price)"
scales:
  - name: x
    axis: x
    domainMin: 0
    domainMax: 10
    rangeMin: 0
    rangeMax: 1
  - name: y
    axis: y
    domainMin: 0
    domainMax: 10
    rangeMin: 1
    rangeMax: 0
layers:
  - - type: Curve
      def:
        univariateFunction:
          fn: "10 - x"
          ind: x
        stroke: blue
        strokeWidth: 2
        xScaleName: x
        yScaleName: y
    - type: Curve
      def:
        univariateFunction:
          fn: "x"
          ind: x
        stroke: orange
        strokeWidth: 2
        xScaleName: x
        yScaleName: y
  - - type: Segment
      def:
        x1: calcs.demandQ
        y1: params.price
        x2: calcs.demandQ
        y2: 0
        strokeWidth: 1
        lineStyle: dashed
        stroke: grey
        xScaleName: x
        yScaleName: y
    - type: Segment
      def:
        x1: calcs.demandQ
        y1: params.price
        x2: 0
        y2: params.price
        strokeWidth: 1
        lineStyle: dashed
        stroke: grey
        xScaleName: x
        yScaleName: y
  - - type: Point
      def:
        x: calcs.demandQ
        y: params.price
        fill: green
        r: 5
        xScaleName: x
        yScaleName: y
  - []
`;
