export function useremailValidator(email, useremail) {
  if (email !== useremail) return 'Ooops! You must enter your registered email.'
  return ''
}
