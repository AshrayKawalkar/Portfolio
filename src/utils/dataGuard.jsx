// Defensive rendering helpers. Wrap data access and list mapping so that a
// missing, undefined, or empty value degrades gracefully instead of crashing
// the whole section or blanking the page.

export const isEmptyArray = (arr) => !Array.isArray(arr) || arr.length === 0;

// Returns a safe array (falls back to []) so callers can .map without guards.
export const asArray = (value) => (Array.isArray(value) ? value : []);

// Render a list with an empty-state fallback. Returns nothing if list is empty.
export const withEmptyFallback = (list, renderItem, emptyMessage = 'No items to display yet.') => {
  if (isEmptyArray(list)) {
    return <p className="empty-state">{emptyMessage}</p>;
  }
  return list.map(renderItem);
};