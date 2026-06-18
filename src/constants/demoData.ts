
export const BUSINESS_DEMOS = {
  fashion: {
    id: 'fashion',
    profile: {
      name: "Zarah Fashion",
      type: "Boutique",
      description: "Local fashion brand specializing in ready-to-wear outfits and fast delivery within Abuja.",
      products: "Ankara Dresses, Office Wear, Ready-to-wear, Accessories",
      workingHours: "Mon-Sat: 9AM - 6PM, Sun: Closed",
      deliveryInfo: "Same-day delivery in Abuja. 24-48 hours for other major cities in Nigeria.",
      contact: "orders@zarahfashion.com.ng | +234 812 345 6789",
      tone: "Friendly"
    },
    customers: [
      { id: 101, name: 'Chiamaka Obi', email: 'chiamaka.obi@gmail.com', status: 'ai', priority: 'high', intent: 'Hot', score: 92, lastMsg: 'Do you deliver to Gwarinpa today?', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chiamaka' },
      { id: 102, name: 'Femi Adebayo', email: 'femi.adebayo@outlook.com', status: 'ai', priority: 'medium', intent: 'Warm', score: 65, lastMsg: 'What is the price for the red Ankara dress?', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Femi' }
    ],
    faqs: [
      { q: "Delivery Locations", a: "We deliver nationwide within Nigeria. Abuja orders are typically same-day." },
      { q: "Return Policy", a: "Items can be returned within 48 hours if they don't fit, provided tags are intact." }
    ]
  },
  restaurant: {
    id: 'restaurant',
    profile: {
      name: "The Mama's Pot",
      type: "Restaurant",
      description: "Authentic local dishes and fast-casual dining experience in Lagos.",
      products: "Jollof Rice, Pounded Yam, Egusi Soup, Grilled Catfish",
      workingHours: "Daily: 8AM - 10PM",
      deliveryInfo: "Instant delivery via our bike riders. Average time 30-45 minutes.",
      contact: "hello@mamaspot.ng | +234 901 234 5678",
      tone: "Warm"
    },
    customers: [
      { id: 201, name: 'Olamide Bakare', email: 'olamide.b@mail.ng', status: 'human', priority: 'high', intent: 'Hot', score: 98, lastMsg: 'Can I pre-order lunch for a group of 10 for tomorrow?', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olamide' },
      { id: 202, name: 'Blessing Udoh', email: 'blessing.udoh@gmail.com', status: 'ai', priority: 'low', intent: 'Cold', score: 25, lastMsg: 'Do you have catfish pepper soup available now?', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing' }
    ],
    faqs: [
      { q: "Group Bookings", a: "Yes, we accept group bookings. Please call at least 24 hours in advance." },
      { q: "Payment Options", a: "We accept POS, Bank Transfer, and Cash on Delivery." }
    ]
  },
  logistics: {
    id: 'logistics',
    profile: {
      name: "SwiftRide Logistics",
      type: "Logistics",
      description: "Reliable package delivery and dispatch services for SMEs and individuals.",
      products: "Same-day Dispatch, Corporate Delivery, Inter-state Shipping",
      workingHours: "Mon-Sat: 7AM - 7PM",
      deliveryInfo: "Track your rider in real-time. Delivery within 2 hours in Lagos.",
      contact: "support@swiftride.ng | +234 703 123 4567",
      tone: "Professional"
    },
    customers: [
      { id: 301, name: 'Tunde Afolayan', email: 'tunde@bizgrow.ng', status: 'ai', priority: 'high', intent: 'Hot', score: 89, lastMsg: 'I have 5 parcels for pickup at Ikeja.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde' },
      { id: 302, name: 'Aisha Yusuf', email: 'aisha.y@shoponline.ng', status: 'escalated', priority: 'high', intent: 'Hot', score: 78, lastMsg: 'My customer hasn\'t received her package since morning.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha' }
    ],
    faqs: [
      { q: "Dispatch Pickup", a: "Standard pickup time is within 30 minutes of booking your dispatch." },
      { q: "Inter-state Rates", a: "Inter-state shipping starts from ₦3,500 depending on weight and location." }
    ]
  },
  electronics: {
    id: 'electronics',
    profile: {
      name: "Gadget Hub",
      type: "Electronics Store",
      description: "Best deals on phones, laptops, and original mobile accessories.",
      products: "Smartphones, Laptops, Powerbanks, Original Chargers",
      workingHours: "Mon-Sat: 9AM - 8PM",
      deliveryInfo: "Free delivery in Computer Village. Fast shipping within Lagos.",
      contact: "sales@gadgethub.ng | +234 805 111 2222",
      tone: "Helpful"
    },
    customers: [
      { id: 401, name: 'Emeka Nwosu', email: 'emeka.n@techy.ng', status: 'ai', priority: 'medium', intent: 'Warm', score: 72, lastMsg: 'Is the iPhone 15 Pro Max available in natural titanium?', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka' },
      { id: 402, name: 'Grace Johnson', email: 'grace.j@gmail.com', status: 'ai', priority: 'low', intent: 'Warm', score: 55, lastMsg: 'Do you have the original UK used MacBook Air M1?', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace' }
    ],
    faqs: [
      { q: "Warranty Period", a: "All phones come with a 1-year manufacturer warranty. Used gadgets have 3 months shop warranty." },
      { q: "Payment Plans", a: "We currently accept installments via CDcare or direct bank credit." }
    ]
  }
};
