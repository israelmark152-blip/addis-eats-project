export const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "We need a name for the delivery";
  }

  // TeleBirr format validation (+2519... or 09...)
  if (!/^(?:\+251|0)9\d{8}$/.test(form.phone.trim())) {
    errors.phone = "Use 09... or +2519... (TeleBirr number)";
  }

  if (!AREAS.includes(form.area)) {
    errors.area = "Please select a valid delivery area";
  }

  if (form.notes && form.notes.length > 200) {
    errors.notes = "Notes must be under 200 characters";
  }

  return errors; // Empty object means valid
}