### **Step 1: User Initiates Login**  
- **Action**: The user clicks "Sign in with Google" or "Sign in with GitHub" in your application.  
- **What Happens**:  
  - Your app (Client) redirects the user to the **Authorization Server** (Google/GitHub).  
  - Example URLs:  
    - Google: `https://accounts.google.com/o/oauth2/v2/auth`  
    - GitHub: `https://github.com/login/oauth/authorize`  

---

### **Step 2: Redirect to Authorization Server**  
- **Action**: The user is redirected to Google/GitHub’s authentication page.  
- **What Happens**:  
  - The Authorization Server checks if the user is logged in.  
  - If not logged in, the user enters credentials.  
  - The Authorization Server displays a consent screen asking the user to approve the requested permissions (e.g., access to email, profile).  

---

### **Step 3: User Grants Consent**  
- **Action**: The user approves the permissions.  
- **What Happens**:  
  - Google/GitHub generates a short-lived **authorization code**.  
  - The user is redirected back to your app’s `redirect_uri` (pre-configured URL) with this code.  
  - Example redirect URL:  
    - `https://yourapp.com/callback?code=AUTH_CODE&state=SECURITY_TOKEN`  

---

### **Step 4: App Exchanges Code for Access Token**  
- **Action**: Your app sends the authorization code to the Authorization Server’s **token endpoint**.  
- **What Happens**:  
  - **Server-Side Request**: Your app’s backend securely exchanges the code for an **access token**.  
  - **Endpoints**:  
    - Google: `https://oauth2.googleapis.com/token`  
    - GitHub: `https://github.com/login/oauth/access_token`  
  - **Required Parameters**:  
    - `client_id` (your app’s ID)  
    - `client_secret` (your app’s secret key)  
    - `code` (authorization code from Step 3)  
    - `grant_type=authorization_code`  

---

### **Step 5: Access Token Issued**  
- **Result**: The Authorization Server returns an **access token** (and optionally a **refresh token** for Google).  
  - **Google**: Also returns an `id_token` (JWT containing user info via OpenID Connect).  
  - **GitHub**: Returns only the `access_token`.  

---

### **Step 6: App Calls Resource Server API**  
- **Action**: Your app uses the access token to fetch user data from the **Resource Server** (Google/GitHub APIs).  
- **What Happens**:  
  - Your app sends a request to the user info endpoint with the access token in the `Authorization` header.  
  - **Example API Endpoints**:  
    - Google: `GET https://www.googleapis.com/oauth2/v3/userinfo`  
    - GitHub: `GET https://api.github.com/user`  
  - **Response**: The Resource Server returns user data (e.g., email, name, profile URL) in JSON format.  

---

### **Step 7: User Data Received**  
- **Final Result**: Your app receives the user’s data and completes the authentication process (e.g., logs the user in or creates an account).  

---

### **Key Differences Between Google and GitHub**  
1. **OpenID Connect (OIDC)**:  
   - Google supports OIDC, returning an `id_token` with user claims.  
   - GitHub does not support OIDC; user data is fetched via API.  
2. **Token Lifespan**:  
   - Google issues short-lived access tokens + long-lived refresh tokens.  
   - GitHub access tokens are long-lived unless revoked manually.  
3. **Scopes**:  
   - Google: `openid`, `email`, `profile` (common for basic user info).  
   - GitHub: `user:email`, `repo`, `read:org` (more developer-focused permissions).  

---

### **Critical Security Notes**  
- Always include the `state` parameter to prevent CSRF attacks.  
- Never expose the `client_secret` publicly (keep it server-side).  
- Use HTTPS for all communication to protect tokens and data.  

---

This flow ensures secure, delegated access to user data without exposing passwords to third-party apps. Each step is standardized but may vary slightly between providers (e.g., Google vs. GitHub).
