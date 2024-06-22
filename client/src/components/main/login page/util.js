export const isEmailValid = (email) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the regular expression
    if (emailRegex.test(email)) {
      // Split the email address into local-part and domain
      const [localPart, domain] = email.split('@');

      // Check if the local-part is not empty and the domain is a valid domain name
      if (localPart.length > 0 && /^[a-zA-Z0-9.-]+$/.test(domain)) {
        return true; // Valid email address
      }
    }

    return false; // Invalid email address
  };


export const emailExists = async (email, apiService) => {
  const res = await apiService.checkEmailExists(email);
  return res.data.exists;
}

export const usernameExists = async (username, apiService) => {
  const res = await apiService.checkUsernameExists(username)
  return res.data.exists;
}