# Equilibria Engine Playground - Implementation Plan

## Project Overview

**Goal:** Create a simple, standalone HTML playground for testing Equilibria Engine models quickly.

**Target Audience:** Contributors and developers who want to rapidly prototype and test economic models.

**Scope:** YAML editor + live preview only (no save/share/export in v1).

**Distribution:** Separate GitHub repository, not part of the monorepo.

---

## Architecture Decision

### Technology Stack

**Core Choice: Single HTML File Architecture**
- Single `index.html` file (~500-800 lines total)
- Inline CSS and JavaScript (no build step)
- Uses Equilibria Engine via CDN (unpkg)
- Monaco Editor for YAML editing (via CDN)

**Why this approach:**
- ✅ Zero build tooling - just open in browser
- ✅ Easy to run locally - download and double-click
- ✅ Easy to deploy - any static hosting works
- ✅ Contributors can test without npm install
- ✅ Automatic updates when new engine versions publish

### Key Dependencies (all via CDN)

1. **Equilibria Engine**
   - Source: `https://unpkg.com/equilibria-engine@latest/dist/equilibria-engine.umd.min.js`
   - Exposes global: `window.EquilibriaEngine`
   - Size: ~200KB minified

2. **Monaco Editor** (VS Code's editor)
   - Source: `https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs`
   - YAML syntax highlighting
   - Error squiggles
   - Size: ~3MB (lazy loaded)

3. **js-yaml** (for validation)
   - Source: `https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js`
   - Validates YAML before passing to engine
   - Shows parse errors to user
   - Size: ~90KB

---

## User Interface Layout

### Split-Pane Design

```
┌─────────────────────────────────────────────────────────────┐
│ Equilibria Engine Playground                    [Dark Mode] │
├──────────────────────┬──────────────────────────────────────┤
│                      │                                      │
│   YAML Editor        │   Live Preview                       │
│   (Monaco)           │                                      │
│                      │   ┌────────────────────────────┐    │
│ metadata:            │   │                            │    │
│   title: "My Model"  │   │    Chart renders here      │    │
│                      │   │                            │    │
│ parameters:          │   └────────────────────────────┘    │
│   price:             │                                      │
│     value: 10        │   Controls Panel                     │
│     min: 0           │   ┌────────────────────────────┐    │
│     max: 100         │   │ Price: [====●─────] 10     │    │
│                      │   │ Quantity: [──●────] 50     │    │
│ charts:              │   └────────────────────────────┘    │
│   - id: main         │                                      │
│     title: "Market"  │   Layout: [Single ▼]                │
│     xAxis:           │                                      │
│       label: "Q"     │   [Error Console - 0 errors]         │
│       ...            │                                      │
│                      │                                      │
│ [40% width]          │ [60% width]                          │
├──────────────────────┴──────────────────────────────────────┤
│ Load Example: [Supply & Demand ▼]   [Reset]   [Docs Link]  │
└─────────────────────────────────────────────────────────────┘
```

### Layout Breakdown

**Header Bar:**
- Title: "Equilibria Engine Playground"
- Theme toggle (light/dark)
- Link to documentation

**Left Pane (40% width):**
- Monaco editor with YAML syntax
- Line numbers
- Auto-completion (basic)
- Error highlighting

**Right Pane (60% width):**
- Chart container (responsive SVG)
- Controls panel (auto-generated from parameters)
- Layout selector (when multiple charts)
- Error console (collapsible)

**Footer Bar:**
- Example selector dropdown
- Reset button
- Link to GitHub repo
- Link to main docs

---

## Core Features

### 1. Live Preview
**Behavior:**
- Debounced updates (500ms after typing stops)
- Parse YAML → validate → render chart
- Show errors in console panel
- Preserve editor scroll position

**Error Handling:**
- YAML parse errors → show line/column
- Engine validation errors → show helpful message
- Runtime errors → show stack trace (dev mode)

### 2. YAML Editor
**Features:**
- Syntax highlighting (YAML)
- Line numbers
- Bracket matching
- Auto-indent
- Tab = 2 spaces (YAML standard)

**Keyboard Shortcuts:**
- `Cmd/Ctrl + Enter` → Force refresh
- `Cmd/Ctrl + /` → Toggle comment
- `Cmd/Ctrl + Z` → Undo
- `Cmd/Ctrl + Shift + Z` → Redo

### 3. Example Models
**Built-in Examples:**
- Supply & Demand (basic)
- Supply & Demand with Tax (intermediate)
- Consumer Choice (advanced, parametric curves)
- 4-Chart Grid (demonstrates multi-chart)

**Implementation:**
- Store as inline JS strings
- Populate dropdown in footer
- Load into editor on selection
- Confirm before overwriting unsaved work

### 4. Layout Selector
**When to show:**
- Only appears when YAML defines 2+ charts

**Options:**
- Single (default for 1 chart)
- Dual Horizontal
- Dual Vertical
- Grid 2x2 (for 4 charts)
- Spotlight Right
- Spotlight Bottom

**Behavior:**
- Dropdown in right pane
- Changes how charts are arranged
- Preserves chart state (no re-render)

---

## Implementation Details

### File Structure (Separate Repo)

```
equilibria-playground/
├── index.html              (Main app - entire playground)
├── README.md               (Usage instructions, screenshots)
├── LICENSE                 (MIT or same as engine)
├── .gitignore
├── examples/               (Example YAML files - optional)
│   ├── supply-demand.yaml
│   ├── tax-incidence.yaml
│   ├── consumer-choice.yaml
│   └── grid-4-charts.yaml
└── docs/
    └── ARCHITECTURE.md     (For contributors)
```

### HTML Structure (index.html)

**Sections:**
1. **HEAD**: Meta tags, CDN links, inline CSS
2. **BODY**:
   - Header
   - Split pane container
   - Footer
3. **SCRIPTS**:
   - Monaco loader
   - Engine initialization
   - App logic (debouncing, error handling, examples)

### CSS Strategy

**Approach:** Inline CSS in `<style>` tag
- CSS Grid for layout
- CSS Variables for theming
- Responsive breakpoints for mobile

**Theme System:**
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1f2937;
  --border-color: #e5e7eb;
  --accent-color: #2563eb;
}

[data-theme="dark"] {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --border-color: #374151;
  --accent-color: #3b82f6;
}
```

### JavaScript Architecture

**Structure:**
```javascript
// 1. Configuration
const CONFIG = {
  ENGINE_CDN: 'https://unpkg.com/equilibria-engine@latest/...',
  DEBOUNCE_MS: 500,
  DEFAULT_YAML: '...'
};

// 2. State Management (simple)
const state = {
  currentYaml: '',
  editor: null,
  engine: null,
  darkMode: false
};

// 3. Core Functions
function initMonaco() { ... }
function initEngine() { ... }
function parseAndRender(yamlString) { ... }
function handleError(error) { ... }
function loadExample(exampleName) { ... }
function setLayout(layoutType) { ... }
function toggleTheme() { ... }

// 4. Event Listeners
editor.onDidChangeModelContent(debounce(handleYamlChange, 500));

// 5. Initialization
window.addEventListener('DOMContentLoaded', init);
```

### Rendering Flow

```
User types YAML
    ↓
Debounce (500ms)
    ↓
Parse YAML (js-yaml)
    ├─→ Error? → Show in console
    └─→ Valid? → Continue
         ↓
    Validate schema (equilibria-engine)
    ├─→ Error? → Show in console
    └─→ Valid? → Continue
         ↓
    Destroy previous engine instance
         ↓
    Initialize new engine
         ↓
    Render charts + controls
         ↓
    Show success in console
```

---

## Example YAML (Default Content)

**Starting point when playground loads:**

```yaml
metadata:
  title: "Supply and Demand"
  specVersion: "1.3"

parameters:
  price:
    value: 50
    min: 0
    max: 100
    step: 5
    label: "Price"
    unit: "$"

charts:
  - id: main
    title: "Market Equilibrium"
    xAxis:
      label: "Quantity"
      min: 0
      max: 100
    yAxis:
      label: "Price ($)"
      min: 0
      max: 100

    elements:
      - id: demand
        type: line
        equation: "100 - x"
        color: "#2563eb"
        strokeWidth: 3
        label: "Demand"

      - id: supply
        type: line
        equation: "x"
        color: "#dc2626"
        strokeWidth: 3
        label: "Supply"

      - id: equilibrium
        type: point
        x: 50
        y: 50
        radius: 6
        color: "#1f2937"
        label: "Equilibrium"
```

---

## Multi-Chart Example (4-Chart Grid)

**Demonstrates linked charts:**

```yaml
metadata:
  title: "Market Analysis Dashboard"
  specVersion: "1.3"

parameters:
  tax:
    value: 0
    min: 0
    max: 30
    step: 5
    label: "Tax ($/unit)"

  equilibriumQ:
    expression: "(100 - 20 - tax) / 2"
    hidden: true

  equilibriumP:
    expression: "(100 + 20 + tax) / 2"
    hidden: true

  consumerSurplus:
    expression: "0.5 * equilibriumQ * (100 - equilibriumP)"
    label: "Consumer Surplus"

  producerSurplus:
    expression: "0.5 * equilibriumQ * (equilibriumP - 20 - tax)"
    label: "Producer Surplus"

charts:
  # Chart 1: Main Market
  - id: market
    title: "Market Equilibrium"
    xAxis: { label: "Quantity", min: 0, max: 100 }
    yAxis: { label: "Price", min: 0, max: 120 }
    elements:
      - id: demand
        type: line
        equation: "100 - x"
        color: "#2563eb"
      - id: supply
        type: line
        equation: "20 + x + tax"
        color: "#dc2626"

  # Chart 2: Consumer Surplus
  - id: cs
    title: "Consumer Surplus"
    xAxis: { label: "Quantity", min: 0, max: 100 }
    yAxis: { label: "Price", min: 0, max: 120 }
    elements:
      - id: csArea
        type: area
        topBoundary: demand
        bottomBoundary: equilibriumP
        leftBoundary: 0
        rightBoundary: equilibriumQ
        color: "#10b981"
        opacity: 0.4

  # Chart 3: Producer Surplus
  - id: ps
    title: "Producer Surplus"
    xAxis: { label: "Quantity", min: 0, max: 100 }
    yAxis: { label: "Price", min: 0, max: 120 }
    elements:
      - id: psArea
        type: area
        topBoundary: equilibriumP
        bottomBoundary: supply
        leftBoundary: 0
        rightBoundary: equilibriumQ
        color: "#f59e0b"
        opacity: 0.4

  # Chart 4: Welfare Analysis
  - id: welfare
    title: "Total Welfare"
    xAxis: { label: "Tax Amount", min: 0, max: 30 }
    yAxis: { label: "Surplus", min: 0, max: 2000 }
    elements:
      - id: totalWelfare
        type: point
        x: tax
        y: "consumerSurplus + producerSurplus"
        radius: 8
        color: "#8b5cf6"
```

---

## Error Handling Strategy

### 1. YAML Parse Errors
**Example:**
```
Error: Invalid YAML syntax at line 12, column 5
Expected indentation of 2 spaces, found 3
```

**UI Display:**
- Red border on editor
- Error icon in console panel
- Click error → jump to line in editor

### 2. Schema Validation Errors
**Example:**
```
Error: Unknown parameter 'pric' in equation '100 - pric'
Did you mean 'price'?
```

**UI Display:**
- Yellow warning in console
- Suggestion for fix
- Chart doesn't render until fixed

### 3. Rendering Errors
**Example:**
```
Error: Cannot render element 'demand'
Equation '100 / 0 * x' produces invalid values
```

**UI Display:**
- Orange warning in console
- Element skipped, other elements render
- Chart partially renders

---

## Responsive Design

### Desktop (> 1024px)
- Split pane: 40% editor | 60% preview
- Full feature set

### Tablet (768px - 1024px)
- Split pane: 50% | 50%
- Slightly smaller controls

### Mobile (< 768px)
- Stacked layout:
  - Editor on top (collapsible)
  - Preview on bottom
- Tabs instead of split pane
- Simplified controls

---

## Deployment Strategy

### Option 1: GitHub Pages (Recommended)
**Setup:**
1. Create repo: `equilibria-engine/playground`
2. Enable GitHub Pages in settings
3. Deploy from `main` branch
4. Access at: `https://equilibria-engine.github.io/playground`

**Pros:**
- Free hosting
- Automatic HTTPS
- CDN-backed
- No build step needed

### Option 2: Netlify
**Setup:**
1. Connect GitHub repo
2. Build command: (none)
3. Publish directory: `/`
4. Custom domain: `playground.equilibria.io`

**Pros:**
- Free tier
- Custom domain
- Instant preview deployments
- Form handling (if needed later)

### Option 3: Vercel
**Similar to Netlify**

---

## Future Enhancements (Post-v1)

**v1.1 - Persistence:**
- Save to localStorage
- Restore on page load
- "Unsaved changes" warning

**v1.2 - Sharing:**
- Encode YAML in URL hash
- "Copy share link" button
- URL compression (pako)

**v1.3 - Export:**
- Download YAML file
- Export chart as PNG
- Export as standalone HTML

**v1.4 - Advanced Editor:**
- Auto-completion for element types
- Schema validation in editor
- Inline documentation tooltips

**v2.0 - Collaborative:**
- Real-time collaboration (Yjs)
- Gallery of community models
- Fork/remix functionality

---

## Testing Strategy

### Manual Testing Checklist

**Basic Functionality:**
- [ ] Editor syntax highlighting works
- [ ] Typing updates preview (debounced)
- [ ] Example models load correctly
- [ ] Error messages display properly
- [ ] Layout selector changes chart arrangement
- [ ] Theme toggle works (light/dark)

**Multi-Chart:**
- [ ] 2 charts render side-by-side
- [ ] 4 charts render in grid
- [ ] Layout selector appears when 2+ charts
- [ ] Charts share parameter state
- [ ] All 4 charts update when parameter changes

**Error Handling:**
- [ ] YAML parse error shows line number
- [ ] Invalid parameter shows suggestion
- [ ] Network error (CDN down) shows gracefully
- [ ] Empty YAML shows helpful message

**Cross-Browser:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Responsive:**
- [ ] Works on mobile (iOS Safari)
- [ ] Works on mobile (Android Chrome)
- [ ] Works on tablet (iPad)
- [ ] Resizing window works smoothly

---

## README.md Content

```markdown
# Equilibria Engine Playground

A simple, browser-based playground for testing and prototyping economic models with the Equilibria Engine.

## Features

- 🎨 Live YAML editor with syntax highlighting
- 📊 Instant preview of interactive charts
- 🔗 Support for up to 4 linked charts
- 📱 Responsive design (desktop, tablet, mobile)
- 🌙 Dark mode support
- 📚 Built-in example models

## Usage

### Online

Visit: https://equilibria-engine.github.io/playground

### Local

1. Download `index.html`
2. Open in your browser
3. Start editing YAML!

No installation or build step required.

## Example Models

- **Supply & Demand** - Basic market equilibrium
- **Tax Incidence** - Effect of per-unit taxes
- **Consumer Choice** - Indifference curves (parametric)
- **4-Chart Dashboard** - Multi-chart layout demo

## Documentation

- [Equilibria Engine Docs](https://github.com/equilibria-engine/equilibria-engine)
- [YAML Field Reference](https://github.com/equilibria-engine/equilibria-engine/blob/main/docs/YAML_FIELD_REFERENCE.md)
- [Tutorial Series](https://github.com/equilibria-engine/equilibria-engine/tree/main/examples/tutorials)

## Contributing

Found a bug? Have an idea for improvement?

1. Open an issue on GitHub
2. Submit a pull request
3. Share your example models!

## License

MIT - Same as Equilibria Engine
```

---

## Implementation Estimate

**Time to build v1:**
- ~4-6 hours for experienced developer
- Single session work

**Breakdown:**
- HTML structure: 30 min
- CSS styling: 1 hour
- Monaco integration: 1 hour
- Engine integration: 1 hour
- Error handling: 1 hour
- Examples + polish: 1 hour

**Lines of Code:**
- HTML: ~150 lines
- CSS: ~200 lines
- JavaScript: ~300-400 lines
- **Total: ~650-750 lines in single file**

---

## Success Criteria

✅ Contributor can open playground URL
✅ Paste YAML from tutorial
✅ See live chart within 2 seconds
✅ Edit parameters and see immediate update
✅ Load 4-chart example and select layout
✅ No installation or build step required
✅ Works on mobile (basic usage)

---

## Repository Setup Checklist

- [ ] Create repo: `equilibria-engine/playground`
- [ ] Add README.md
- [ ] Add LICENSE (MIT)
- [ ] Add .gitignore
- [ ] Create index.html
- [ ] Add 4 example YAML files
- [ ] Enable GitHub Pages
- [ ] Add link from main engine README
- [ ] Add link from tutorial README
- [ ] Tweet announcement (optional)

---

## Next Steps

1. **Create GitHub repo** at `equilibria-engine/playground` (or your preferred org)
2. **Scaffold initial structure** (README, LICENSE, index.html skeleton)
3. **Implement core features** in order:
   - Monaco editor integration
   - Engine initialization
   - Live preview
   - Example models
   - Layout selector
   - Error handling
   - Styling/polish
4. **Test with real tutorial YAML** to ensure compatibility
5. **Deploy to GitHub Pages**
6. **Update links** in main engine README and tutorial README

---

**Total complexity: LOW**
**Value to contributors: HIGH**
**Maintenance burden: MINIMAL**

This is a perfect "afternoon project" that will significantly improve the developer experience for testing Equilibria Engine models.
