# React Enterprise Architecture Pattern

## Container/Presentational Component Pattern

This repository demonstrates production-ready React code following industry best practices used at FAANG companies (Google, Meta, Amazon, Netflix).

## 📁 Project Structure
Code-Review/
├── README.md                          # Main documentation (root)
├── Python-Code/
│   ├── Serializer.py                  # User registration serializer
│   └── Views.py                       # Signup view with token validation
└── React-Code/
    ├── ContainerExample.jsx           # Smart component (logic)
    └── ComponentExample.jsx           # Dumb component (presentation)


## 🎯 The Pattern

### Container Component (`ContainerExample.jsx`)
**Responsibility:** Logic, State Management, Side Effects
- Manages all business logic
- Handles API calls and data fetching
- Manages component state
- Contains event handlers
- Performs data transformations
- No JSX presentation logic

### Presentational Component (`ComponentExample.jsx`)
**Responsibility:** UI Rendering Only
- Pure rendering based on props
- No state management
- No API calls
- Reusable and testable
- Receives data and callbacks via props

## ✨ Production-Ready Features

### 1. **Separation of Concerns**
```jsx
// Container handles complexity
const Container = () => {
    const [data, setData] = useState();
    const handleSubmit = async () => { /* complex logic */ };
    return <Component data={data} onSubmit={handleSubmit} />;
};

// Component just renders
const Component = ({ data, onSubmit }) => (
    <form onSubmit={onSubmit}>{/* render data */}</form>
);


---

## 🐍 Python Code Analysis (Django REST Framework)

### `Serializer.py` - Data Validation Layer

**Purpose:** Handles user registration validation with enterprise-grade security

#### What This Code Demonstrates:

| Aspect | Implementation | Production Value |
|--------|---------------|------------------|
| **Password Security** | Multiple validation rules (length, special chars, uppercase, digits) | Prevents weak passwords |
| **Password Confirmation** | `password` vs `password_1` validation | Prevents typos |
| **Email Validation** | Email format + matching against invited user | Prevents unauthorized signups |
| **Django Password Validation** | Uses `validate_password()` | Leverages Django's built-in security |
| **Custom Validation Rules** | 4+ letters, no spaces, special characters | Enforces strong passwords |
| **Context-Aware Validation** | Accesses `user` from context | Validates against invited user |

#### Production Features:

```python
# ✅ Security Features
- Password complexity enforcement (digits, uppercase, special chars)
- Minimum length requirements (8+ characters)
- No spaces allowed in passwords
- Minimum 4 letters requirement
- Email format validation
- Email matching against invitation

# ✅ Production Patterns
- Clear error messages for each validation failure
- Context injection for additional data
- ModelSerializer inheritance for DRY code
- Write-only password fields (never serialized to response)

# ✅ GET Endpoint - Retrieve invitation data
- Validates token and returns user info
- Checks is_invited=True, is_active=False
- 7-day expiration window
- Returns email, first_name, last_name

# ✅ POST Endpoint - Complete signup
- Double validates token (security)
- Password validation via serializer
- Sets password and activates user
- Auto-authenticates and logs in
- Comprehensive error handling

# ✅ Security Features
- Users cannot self-register without invitation
- Tokens expire after 7 days
- Already activated users cannot reuse token
- Password never logged