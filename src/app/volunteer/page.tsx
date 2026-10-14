import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import { site, volunteerRoles } from "@/config/site";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero, SectionHeading } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Volunteer",
  description: `Volunteer with ${site.name}: befriending, tutoring, mentoring, food distribution and more across ${site.country}.`,
  alternates: { canonical: "/volunteer" },
};

const reasons = [
  { title: "See the difference", body: "You'll know the people you help by name, and see their progress week by week." },
  { title: "Learn real skills", body: "Leadership, mentoring and event organising, with training before you start." },
  { title: "Find your people", body: "Join 850+ volunteers who give a few hours a week and keep coming back." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title={<>Two hours a week can <em className="text-sunrise">change someone&apos;s year.</em></>}
        intro="No special skills needed: we train every volunteer, match roles to your schedule, and support you all the way."
      >
        <a href="#apply" className="btn-forest mt-8">Apply in 2 minutes</a>
      </PageHero>

      <section className="container-x py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.title}>
              <span className="font-serif text-3xl font-medium text-sunrise">0{i + 1}</span>
              <h2 className="title-3 mt-3 text-ink">{r.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Open roles" title="Find a role that fits your week" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {volunteerRoles.map((r) => (
              <li key={r.role} className="rounded-3xl border border-line bg-paper p-6">
                <h3 className="font-sans text-lg font-semibold text-ink">{r.role}</h3>
                <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft"><MapPin className="size-4 text-sunrise" />{r.location}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft"><Clock className="size-4 text-sunrise" />{r.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apply" className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Apply</p>
          <h2 className="title-2 mt-3 text-ink">Tell us a little about you.</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Our volunteer coordinator will call within 3 working days to find the right role and book your orientation.
          </p>
        </div>
        <div className="card p-6 sm:p-9">
          <EnquiryForm kind="volunteer" />
        </div>
      </section>
    </>
  );
}
