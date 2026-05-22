export function displayValue(value, fallback = "Not set") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return value;
}

export function formatCurrency(value, currency = "EUR") {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function minutesToHours(minutes) {
  const total = Number(minutes ?? 0);
  const hours = Math.floor(total / 60);
  const remainder = total % 60;
  return `${hours}h ${String(remainder).padStart(2, "0")}m`;
}

export function shortTime(value) {
  if (!value) return "-";
  return String(value).slice(0, 5);
}

export function findById(items, id) {
  return items.find((item) => item.id === id);
}

export function statusLabel(value) {
  return String(value ?? "UNKNOWN").replaceAll("_", " ");
}
