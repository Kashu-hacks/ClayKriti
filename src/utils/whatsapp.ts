import { CartItem, CustomerDetails } from '../types';
import { siteConfig } from '../config/siteConfig';

/** Strip control characters from user-provided strings */
const sanitize = (s: string, maxLen = 500): string =>
  s.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim().slice(0, maxLen);

/**
 * Format number into Indian currency format (e.g., ₹1,499)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export interface OrderCalculation {
  subtotal: number;
  deliveryCharge: number;
  isFreeDelivery: boolean;
  total: number;
  amountNeededForFreeDelivery: number;
}

export const calculateOrderTotals = (items: CartItem[]): OrderCalculation => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isFreeDelivery = subtotal >= siteConfig.freeDeliveryThreshold;
  const deliveryCharge = items.length === 0 ? 0 : isFreeDelivery ? 0 : siteConfig.deliveryCharge;
  const total = subtotal + deliveryCharge;
  const amountNeededForFreeDelivery = Math.max(
    0,
    siteConfig.freeDeliveryThreshold - subtotal
  );

  return {
    subtotal,
    deliveryCharge,
    isFreeDelivery,
    total,
    amountNeededForFreeDelivery,
  };
};

/**
 * Generates a short unique order reference ID
 * Format: CK-DDMMYY-XXXX (e.g. CK-051025-4821)
 */
const generateOrderId = (): string => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(-2);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CK-${dd}${mm}${yy}-${rand}`;
};

/**
 * Formats current date & time in IST-friendly readable format
 */
const getOrderTimestamp = (): string => {
  return new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const DIVIDER = `━━━━━━━━━━━━━━━━━━━━━━━━`;

/**
 * Formats a clean, professional WhatsApp order message
 */
export const generateWhatsAppMessageText = (
  items: CartItem[],
  customer: CustomerDetails,
  calc: OrderCalculation
): string => {
  const lines: string[] = [];
  const orderId = generateOrderId();
  const timestamp = getOrderTimestamp();

  // Header
  lines.push(`🧡 *ClayKriti — New Order Request*`);
  lines.push(DIVIDER);
  lines.push(`🔖 *Order Ref:* \`${orderId}\``);
  lines.push(`🕐 *Placed On:* ${timestamp}`);
  lines.push(DIVIDER);

  // Customer Details
  const cleanFullName = sanitize(customer.fullName, 60);
  const cleanPhoneNumber = sanitize(customer.phoneNumber, 20);
  const cleanAddressLine = sanitize(customer.addressLine, 250);
  const cleanCity = sanitize(customer.city, 100);
  const cleanState = customer.state ? sanitize(customer.state, 100) : '';
  const cleanPincode = sanitize(customer.pincode, 10);
  const cleanDeliveryNotes = customer.deliveryNotes ? sanitize(customer.deliveryNotes, 300) : '';

  const hasCustomerInfo =
    cleanFullName.length > 0 || cleanPhoneNumber.length > 0 || cleanAddressLine.length > 0;

  if (hasCustomerInfo) {
    lines.push(`👤 *Customer Details*`);
    if (cleanFullName)    lines.push(`   Name    : ${cleanFullName}`);
    if (cleanPhoneNumber) lines.push(`   Phone   : ${cleanPhoneNumber}`);
    if (cleanAddressLine) {
      const addressParts = [
        cleanAddressLine,
        cleanCity,
        cleanState,
        cleanPincode ? `PIN ${cleanPincode}` : '',
      ].filter(Boolean).join(', ');
      lines.push(`   Address : ${addressParts}`);
    }
    if (cleanDeliveryNotes) {
      lines.push(`   Note    : ${cleanDeliveryNotes}`);
    }
    lines.push(DIVIDER);
  }

  // Order Items
  const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);
  lines.push(`🛍️ *Order Items (${totalQty} ${totalQty === 1 ? 'item' : 'items'})*`);
  lines.push('');
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    lines.push(`   ${index + 1}. *${item.product.name}*`);
    if (item.product.category) {
      lines.push(`       Category : ${item.product.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`);
    }
    lines.push(`       Qty      : ${item.quantity} × ${formatCurrency(item.product.price)}`);
    lines.push(`       Subtotal : *${formatCurrency(itemTotal)}*`);
    if (item.customizationText?.trim()) {
      lines.push(`       Custom   : _"${sanitize(item.customizationText, 200)}"_`);
    }
    if (index < items.length - 1) lines.push('');
  });
  lines.push('');
  lines.push(DIVIDER);

  // Bill Summary
  lines.push(`💳 *Bill Summary*`);
  lines.push(`   Products : ${formatCurrency(calc.subtotal)}`);
  if (calc.isFreeDelivery) {
    lines.push(`   Delivery : FREE 🎉 _(above ${formatCurrency(siteConfig.freeDeliveryThreshold)})_`);
  } else {
    lines.push(`   Delivery : ${formatCurrency(calc.deliveryCharge)} _(Pan-India)_`);
  }
  lines.push(`   ─────────────────────`);
  lines.push(`   *TOTAL   : ${formatCurrency(calc.total)}*`);
  lines.push(DIVIDER);

  // Footer CTA
  lines.push(`📦 Please confirm *availability & lead time*, then share *payment details* to proceed.`);
  lines.push('');
  lines.push(`_Reply *CONFIRM* to accept · *MODIFY* to change · *CANCEL* to cancel_`);
  lines.push('');
  lines.push(`🤎 _Handcrafted with love by ClayKriti_`);

  return lines.join('\n');
};

const generateCompactMessage = (
  items: CartItem[],
  customer: CustomerDetails,
  calc: OrderCalculation
): string => {
  const lines: string[] = [];
  lines.push(`🧡 *ClayKriti Order*`);
  lines.push(`👤 ${sanitize(customer.fullName, 60)} | ${sanitize(customer.phoneNumber, 20)}`);
  lines.push(`📍 ${sanitize(customer.addressLine, 150)}, ${sanitize(customer.city, 50)}, ${sanitize(customer.pincode, 10)}`);
  lines.push(``);
  items.forEach((item, i) => {
    lines.push(`${i+1}. ${item.product.name} x${item.quantity} = ${formatCurrency(item.product.price * item.quantity)}`);
  });
  lines.push(``);
  lines.push(`*Total: ${formatCurrency(calc.total)}* (incl. delivery: ${calc.isFreeDelivery ? 'FREE' : formatCurrency(calc.deliveryCharge)})`);
  lines.push(`Please confirm availability & payment. 🤎`);
  return lines.join('\n');
};

/**
 * Builds the official WhatsApp click-to-chat URL:
 * https://wa.me/WHATSAPP_NUMBER?text=ENCODED_MESSAGE
 */
export const getWhatsAppOrderUrl = (
  items: CartItem[],
  customer: CustomerDetails
): string => {
  const calc = calculateOrderTotals(items);
  const message = generateWhatsAppMessageText(items, customer, calc);
  const encoded = encodeURIComponent(message);
  const fullUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;

  if (fullUrl.length <= 4000) return fullUrl;

  // Compact fallback: shorter message
  const compact = generateCompactMessage(items, customer, calc);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(compact)}`;
};

/**
 * Quick inquiry URL for individual product or general questions
 */
export const getWhatsAppInquiryUrl = (productName?: string): string => {
  let message = `Hello ClayKriti! I love your handcrafted creations and would like to know more.`;
  if (productName) {
    message = `Hello ClayKriti! I am interested in your handcrafted piece: *${productName}*. Could you share availability and details?`;
  }
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Custom bulk gift hamper inquiry URL
 */
export const getWhatsAppCustomGiftUrl = (occasion?: string): string => {
  const message = `Hello ClayKriti! I am inquiring about custom bulk gifting / event hampers${
    occasion ? ` for ${occasion}` : ''
  }. Please share your catalogue and pricing for customized orders.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
