# Encrypted State Persistence

## Overview

The StateService now uses **encrypted sessionStorage** to persist data across page refreshes while preventing users from easily reading or modifying the data.

## How It Works

### 1. **SessionStorage (Not LocalStorage)**
- Data persists across page refreshes **within the same browser session**
- Data is **automatically cleared** when the browser/tab is closed
- More secure than localStorage for sensitive data

### 2. **Encryption**
- All data is encrypted before being stored in sessionStorage
- Uses XOR-based encryption with Base64 encoding
- Encryption key is generated dynamically on each app load
- Users cannot easily read the encrypted data in browser DevTools

### 3. **Automatic State Restoration**
- When the app loads, it automatically restores encrypted state
- Token expiration is checked before restoration
- Invalid/expired tokens are automatically cleared

## Features

✅ **Persistent Across Refreshes** - Data survives page reloads
✅ **Encrypted** - Users cannot easily read data in browser
✅ **Session-Based** - Cleared when browser/tab closes
✅ **Token Validation** - Expired tokens are automatically removed
✅ **Type-Safe** - Full TypeScript support
✅ **Reactive** - Observable streams for state changes

## Security Considerations

### What This Provides:
- ✅ **Obfuscation** - Data is not readable in plain text
- ✅ **Session Security** - Data cleared on browser close
- ✅ **Token Validation** - Expired tokens are rejected
- ✅ **Tamper Detection** - Modified data will fail decryption

### What This Does NOT Provide:
- ❌ **Military-Grade Encryption** - This is obfuscation, not AES-256
- ❌ **Protection Against Determined Attackers** - Advanced users can reverse-engineer
- ❌ **XSS Protection** - If your app has XSS vulnerabilities, data can still be accessed

### For Production:
Consider upgrading to:
1. **Web Crypto API** - Browser's native encryption
2. **crypto-js** - Industry-standard encryption library
3. **HttpOnly Cookies** - For tokens (backend-managed)

## Usage Examples

### Basic Usage (Same as Before)

```typescript
import { StateService } from './core/services/state.service';

constructor(private stateService: StateService) {}

// Set auth state (automatically encrypted and persisted)
this.stateService.setAuthState(token, user, refreshToken);

// Get current user (automatically decrypted if needed)
const user = this.stateService.getCurrentUser();

// Check authentication
if (this.stateService.isAuthenticated()) {
  console.log('User is logged in');
}

// Logout (clears memory and sessionStorage)
this.stateService.clearAuthState();
```

### Persistent Custom State

```typescript
// Store data with persistence
this.stateService.setState('resumeData', myResume, true); // persist = true

// Get data (automatically loads from storage if not in memory)
const resume = this.stateService.getState('resumeData');

// Remove data (from memory and storage)
this.stateService.removeState('resumeData');
```

### Manual Persistence

```typescript
// Manually trigger state persistence (useful for critical data)
this.stateService.persistCurrentState();
```

## How Encryption Works

### Encryption Process:
1. Data is converted to JSON string
2. XOR encryption is applied with dynamic key
3. Result is Base64 encoded
4. Stored in sessionStorage

### Decryption Process:
1. Data is retrieved from sessionStorage
2. Base64 decoded
3. XOR decryption with same key
4. Parsed back to original object

### Example of Encrypted Data:

**Original Data:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "id": "123"
  },
  "isAuthenticated": true
}
```

**Encrypted in SessionStorage:**
```
_app_auth: "SGVsbG8gV29ybGQhIFRoaXMgaXMgZW5jcnlwdGVkIGRhdGE="
```

Users cannot read this in browser DevTools without:
1. Finding the encryption algorithm in your code
2. Extracting the dynamic encryption key
3. Implementing the decryption logic

## Behavior on Page Refresh

### Before (In-Memory Only):
```
1. User logs in ✅
2. User refreshes page 🔄
3. User is logged out ❌ (data lost)
4. User must log in again 😞
```

### After (Encrypted SessionStorage):
```
1. User logs in ✅
2. Data encrypted and stored 🔐
3. User refreshes page 🔄
4. Data automatically restored ✅
5. User stays logged in 😊
```

## Behavior on Browser Close

```
1. User logs in ✅
2. Data encrypted and stored 🔐
3. User closes browser/tab 🚪
4. SessionStorage automatically cleared 🧹
5. Next visit requires login 🔑
```

## Token Expiration Handling

```typescript
// On app load or state access
1. Load encrypted data from sessionStorage
2. Decrypt the data
3. Check if token is expired
4. If expired:
   - Clear all state
   - Redirect to login
5. If valid:
   - Restore state
   - User stays logged in
```

## Debugging

### View State (Without Exposing Encrypted Data):

```typescript
// In your component or service
this.stateService.debugState();
```

**Output:**
```
=== STATE DEBUG ===
Auth State: {
  isAuthenticated: true,
  hasToken: true,
  hasRefreshToken: true,
  user: { email: 'user@example.com', id: '123' }
}
App State Keys: ['resumeData', 'preferences']
SessionStorage Keys: ['_app_auth', '_app_resumeData']
==================
```

### View Encrypted Data in Browser:

1. Open DevTools (F12)
2. Go to Application → Storage → Session Storage
3. You'll see keys like `_app_auth` with encrypted values
4. The values are **not readable** without decryption

## Migration from Old Service

No changes needed! The API is the same:

```typescript
// Before (in-memory only)
this.stateService.setAuthState(token, user);

// After (encrypted + persistent)
this.stateService.setAuthState(token, user); // Same call!
```

The persistence and encryption happen automatically.

## Upgrading to Stronger Encryption

If you need stronger encryption for production, here's how to upgrade:

### Option 1: Web Crypto API (Native Browser)

```typescript
private async encrypt(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    dataBuffer
  );
  
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}
```

### Option 2: crypto-js Library

```bash
npm install crypto-js
npm install --save-dev @types/crypto-js
```

```typescript
import * as CryptoJS from 'crypto-js';

private encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, this.ENCRYPTION_KEY).toString();
}

private decrypt(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, this.ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
```

## Best Practices

1. **Don't Store Sensitive Data** - Even encrypted, avoid storing credit cards, SSNs, etc.
2. **Use Short-Lived Tokens** - Implement token refresh for better security
3. **Validate on Backend** - Always validate tokens server-side
4. **Clear on Logout** - Always call `clearAuthState()` on logout
5. **Monitor Token Expiry** - Check token expiration before critical operations

## Troubleshooting

### Issue: User still logged out on refresh

**Check:**
1. Is token expired? Check token expiry time
2. Is sessionStorage enabled? Some browsers block it in incognito mode
3. Check console for decryption errors

### Issue: "Decryption error" in console

**Possible causes:**
1. Data was corrupted in sessionStorage
2. Encryption key changed (expected on app reload)
3. User manually modified sessionStorage

**Solution:** Clear sessionStorage and log in again

### Issue: Data not persisting

**Check:**
1. Are you calling `setAuthState()` after login?
2. Is sessionStorage available? (Check browser settings)
3. Check browser console for errors

## Summary

✅ **Data persists** across page refreshes
✅ **Data is encrypted** - users can't easily read it
✅ **Session-based** - cleared on browser close
✅ **Automatic restoration** - seamless user experience
✅ **Token validation** - expired tokens are rejected
✅ **Same API** - no code changes needed

Your application now provides a much better user experience while maintaining security! 🎉
