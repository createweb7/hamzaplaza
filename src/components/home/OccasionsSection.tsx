import { PRIMARY_PHONE } from "@/lib/business-info";

export function OccasionsSection() {
  return (
    <section className="occasions" id="occasions">
      <div className="container occasions-inner">
        <div>
          <p className="section-eyebrow section-eyebrow-light">Beyond a Night&apos;s Stay</p>
          <h2 className="section-title section-title-light">Weddings &amp; Family Celebrations Welcome</h2>
          <p className="occasions-desc">
            Hamza Residency Plaza is a favoured stop for wedding parties, engagement ceremonies, family functions
            and outstation travellers — with rooms held on a daily-rental basis for your whole group.
          </p>
          <div className="occasions-list">
            <span>Wedding Stays</span>
            <span>Engagement Functions</span>
            <span>Family Gatherings</span>
            <span>Outstation Travel</span>
          </div>
          <a href={`tel:${PRIMARY_PHONE}`} className="btn btn-outline btn-light">
            Call to Reserve for Your Event
          </a>
        </div>
      </div>
    </section>
  );
}
