# Investment Product Web Application Requirements Document

## 1. Application Overview

### 1.1 Application Name
Investment Product Platform

### 1.2 Application Description\nA full production-ready responsive web application for investment product management, featuring user investment, daily earnings, wallet management, referral system, and lucky draw functionality.

### 1.3 Core Features
- Comprehensive admin panel\n- User authentication and profile management\n- Investment product browsing and purchasing
- Wallet system with recharge and withdrawal
- Daily automatic earnings distribution
- Referral team management
- Lucky draw system
- Basic KYC verification
\n## 2. Admin Panel

### 2.1 Admin Dashboard
- Overview statistics (total users, active investments, pending requests)
- Quick access to all management modules
- Real-time transaction monitoring
\n### 2.2 User Management
- View all registered users
- User details and activity logs
- Wallet balance overview
- Suspend or activate user accounts

### 2.3 KYC Approval System
- Review submitted KYC documents
- View government ID uploads (front and back)
- Review bank details
- Approve or reject KYC submissions
- Simple verification workflow

### 2.4 Product Management\n- Add new investment products
- Edit existing products\n- Delete products
- Set price, daily income, and duration\n- Activate or deactivate products
- Upload product images

### 2.5 Recharge Request Handling
- View pending recharge requests
- Review payment screenshots
- Approve requests (add balance to user wallet)
- Reject requests with reason
- Update payment QR code anytime

### 2.6 Withdrawal Request Processing
- View pending withdrawal requests
- Manual transfer processing
- Approve or reject requests
- Update user wallet upon approval
- Maintain withdrawal history logs

### 2.7 Wallet Transaction Logs
- Complete transaction history
- Filter by user, date, or transaction type
- Export transaction reports
\n### 2.8 Company Information Updates
- Update company banner
- Edit company notice and information
- Manage company details displayed on dashboard

### 2.9 Banner Management
- Upload and update dashboard banners
- Set banner display order
- Activate or deactivate banners

### 2.10 Lucky Draw Reward Configuration
- Configure reward options\n- Set reward amounts\n- Manage reward probabilities
- View lucky draw history

## 3. Technical Requirements

### 3.1 Database
Local database

### 3.2 Responsive Design\nMobile-first responsive design approach

## 4. User Interface Design

### 4.1 Theme
Light theme with clean financial app aesthetic\n
### 4.2 Navigation Structure
Fixed bottom navigation bar (mobile) with five sections:\n- Home
- Products\n- Lucky Draw
- Team
- Profile

### 4.3 Design Style
- Color Scheme: Professional financial tones with primary blue (#2563eb) and accent green (#10b981) for positive actions
- Visual Details: Subtle shadows for card elevation, 8px rounded corners, minimalist icons, smooth transitions\n- Layout: Card-based layout with clear visual hierarchy and adequate white space

## 5. User Authentication

### 5.1 Login & Signup
- Simple phone number and password authentication
- Forgot password functionality
- No OTP verification required
- Redirect to dashboard after successful login

## 6. User Dashboard

### 6.1 Top Section
- Company banner (admin-updatable)
- Company notice and information display

### 6.2 Wallet Summary\n- Total Balance display
- Earnings display
- Withdrawable Amount display
- Recharge button
- Withdraw button

### 6.3 Dashboard Sections
- My Assets overview
- Daily Check-in Bonus
- Company Details (admin-updatable)

## 7. KYC Verification

### 7.1 User Submission
- Government ID upload (front and back)
- Bank details submission

### 7.2 Admin Review
- Approve or reject KYC submissions\n- Simple verification workflow
\n## 8. Products Module\n
### 8.1 Product Display
Each product shows:
- Product image
- Price
- Daily earnings amount
- Contract duration
- Buy button

### 8.2 Purchase Flow
- Deduct amount from user wallet
- Activate daily earning schedule
- Record transaction
\n## 9. Recharge System\n
### 9.1 User Process
1. Enter recharge amount
2. View admin QR code
3. Upload payment screenshot
4. Status shows as pending

### 9.2 Admin Management\n- Approve recharge requests (add balance to user wallet)
- Reject recharge requests
- Update QR code anytime

## 10. Daily Earning System

### 10.1 Automatic Distribution\n- Daily automatic earnings calculation
- Add earnings to user wallet
- Stop after contract period expires
- Maintain detailed earning logs

## 11. Withdrawal System

### 11.1 User Request
- Submit withdrawal request from available balance

### 11.2 Admin Processing
- Manual transfer processing
- Approve or reject requests
- Update user wallet upon approval

## 12. Lucky Draw

### 12.1 User Features
- One spin per day limit
- Random bonus rewards
- Auto-add rewards to wallet
\n### 12.2 Admin Management
- Configure reward options\n- Manage reward probabilities\n
## 13. Referral Team System

### 13.1 Features\n- Unique referral link generation
- Display list of referred users
- Show referral earnings summary
- Single-level referral structure

## 14. User Profile

### 14.1 Profile Sections
- Personal details
- KYC status display
- Order history
- Transaction history\n- Withdrawal history
- Change password functionality

## 15. Security Requirements

### 15.1 Security Measures
- Secure login authentication
- Admin access protection
- Input validation
- Wallet transaction security\n- Prevention of balance manipulation

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