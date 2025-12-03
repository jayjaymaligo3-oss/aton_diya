# Profile Features Guide - Gabay sa Profile Features

## Mga Bagong Features

### 1. 📸 Profile Picture Upload
- **Pwede ka na mag-upload ng profile picture!**
- Click lang sa camera icon sa profile picture
- Automatic save sa localStorage
- Makikita mo ang picture sa:
  - Welcome banner sa dashboard
  - Profile tab
  - Navigation bar (future update)

**Paano gamitin:**
1. Pumunta sa Profile tab
2. Click ang camera icon sa profile picture
3. Pumili ng picture mula sa device mo
4. Automatic save!
5. Para tanggalin: Click "Remove photo"

### 2. 🔔 Functional Notifications
- **May working notifications dropdown na!**
- Makikita mo ang:
  - Order updates
  - Promo announcements
  - System notifications
- Red dot indicator pag may unread notifications

**Features:**
- Click ang bell icon para buksan
- Mark individual notifications as read
- "Mark all as read" button
- Auto-close pag nag-click outside

**Sample Notifications:**
- "Your order ORD-001 has been delivered"
- "New products from local artisans available!"
- "Your order ORD-002 is out for delivery"

### 3. ⚙️ Functional Settings Menu
- **May working settings dropdown na!**
- Quick access sa:
  - Edit Profile
  - Change Password (coming soon)
  - Privacy Settings (coming soon)
  - Logout

**Paano gamitin:**
1. Click ang settings icon (gear)
2. Pumili ng option
3. Auto-redirect sa tamang page

### 4. ✏️ Edit Profile
- **Pwede mo na i-edit ang profile info!**
- Editable fields:
  - Name
  - Email
  - Phone
  - Address

**Paano mag-edit:**
1. Pumunta sa Profile tab
2. Click "Edit Profile" button
3. I-update ang information
4. Click "Save Changes"
5. Saved sa localStorage!

## Technical Details

### Profile Picture Storage
```javascript
// Saved as base64 string sa localStorage
localStorage.setItem('profilePicture', base64String);

// Load on mount
const savedProfilePic = localStorage.getItem('profilePicture');
```

### Notifications State
```javascript
const [notifications, setNotifications] = useState([
  { 
    id: 1, 
    type: 'order', 
    message: 'Your order has been delivered', 
    time: '2 hours ago', 
    read: false 
  }
]);
```

### Profile Data State
```javascript
const [profileData, setProfileData] = useState({
  name: '',
  email: '',
  phone: '',
  address: ''
});
```

## UI/UX Improvements

### Notifications Dropdown
- Smooth animation (framer-motion)
- Max height with scroll
- Unread indicator (blue background)
- Click to mark as read
- "Mark all as read" option

### Settings Dropdown
- Clean menu design
- Icon + text labels
- Hover effects
- Logout option at bottom (red color)

### Profile Picture Upload
- Camera icon overlay
- Circular crop preview
- Remove photo option
- Border highlight (dawn-orange)

### Edit Profile Form
- Clean input fields
- Save/Cancel buttons
- Form validation (future)
- Success message

## Future Enhancements

### Backend Integration
```javascript
// Save profile to database
const saveProfile = async (profileData) => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
};

// Upload profile picture
const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('profile_picture', file);
  
  const response = await fetch('/api/profile/picture', {
    method: 'POST',
    body: formData
  });
};
```

### Real-time Notifications
```javascript
// WebSocket connection
const ws = new WebSocket('ws://localhost:8000/notifications');

ws.onmessage = (event) => {
  const notification = JSON.parse(event.data);
  setNotifications(prev => [notification, ...prev]);
};
```

### Image Optimization
- Compress images before upload
- Resize to standard dimensions (e.g., 200x200)
- Convert to WebP format
- CDN storage

## Testing Guide

### Test Profile Picture Upload
1. ✅ Upload valid image (JPG, PNG)
2. ✅ Check if displayed correctly
3. ✅ Refresh page - should persist
4. ✅ Remove photo - should revert to initial
5. ✅ Upload large image - should work

### Test Notifications
1. ✅ Click bell icon - dropdown opens
2. ✅ Click notification - marks as read
3. ✅ Click "Mark all as read" - all marked
4. ✅ Click outside - dropdown closes
5. ✅ Red dot shows when unread exists

### Test Settings
1. ✅ Click settings icon - dropdown opens
2. ✅ Click "Edit Profile" - goes to profile tab
3. ✅ Click "Logout" - logs out user
4. ✅ Click outside - dropdown closes

### Test Edit Profile
1. ✅ Click "Edit Profile" - form appears
2. ✅ Update fields - changes saved
3. ✅ Click "Save" - success message
4. ✅ Click "Cancel" - reverts changes
5. ✅ Refresh page - changes persist

## Browser Compatibility

### localStorage Support
- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ⚠️ Private/Incognito mode may have limitations

### File Upload Support
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Image Format Support
- ✅ JPG/JPEG
- ✅ PNG
- ✅ WebP
- ✅ GIF
- ❌ SVG (for security reasons)

## Troubleshooting

### Profile picture not saving?
```javascript
// Check localStorage quota
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('localStorage available');
} catch (e) {
  console.error('localStorage full or disabled');
}
```

### Image too large?
```javascript
// Compress image before saving
const compressImage = (file, maxWidth = 200) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * ratio;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
```

### Notifications not updating?
- Check if state is properly initialized
- Verify localStorage is accessible
- Check console for errors

## Summary

Tapos na ang lahat ng features:
- ✅ Profile picture upload with localStorage
- ✅ Functional notifications dropdown
- ✅ Functional settings menu
- ✅ Edit profile functionality
- ✅ Persistent data storage
- ✅ Smooth animations
- ✅ Mobile responsive

Subukan mo na! 🎉
