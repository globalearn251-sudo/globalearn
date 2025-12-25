# Investment Product Web Application Requirements Document

## 1. Application Overview

### 1.1 Application Name
Investment Product Platform

### 1.2 Application Description
A full production-ready responsive web application for investment product management, featuring user investment, daily earnings, wallet management, referral system, and lucky draw functionality.

### 1.3 Core Features
- User authentication and profile management
- Investment product browsing and purchasing
- Wallet system with recharge and withdrawal
- Daily automatic earnings distribution
- Referral team management
- Lucky draw system\n- Basic KYC verification
- Comprehensive admin panel

## 2. Technical Requirements

### 2.1 Database\nLocal database\n\n### 2.2 Responsive Design
Mobile-first responsive design approach

## 3. User Interface Design

### 3.1 Theme
Light theme with clean financial app aesthetic

### 3.2 Navigation Structure
Fixed bottom navigation bar (mobile) with five sections:
- Home
- Products
- Lucky Draw
- Team
- Profile
\n### 3.3 Design Style
- Color Scheme: Professional financial tones with primary blue (#2563eb) and accent green (#10b981) for positive actions
- Visual Details: Subtle shadows for card elevation, 8px rounded corners, minimalist icons, smooth transitions
- Layout: Card-based layout with clear visual hierarchy and adequate white space

## 4. User Authentication

### 4.1 Login & Signup
- Simple phone number and password authentication
- Forgot password functionality
- No OTP verification required
- Redirect to dashboard after successful login

## 5. User Dashboard

### 5.1 Top Section
- Company banner (admin-updatable)
- Company notice and information display
\n### 5.2 Wallet Summary
- Total Balance display
- Earnings display
- Withdrawable Amount display
- Recharge button
- Withdraw button
\n### 5.3 Dashboard Sections
- My Assets overview
- Daily Check-in Bonus
- Company Details (admin-updatable)
\n## 6. KYC Verification

### 6.1 User Submission
- Government ID upload (front and back)
- Bank details submission
\n### 6.2 Admin Review
- Approve or reject KYC submissions
- Simple verification workflow

## 7. Products Module

### 7.1 Product Display
Each product shows:
- Product image
- Price
- Daily earnings amount
- Contract duration
- Buy button

### 7.2 Purchase Flow
- Deduct amount from user wallet
- Activate daily earning schedule
- Record transaction\n\n### 7.3 Admin Product Management
- Add new products
- Edit existing products
- Delete products
- Set price, daily income, and duration
- Activate or deactivate products

## 8. Recharge System

### 8.1 User Process
1. Enter recharge amount
2. View admin QR code
3. Upload payment screenshot
4. Status shows as pending

### 8.2 Admin Management
- Approve recharge requests (add balance to user wallet)
- Reject recharge requests
- Update QR code anytime
\n## 9. Daily Earning System

### 9.1 Automatic Distribution
- Daily automatic earnings calculation
- Add earnings to user wallet
- Stop after contract period expires
- Maintain detailed earning logs

## 10. Withdrawal System

### 10.1 User Request
- Submit withdrawal request from available balance
\n### 10.2 Admin Processing
- Manual transfer processing
- Approve or reject requests
- Update user wallet upon approval

## 11. Lucky Draw\n
### 11.1 User Features
- One spin per day limit
- Random bonus rewards
- Auto-add rewards to wallet
\n### 11.2 Admin Management
- Configure reward options
- Manage reward probabilities
\n## 12. Referral Team System

### 12.1 Features
- Unique referral link generation
- Display list of referred users
- Show referral earnings summary
- Single-level referral structure

## 13. User Profile\n
### 13.1 Profile Sections
- Personal details
- KYC status display
- Order history
- Transaction history
- Withdrawal history
- Change password functionality

## 14. Admin Panel
\n### 14.1 Management Modules
- User management
- KYC approval system
- Product management
- Recharge request handling
- Withdrawal request processing
- Wallet transaction logs
- Company information updates
- Banner management
- Lucky draw reward configuration

## 15. Security Requirements

### 15.1 Security Measures
- Secure login authentication
- Admin access protection
- Input validation
- Wallet transaction security
- Prevention of balance manipulation

## 16. Development Goals

### 16.1 Core Objectives
- Simple and fast user experience
- Working investment features
- Reliable wallet system
- Manual recharge and withdrawal processes
- Basic referral functionality
- Lucky draw engagement feature
- Complete admin control\n- No OTP complexity
- Streamlined development approach