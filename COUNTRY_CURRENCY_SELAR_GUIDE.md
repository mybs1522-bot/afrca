# Multi-Country Geo-Localization, Dynamic Currency Conversion & Selar Payment Link Integration Guide

This guide provides a comprehensive step-by-step technical blueprint for implementing IP-based country detection, dynamic multi-currency pricing, localized marketing content, and automated Selar quick-checkout links in any Web / React / Next.js project.

---

## 🏗️ Architecture Overview

The system consists of 4 main layers:

```
┌─────────────────────────────────────────────────────────┐
│ 1. IP Auto-Detection Layer (ipapi.co / Cloudflare IP)   │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│ 2. Country Context & Provider (React Context)           │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│ 3. Country Config Data Store (Currencies, Selar Links)  │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│ 4. Dynamic Checkout Builder (Selar Quick Checkout URLs) │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 1. Country Configuration Interface (`countryConfig.ts`)

Define a clear data structure for each supported country, including prices, currencies, base Selar checkout URLs, and local copy parameters.

```typescript
// lib/countryConfig.ts

export interface CountryConfig {
  code: string;                      // e.g. 'NG', 'GH', 'KE', 'ZA', 'TZ'
  name: string;                      // e.g. 'Nigeria', 'Ghana'
  flag: string;                      // Emoji flag e.g. '🇳🇬'
  currencyCode: string;              // ISO code e.g. 'NGN', 'GHS', 'KES'
  currencySymbol: string;            // e.g. '₦', 'GH₵', 'KSh', 'R'
  
  // Main Offer Pricing
  price: number;
  originalPrice: number;
  formattedPrice: string;            // Pre-formatted e.g. '₦15,000'
  formattedOriginalPrice: string;

  // Upsell Offer Pricing
  upsellPrice: number;
  upsellOriginalPrice: number;
  formattedUpsellPrice: string;
  formattedUpsellOriginalPrice: string;
  formattedUpsellSavings: string;

  // Selar Base URLs
  selarCheckoutBase: string;         // e.g. 'https://selar.com/8750lka8nb'
  selarOnetimeBase: string;          // e.g. 'https://selar.com/73518502d1'

  // Localized Copy & Proof
  bannerText: string;                // e.g. '🇳🇬 Now Available In Nigeria'
  heroCurrencyHook: string;          // e.g. 'Naira is crashing'
  premiumRentArea: string;           // e.g. 'Lekki'
  cities: { name: string; city: string }[];
}
```

---

## 🌍 2. Country Data Store (`COUNTRIES`)

Store localized data for supported countries with a default fallback (e.g. `NG` or `USD`).

```typescript
export const COUNTRIES: Record<string, CountryConfig> = {
  NG: {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    currencyCode: 'NGN',
    currencySymbol: '₦',
    price: 15000,
    originalPrice: 99000,
    formattedPrice: '₦15,000',
    formattedOriginalPrice: '₦99,000',
    upsellPrice: 37000,
    upsellOriginalPrice: 99000,
    formattedUpsellPrice: '₦37,000',
    formattedUpsellOriginalPrice: '₦99,000',
    formattedUpsellSavings: '₦62,000',
    selarCheckoutBase: 'https://selar.com/8750lka8nb',
    selarOnetimeBase: 'https://selar.com/73518502d1',
    bannerText: '🇳🇬 Now Available In Nigeria',
    heroCurrencyHook: 'Naira is crashing',
    premiumRentArea: 'Lekki',
    cities: [
      { name: "Chinedu O.", city: "Lagos" },
      { name: "Adaeze N.", city: "Abuja" },
      { name: "Emeka A.", city: "Port Harcourt" }
    ]
  },
  GH: {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    currencyCode: 'GHS',
    currencySymbol: 'GH₵',
    price: 150,
    originalPrice: 999,
    formattedPrice: 'GH₵150',
    formattedOriginalPrice: 'GH₵999',
    upsellPrice: 370,
    upsellOriginalPrice: 999,
    formattedUpsellPrice: 'GH₵370',
    formattedUpsellOriginalPrice: 'GH₵999',
    formattedUpsellSavings: 'GH₵629',
    selarCheckoutBase: 'https://selar.com/8750lka8nb',
    selarOnetimeBase: 'https://selar.com/73518502d1',
    bannerText: '🇬🇭 Now Available In Ghana',
    heroCurrencyHook: 'Cedi keeps falling',
    premiumRentArea: 'East Legon',
    cities: [
      { name: "Kwame A.", city: "Accra" },
      { name: "Ama S.", city: "Kumasi" }
    ]
  },
  KE: {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    currencyCode: 'KES',
    currencySymbol: 'KSh',
    price: 1500,
    originalPrice: 9999,
    formattedPrice: 'KSh 1,500',
    formattedOriginalPrice: 'KSh 9,999',
    upsellPrice: 3700,
    upsellOriginalPrice: 9999,
    formattedUpsellPrice: 'KSh 3,700',
    formattedUpsellOriginalPrice: 'KSh 9,999',
    formattedUpsellSavings: 'KSh 6,299',
    selarCheckoutBase: 'https://selar.com/8750lka8nb',
    selarOnetimeBase: 'https://selar.com/73518502d1',
    bannerText: '🇰🇪 Now Available In Kenya',
    heroCurrencyHook: 'Shilling is dropping',
    premiumRentArea: 'Westlands',
    cities: [
      { name: "Kipchumba K.", city: "Nairobi" },
      { name: "Wanjiru M.", city: "Mombasa" }
    ]
  }
};

export const DEFAULT_COUNTRY = 'NG';

export function getCountryConfig(countryCode: string): CountryConfig {
  return COUNTRIES[countryCode] || COUNTRIES[DEFAULT_COUNTRY];
}

export function getDiscountPercent(c: CountryConfig): number {
  return Math.round((1 - c.price / c.originalPrice) * 100);
}
```

---

## 🔎 3. IP Auto-Detection Logic

Detect the visitor's country using a lightweight geolocation API with timeout and fallback handling.

```typescript
export async function detectCountry(): Promise<string> {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    const code = data.country_code;
    if (code && COUNTRIES[code]) {
      return code;
    }
    return DEFAULT_COUNTRY;
  } catch {
    return DEFAULT_COUNTRY;
  }
}
```

---

## ⚛️ 4. React Country Context & Provider (`CountryContext.tsx`)

Wrap your main application in a provider that detects the country on page load and distributes the active country configuration to all pages and components.

```tsx
// lib/CountryContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CountryConfig, getCountryConfig, detectCountry, DEFAULT_COUNTRY } from './countryConfig';

interface CountryContextType {
  country: CountryConfig;
  isLoading: boolean;
}

const CountryContext = createContext<CountryContextType>({
  country: getCountryConfig(DEFAULT_COUNTRY),
  isLoading: true,
});

export const useCountry = () => useContext(CountryContext);

export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectCountry().then(code => {
      setCountryCode(code);
      setIsLoading(false);
    });
  }, []);

  return (
    <CountryContext.Provider value={{ country: getCountryConfig(countryCode), isLoading }}>
      {children}
    </CountryContext.Provider>
  );
};
```

---

## 🔗 5. Selar Quick Checkout Link Generator

Selar supports passing pre-filled parameters via query strings so users jump directly to instant payment with their currency, prefilled email, and name pre-populated.

### Selar URL Parameters:
- `quickcheckout=1`: Enables instant modal / direct checkout bypass.
- `email`: Prefills customer email address.
- `fullname`: Prefills customer full name.
- `currency`: Forces Selar to load in the matching country currency code (`NGN`, `GHS`, `KES`, etc.).
- `redirect_url`: Specifies the thank-you / upsell URL user lands on after payment.

### Implementation in Checkout Page:

```tsx
import React, { useState } from 'react';
import { useCountry } from '../lib/CountryContext';

const CheckoutPage: React.FC = () => {
  const { country } = useCountry();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSelarPayment = () => {
    if (!email || !fullName) return;

    // Save details to session storage for upsell tracking
    sessionStorage.setItem('checkout_fullname', fullName.trim());
    sessionStorage.setItem('checkout_email', email);

    // Target thank-you / post-purchase upsell page
    const redirectUrl = `${window.location.origin}/onetime`;

    // Construct dynamic Selar payment link
    const selarUrl = `${country.selarCheckoutBase}?quickcheckout=1` +
      `&email=${encodeURIComponent(email)}` +
      `&fullname=${encodeURIComponent(fullName.trim())}` +
      `&currency=${country.currencyCode}` +
      `&redirect_url=${encodeURIComponent(redirectUrl)}`;

    // Redirect user to Selar gateway
    window.location.href = selarUrl;
  };

  return (
    <div>
      <h2>Pay {country.formattedPrice}</h2>
      <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
      <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleSelarPayment}>
        Pay {country.formattedPrice} {country.flag}
      </button>
    </div>
  );
};
```

---

## 💡 Summary & Integration Checklist

1. Copy [`countryConfig.ts`](#1-country-configuration-interface-countryconfigts) into your `lib/` directory.
2. Add your Selar product URLs into `selarCheckoutBase` and `selarOnetimeBase`.
3. Wrap your root App in `<CountryProvider>`.
4. Use `const { country } = useCountry();` in components to display prices and trigger localized Selar links.
