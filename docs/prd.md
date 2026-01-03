# Investment Product Web Application Requirements Document

## 1. Application Overview

### 1.1 Application Name
Investment Product Platform

### 1.2 Application Description\nA full production-ready responsive web application for investment product management, featuring user investment, daily earnings, wallet management, referral system, lucky draw functionality, and comprehensive notification system.

### 1.3 Core Features
- Comprehensive admin panel\n- User authentication and profile management\n- Investment product browsing and purchasing
- Wallet system with recharge and withdrawal
- Daily automatic earnings distribution
- Referral team management
- Lucky draw system
- Basic KYC verification
- Notification system with admin broadcast capability

## 2. Admin Panel

### 2.1 Admin Dashboard
- Overview statistics (total users, active investments, pending requests)
- Quick access to all management modules\n- Real-time transaction monitoring\n
### 2.2 User Management
- View all registered users
- User details and activity logs
- Wallet balance overview
- Suspend or activate user accounts

### 2.3 KYC Approval System
- Review submitted KYC documents
- View government ID uploads (front and back)
- Review bank details
- Approve or reject KYC submissions\n- Simple verification workflow
\n### 2.4 Product Management
- Add new investment products
- Edit existing products
- Delete products
- Set price, daily income, and duration
- Activate or deactivate products
- Upload product images

### 2.5 Recharge Request Handling
- View pending recharge requests
- Review payment screenshots
- Approve requests (add balance to user wallet)
- Reject requests with reason
- Update payment QR code anytime

### 2.6 Withdrawal Request Processing
- View pending withdrawal requests\n- Manual transfer processing
- Approve or reject requests
- Update user wallet upon approval
- Maintain withdrawal history logs
\n### 2.7 Wallet Transaction Logs
- Complete transaction history
- Filter by user, date, or transaction type
- Export transaction reports

### 2.8 Company Information Updates
- Update company banner\n- Edit company notice and information\n- Manage company details displayed on dashboard

### 2.9 Banner Management
- Upload and update dashboard banners
- Set banner display order
- Activate or deactivate banners

### 2.10 Lucky Draw Reward Configuration\n- Configure reward options
- Set reward amounts
- Manage reward probabilities
- View lucky draw history

### 2.11 Notification Management\n- Create notifications for all users\n- Set notification priority (Important or General)
- Edit notification content\n- Delete notifications
- View notification history
- Track notification delivery status

### 2.12 Withdrawal Settings
- Set minimum withdrawal amount limit
- Configure minimum balance threshold that users must reach before submitting withdrawal requests
- Update withdrawal limit anytime

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
- Color Scheme: Professional financial tones with primary blue (#2563eb) and accent green (#10b981) for positive actions, red badge (#ef4444) for notification indicators
- Visual Details: Subtle shadows for card elevation, 8px rounded corners, minimalist icons, smooth transitions, marquee animation for important notifications
- Layout: Card-based layout with clear visual hierarchy and adequate white space

## 5. User Authentication

### 5.1 Login & Signup
- Simple phone number and password authentication
- Forgot password functionality
- No OTP verification required
- Redirect to dashboard after successful login

## 6. User App Header\n
### 6.1 Header Layout
- Fixed top header bar across all user pages
- Left side: Notification bell icon with unread count badge
- Right side: Welcome back, [User Name] greeting text

### 6.2 Notification Icon\n- Bell icon with red badge showing unread notification count
- Click to open notification center
- Badge disappears when all notifications are read\n
## 7. Notification Center

### 7.1 Notification List\n- Display all notifications sent by admin
- Show notification title and content
- Display timestamp for each notification
- Mark notifications as Important or General with visual indicators
- Important notifications highlighted with distinct color or icon\n- Mark individual notifications as read\n- Mark all as read option\n
### 7.2 Notification Types
- Important: Highlighted with red or orange indicator
- General: Standard display style

## 8. User Dashboard

### 8.1 Top Section
- User app header (Welcome message and notification icon)
- Company banner (admin-updatable)
- Company notice and information display

### 8.2 Wallet Summary
- Total Balance display\n- Earnings display
- Withdrawable Amount display
- Recharge button
- Withdraw button

### 8.3 Important Notification Marquee
- Positioned below My Wallet section
- Display important notifications in left-to-right scrolling style
- Continuous loop animation
- Click to view full notification details
- Only show notifications marked as Important by admin
\n### 8.4 Dashboard Sections
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
- Price\n- Daily earnings amount
- Contract duration
- Buy button\n
### 10.2 Purchase Flow
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
\n## 12. Daily Earning System

### 12.1 Automatic Distribution
- System runs daily at a fixed time (e.g., 00:00 UTC) to calculate earnings for all active investments
- For each active investment product:
  - Calculate daily earnings based on product's daily income rate
  - Add calculated earnings to user's Total Balance
  - Add calculated earnings to user's Withdrawable Amount
  - Record earning transaction in wallet transaction logs
  - Update earning history for the user
- Automatically stop earnings distribution when contract period expires
- Mark expired investments as completed
- Maintain detailed earning logs with date, amount, and product information

### 12.2 Earning Calculation Logic
- Daily earnings = Product daily income amount (as configured by admin)
- Earnings are added to both Total Balance and Withdrawable Amount simultaneously
- Track number of days earnings have been distributed
- Compare with contract duration to determine when to stop

### 12.3 Withdrawable Amount Management
- Withdrawable Amount consists exclusively of:
  - Daily earnings from active investments
  - Referral bonuses
  - Lucky draw rewards
- Withdrawable Amount increases with:
  - Daily earnings from active investments
  - Referral bonuses
  - Lucky draw rewards
- Withdrawable Amount decreases with:
  - Approved withdrawal requests
- Display Withdrawable Amount separately on dashboard
- Validate withdrawal requests against minimum withdrawal limit set by admin
- Only allow withdrawal requests when Withdrawable Amount meets or exceeds the minimum limit
- Show error message if withdrawal amount is below minimum limit

## 13. Withdrawal System

### 13.1 User Request\n- Submit withdrawal request from available Withdrawable Amount
- System validates request amount does not exceed Withdrawable Amount
- System validates Withdrawable Amount meets minimum withdrawal limit set by admin
- Display error message if Withdrawable Amount is below minimum limit (e.g., if limit is 500 and user has less than 500, request cannot be submitted)
- Display pending status after successful submission

### 13.2 Admin Processing
- Manual transfer processing
- Approve or reject requests
- Upon approval:
  - Deduct amount from user's Total Balance
  - Deduct amount from user's Withdrawable Amount
  - Record transaction in withdrawal history
- Upon rejection:
  - No changes to wallet balances
  - Notify user with rejection reason

## 14. Lucky Draw

### 14.1 User Features
- One spin per day limit
- Random bonus rewards
- Auto-add rewards to wallet
- Rewards added to both Total Balance and Withdrawable Amount\n
### 14.2 Admin Management
- Configure reward options
- Manage reward probabilities

## 15. Referral Team System

### 15.1 Features
- Unique referral link generation
- Display list of referred users
- Show referral earnings summary
- Single-level referral structure
- Referral bonuses added to both Total Balance and Withdrawable Amount\n
## 16. User Profile

### 16.1 Profile Sections
- Personal details
- KYC status display
- Order history
- Transaction history
- Withdrawal history
- Change password functionality

## 17. Security Requirements

### 17.1 Security Measures
- Secure login authentication\n- Admin access protection
- Input validation
- Wallet transaction security
- Prevention of balance manipulation

## 18. Development Goals

### 18.1 Core Objectives\n- Simple and fast user experience\n- Working investment features
- Reliable wallet system
- Automated daily earnings distribution
- Manual recharge and withdrawal processes
- Basic referral functionality
- Lucky draw engagement feature
- Complete admin control
- Real-time notification system
- No OTP complexity
- Streamlined development approach