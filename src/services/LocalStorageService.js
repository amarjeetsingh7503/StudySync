/**
 * Local Storage Authentication Service
 *
 * This service extends the existing LocalStorageService with authentication features
 * including token expiration similar to cookies
 */

// Extend the existing LocalStorageService with auth functionality
const AuthService = {
  // Default session timeout in milliseconds (30 minutes)
  DEFAULT_EXPIRY: 30 * 60 * 1000,

  /**
   * Initialize the auth store with default values if not already set
   */
  initialize: function () {
    // Set up authentication state storage
    if (!localStorage.getItem("authState")) {
      localStorage.setItem(
        "authState",
        JSON.stringify({
          currentUser: null,
          isAuthenticated: false,
          authToken: null,
          lastLogin: null,
          expiresAt: null,
        })
      );
    } else {
      // Check if existing session has expired
      this._checkTokenExpiration();
    }
  },

  /**
   * Login a user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {number} [expiryMinutes=30] - Session timeout in minutes
   * @param {boolean} [rememberMe=false] - Whether to extend session length
   * @returns {object|null} - User object if successful, null if failed
   */
  login: function (email, password, expiryMinutes = 30, rememberMe = false) {
    // Use the existing authentication method from LocalStorageService
    const user = LocalStorageService.users.authenticate(email, password);

    if (user) {
      const now = new Date();
      // Calculate expiration time - extend if "remember me" is checked
      const expiryMs = expiryMinutes * 60 * 1000;
      const expiryTime = rememberMe
        ? now.getTime() + expiryMs * 24 // 24x longer for "remember me"
        : now.getTime() + expiryMs;

      // Create auth state with session token and expiration
      const authState = {
        currentUser: user,
        isAuthenticated: true,
        authToken: this._generateToken(), // Generate a simple token
        lastLogin: now.toISOString(),
        expiresAt: expiryTime,
      };

      // Store auth state in localStorage
      localStorage.setItem("authState", JSON.stringify(authState));

      return user;
    }

    return null;
  },

  /**
   * Register a new user and automatically log them in
   * @param {object} userData - User data including email and password
   * @returns {object} - Newly created user
   */
  register: function (userData) {
    // Check if user already exists
    const existingUser = LocalStorageService.users.get(userData.email);

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Create the user using the existing service
    const newUser = LocalStorageService.users.save(userData.email, userData);

    // Log in the newly created user
    this.login(userData.email, userData.password);

    return newUser;
  },

  /**
   * Log out the current user
   */
  logout: function () {
    localStorage.setItem(
      "authState",
      JSON.stringify({
        currentUser: null,
        isAuthenticated: false,
        authToken: null,
        lastLogin: null,
      })
    );
  },

  /**
   * Check if a user is currently logged in
   * @returns {boolean} - True if user is logged in
   */
  isLoggedIn: function () {
    const authState = this.getAuthState();
    return authState && authState.isAuthenticated === true;
  },

  /**
   * Get the current logged-in user
   * @returns {object|null} - User object or null if not logged in
   */
  getCurrentUser: function () {
    const authState = this.getAuthState();

    if (authState && authState.isAuthenticated) {
      // Get fresh user data in case it was updated elsewhere
      return LocalStorageService.users.get(authState.currentUser.email);
    }

    return null;
  },

  /**
   * Get the current authentication state
   * @returns {object} - Authentication state object or null if expired
   */
  getAuthState: function () {
    // Check if token has expired before returning
    this._checkTokenExpiration();
    return JSON.parse(localStorage.getItem("authState") || "null");
  },

  /**
   * Check if the current authentication token has expired
   * @private
   * @returns {boolean} - True if token is still valid, false if expired
   */
  _checkTokenExpiration: function () {
    const authState = JSON.parse(localStorage.getItem("authState") || "null");

    if (authState && authState.isAuthenticated && authState.expiresAt) {
      const now = new Date().getTime();

      // If token has expired, clear the auth state
      if (now > authState.expiresAt) {
        console.log("Session expired, logging out");
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  },

  /**
   * Get the authentication token for API requests
   * @returns {string|null} - Auth token or null if not logged in
   */
  getAuthToken: function () {
    const authState = this.getAuthState();
    return authState && authState.isAuthenticated ? authState.authToken : null;
  },

  /**
   * Get the session expiration details
   * @returns {Object} - Object with expiry information
   */
  getSessionExpiry: function () {
    const authState = this.getAuthState();

    if (!authState || !authState.isAuthenticated || !authState.expiresAt) {
      return { isValid: false, expiresAt: null, remainingMs: 0 };
    }

    const now = new Date().getTime();
    const expiresAt = authState.expiresAt;
    const remainingMs = Math.max(0, expiresAt - now);

    return {
      isValid: remainingMs > 0,
      expiresAt: new Date(expiresAt),
      remainingMs: remainingMs,
      remainingMinutes: Math.floor(remainingMs / 60000),
    };
  },

  /**
   * Manually extend the current session by a specified amount
   * @param {number} [additionalMinutes=30] - Additional minutes to add
   * @returns {boolean} - True if session was extended, false if not logged in
   */
  extendSession: function (additionalMinutes = 30) {
    const authState = this.getAuthState();

    if (!authState || !authState.isAuthenticated) {
      return false;
    }

    const now = new Date().getTime();
    const additionalMs = additionalMinutes * 60 * 1000;

    // Set new expiration time
    authState.expiresAt = now + additionalMs;
    localStorage.setItem("authState", JSON.stringify(authState));

    return true;
  },

  /**
   * Update the current user's information
   * @param {object} updates - Fields to update on the user
   * @returns {object} - Updated user
   */
  updateCurrentUser: function (updates) {
    const authState = this.getAuthState();

    if (!authState || !authState.isAuthenticated) {
      throw new Error("No user is currently logged in");
    }

    // Update the user through the existing service
    const updatedUser = LocalStorageService.users.save(
      authState.currentUser.email,
      updates
    );

    // Update the auth state with new user data
    authState.currentUser = updatedUser;
    localStorage.setItem("authState", JSON.stringify(authState));

    return updatedUser;
  },

  /**
   * Generate a simple authentication token
   * In a real app, you would use JWT or another secure token format
   * @private
   * @returns {string} - Simple auth token
   */
  _generateToken: function () {
    return (
      "auth_" +
      Math.random().toString(36).substring(2) +
      Date.now().toString(36)
    );
  },
};

// Initialize the auth service
AuthService.initialize();

// Example usage of the auth service with your existing code

// Login form handler
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("remember-me")?.checked || false;

  try {
    // Use rememberMe flag and default 30 minute expiry (extended if rememberMe is true)
    const user = AuthService.login(email, password, 30, rememberMe);

    if (user) {
      // Success - redirect to dashboard
      window.location.href = "/dashboard.html";
    } else {
      // Failed login
      showError("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    showError(error.message);
  }
}

// Registration form handler
function handleRegistration(event) {
  event.preventDefault();

  const userData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    name: document.getElementById("name").value,
    // Add other user fields as needed
  };

  try {
    AuthService.register(userData);
    // Success - redirect to dashboard
    window.location.href = "/dashboard.html";
  } catch (error) {
    console.error("Registration error:", error);
    showError(error.message);
  }
}

// Check authentication status and redirect if needed
function checkAuth() {
  if (!AuthService.isLoggedIn()) {
    // Redirect to login page if not authenticated
    window.location.href = "/login.html";
    return false;
  }
  return true;
}

// Logout handler
function handleLogout() {
  AuthService.logout();
  window.location.href = "/login.html";
}

// Show error message helper
function showError(message) {
  const errorElement = document.getElementById("error-message");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  } else {
    alert(message);
  }
}

// Example: Protect a page that requires authentication
function initSecurePage() {
  if (checkAuth()) {
    const currentUser = AuthService.getCurrentUser();
    // Update UI with user info
    document.getElementById("user-name").textContent = currentUser.name;

    // Load user's groups
    const userGroups = LocalStorageService.memberships.getUserGroups(
      currentUser.email
    );
    displayGroups(userGroups);
  }
}

// Example: Display user's groups
function displayGroups(groups) {
  const groupsContainer = document.getElementById("user-groups");
  if (!groupsContainer) return;

  groupsContainer.innerHTML = "";

  if (groups.length === 0) {
    groupsContainer.innerHTML = "<p>You haven't joined any groups yet.</p>";
    return;
  }

  groups.forEach((group) => {
    const groupElement = document.createElement("div");
    groupElement.className = "group-card";
    groupElement.innerHTML = `
      <h3>${group.name}</h3>
      <p><strong>Subject:</strong> ${group.subject}</p>
      <p><strong>Topic:</strong> ${group.topic}</p>
      <button class="view-group" data-id="${group.id}">View Group</button>
    `;
    groupsContainer.appendChild(groupElement);
  });

  // Add event listeners to view group buttons
  document.querySelectorAll(".view-group").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = `/group.html?id=${button.dataset.id}`;
    });
  });
}

// Auto-refresh the session when user is active
function setupSessionRefresh() {
  if (AuthService.isLoggedIn()) {
    // List of events to monitor for activity
    const events = ["mousedown", "keydown", "scroll", "touchstart"];

    // Add event listeners to refresh session on activity
    events.forEach((event) => {
      document.addEventListener(event, refreshSessionOnActivity, {
        passive: true,
      });
    });

    // Set up periodic check for session validity
    setInterval(() => {
      AuthService._checkTokenExpiration();
    }, 60000); // Check every minute
  }
}

// Throttled function to prevent excessive refreshes
let refreshTimeout = null;
function refreshSessionOnActivity() {
  // Only refresh once every 5 minutes at most
  if (!refreshTimeout && AuthService.isLoggedIn()) {
    refreshTimeout = setTimeout(() => {
      refreshTimeout = null;
    }, 5 * 60 * 1000);

    // Extend the session
    extendCurrentSession();
  }
}

// Extend the current session without requiring re-login
function extendCurrentSession() {
  const authState = AuthService.getAuthState();

  if (authState && authState.isAuthenticated) {
    // Calculate new expiry time (reset to default)
    const now = new Date().getTime();
    const expiryTime = now + AuthService.DEFAULT_EXPIRY;

    // Update the expiration time
    authState.expiresAt = expiryTime;
    localStorage.setItem("authState", JSON.stringify(authState));

    console.log(
      "Session extended to",
      new Date(expiryTime).toLocaleTimeString()
    );
  }
}

// Example: HTML for the login form with Remember Me option
const loginFormHtml = `
<form id="login-form">
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" required>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" required>
  </div>
  <div class="form-check">
    <input type="checkbox" id="remember-me">
    <label for="remember-me">Remember me for 30 days</label>
  </div>
  <div id="error-message" class="error-message" style="display: none;"></div>
  <button type="submit">Login</button>
</form>
`;

// Initialize session refresh on page load
document.addEventListener("DOMContentLoaded", setupSessionRefresh);

export { AuthService };
