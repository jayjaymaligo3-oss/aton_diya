import * as XLSX from 'xlsx';

/**
 * Print order receipt
 */
export const printOrderReceipt = (order, storeProfile) => {
  const printWindow = window.open('', '_blank');
  
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Order Receipt #${order.id}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Arial', sans-serif;
          padding: 40px;
          background: white;
        }
        
        .receipt {
          max-width: 800px;
          margin: 0 auto;
          border: 2px solid #2D5016;
          padding: 40px;
        }
        
        .header {
          text-align: center;
          border-bottom: 3px solid #E67E22;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .store-name {
          font-size: 32px;
          font-weight: bold;
          color: #2D5016;
          margin-bottom: 10px;
        }
        
        .store-info {
          color: #666;
          font-size: 14px;
        }
        
        .receipt-title {
          font-size: 24px;
          font-weight: bold;
          color: #E67E22;
          margin: 20px 0;
          text-align: center;
        }
        
        .order-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
        }
        
        .info-group {
          flex: 1;
        }
        
        .info-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        
        .info-value {
          font-size: 16px;
          font-weight: bold;
          color: #2D5016;
        }
        
        .section {
          margin: 30px 0;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #2D5016;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #E67E22;
        }
        
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        
        .details-table th {
          background: #2D5016;
          color: white;
          padding: 12px;
          text-align: left;
          font-size: 14px;
        }
        
        .details-table td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }
        
        .total-section {
          margin-top: 30px;
          padding: 20px;
          background: #E67E22;
          color: white;
          border-radius: 8px;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .total-label {
          font-size: 20px;
          font-weight: bold;
        }
        
        .total-amount {
          font-size: 32px;
          font-weight: bold;
        }
        
        .status-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .status-pending { background: #f0f0f0; color: #666; }
        .status-processing { background: #fff3cd; color: #856404; }
        .status-shipped { background: #d1ecf1; color: #0c5460; }
        .status-in_transit { background: #d1ecf1; color: #0c5460; }
        .status-delivered { background: #d4edda; color: #155724; }
        .status-cancelled { background: #f8d7da; color: #721c24; }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #ddd;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        
        .thank-you {
          font-size: 18px;
          font-weight: bold;
          color: #2D5016;
          margin-bottom: 10px;
        }
        
        @media print {
          body {
            padding: 0;
          }
          
          .receipt {
            border: none;
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <!-- Header -->
        <div class="header">
          <div class="store-name">${storeProfile?.businessName || 'My Store'}</div>
          <div class="store-info">
            ${storeProfile?.address || ''}<br>
            ${storeProfile?.phone || ''}<br>
            ${storeProfile?.category || ''}
          </div>
        </div>
        
        <!-- Receipt Title -->
        <div class="receipt-title">ORDER RECEIPT</div>
        
        <!-- Order Info -->
        <div class="order-info">
          <div class="info-group">
            <div class="info-label">Order ID</div>
            <div class="info-value">#${order.id}</div>
          </div>
          <div class="info-group">
            <div class="info-label">Date</div>
            <div class="info-value">${new Date(order.date).toLocaleDateString()}</div>
          </div>
          <div class="info-group">
            <div class="info-label">Status</div>
            <div class="info-value">
              <span class="status-badge status-${order.status}">
                ${order.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Customer Information -->
        <div class="section">
          <div class="section-title">Customer Information</div>
          <table class="details-table">
            <tr>
              <td><strong>Name:</strong></td>
              <td>${order.customer}</td>
            </tr>
            <tr>
              <td><strong>Order Date:</strong></td>
              <td>${order.date}</td>
            </tr>
          </table>
        </div>
        
        <!-- Product Details -->
        <div class="section">
          <div class="section-title">Product Details</div>
          <table class="details-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${order.product}</td>
                <td>${order.quantity}</td>
                <td>₱${(order.total / order.quantity).toFixed(2)}</td>
                <td>₱${order.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Total -->
        <div class="total-section">
          <div class="total-row">
            <div class="total-label">TOTAL AMOUNT:</div>
            <div class="total-amount">₱${order.total.toLocaleString()}</div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="thank-you">Thank you for your order!</div>
          <p>This is an official receipt from ${storeProfile?.businessName || 'My Store'}</p>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
      </div>
      
      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;
  
  printWindow.document.write(receiptHTML);
  printWindow.document.close();
};

/**
 * Export order to Excel
 */
export const exportOrderToExcel = (order, storeProfile) => {
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Store Information
  const storeData = [
    ['STORE INFORMATION'],
    ['Store Name:', storeProfile?.businessName || 'My Store'],
    ['Address:', storeProfile?.address || ''],
    ['Phone:', storeProfile?.phone || ''],
    ['Category:', storeProfile?.category || ''],
    [],
  ];
  
  // Order Information
  const orderData = [
    ['ORDER INFORMATION'],
    ['Order ID:', `#${order.id}`],
    ['Order Date:', order.date],
    ['Status:', order.status.toUpperCase()],
    [],
  ];
  
  // Customer Information
  const customerData = [
    ['CUSTOMER INFORMATION'],
    ['Customer Name:', order.customer],
    ['Order Date:', order.date],
    [],
  ];
  
  // Product Details
  const productData = [
    ['PRODUCT DETAILS'],
    ['Product', 'Quantity', 'Unit Price', 'Subtotal'],
    [order.product, order.quantity, `₱${(order.total / order.quantity).toFixed(2)}`, `₱${order.total.toFixed(2)}`],
    [],
  ];
  
  // Total
  const totalData = [
    ['TOTAL AMOUNT:', '', '', `₱${order.total.toLocaleString()}`],
  ];
  
  // Combine all data
  const allData = [
    ...storeData,
    ...orderData,
    ...customerData,
    ...productData,
    ...totalData,
  ];
  
  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(allData);
  
  // Set column widths
  ws['!cols'] = [
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Order Receipt');
  
  // Generate filename
  const filename = `Order_${order.id}_${new Date().toISOString().split('T')[0]}.xlsx`;
  
  // Save file
  XLSX.writeFile(wb, filename);
};

/**
 * Export multiple orders to Excel
 */
export const exportOrdersToExcel = (orders, storeProfile) => {
  const wb = XLSX.utils.book_new();
  
  // Prepare data
  const data = [
    ['ORDER REPORT'],
    ['Store:', storeProfile?.businessName || 'My Store'],
    ['Generated:', new Date().toLocaleString()],
    [],
    ['Order ID', 'Customer', 'Product', 'Quantity', 'Total', 'Date', 'Status'],
  ];
  
  // Add orders
  orders.forEach(order => {
    data.push([
      `#${order.id}`,
      order.customer,
      order.product,
      order.quantity,
      `₱${order.total}`,
      order.date,
      order.status.toUpperCase(),
    ]);
  });
  
  // Add summary
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  data.push([]);
  data.push(['SUMMARY']);
  data.push(['Total Orders:', orders.length]);
  data.push(['Total Revenue:', `₱${totalRevenue.toLocaleString()}`]);
  
  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);
  
  // Set column widths
  ws['!cols'] = [
    { wch: 15 },
    { wch: 20 },
    { wch: 25 },
    { wch: 10 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Orders');
  
  // Generate filename
  const filename = `Orders_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
  
  // Save file
  XLSX.writeFile(wb, filename);
};
