export const defaultYamlModel = `type: Model
version: 1.0.0
id: sample-market
nodes:
  - id: consumer
    type: Agent
    position:
      x: 100
      y: 100
    behavior:
      type: Consumer
      params:
        income: 1000
        preferences:
          alpha: 0.5
          beta: 0.5
  - id: producer
    type: Agent
    position:
      x: 300
      y: 100
    behavior:
      type: Producer
      params:
        capacity: 500
        cost:
          fixed: 100
          variable: 2
  - id: market
    type: Market
    position:
      x: 200
      y: 300
    params:
      good: widgets
      price: 15
edges:
  - source: consumer
    target: market
    type: Demand
  - source: producer
    target: market
    type: Supply
`;
