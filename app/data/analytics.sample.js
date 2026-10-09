// Sample data for app/routes/app.analytics.html. Replace with the analytics API response.
window.SampleData = window.SampleData || {};
window.SampleData.analytics = {
  saves: {
    total: 1232,
    xLabels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm'],
    signedIn: [21, 15, 10, 24, 16, 20, 10, 5, 14],
    guest: [23, 4, 17, 4, 13, 16, 4, 23],
  },
  funnel: [
    { label: 'Added to wishlist', tip: 'Added to wishlist', value: 80 },
    { label: 'Added to cart', tip: 'Added to cart', value: 40 },
    { label: 'Purchased (Signed-in only)', tip: 'Purchased', value: 20 },
  ],
};
