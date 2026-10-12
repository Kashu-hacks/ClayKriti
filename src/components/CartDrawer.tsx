import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Info,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerDetails } from '../types';
import {
  formatCurrency,
  calculateOrderTotals,
  getWhatsAppOrderUrl,
  generateWhatsAppMessageText,
} from '../utils/whatsapp';
import { siteConfig } from '../config/siteConfig';
import { ProductImage } from './ProductImage';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    updateCustomization,
  } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phoneNumber: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    deliveryNotes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderSent, setOrderSent] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(true);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Validation helpers
  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-]/g, '').replace(/^(\+91|91|0)/, '');
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const validatePIN = (pin: string): boolean => /^[1-9]\d{5}$/.test(pin);

  const validateName = (name: string): boolean => name.trim().length > 0 && name.trim().length <= 60;

  const validateRequired = (val: string): boolean => val.trim().length > 0;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!validateName(customer.fullName)) errors.fullName = 'Please enter your full name (max 60 characters)';
    if (!validatePhone(customer.phoneNumber)) errors.phoneNumber = 'Enter a valid 10-digit Indian mobile number';
    if (!validateRequired(customer.addressLine)) errors.addressLine = 'Delivery address is required';
    if (!validateRequired(customer.city)) errors.city = 'City is required';
    if (!validateRequired((customer as any).state || '')) errors.state = 'State is required';
    if (!validatePIN(customer.pincode)) errors.pincode = 'Enter a valid 6-digit PIN code (cannot start with 0)';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateCustomer = (details: Partial<CustomerDetails>) => {
    setCustomer((prev) => ({ ...prev, ...details }));
    setFormErrors((prev) => {
      const next = { ...prev };
      Object.keys(details).forEach((k) => delete next[k]);
      return next;
    });
  };

  if (!isCartOpen) return null;

  const calc = calculateOrderTotals(items);
  const previewMessage = generateWhatsAppMessageText(items, customer, calc);

  const handleOrderOnWhatsApp = () => {
    if (!validateForm()) {
      setShowCustomerForm(true);
      setTimeout(() => {
        const errors: Record<string, string> = {};
        if (!validateName(customer.fullName)) errors.fullName = 'Please enter your full name (max 60 characters)';
        else if (!validatePhone(customer.phoneNumber)) errors.phoneNumber = 'Enter a valid 10-digit Indian mobile number';
        else if (!validateRequired(customer.addressLine)) errors.addressLine = 'Delivery address is required';
        else if (!validateRequired(customer.city)) errors.city = 'City is required';
        else if (!validateRequired((customer as any).state || '')) errors.state = 'State is required';
        else if (!validatePIN(customer.pincode)) errors.pincode = 'Enter a valid 6-digit PIN code (cannot start with 0)';
        const firstErrorKey = Object.keys(errors)[0] || Object.keys(formErrors)[0];
        if (firstErrorKey) {
          const el = document.getElementById(`field-${firstErrorKey}`);
          if (el) el.focus();
        }
      }, 0);
      return;
    }
    const url = getWhatsAppOrderUrl(items, customer);
    const newWin = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWin) { window.location.href = url; }
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-clay-charcoal/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          className="w-screen max-w-md bg-clay-ivory shadow-2xl flex flex-col border-l border-clay-sand"
        >
          
          {/* Cart Header */}
          <div className="p-5 border-b border-clay-sand flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-terracotta-700" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-clay-charcoal">Your Shopping Cart</h2>
                <p className="text-[11px] text-clay-muted">
                  {items.length === 0
                    ? 'Empty cart'
                    : `${items.reduce((acc, i) => acc + i.quantity, 0)} item(s) selected`}
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-clay-muted hover:text-clay-charcoal rounded-full hover:bg-clay-blush transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-terracotta-50/90 px-5 py-2.5 border-b border-terracotta-200/60 text-xs">
              {calc.isFreeDelivery ? (
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Congratulations! You qualify for <strong>FREE Pan-India Delivery</strong> 🎉</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-clay-charcoal text-[11px]">
                    <span className="flex items-center gap-1 font-medium">
                      <Truck className="w-3.5 h-3.5 text-terracotta-600" />
                      Add <strong>{formatCurrency(calc.amountNeededForFreeDelivery)}</strong> more for FREE delivery
                    </span>
                    <span className="font-semibold text-terracotta-700">
                      {Math.round((calc.subtotal / siteConfig.freeDeliveryThreshold) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-terracotta-200/50 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-terracotta-600 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (calc.subtotal / siteConfig.freeDeliveryThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Items or Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-clay-blush mx-auto flex items-center justify-center text-terracotta-500">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-clay-charcoal">Your cart is empty</h3>
                  <p className="text-xs text-clay-muted max-w-xs mx-auto">
                    Looks like you haven't added any handcrafted clay keepsakes yet. Explore our handcrafted pieces!
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold rounded-full shadow-sm transition-all"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${idx}`}
                      className="bg-white p-3.5 rounded-2xl border border-clay-sand shadow-sm space-y-2"
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <ProductImage
                            src={item.product.images[0]}
                            alt={item.product.name}
                            productId={item.product.id}
                            categoryName={item.product.category.replace('-', ' ')}
                            className="w-full h-full object-cover"
                            aspectClass="w-16 h-16"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-semibold text-sm text-clay-charcoal truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs font-bold text-terracotta-700 mt-0.5">
                            {formatCurrency(item.product.price)}
                          </p>

                          {/* Customization Note Badge or text */}
                          {item.customizationText ? (
                            <div className="mt-1 text-[11px] text-clay-charcoal/80 bg-clay-blush/70 p-1.5 rounded-lg border border-terracotta-200/50">
                              <span className="font-medium text-terracotta-800">Customization: </span>
                              <span>"{item.customizationText}"</span>
                            </div>
                          ) : item.product.allowCustomization ? (
                            <button
                              onClick={() => {
                                const note = prompt(
                                  item.product.customizationPrompt || 'Enter customization instructions:'
                                );
                                if (note !== null) updateCustomization(idx, note);
                              }}
                              className="text-[10px] text-terracotta-600 hover:underline flex items-center gap-1 mt-1"
                            >
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Add customization note</span>
                            </button>
                          ) : null}
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => removeItem(idx)}
                          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-clay-muted hover:text-rose-600 transition-colors self-start"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Stepper & Line Subtotal */}
                      <div className="flex items-center justify-between pt-2 border-t border-clay-blush text-xs">
                        <div className="flex items-center border border-clay-sand rounded-lg bg-clay-ivory">
                          <button
                            onClick={() => updateQuantity(idx, item.quantity - 1)}
                            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-clay-sand text-clay-charcoal"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-semibold text-clay-charcoal text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(idx, item.quantity + 1)}
                            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-clay-sand text-clay-charcoal"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-semibold text-clay-charcoal">
                          Total: {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form (Collapsible/Editable) */}
                <div className="bg-white rounded-2xl p-4 border border-clay-sand space-y-3">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setShowCustomerForm(!showCustomerForm)}
                  >
                    <span className="text-xs font-serif font-bold text-clay-charcoal flex items-center gap-1.5">
                      <span>Delivery Information</span>
                      <span className="text-[10px] font-sans font-normal text-clay-muted">(Required for WhatsApp order)</span>
                    </span>
                    <span className="text-xs text-terracotta-600 font-medium">
                      {showCustomerForm ? 'Collapse' : 'Edit details'}
                    </span>
                  </div>

                  {showCustomerForm && (
                    <div className="space-y-2.5 pt-1 text-xs">
                      <div>
                        <input
                          id="field-fullName"
                          type="text"
                          autoComplete="name"
                          value={customer.fullName}
                          onChange={(e) => updateCustomer({ fullName: e.target.value })}
                          placeholder="Your Full Name (e.g. Priya Sharma)"
                          className="w-full p-2.5 rounded-xl border border-clay-sand bg-clay-ivory/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-base sm:text-sm"
                        />
                        {formErrors.fullName && <p className="text-red-600 text-xs mt-1">{formErrors.fullName}</p>}
                      </div>
                      <div>
                        <input
                          id="field-phoneNumber"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={customer.phoneNumber}
                          onChange={(e) => updateCustomer({ phoneNumber: e.target.value })}
                          placeholder="Phone / WhatsApp (10-digit mobile)"
                          className="w-full p-2.5 rounded-xl border border-clay-sand bg-clay-ivory/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-base sm:text-sm"
                        />
                        {formErrors.phoneNumber && <p className="text-red-600 text-xs mt-1">{formErrors.phoneNumber}</p>}
                      </div>
                      <div>
                        <input
                          id="field-addressLine"
                          type="text"
                          autoComplete="street-address"
                          value={customer.addressLine}
                          onChange={(e) => updateCustomer({ addressLine: e.target.value })}
                          placeholder="Delivery Address (House/Street/Locality)"
                          className="w-full p-2.5 rounded-xl border border-clay-sand bg-clay-ivory/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-base sm:text-sm"
                        />
                        {formErrors.addressLine && <p className="text-red-600 text-xs mt-1">{formErrors.addressLine}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            id="field-city"
                            type="text"
                            autoComplete="address-level2"
                            value={customer.city}
                            onChange={(e) => updateCustomer({ city: e.target.value })}
                            placeholder="City"
                            className="w-full p-2.5 rounded-xl border border-clay-sand bg-clay-ivory/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-base sm:text-sm"
                          />
                          {formErrors.city && <p className="text-red-600 text-xs mt-1">{formErrors.city}</p>}
                        </div>
                        <div>
                          <input
                            id="field-state"
                            type="text"
                            autoComplete="address-level1"
                            value={customer.state}
                            onChange={(e) => updateCustomer({ state: e.target.value })}
                            placeholder="State"
                            className="w-full p-2.5 rounded-xl border border-clay-sand bg-clay-ivory/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-base sm:text-sm"
                          />
                          {formErrors.state && <p className="text-red-600 text-xs mt-1">{formErrors.state}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            id="field-pincode"
                            type="text"
                            inputMode="numeric"
                            autoComplete="postal-code"
                            maxLength={6}
                            value={customer.pincode}
                            onChange={(e) => updateCustomer({ pincode: e.target.value })}
                            placeholder="PIN Code (6 digits)"
                            className="w-full p-2.5 rounded-xl border border-clay-sand bg-clay-ivory/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-base sm:text-sm"
                          />
                          {formErrors.pincode && <p className="text-red-600 text-xs mt-1">{formErrors.pincode}</p>}
                        </div>
                        <div>
                          <input
                            id="field-deliveryNotes"
                            type="text"
                            autoComplete="off"
                            value={customer.deliveryNotes || ''}
                            onChange={(e) => updateCustomer({ deliveryNotes: e.target.value })}
                            placeholder="Notes (Optional)"
                            className="w-full p-2.5 rounded-xl border border-clay-sand bg-clay-ivory/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-base sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* WhatsApp Message Live Preview Toggle */}
                <div className="bg-clay-blush/60 rounded-2xl p-3 border border-terracotta-200/60">
                  <button
                    onClick={() => setShowLivePreview(!showLivePreview)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-terracotta-800"
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-terracotta-600" />
                      <span>{showLivePreview ? 'Hide Message Preview' : 'Preview WhatsApp Message'}</span>
                    </span>
                    <span className="text-[11px] underline">
                      {showLivePreview ? 'Close' : 'View Text'}
                    </span>
                  </button>

                  {showLivePreview && (
                    <div className="mt-2.5 p-3 bg-white rounded-xl border border-clay-sand text-[11px] text-clay-charcoal font-mono whitespace-pre-wrap max-h-44 overflow-y-auto leading-relaxed shadow-inner">
                      {previewMessage}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Cart Footer & Order on WhatsApp CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-clay-sand bg-white space-y-4">
              
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-clay-charcoal">
                <div className="flex justify-between text-clay-muted">
                  <span>Cart Subtotal</span>
                  <span>{formatCurrency(calc.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-clay-muted">
                  <span>Pan-India Delivery</span>
                  <span>
                    {calc.isFreeDelivery ? (
                      <span className="text-emerald-700 font-semibold uppercase">FREE</span>
                    ) : (
                      formatCurrency(calc.deliveryCharge)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-clay-sand text-sm font-bold text-clay-charcoal">
                  <span>Estimated Total</span>
                  <span className="text-lg font-serif text-terracotta-700">
                    {formatCurrency(calc.total)}
                  </span>
                </div>
              </div>

              {orderSent && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800 text-center">
                  ✅ Your order details were sent to WhatsApp! Please tap <strong>Send</strong> there to confirm your order.
                </div>
              )}

              <p className="text-xs text-clay-muted text-center">
                Orders are confirmed and payment is arranged directly on WhatsApp.
              </p>
              <p className="text-xs text-clay-muted text-center">
                By placing this order you agree to share your details with ClayKriti via WhatsApp.
              </p>

              {/* Order on WhatsApp Primary Button */}
              <button
                onClick={handleOrderOnWhatsApp}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Order on WhatsApp ({formatCurrency(calc.total)})</span>
              </button>

              {/* Business Policy & Manual Confirmation Note */}
              <div className="text-[10px] text-clay-muted text-center space-y-1 leading-normal">
                <p>
                  Clicking opens WhatsApp with your pre-filled cart.
                </p>
                <p className="text-terracotta-700 font-medium">
                  • Orders are confirmed only after ClayKriti verifies availability & shares payment details.
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
