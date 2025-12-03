# Custom Product Request Feature - Customer Dashboard

## Ano ang Custom Product Request?

Ang feature na ito ay nagbibigay-daan sa mga customers na mag-request ng custom-made products mula sa mga artisans/vendors.

## Paano Gamitin

### Para sa Customers:

1. **Login** bilang customer
2. Pumunta sa **Customer Dashboard**
3. I-click ang **"Custom Request"** tab
4. I-click ang **"New Request"** button
5. Punan ang form:
   - **Product Name** - Pangalan ng gusto mong product (required)
   - **Category** - Uri ng product (Handicrafts, Home Decor, etc.)
   - **Description** - Detalyadong paglalarawan ng gusto mo (required)
   - **Budget** - Magkano ang willing mong gastusin (required)
   - **Quantity** - Ilang pieces ang kailangan mo
   - **Deadline** - Kailan mo kailangan (optional)
   - **Reference Image** - Upload ng larawan para sa reference (optional)
6. I-click ang **"Submit Request"**

## Features

### Request Status
- **Pending Review** - Hinihintay pa ang review ng vendors
- **In Progress** - May vendor na nag-accept at ginagawa na
- **Completed** - Tapos na ang product
- **Cancelled** - Na-cancel ang request

### Request Details
Makikita mo sa bawat request:
- Request ID
- Product name at description
- Category, budget, quantity
- Deadline (kung may nakalagay)
- Reference image (kung may upload)
- Current status
- Date submitted

### Actions
- **View Details** - Tignan ang buong detalye ng request
- **Cancel Request** - I-cancel ang pending request

## Data Storage

Ang custom product requests ay naka-save sa:
- **localStorage** key: `customProductRequests`
- Format: JSON array ng request objects

## Sample Request Object

```json
{
  "id": "REQ-1732435200000",
  "productName": "Custom Woven Basket with Lid",
  "description": "Medium-sized basket with tight weave and fitted lid. Natural brown color preferred.",
  "category": "Handicrafts",
  "budget": "1500",
  "quantity": 2,
  "deadline": "2024-12-31",
  "referenceImage": "data:image/jpeg;base64,...",
  "status": "Pending Review",
  "submittedDate": "11/24/2024",
  "customerName": "Juan Dela Cruz"
}
```

## Para sa Future Development

### Vendor Side Integration
Sa future, pwede mong i-integrate sa Vendor Dashboard:
1. View all custom product requests
2. Accept/Decline requests
3. Send quotations
4. Update request status
5. Message customers

### Admin Side
1. Monitor all custom requests
2. Resolve disputes
3. View analytics

## Testing

Para mag-test:
1. Login as customer
2. Go to Custom Request tab
3. Create sample requests
4. Check localStorage para makita ang saved data
5. Refresh page - dapat nandoon pa rin ang requests

## Notes

- Ang feature ay gumagamit ng localStorage para sa demo
- Sa production, dapat i-connect sa backend API
- Pwedeng mag-upload ng image (converted to base64)
- Responsive design para sa mobile at desktop
