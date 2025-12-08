# Review UI - Next.js 13+ Project

A modern, fully-featured UI for reputation management with review dashboard, profile management, and authentication flows.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server (hot reload enabled)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
/workspaces/REVIEW_UI/
├── app/                          # Next.js 13+ App Router
│   ├── layout.jsx               # Root layout
│   ├── CreateAccount/           # Sign up page
│   ├── EmailVerification/       # Email verification page
│   ├── ForgotPassword/          # Forgot password page
│   ├── Login/                   # Login page
│   ├── PasswordResetSuccess/    # Password reset success page
│   ├── ResetPassword/           # Reset password page
│   ├── ReviewDashboard/         # Dashboard page (with layout)
│   └── ReviewProfile/           # Profile page (with layout)
├── src/
│   ├── components/              # React components
│   │   ├── Layout.jsx          # Main layout wrapper (for dashboard/profile)
│   │   ├── Sidebar.jsx         # Sidebar component
│   │   ├── ReviewDashboard.jsx # Dashboard component
│   │   ├── ReviewProfile.jsx   # Profile component
│   │   ├── Login.jsx           # Login component
│   │   ├── CreateAccount.jsx   # Create account component
│   │   ├── ForgotPassword.jsx  # Forgot password component
│   │   ├── ResetPassword.jsx   # Reset password component
│   │   ├── PasswordResetSuccess.jsx # Success component
│   │   └── EmailVerification.jsx    # Email verification component
│   └── styles/
│       └── globals.css          # Global styles with Tailwind
├── public/                       # Static assets
├── package.json                  # Dependencies
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
├── .eslintrc.json               # ESLint configuration
└── .gitignore                   # Git ignore rules
```

## 🎨 Features

### Pages
- **Authentication Pages** (No layout/sidebar):
  - Login page
  - Create Account page
  - Forgot Password page
  - Reset Password page
  - Password Reset Success page
  - Email Verification page

- **Dashboard Pages** (With Layout):
  - Review Dashboard with review management
  - User Profile management

### UI Components
- Form validation and error handling
- Password visibility toggle
- Real-time password strength indicator
- Review filtering and searching
- Responsive design with Tailwind CSS
- Icon integration with Lucide React

## 🛠️ Technologies

- **Framework**: Next.js 14.0
- **React**: 18.2.0
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Linting**: ESLint
- **Config**: TypeScript (via tsconfig)

## 📝 Key Configuration Files

### `package.json`
Defines project dependencies and scripts for development, building, and linting.

### `next.config.js`
Next.js configuration with:
- React strict mode enabled
- SWC minification
- Unsplash image domain configured

### `tsconfig.json`
TypeScript configuration for modern JavaScript with path aliases.

### `tailwind.config.js`
Tailwind CSS configuration with custom color palette and responsive settings.

### `postcss.config.js`
PostCSS configuration for Tailwind and Autoprefixer.

## 🚦 Running on Localhost

After installation, the application will run on:
```
http://localhost:3000
```

The dev server supports hot module replacement (HMR), so changes are reflected instantly.

## 📚 Pages & Routes

| Route | Component | Layout | Purpose |
|-------|-----------|--------|---------|
| `/` | N/A | - | Root (add home page) |
| `/login` | Login | None | User authentication |
| `/create-account` | CreateAccount | None | Account registration |
| `/email-verification` | EmailVerification | None | Email verification |
| `/forgot-password` | ForgotPassword | None | Password recovery |
| `/reset-password` | ResetPassword | None | Password reset |
| `/password-reset-success` | PasswordResetSuccess | None | Reset confirmation |
| `/review-dashboard` | ReviewDashboard | Layout | Review management |
| `/review-profile` | ReviewProfile | Layout | User profile |

## 🔧 Development Tips

1. **Add new pages**: Create a folder in `/app` with a `page.jsx` file
2. **Create components**: Add `.jsx` files to `/src/components/`
3. **Use Client Components**: Add `'use client'` directive for interactive components
4. **Styling**: Use Tailwind CSS classes for styling
5. **Icons**: Import from `lucide-react` for consistent icons

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

**Issue**: Port 3000 already in use
```bash
npm run dev -- -p 3001
```

**Issue**: Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is private and part of the REVIEW_UI repository.

## 🤝 Contributing

All work is documented in the git repository. Create a branch and submit pull requests.