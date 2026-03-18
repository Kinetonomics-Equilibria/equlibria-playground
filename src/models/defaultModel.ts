export const defaultYamlModel = `schema: Schema

params:
  - name: supplyShift
    value: 0
    min: -3
    max: 3
    round: 0.1
    label: "Supply Shock (drag curve)"

layout:
  type: TwoHorizontalGraphs
  def:

    # ── Chart 1: Oil Market ─────────────────────────────────────────────
    leftGraph:
      xAxis:
        title: "Quantity of Oil (Q)"
        min: 0
        max: 10
      yAxis:
        title: "Oil Price (P)"
        min: 0
        max: 20
      objects:

        # Inelastic (non-linear) demand: P = 40 / Q^1.2  → steep hyperbola
        - type: Curve
          def:
            fn: "40 / (x^1.2)"
            min: 0.5
            max: 10
            color: blue
            strokeWidth: 2.5
            label:
              text: "Demand (Inelastic)"
              position: tr
              x: 1.5
              y: 18

        # Supply (original) — shifts right/left via params.supplyShift
        # xShift < 0 moves curve LEFT (less supply → shock)
        - type: Curve
          def:
            fn: "2.5 * (x - params.supplyShift)"
            min: "params.supplyShift"
            max: 10
            color: orange
            strokeWidth: 2.5
            label:
              text: "Supply (S₁)"
              position: tr
              x: 7
              y: 14

        # Dashed original supply reference (when shifted)
        - type: Curve
          def:
            fn: "2.5 * x"
            min: 0
            max: 10
            color: orange
            lineStyle: dashed
            strokeWidth: 1.5
            label:
              text: "S₀ (Original)"
              position: tr
              x: 7
              y: 17

        # Equilibrium point — intersection of D and S
        # P = 40/Q^1.2  and  P = 2.5*(Q - params.supplyShift)
        # solved numerically: approach via approximate equilibrium
        # At params.supplyShift=0: Q≈3.7, P≈9.2  — we parameterise by reading off curve
        - type: Point
          def:
            x: "(40 / 2.5)^(1/2.2) * (1 + params.supplyShift * 0.07)"
            y: "40 / (((40 / 2.5)^(1/2.2) * (1 + params.supplyShift * 0.07))^1.2)"
            r: 5
            color: green
            label:
              text: "E₁ (P=\`(y)\`, Q=\`(x)\`)"
              position: tr
            droplines:
              vertical: "Q*"
              horizontal: "P*"

        # Draggable handle on the supply curve so user can shift it
        - type: Point
          def:
            x: "5 + params.supplyShift"
            y: "2.5 * 5"
            r: 7
            color: "#e65c00"
            draggable: true
            drag:
              - directions: x
                param: supplyShift
                expression: "drag.x - 5"
            label:
              text: "← drag →"
              position: tr

    # ── Chart 2: Macroeconomic Impact (AD / SRAS / LRAS) ────────────────
    rightGraph:
      xAxis:
        title: "Real GDP (Y)"
        min: 0
        max: 10
      yAxis:
        title: "Price Level (P)"
        min: 0
        max: 20
      objects:

        # Long-Run Aggregate Supply (vertical at potential GDP = 5)
        - type: Segment
          def:
            a: [5, 0]
            b: [5, 20]
            color: purple
            strokeWidth: 2.5
            lineStyle: dashed
            label:
              text: "LRAS"
              position: tr
              x: 5.1
              y: 19

        # Aggregate Demand — downward sloping hyperbola
        - type: Curve
          def:
            fn: "50 / (x + 0.5)"
            min: 0.1
            max: 10
            color: blue
            strokeWidth: 2.5
            label:
              text: "AD"
              position: br
              x: 9
              y: 4

        # SRAS Original (before shock) — upward sloping, dashed reference
        - type: Curve
          def:
            fn: "1.8 * x + 1"
            min: 0
            max: 10
            color: orange
            lineStyle: dashed
            strokeWidth: 1.5
            label:
              text: "SRAS₀"
              position: tr
              x: 7.5
              y: 14

        # SRAS shifted left by oil shock (same params.supplyShift param)
        # SRAS shifts UP/LEFT: fn shifts upward (higher P at every Y)
        - type: Curve
          def:
            fn: "1.8 * x + 1 + params.supplyShift * 2"
            min: 0
            max: 10
            color: orange
            strokeWidth: 2.5
            label:
              text: "SRAS₁"
              position: tr
              x: 7
              y: 17

        # New short-run equilibrium (AD ∩ SRAS₁)
        # 50/(y+0.5) = 1.8y + 1 + params.supplyShift*2
        # Approximate: Y_eq ≈ 4.3 - 0.5*params.supplyShift
        - type: Point
          def:
            x: "4.3 - 0.5 * params.supplyShift"
            y: "50 / (4.3 - 0.5 * params.supplyShift + 0.5)"
            r: 5
            color: green
            label:
              text: "E₁"
              position: tr
            droplines:
              vertical: "Y*"
              horizontal: "P*"

        # Draggable handle on SRAS₁ so user can shift it from this chart too
        - type: Point
          def:
            x: "4 - params.supplyShift * 0.2"
            y: "1.8 * 4 + 1 + params.supplyShift * 2"
            r: 7
            color: "#e65c00"
            draggable: true
            drag:
              - directions: x
                param: supplyShift
                expression: "(4 - drag.x) / 0.2"
            label:
              text: "← drag →"
              position: bl
`;
