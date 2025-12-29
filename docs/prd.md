# Investment Product Web Application Requirements Document

## 1. Application Overview

### 1.1 Application Name
Investment Product Platform

### 1.2 Application Description\nA full production-ready responsive web application for investment product management, featuring user investment, daily earnings, wallet management, referral system, lucky draw functionality, and comprehensive notification system.

### 1.3 Core Features
- Comprehensive admin panel
- User authentication and profile management
- Investment product browsing and purchasing
- Wallet system with recharge and withdrawal
- Daily automatic earnings distribution\n- Referral team management\n- Lucky draw system
- Basic KYC verification
- Notification system with admin broadcast capability
\n## 2. Admin Panel\n
### 2.1 Admin Dashboard
- Overview statistics (total users, active investments, pending requests)
- Quick access to all management modules
- Real-time transaction monitoring

### 2.2 User Management
- View all registered users
- User details and activity logs
- Wallet balance overview
- Suspend or activate user accounts
\n### 2.3 KYC Approval System
- Review submitted KYC documents
- View government ID uploads (front and back)
- Review bank details\n- Approve or reject KYC submissions
- Simple verification workflow

### 2.4 Product Management
- Add new investment products
- Edit existing products
- Delete products
- Set price, daily income, and duration
- Activate or deactivate products
- Upload product images

### 2.5 Recharge Request Handling
- View pending recharge requests
- Review payment screenshots\n- Approve requests (add balance to user wallet)
- Reject requests with reason
- Update payment QR code anytime
\n### 2.6 Withdrawal Request Processing
- View pending withdrawal requests
- Manual transfer processing
- Approve or reject requests
- Update user wallet upon approval
- Maintain withdrawal history logs

### 2.7 Wallet Transaction Logs\n- Complete transaction history
- Filter by user, date, or transaction type
- Export transaction reports\n
### 2.8 Company Information Updates
- Update company banner
- Edit company notice and information
- Manage company details displayed on dashboard

### 2.9 Banner Management
- Upload and update dashboard banners
- Set banner display order
- Activate or deactivate banners

### 2.10 Lucky Draw Reward Configuration
- Configure reward options
- Set reward amounts
- Manage reward probabilities
- View lucky draw history
\n### 2.11 Notification Management
- Create notifications for all users
- Set notification priority (Important or General)
- Edit notification content
- Delete notifications
- View notification history
- Track notification delivery status

## 3. Technical Requirements

### 3.1 Database
Local database

### 3.2 Responsive Design
Mobile-first responsive design approach\n
## 4. User Interface Design

### 4.1 Theme
Light theme with clean financial app aesthetic

### 4.2 Navigation Structure
Fixed bottom navigation bar (mobile) with five sections:
- Home
- Products
- Lucky Draw
- Team\n- Profile

### 4.3 Design Style\n- Color Scheme: Professional financial tones with primary blue (#2563eb) and accent green (#10b981) for positive actions, red badge (#ef4444) for notification indicators
- Visual Details: Subtle shadows for card elevation, 8px rounded corners, minimalist icons, smooth transitions, marquee animation for important notifications
- Layout: Card-based layout with clear visual hierarchy and adequate white space

## 5. User Authentication

### 5.1 Login & Signup
- Simple phone number and password authentication
- Forgot password functionality
- No OTP verification required
- Redirect to dashboard after successful login

## 6. User App Header

### 6.1 Header Layout
- Fixed top header bar across all user pages
- Left side: Notification bell icon with unread count badge
- Right side: 'Welcome back, [User Name]' greeting text
\n### 6.2 Notification Icon
- Bell icon with red badge showing unread notification count
- Click to open notification center
- Badge disappears when all notifications are read

## 7. Notification Center

### 7.1 Notification List
- Display all notifications sent by admin
- Show notification title and content
- Display timestamp for each notification
- Mark notifications as Important or General with visual indicators
- Important notifications highlighted with distinct color or icon
- Mark individual notifications as read
- Mark all as read option

### 7.2 Notification Types
- Important: Highlighted with red or orange indicator
- General: Standard display style
\n## 8. User Dashboard

### 8.1 Top Section
- User app header (Welcome message and notification icon)
- Company banner (admin-updatable)
- Company notice and information display
\n### 8.2 Wallet Summary
- Total Balance display
- Earnings display
- Withdrawable Amount display
- Recharge button
- Withdraw button

### 8.3 Important Notification Marquee
- Positioned below 'My Wallet' section
- Display important notifications in left-to-right scrolling style
- Continuous loop animation
- Click to view full notification details
- Only show notifications marked as Important by admin

### 8.4 Dashboard Sections
- My Assets overview
- Daily Check-in Bonus
- Company Details (admin-updatable)

## 9. KYC Verification

### 9.1 User Submission
- Government ID upload (front and back)\n- Bank details submission
\n### 9.2 Admin Review
- Approve or reject KYC submissions
- Simple verification workflow

## 10. Products Module

### 10.1 Product Display
Each product shows:
- Product image
- Price
- Daily earnings amount
- Contract duration
- Buy button
\n### 10.2 Purchase Flow
- Deduct amount from user wallet
- Activate daily earning schedule
- Record transaction

## 11. Recharge System

### 11.1 User Process
1. Enter recharge amount
2. View admin QR code
3. Upload payment screenshot
4. Status shows as pending

### 11.2 Admin Management
- Approve recharge requests (add balance to user wallet)
- Reject recharge requests
- Update QR code anytime

## 12. Daily Earning System\n
### 12.1 Automatic Distribution
- Daily automatic earnings calculation
- Add earnings to user wallet
- Stop after contract period expires
- Maintain detailed earning logs

## 13. Withdrawal System

### 13.1 User Request
- Submit withdrawal request from available balance

### 13.2 Admin Processing\n- Manual transfer processing
- Approve or reject requests
- Update user wallet upon approval
\n## 14. Lucky Draw\n
### 14.1 User Features
- One spin per day limit
- Random bonus rewards
- Auto-add rewards to wallet

### 14.2 Admin Management
- Configure reward options
- Manage reward probabilities

## 15. Referral Team System

### 15.1 Features
- Unique referral link generation
- Display list of referred users
- Show referral earnings summary
- Single-level referral structure

## 16. User Profile

### 16.1 Profile Sections
- Personal details
- KYC status display
- Order history\n- Transaction history
- Withdrawal history
- Change password functionality

## 17. Security Requirements

### 17.1 Security Measures\n- Secure login authentication
- Admin access protection
- Input validation
- Wallet transaction security
- Prevention of balance manipulation\n
## 18. Development Goals

### 18.1 Core Objectives
- Simple and fast user experience
- Working investment features
- Reliable wallet system
- Manual recharge and withdrawal processes
- Basic referral functionality
- Lucky draw engagement feature
- Complete admin control
- Real-time notification system
- No OTP complexity
- Streamlined development approach