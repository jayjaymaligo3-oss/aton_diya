# Vendor Features - Visual Guide

## 🎯 Quick Overview

```
┌────────────────────────────────────────────────────────┐
│ Vendor Dashboard                    [🔔3] [Logout]    │
│ Welcome back, Test Vendor!                             │
└────────────────────────────────────────────────────────┘

[Overview] [Products] [Orders] [Sales Reports] [Store Profile]

Products Tab:
┌────────────────────────────────────────────────────────┐
│ Your Products              [Add Product] [Export]      │
├────────────────────────────────────────────────────────┤
│ [Search...] [Filter: All Status ▼]                    │
├────────────────────────────────────────────────────────┤
│ 5 selected [Mark Active] [Mark Out] [Delete] [Clear]  │
├────────────────────────────────────────────────────────┤
│ [☑️] Product | Category | Price | Stock | Actions     │
│ [☑️] Banig   | Crafts   | ₱850  | 15    | [📦✏️➕🗑️]  │
│ [☑️] Coconut | Decor    | ₱450  | 8     | [📦✏️➕🗑️]  │
└────────────────────────────────────────────────────────┘
```

## 🔔 Notifications

### Location: Top Right Corner

```
Before Click:
┌──────┐
│ 🔔 3 │  ← Badge shows unread count
└──────┘

After Click:
┌─────────────────────────────┐
│ Notifications          [X]  │
├─────────────────────────────┤
│ 🔵 New order #1001          │
│    5 min ago                │
├─────────────────────────────┤
│ 🔵 Bamboo out of stock      │
│    1 hour ago               │
├─────────────────────────────┤
│ ⚪ New 5-star review        │
│    2 hours ago              │
└─────────────────────────────┘

Legend:
🔵 = Unread (blue dot)
⚪ = Read (gray dot)
```

## 🔍 Search & Filter

### Search Box

```
┌─────────────────────────────────┐
│ 🔍 Search products...           │
└─────────────────────────────────┘

Type: "Banig"
Result: Shows only Banig products
```

### Filter Dropdown

```
┌──────────────────┐
│ All Status    ▼  │
├──────────────────┤
│ All Status       │
│ Active           │
│ Out of Stock     │
└──────────────────┘

Select: "Out of Stock"
Result: Shows only out of stock products
```

## ✅ Bulk Actions

### Step 1: Select Products

```
Table Header:
[☑️] ← Click to select all

Product Rows:
[☑️] Banig Mat     ← Checked
[☑️] Coconut       ← Checked
[  ] Bamboo        ← Not checked
```

### Step 2: Action Bar Appears

```
┌─────────────────────────────────────────────────┐
│ 2 selected                                      │
│ [Mark Active] [Mark Out of Stock] [Delete] [Clear]│
└─────────────────────────────────────────────────┘
```

### Step 3: Choose Action

```
Click "Mark Active":
✅ Both products now active!

Click "Delete":
⚠️ Confirm: Delete 2 products?
✅ Both products deleted!
```

## ⚡ Quick Actions

### Actions per Product

```
Product Row:
Banig Mat | ₱850 | 15 | [📦] [✏️] [➕] [🗑️]
                        │    │    │    │
                        │    │    │    └─ Delete
                        │    │    └────── Duplicate
                        │    └─────────── Edit
                        └──────────────── Restock
```

### Restock Action

```
1. Click 📦 (blue package icon)

┌─────────────────────────────┐
│ Enter new stock quantity:   │
│ [15]                        │
│ [OK] [Cancel]               │
└─────────────────────────────┘

2. Enter quantity: 20
3. Click OK
✅ Stock updated to 20!
```

### Duplicate Action

```
1. Click ➕ (green plus icon)

Before:
- Banig Mat (₱850)

After:
- Banig Mat (₱850)
- Banig Mat (Copy) (₱850) ← New!

2. Edit the copy as needed
```

## 📊 Export Data

### Export Button

```
Location: Top right of Products tab

┌──────────────┐
│ 📤 Export    │
└──────────────┘

Click:
✅ products.json downloaded!

File Contents:
[
  {
    "id": 1,
    "name": "Banig Mat",
    "price": 850,
    "stock": 15,
    ...
  }
]
```

## 📋 Enhanced Product Table

### Full Table View

```
┌──────────────────────────────────────────────────────────────┐
│ [☑️] | Product    | Category | Price | Stock | Sales | Status | Actions │
├──────────────────────────────────────────────────────────────┤
│ [☑️] | Banig Mat  | Crafts   | ₱850  | 15    | 45    | Active | [📦✏️➕🗑️] │
│ [☑️] | Coconut    | Decor    | ₱450  | 8     | 32    | Active | [📦✏️➕🗑️] │
│ [  ] | Bamboo     | Crafts   | ₱650  | 0     | 28    | Out    | [📦✏️➕🗑️] │
└──────────────────────────────────────────────────────────────┘
```

### Empty State

```
When no products found:

┌─────────────────────────────┐
│                             │
│         📦                  │
│    No products found        │
│                             │
│   [Clear search]            │
│                             │
└─────────────────────────────┘
```

## 🎯 Workflow Examples

### Example 1: Restock Multiple Products

```
Step 1: Filter
[Filter: Out of Stock ▼]
Result: Shows 3 out of stock products

Step 2: Restock Each
Product 1: Click 📦 → Enter 10 → OK
Product 2: Click 📦 → Enter 15 → OK
Product 3: Click 📦 → Enter 20 → OK

Step 3: Verify
[Filter: Active ▼]
✅ All 3 now active!
```

### Example 2: Bulk Delete

```
Step 1: Search
[Search: "old"]
Result: Shows old products

Step 2: Select All
Click [☑️] in header
Result: All old products selected

Step 3: Delete
Click [Delete Selected]
Confirm: Yes
✅ All deleted!
```

### Example 3: Create Product Variations

```
Step 1: Find Original
Search: "Banig Mat"

Step 2: Duplicate
Click ➕ (duplicate icon)
Result: "Banig Mat (Copy)" created

Step 3: Edit Copy
Click ✏️ (edit icon)
Change: Name to "Banig Mat - Large"
Change: Price to ₱1,200
Save
✅ New variation created!
```

## 🎨 Color Guide

### Status Colors
```
🟢 Green = Active
🔴 Red = Out of Stock
🔵 Blue = Processing
🟡 Yellow = Pending
```

### Action Colors
```
🔵 Blue (📦) = Restock
🟠 Orange (✏️) = Edit
🟢 Green (➕) = Duplicate
🔴 Red (🗑️) = Delete
```

### Notification Colors
```
🔵 Blue Dot = Unread
⚪ Gray Dot = Read
🔴 Red Badge = Unread count
```

## ✅ Feature Checklist

### Notifications
- [ ] Click bell icon
- [ ] See notification count
- [ ] View all notifications
- [ ] Check unread status

### Search & Filter
- [ ] Type in search box
- [ ] See filtered results
- [ ] Select filter status
- [ ] Clear search

### Bulk Actions
- [ ] Select multiple products
- [ ] See action bar
- [ ] Mark active/inactive
- [ ] Delete selected
- [ ] Clear selection

### Quick Actions
- [ ] Restock product
- [ ] Edit product
- [ ] Duplicate product
- [ ] Delete product

### Export
- [ ] Click export button
- [ ] Download JSON file
- [ ] Open and verify data

## 🚀 Quick Start

```
1. Login: vendor@test.com / vendor123
2. Go to Products tab
3. Try each feature:
   ✅ Search for "Banig"
   ✅ Filter by "Active"
   ✅ Select 2 products
   ✅ Click "Mark Active"
   ✅ Click restock icon
   ✅ Click duplicate icon
   ✅ Click export button
   ✅ Check notifications
```

## 💡 Pro Tips

### Tip 1: Keyboard Shortcuts
```
Ctrl+F = Focus search box (browser)
Esc = Close modals
Enter = Confirm actions
```

### Tip 2: Quick Selection
```
Click header checkbox = Select all
Shift+Click = Select range (future)
```

### Tip 3: Efficient Workflow
```
1. Filter first
2. Then search
3. Select needed
4. Bulk action
5. Export backup
```

## 📱 Mobile View

```
Desktop:
[Search] [Filter] [Export]
[Bulk Actions Bar]
[Full Table]

Mobile:
[Search]
[Filter]
[Export]
[Bulk Actions]
[Stacked Cards]
```

## ✅ Summary

**Visual Elements:**
- 🔔 Notification badge with count
- 🔍 Search box with icon
- ☑️ Checkboxes for selection
- 📦✏️➕🗑️ Action icons
- 📤 Export button
- 🎨 Color-coded status

**Interactions:**
- Click bell → See notifications
- Type search → Filter results
- Check boxes → Enable bulk actions
- Click icons → Quick actions
- Click export → Download data

**Test Now:**
```
http://localhost:3001/login
vendor@test.com / vendor123
```

🎉 **All features are visual and functional!**
