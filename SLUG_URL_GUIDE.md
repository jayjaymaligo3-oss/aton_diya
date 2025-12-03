# Slug URL Structure Guide

## Overview
The application now uses SEO-friendly slug URLs similar to Shopee's format.

## URL Formats

### Products
**Format:** `/{product-name}-i.{id}`

**Examples:**
- `/fresh-organic-mangoes-i.123`
- `/handwoven-bamboo-basket-i.456`
- `/native-coffee-beans-i.789`

**Old Format:** `/product/123`

### Vendors
**Format:** `/vendor/{vendor-name-slug}`

**Examples:**
- `/vendor/marias-fresh-produce`
- `/vendor/juans-handicrafts`
- `/vendor/local-artisan-collective`

**Old Format:** `/vendor/Maria's%20Fresh%20Produce`

### Categories (Future Implementation)
**Format:** `/{category-name}-cat.{id}`

**Examples:**
- `/fresh-produce-cat.1001`
- `/handicrafts-cat.1002`
- `/native-products-cat.1003`

## Implementation

### Utility Functions
Located in `src/utils/slugify.js`:

```javascript
// Create product slug
createProductSlug("Fresh Organic Mangoes", 123)
// Returns: "fresh-organic-mangoes-i.123"

// Extract ID from slug
extractIdFromSlug("fresh-organic-mangoes-i.123")
// Returns: "123"

// Create vendor slug
createVendorSlug("Maria's Fresh Produce")
// Returns: "marias-fresh-produce"

// Create category slug
createCategorySlug("Fresh Produce", 1001)
// Returns: "fresh-produce-cat.1001"
```

### Usage in Components

#### ProductCard.jsx
```javascript
import { createProductSlug, createVendorSlug } from '../utils/slugify';

// Navigate to product
const slug = createProductSlug(product.name, product.id);
navigate(`/${slug}`);

// Navigate to vendor
const vendorSlug = createVendorSlug(product.vendor);
navigate(`/vendor/${vendorSlug}`);
```

#### ProductDetailsPage.jsx
```javascript
import { extractIdFromSlug } from '../utils/slugify';

const { productSlug } = useParams();
const productId = extractIdFromSlug(productSlug);
```

## Benefits

1. **SEO Friendly:** Search engines can understand the content from the URL
2. **User Friendly:** Users can see what the page is about before clicking
3. **Professional:** Matches industry standards (Shopee, Lazada, Amazon)
4. **Shareable:** URLs are more readable when shared
5. **Bookmarkable:** Easier to remember and bookmark

## Migration Notes

- All existing product links automatically use the new format
- Old URLs will not work (consider implementing redirects if needed)
- Product IDs are preserved in the slug format (`-i.{id}`)
- Vendor names are converted to lowercase with hyphens

## Future Enhancements

1. Add category slug support
2. Implement URL redirects for old format
3. Add breadcrumb navigation based on slugs
4. Support for multi-language slugs
