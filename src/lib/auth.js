const AUTH_STORAGE_KEY = "user";

const safeParseJson = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const parseJwtPayload = (token) => {
  const parts = token.split(".");
  if (parts.length < 2) return null;

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return safeParseJson(atob(padded), null);
  } catch {
    return null;
  }
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  return safeParseJson(window.localStorage.getItem(AUTH_STORAGE_KEY), null);
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = parseJwtPayload(token);
  if (!payload?.exp) return false;

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowInSeconds;
};

export const isSessionValid = () => {
  const user = getStoredUser();
  if (!user?.token) return false;
  return !isTokenExpired(user.token);
};

export const logoutUser = ({ navigate, redirectTo = "/login" } = {}) => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("vitchat:logout"));

  if (navigate) {
    navigate(redirectTo);
    return;
  }

  if (window.location.pathname !== redirectTo) {
    window.location.assign(redirectTo);
  }
};

export const isAuthError = (error) => {
  const status = error?.response?.status;
  const message = String(error?.response?.data?.message || error?.message || "").toLowerCase();

  if (status === 401 || status === 403) return true;
  return message.includes("unauthorized") || message.includes("invalid token") || message.includes("missing token");
};

export const logoutIfAuthError = (error) => {
  if (!isAuthError(error)) return false;
  logoutUser();
  return true;
};
