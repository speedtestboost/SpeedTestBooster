// Session management for isolating speed test results per device/browser
const SESSION_STORAGE_KEY = 'speedtest_session_id';

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  return sessionId;
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}