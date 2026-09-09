## Day 33: Forms & Controlled Components

### Validation Rules Summary
1. **Name**: Required string (`!form.name.trim()`) to identify the customer[cite: 3, 4].
2. **Phone**: Matches TeleBirr regular expression `/^(?:\+251|0)9\d{8}$/`[cite: 3, 4].
3. **Area**: Must match one of the predefined regional values (`Bole`, `Kazanchis`, `Megenagna`, `Piassa`)[cite: 3, 4].
4. **Notes**: Optional string constrained to a maximum of 200 characters[cite: 4].

### Accessibility & Form Mechanics
- **Single State Object**: Inputs use computed property keys `[name]: value` in a unified `useState` handler[cite: 3, 4].
- **Timing**: Errors only display after a field trigger on `onBlur` (`touched` tracking)[cite: 3, 4].
- **Accessibility**: Inputs are programmatically connected to error nodes via `aria-describedby`, `aria-invalid`, and `role="alert"`[cite: 3, 4].
- **Resilience**: Network errors preserve user input data and automatically focus the first invalid field[cite: 3, 4].