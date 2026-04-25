import React from "react";

export default function About() {
  const features = [
    {
      no: "01",
      title: "Premium Vinyl",
      body: "We strive to provide every customer with the utmost satisfaction by delivering high-quality vinyl stickers crafted with care and precision.",
    },
    {
      no: "02",
      title: "Built to Last",
      body: "Premium matte or glossy finish lamination, weatherproof, scratch-resistant — and gentle enough to keep your gadgets pristine.",
    },
    {
      no: "03",
      title: "Honest Service",
      body: "Customer satisfaction is our top priority. Real humans answering real emails — usually within a day.",
    },
    {
      no: "04",
      title: "Designs You'll Love",
      body: "Over a thousand designs, from earnestly funny to delightfully quirky. New drops every week.",
    },
  ];

  return (
    <article className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3 text-center">
          § The story
        </p>
        <h1 className="font-display text-5xl sm:text-7xl text-ink dark:text-paper leading-[0.9] text-center mb-3">
          <span className="italic">About</span> the workshop.
        </h1>
        <p className="font-primary text-center text-sepia dark:text-paper/70 text-lg max-w-xl mx-auto">
          A small printmaker's room turning ideas into vinyl, one batch at a
          time.
        </p>

        <div className="my-12 border-t-2 border-dotted border-ink/30 dark:border-paper/30" />

        <p className="font-display text-2xl sm:text-3xl text-ink dark:text-paper italic leading-snug mb-12 max-w-3xl">
          eazy sticker store is an initiative by Designs by eazybytes — dedicated
          to offering you the most sought-after stickers and posters.
        </p>

        <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-8">
          § Why choose us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {features.map((f) => (
            <div key={f.no} className="relative pl-12">
              <span className="absolute left-0 top-0 stamp w-9 h-9 rounded-full border-2 border-ink dark:border-paper text-[10px] text-ink dark:text-paper">
                {f.no}
              </span>
              <h3 className="font-display text-2xl text-ink dark:text-paper leading-tight">
                {f.title}
              </h3>
              <p className="font-primary text-base text-sepia dark:text-paper/70 mt-2 leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
