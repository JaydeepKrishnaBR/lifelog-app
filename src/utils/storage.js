// src/utils/storage.js
const KEY = "lifelog_entries";

export const saveEntry = (entry) => {
  const existing = JSON.parse(localStorage.getItem(KEY)) || [];
  existing.unshift(entry); // newest first
  localStorage.setItem(KEY, JSON.stringify(existing));
};

export const getEntries = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};
