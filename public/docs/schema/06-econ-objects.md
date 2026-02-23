# 06 - Economic Components

In addition to standard geometric shapes, the Equilibria Engine includes a massive library of high-level economic abstractions under the `econ` module.

These tools allow authors to declare complex economic relationships—like an entire monopoly model or an Edgeworth Box—using only a few lines of YAML. The engine mathematically solves these systems and transpiles them into the underlying geometric points, lines, curves, and labels.

## Economic Functional Forms

Several multivariate utility and production functions are built-in. These can be used to generate indifference curves, isoquants, or optimization bundles automatically.

- **`CobbDouglasFunction`**: `U(x,y) = A * x^alpha * y^beta`
- **`CESFunction`**: Constant Elasticity of Substitution
- **`MinFunction`**: Perfect Complements (Leontief)
- **`LinearFunction`**: Perfect Substitutes
- **`QuasilinearFunction`**: Linear in one good, non-linear in the other
- **`ConcaveFunction`**

*(Note: These are usually defined under a `def` and passed to higher-order objects like maps or bundles).*

## Microeconomics: Consumer Theory

Objects for analyzing consumer choice subject to constraints.

- **`EconBudgetLine`**: A linear constraint defined by `p1`, `p2`, and `m` (Income/budget).
- **`EconIndifferenceCurve`**: Given a functional form and a target utility level, plots the curve representing that utility.
- **`EconIndifferenceMap`**: Generates a family of indifference curves.
- **`EconBundle`**: A bundle of goods $(x,y)$.
- **`EconOptimalBundle`** (and variants like `EconLagrangeBundle`, `LowestCostBundle`, `EconSlutskyBundle`, `EconHicksBundle`): Automatically calculates the tangency point between an indifference curve and a budget line, drawing the corresponding geometric point and droplines.
- **Demand**: Objects like `EconDemandCurve`, `EconNetDemandCurve`, `EconPriceOfferCurve`.

## Microeconomics: Equilibrium and Market Structures

- **`EconLinearDemand` / `EconLinearSupply` / `EconCompetitiveDemand`**: Define linear market curves with automatically generated labels and intercepts.
- **`EconLinearEquilibrium`**: Given a linear demand and supply, finds the equilibrium price ($P^*$) and quantity ($Q^*$), drawing the intersection, droplines, and optionally consumer/producer surplus areas.
- **`EconConstantElasticityEquilibrium` / `EconConstantElasticityCurve`**: For markets exhibiting constant elasticity rather than linearity.
- **`EconLinearMonopoly` / `EconLinearMC`**: Automatically calculates and plots marginal revenue, marginal cost, profit-maximizing quantity, monopoly price, and profit/deadweight loss areas based on a linear demand curve.

## Microeconomics: Exchange and Edgeworth Boxes

- **Layouts**: Special `layout.type` settings exist for exchange economies, such as `EdgeworthBox`, `EdgeworthBoxPlusSidebar`, etc. These flip the axes for the second consumer, creating the traditional box.
- **`EconParetoLens`**: Highlights the area of mutual improvement between two initial endowments.
- **`ExchangeEquilibriumBundle`**: Calculates the competitive equilibrium in a two-consumer economy.
- **`EconContractCurve`**: Plots the set of all Pareto efficient allocations.

## Microeconomics: Producer Theory

- **`EconOneInputProductionFunction`**: Models production using a single variable input, generating total product, marginal product, or average product curves depending on the setup.
- **`EconPPF`**: Plots a Production Possibility Frontier.

## Specialized Schemas

At the root level, instead of `Schema`, you can use specialized economic schemas that come with pre-configured color palettes, idioms, and settings tailored to specific textbook styles:
- `LowdownSchema`
- `EconSchema`
- `BowlesHallidaySchema`
