# Day 34 Performance Profiling Report

## 1. Initial State
- **Observed Behavior:** Re-rendering the layout tree on every keystroke in search.

## 2. Benchmark Measurement (Before Fix)
- **Interaction:** Typing inside search bar.
- **Render Duration:** ~18.4ms per character.
- **Root Cause:** Parent state updates causing `Header` and `CartPanel` re-renders.

## 3. Applied Optimization
- **Action Taken:** Extracted search logic into `SearchBox.jsx` to keep state local.

## 4. Benchmark Measurement (After Fix)
- **Render Duration:** ~2.1ms per character.
- **Result:** ~88% performance improvement.