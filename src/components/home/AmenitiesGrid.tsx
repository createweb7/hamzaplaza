type Amenity = {
  title: string;
  description: string;
  path: React.ReactNode;
};

const AMENITIES: Amenity[] = [
  {
    title: "Daily Rental Rooms",
    description:
      "Comfortable rooms available on a straightforward daily-rental basis — book for a night or a few days.",
    path: (
      <>
        <path d="M3 18v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6" />
        <path d="M3 18h18" />
        <path d="M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <path d="M3 14h18" />
      </>
    ),
  },
  {
    title: "AC & Non-AC Options",
    description: "Clean, spacious rooms with both air-conditioned and non air-conditioned choices to suit your budget.",
    path: (
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    ),
  },
  {
    title: "24-Hour Power & Water",
    description: "Uninterrupted electricity and water supply around the clock, every day of the week.",
    path: <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />,
  },
  {
    title: "Free Wi-Fi",
    description: "High-speed complimentary internet access throughout your stay.",
    path: (
      <>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </>
    ),
  },
  {
    title: "Secure Parking",
    description: "Dedicated, protected parking space for cars and two-wheelers alike.",
    path: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 8h5a2 2 0 0 1 0 4H8v6" />
      </>
    ),
  },
  {
    title: "Peaceful & Secure",
    description: "A calm, safe environment tucked away from the bustle, ideal for families and travellers.",
    path: <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />,
  },
  {
    title: "24/7 CCTV Surveillance",
    description: "Round-the-clock camera monitoring for complete peace of mind.",
    path: (
      <>
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </>
    ),
  },
  {
    title: "ECR Road Location",
    description: "Conveniently located on ECR Road, next to Bharath Petrol Bunk, Eripurakarai, Adirampattinam — easy to find.",
    path: (
      <>
        <path d="M3 3v18h18" />
        <path d="M18.7 8 12 14.7l-3.3-3.4L3 17" />
      </>
    ),
  },
];

export function AmenitiesGrid() {
  return (
    <section className="section" id="amenities">
      <div className="container">
        <p className="section-eyebrow">What We Offer</p>
        <h2 className="section-title">Everything for a comfortable stay</h2>

        <div className="amenities-grid">
          {AMENITIES.map((amenity) => (
            <div className="amenity-card" key={amenity.title}>
              <span className="amenity-icon">
                <svg viewBox="0 0 24 24">{amenity.path}</svg>
              </span>
              <h3>{amenity.title}</h3>
              <p>{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
