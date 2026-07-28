/**
 * Meta Pixel Standard Event Utility
 * Standardized tracking for all 17 Meta standard events
 */

export interface PixelEventData {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  num_items?: number;
  search_string?: string;
  predicted_ltv?: number;
  status?: string;
  location_name?: string;
  option?: string;
  [key: string]: any;
}

const safeFbq = (eventName: string, params?: PixelEventData) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    if (params) {
      (window as any).fbq('track', eventName, params);
    } else {
      (window as any).fbq('track', eventName);
    }
  }
};

/**
 * 1. Add payment info
 * Adding customer payment information during a checkout process.
 */
export const trackAddPaymentInfo = (data?: PixelEventData) => safeFbq('AddPaymentInfo', data);

/**
 * 2. Add to cart
 * Adding an item to a shopping cart or basket.
 */
export const trackAddToCart = (data?: PixelEventData) => safeFbq('AddToCart', data);

/**
 * 3. Add to wishlist
 * Adding items to a wishlist.
 */
export const trackAddToWishlist = (data?: PixelEventData) => safeFbq('AddToWishlist', data);

/**
 * 4. Complete registration
 * Submitting information in exchange for a service provided by your business.
 */
export const trackCompleteRegistration = (data?: PixelEventData) => safeFbq('CompleteRegistration', data);

/**
 * 5. Contact
 * Contact between a customer and your business by phone, SMS, email, chat or other means.
 */
export const trackContact = (data?: PixelEventData) => safeFbq('Contact', data);

/**
 * 6. Customize product
 * Customising products through a configuration tool or other application.
 */
export const trackCustomizeProduct = (data?: PixelEventData) => safeFbq('CustomizeProduct', data);

/**
 * 7. Donate
 * Donating funds to your organisation or cause.
 */
export const trackDonate = (data?: PixelEventData) => safeFbq('Donate', data);

/**
 * 8. Find location
 * When a person finds one of your locations via web, with an intention to visit.
 */
export const trackFindLocation = (data?: PixelEventData) => safeFbq('FindLocation', data);

/**
 * 9. Initiate checkout
 * The start of a checkout process.
 */
export const trackInitiateCheckout = (data?: PixelEventData) => safeFbq('InitiateCheckout', data);

/**
 * 10. Lead
 * A submission of information by a customer with the understanding that they may be contacted.
 */
export const trackLead = (data?: PixelEventData) => safeFbq('Lead', data);

/**
 * 11. Purchase
 * The completion of a purchase, usually signified by receiving order or confirmation.
 */
export const trackPurchase = (data?: PixelEventData) => safeFbq('Purchase', data);

/**
 * 12. Schedule
 * The booking of an appointment to visit one of your locations.
 */
export const trackSchedule = (data?: PixelEventData) => safeFbq('Schedule', data);

/**
 * 13. Search
 * A search performed on your website, app or other property.
 */
export const trackSearch = (search_string: string, data?: PixelEventData) => 
  safeFbq('Search', { search_string, ...data });

/**
 * 14. Start trial
 * The start of a free trial of a product or service that you offer.
 */
export const trackStartTrial = (data?: PixelEventData) => safeFbq('StartTrial', data);

/**
 * 15. Submit application
 * The submission of an application for a product, service or programme.
 */
export const trackSubmitApplication = (data?: PixelEventData) => safeFbq('SubmitApplication', data);

/**
 * 16. Subscribe
 * The start of a paid subscription for a product or service that you offer.
 */
export const trackSubscribe = (data?: PixelEventData) => safeFbq('Subscribe', data);

/**
 * 17. View content
 * A visit to a web page or viewing specific course/product content.
 */
export const trackViewContent = (data?: PixelEventData) => safeFbq('ViewContent', data);
