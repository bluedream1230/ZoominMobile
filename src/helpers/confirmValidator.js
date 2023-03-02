export function confirmValidator(password, confirm) {
  if (!confirm) return "Password can't be empty."
  if (confirm.length < 5) return 'Password must be at least 5 characters long.'
  if (confirm !== password) return 'Both password need to be the same.'
  return ''
}
