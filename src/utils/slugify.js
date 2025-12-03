/**
 * Convert text to URL-friendly slug
 * Example: "Fresh Organic Mangoes" -> "fresh-organic-mangoes"
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

/**
 * Create product slug with ID
 * Example: "Fresh Organic Mangoes", 123 -> "fresh-organic-mangoes-i.123"
 */
export const createProductSlug = (name, id) => {
  const slug = slugify(name);
  return `${slug}-i.${id}`;
};

/**
 * Extract ID from product slug
 * Example: "fresh-organic-mangoes-i.123" -> "123"
 */
export const extractIdFromSlug = (slug) => {
  const match = slug.match(/i\.(\d+)$/);
  return match ? match[1] : null;
};

/**
 * Create category slug
 * Example: "Mobiles & Accessories", 11021742 -> "mobiles-accessories-cat.11021742"
 */
export const createCategorySlug = (name, id) => {
  const slug = slugify(name);
  return `${slug}-cat.${id}`;
};

/**
 * Extract ID from category slug
 * Example: "mobiles-accessories-cat.11021742" -> "11021742"
 */
export const extractCategoryIdFromSlug = (slug) => {
  const match = slug.match(/cat\.(\d+)$/);
  return match ? match[1] : null;
};

/**
 * Create vendor slug
 * Example: "Maria's Fresh Produce" -> "marias-fresh-produce"
 */
export const createVendorSlug = (name) => {
  return slugify(name);
};
