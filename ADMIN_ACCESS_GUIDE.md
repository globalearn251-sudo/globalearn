# Admin Panel Access Guide

## How to Access the Admin Panel

### Method 1: From Profile Page
1. Login to your account (first registered user is automatically admin)
2. Navigate to the **Profile** page (bottom navigation)
3. Look for the **"Admin Panel"** button at the top of the profile page
4. Click the button to go to `/admin`

### Method 2: Direct URL
1. Login to your account
2. Navigate directly to: `/admin`
3. You should see the admin sidebar with all management options

## Admin Panel Pages

Once in the admin panel, you'll see a sidebar on the left (desktop) with these options:

1. **Dashboard** (`/admin`) - Overview statistics
2. **Users** (`/admin/users`) - Manage users and roles
3. **Products** (`/admin/products`) - Create/edit investment products
4. **Recharges** (`/admin/recharges`) - Approve/reject recharge requests
5. **Withdrawals** (`/admin/withdrawals`) - Process withdrawal requests
6. **KYC Verification** (`/admin/kyc`) - Review and approve KYC submissions
7. **Lucky Draw** (`/admin/lucky-draw`) - Configure rewards and probabilities
8. **Settings** (`/admin/settings`) - Update company banner, notice, QR code

## Troubleshooting

### If you don't see the admin panel changes:

1. **Hard Refresh the Browser**
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`

2. **Clear Browser Cache**
   - Open browser DevTools (F12)
   - Right-click on the refresh button
   - Select "Empty Cache and Hard Reload"

3. **Check if you're logged in as admin**
   - Go to Profile page
   - Check if you see "Admin Panel" button
   - If not, you may not have admin role

4. **Verify first user is admin**
   - The first registered user automatically gets admin role
   - If you registered multiple accounts, only the first one is admin

### If pages show blank or loading:

1. **Check browser console for errors**
   - Press F12 to open DevTools
   - Go to Console tab
   - Look for any red error messages

2. **Verify all routes are loaded**
   - Try navigating to each admin page directly:
     - `/admin`
     - `/admin/users`
     - `/admin/products`
     - etc.

## Features Available in Each Page

### Users Management
- View all registered users
- See user balance, earnings, and KYC status
- Edit user roles (promote to admin or demote to user)

### Products Management
- Create new investment products
- Upload product images
- Set price, daily earnings, and contract duration
- Activate/deactivate products
- Edit or delete existing products

### Recharges Management
- View pending recharge requests
- See payment screenshots
- Approve requests (adds balance to user wallet)
- Reject requests with reason

### Withdrawals Management
- View pending withdrawal requests
- See user bank details
- Approve requests (marks as processed)
- Reject requests with reason

### KYC Verification
- Review ID documents (front and back)
- Verify bank account details
- Approve or reject with admin notes
- View submission history

### Lucky Draw Configuration
- Add/edit/delete reward options
- Set reward amounts
- Configure probabilities (must total 100%)
- Activate/deactivate rewards

### Company Settings
- Upload company banner image
- Upload recharge QR code
- Update company notice
- Update company details/description

## Next Steps

1. **Set up company information**
   - Go to Settings page
   - Upload banner and QR code
   - Add company notice and details

2. **Create investment products**
   - Go to Products page
   - Click "Create Product"
   - Fill in details and upload image
   - Products will appear on user Products page

3. **Configure lucky draw**
   - Go to Lucky Draw page
   - Add reward options
   - Set probabilities (must equal 100%)

4. **Process user requests**
   - Check Recharges, Withdrawals, and KYC pages regularly
   - Approve or reject pending requests

## Important Notes

- All admin pages are fully functional and ready to use
- Changes are saved to the database immediately
- Image uploads are automatically compressed to under 1MB
- All admin actions require authentication
- Admin ID is automatically tracked for all approvals/rejections

---

**Need Help?** Check the STATUS.md file for detailed feature documentation.
