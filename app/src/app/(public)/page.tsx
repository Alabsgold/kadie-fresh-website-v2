import Link from "next/link";
import { HeroVideo } from "@/components/site/HeroVideo";
import { Reveal } from "@/components/ui/Reveal";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { listPublishedProducts } from "@/lib/data/products";
import { CATEGORY_SWATCH } from "@/lib/images";
import { HOME_STATS, HOME_PROOF, HOME_AUDIENCES, HOME_STEPS } from "@/content/home";

export default async function HomePage() {
  const products = await listPublishedProducts();
  const featured = products.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-140 overflow-hidden bg-forest-900">
        <div className="absolute inset-0 bg-[linear-gradient(125deg,#14532D_0%,#166534_40%,#0B1F13_100%)]" />
        <div className="absolute inset-0 animate-drift bg-[radial-gradient(70%_60%_at_22%_30%,rgba(34,197,94,.5),transparent_62%),radial-gradient(50%_50%_at_82%_72%,rgba(249,115,22,.34),transparent_66%)]" />
        <HeroVideo />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,12,.72)_0%,rgba(6,20,12,.58)_45%,rgba(6,20,12,.82)_100%)]" />

        <div className="relative max-w-3xl px-6 pt-24 pb-21">
          <span className="inline-block rounded-full border border-white/22 bg-white/14 px-4 py-1.5 text-[13px] font-semibold text-[#EAF6EE] backdrop-blur-md">
            Ikorodu, Lagos · supplying and exporting since day one
          </span>
          <h1 className="mt-5.5 mb-4.5 font-display text-[42px] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,.35)] sm:text-6xl">
            Welcome to Kadie Fresh.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-white/88 [text-shadow:0_1px_12px_rgba(0,0,0,.4)]">
            High-grade fresh produce, washed, sliced and sealed within four hours — supplied to
            Lagos kitchens and consolidated for export buyers overseas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link href="/products" className="btn-cta px-7.5 py-4 text-base">
              Explore Products
            </Link>
            <Link
              href="/quote"
              className="rounded-full border border-white/40 bg-white/10 px-7.5 py-4 text-base font-bold text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white/20"
            >
              Request a Quote
            </Link>
          </div>
          <div className="mt-11 flex flex-wrap gap-9">
            {HOME_STATS.map((s) => (
              <CountUpStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="grid grid-cols-1 gap-px bg-forest-800/8 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_PROOF.map((p) => (
          <div key={p.title} className="bg-green-50 px-6 py-5">
            <div className="text-[15px] font-bold text-forest-900">{p.title}</div>
            <div className="mt-1 text-[13.5px] text-gray-600">{p.detail}</div>
          </div>
        ))}
      </section>

      {/* Who we supply */}
      <section className="px-6 pt-14 pb-5">
        <div className="text-xs font-bold tracking-[0.14em] text-green-600 uppercase">
          Who we supply
        </div>
        <h2 className="mt-2.5 mb-6.5 font-display text-4xl font-extrabold tracking-[-0.035em] text-forest-900">
          Four ways to buy
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_AUDIENCES.map((a) => (
            <Reveal key={a.title} className="glass-card p-5.5">
              <div className="mb-3.5 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-green-50">
                <span className="inline-block h-3.5 w-3.5 rounded-full bg-orange-500" />
              </div>
              <div className="font-display text-xl font-bold tracking-[-0.02em] text-forest-900">
                {a.title}
              </div>
              <p className="mt-2 mb-4 text-sm leading-relaxed text-pretty text-gray-500">
                {a.description}
              </p>
              <Link href={a.href} className="text-sm font-bold text-orange-500">
                {a.cta} →
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The line */}
      <section className="mt-8.5 bg-[#F7FAF8] px-6 py-11">
        <div className="text-xs font-bold tracking-[0.14em] text-green-600 uppercase">
          The line
        </div>
        <h2 className="mt-2.5 mb-7.5 font-display text-[36px] font-extrabold tracking-[-0.035em] text-forest-900">
          Four steps, every batch
        </h2>
        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_STEPS.map((s) => (
            <Reveal key={s.title}>
              <span
                className={`inline-block h-3 w-3 rounded-full ${
                  s.tone === "green" ? "bg-green-600" : "bg-orange-500"
                }`}
              />
              <div className="mt-3.5 text-base font-bold text-forest-900">{s.title}</div>
              <div className="mt-0.5 text-[13.5px] text-gray-500">{s.detail}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Selected lines */}
      <section className="px-6 pt-13.5 pb-5">
        <div className="mb-5.5 flex flex-wrap items-end gap-4">
          <div>
            <div className="text-xs font-bold tracking-[0.14em] text-green-600 uppercase">
              Selected lines
            </div>
            <h2 className="mt-2.5 font-display text-[36px] font-extrabold tracking-[-0.035em] text-forest-900">
              What we prepare
            </h2>
          </div>
          <Link href="/products" className="btn-outline ml-auto px-5 py-2.75 text-sm">
            All products
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Reveal key={p.id}>
              <Link href={`/products/${p.slug}`} className="glass-card block p-3.5">
                <div
                  className="h-40 rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${p.heroImageUrl}), ${CATEGORY_SWATCH[p.category] ?? CATEGORY_SWATCH.Veg}`,
                  }}
                />
                <div className="mt-3.5 flex items-center gap-2">
                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    {p.category}
                  </span>
                </div>
                <div className="mt-2 font-display text-lg font-bold tracking-[-0.02em] text-forest-900">
                  {p.name}
                </div>
                <div className="mt-0.5 text-sm text-gray-500">{p.pack}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-6 my-11 flex flex-wrap items-center gap-5.5 rounded-3xl bg-[linear-gradient(120deg,#0E3D22,#07200F)] p-10">
        <div className="min-w-65 flex-1">
          <h2 className="font-display text-[33px] font-extrabold text-balance text-white">
            Tell us what your kitchen needs.
          </h2>
          <p className="mt-2.5 text-[15.5px] text-[#EAF6EE]/66">
            Message us and we will come back with pack sizes and a price.
          </p>
        </div>
        <Link href="/quote" className="btn-cta px-7.5 py-4 text-base">
          Request a quote
        </Link>
      </section>
    </>
  );
}
