import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PRODUCT_PHOTOS, FARM_PHOTO, galleryPhotoForIndex } from "../src/lib/images";

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const TERMS_CONTENT = `These Terms of Service govern your use of the Kadie Fresh website and your purchase of goods and services from Kadie Fresh ("we", "us", "our"), a prepared fresh produce supplier based in Ikorodu, Lagos, Nigeria (RC 1849022).

1. Orders and quotes. Prices quoted through our quote wizard, WhatsApp line or by email are estimates until confirmed in writing. Standing orders are governed by the terms agreed with your named contact.

2. Payment. Unless otherwise agreed, first orders are settled on delivery and standing orders are invoiced monthly, payable by bank transfer against invoice.

3. Quality guarantee. If a pack arrives off-spec or past its seal window, we will replace the batch or credit it in full against the batch code shown on the pack. No return of the product is required — quote the batch code when you contact us.

4. Delivery. Delivery windows are agreed per order. Cold handling is maintained from our facility to your door for kitchen and retail orders, and to an agreed depot for bulk and distributor volumes.

5. Export orders. Consignments prepared for export are subject to a signed-off specification and the certification set out on our Export Credentials page. Shipping and customs arrangements beyond our facility gate are the buyer's responsibility unless separately agreed.

6. Liability. Our liability in connection with any order is limited to the replacement or credit described in clause 3. We are not liable for indirect or consequential loss.

7. Changes. We may update these terms from time to time; the version published on this page applies to orders placed after the date of any change.

Questions about these terms can be sent to info@kadiefresh.com.`;

const PRIVACY_CONTENT = `Kadie Fresh ("we", "us", "our") collects the minimum information needed to quote, fulfil and support your order.

1. What we collect. Contact details you give us through the quote wizard, distributor application, phone or WhatsApp (name, business, email, phone, delivery location), and the content of any message you send us.

2. How we use it. To prepare quotes, fulfil orders, respond to enquiries, and — where you have agreed to be contacted — to let you know about relevant changes to our lines or services. We do not sell your information to anyone.

3. Cookies. We use a small number of cookies to see which pages buyers read, so we know what to keep on the site. See our Cookie Notice for detail.

4. Storage and access. Enquiry and order information is stored securely and is accessible only to Kadie Fresh staff who need it to do their job.

5. Your rights. You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, by writing to info@kadiefresh.com. We will action reasonable requests within a reasonable time.

6. Retention. We keep enquiry and order records for as long as needed for accounting, quality-guarantee and legal purposes, then delete them.

Questions about this policy can be sent to info@kadiefresh.com.`;

const COOKIE_NOTICE_CONTENT = `This notice explains the cookies used on the Kadie Fresh website.

Essential cookies. A small number of cookies are required for the site to function correctly (for example, remembering your cookie preference itself). These cannot be switched off.

Analytics cookies. With your consent, we use a small number of cookies to see which pages buyers read most, so we know what to keep on the site and what to improve. Nothing gathered this way is sold to anyone.

Your choice. You can accept or decline non-essential cookies from the banner shown on your first visit. You can change your mind at any time by clearing your browser's cookies for this site and reloading the page.

Questions about this notice can be sent to info@kadiefresh.com.`;

const PRODUCTS = [
  {
    slug: "pineapple",
    name: "Sliced pineapple",
    category: "Fruit",
    pack: "500g · sealed pack",
    grade: "Grade A, ripe",
    shelfLife: "4 days chilled",
    moq: "20 packs",
    storage: "2–4°C",
    origin: "Ogun State growers",
    blurb:
      "Crown and eyes removed, cored and cut to even rings or chunks. Sealed within four hours of washing, date-coded to the batch and the farm it came from.",
    heroImageUrl: PRODUCT_PHOTOS.pineapple,
    thumbImageUrls: [PRODUCT_PHOTOS.pineapple, FARM_PHOTO, PRODUCT_PHOTOS.pineapple],
  },
  {
    slug: "ugu",
    name: "Chopped ugu",
    category: "Veg",
    pack: "250g · washed & drained",
    grade: "Grade A leaf",
    shelfLife: "3 days chilled",
    moq: "30 packs",
    storage: "2–4°C",
    origin: "Ikorodu belt",
    blurb:
      "Stems stripped, triple-washed in potable water and spun dry so the pack does not sweat. Cut fine for soups or coarse on request.",
    heroImageUrl: PRODUCT_PHOTOS.ugu,
    thumbImageUrls: [PRODUCT_PHOTOS.ugu, FARM_PHOTO, PRODUCT_PHOTOS.ugu],
  },
  {
    slug: "pepper",
    name: "Prepared pepper mix",
    category: "Veg",
    pack: "400g · blended base",
    grade: "Blend, deseeded",
    shelfLife: "5 days chilled",
    moq: "24 packs",
    storage: "2–4°C",
    origin: "Mile 12 intake",
    blurb:
      "Rodo, tatashe and onion blended to a consistent stew base. Deseeded to your heat level and packed without water added.",
    heroImageUrl: PRODUCT_PHOTOS.pepper,
    thumbImageUrls: [PRODUCT_PHOTOS.pepper, FARM_PHOTO, PRODUCT_PHOTOS.pepper],
  },
  {
    slug: "carrots",
    name: "Sliced carrots",
    category: "Veg",
    pack: "500g · pack",
    grade: "Grade A",
    shelfLife: "6 days chilled",
    moq: "20 packs",
    storage: "2–4°C",
    origin: "Jos plateau",
    blurb:
      "Peeled and cut to coin, baton or dice. Sized to spec so the cut is even across the whole batch.",
    heroImageUrl: PRODUCT_PHOTOS.carrots,
    thumbImageUrls: [PRODUCT_PHOTOS.carrots, FARM_PHOTO, PRODUCT_PHOTOS.carrots],
  },
  {
    slug: "watermelon",
    name: "Diced watermelon",
    category: "Fruit",
    pack: "500g · sealed pack",
    grade: "Grade A, seedless",
    shelfLife: "3 days chilled",
    moq: "20 packs",
    storage: "2–4°C",
    origin: "Oyo growers",
    blurb:
      "Rind off, cut to 25mm dice and drained before sealing so the pack stays firm rather than swimming.",
    heroImageUrl: PRODUCT_PHOTOS.watermelon,
    thumbImageUrls: [PRODUCT_PHOTOS.watermelon, FARM_PHOTO, PRODUCT_PHOTOS.watermelon],
  },
  {
    slug: "coconut",
    name: "Grated coconut",
    category: "Fruit",
    pack: "300g · pack",
    grade: "Mature nut",
    shelfLife: "4 days chilled",
    moq: "24 packs",
    storage: "2–4°C",
    origin: "Badagry coast",
    blurb:
      "Shelled, brown skin removed and grated the same morning. No sulphites, no added moisture.",
    heroImageUrl: PRODUCT_PHOTOS.coconut,
    thumbImageUrls: [PRODUCT_PHOTOS.coconut, FARM_PHOTO, PRODUCT_PHOTOS.coconut],
  },
  {
    slug: "onions",
    name: "Chopped onions",
    category: "Veg",
    pack: "400g · pack",
    grade: "Grade A red",
    shelfLife: "4 days chilled",
    moq: "30 packs",
    storage: "2–4°C",
    origin: "Sokoto intake",
    blurb:
      "Peeled and diced under extraction so the cut stays clean. Available fine, medium or ring cut.",
    heroImageUrl: PRODUCT_PHOTOS.onions,
    thumbImageUrls: [] as string[],
  },
  {
    slug: "plantain",
    name: "Sliced plantain",
    category: "Fruit",
    pack: "600g · pack",
    grade: "Firm ripe",
    shelfLife: "2 days chilled",
    moq: "20 packs",
    storage: "2–4°C",
    origin: "Edo growers",
    blurb:
      "Cut on the diagonal to an even 8mm for frying, or thick round for boiling. Sorted by ripeness before the line runs.",
    heroImageUrl: PRODUCT_PHOTOS.plantain,
    thumbImageUrls: [] as string[],
  },
];

const TESTIMONIALS = [
  {
    authorName: "Ngozi Adeyemi",
    authorRole: "Executive chef, Harbour Hotel",
    quote:
      "We stopped prepping vegetables in-house eleven months ago. Two kitchen staff went back to cooking, which is what we hired them for.",
    approved: true,
  },
  {
    authorName: "Tunde Bakare",
    authorRole: "Owner, Bakare Foods",
    quote:
      "The batch code matters more than people realise. When a supplier can tell you which farm a pack came from, the conversation about quality changes completely.",
    approved: true,
  },
  {
    authorName: "Grace Okonkwo",
    authorRole: "Caterer, Lekki",
    quote:
      "They called me before the run to say the tatashe was short and asked how I wanted to handle it. Nobody else does that.",
    approved: true,
  },
  {
    authorName: "Zenith Foods Ltd",
    authorRole: "Export consolidator",
    quote:
      "Documentation was ready before we asked. That is unusual enough here that it decided the contract.",
    approved: false,
  },
];

const CERTIFICATIONS = [
  {
    name: "NAFDAC facility registration",
    issuer: "NAFDAC",
    ref: "A1-9920L",
    expires: "March 2027",
    status: "VALID" as const,
  },
  {
    name: "NEPC exporter registration",
    issuer: "Nigerian Export Promotion Council",
    ref: "NEPC/0084221",
    expires: "January 2027",
    status: "VALID" as const,
  },
  {
    name: "Phytosanitary — standing inspection",
    issuer: "Nigeria Agricultural Quarantine Service",
    ref: "Per consignment",
    expires: "Per consignment",
    status: "ON_REQUEST" as const,
  },
  {
    name: "HACCP principles — internal audit",
    issuer: "Independent auditor",
    ref: "KF-HA-26",
    expires: "September 2026",
    status: "RENEWING" as const,
  },
];

const BLOG_POSTS = [
  {
    slug: "cold-chain",
    title: "What four hours actually buys you",
    category: "Standards",
    excerpt:
      "Between washing and sealing, produce loses more than moisture. Here is what happens in that window, and why we close it.",
    readTime: "6 min",
    author: "Femi Alabi",
    published: true,
    publishedAt: new Date("2026-08-12"),
    body: [
      "Every prepared-produce operation has a number it will not say out loud: the gap between the wash tank and the seal. Ours is four hours, and it is the single figure that governs how the rest of the line is laid out.",
      "A cut surface is an open wound. Respiration climbs, sugars convert, and the microbial load on that surface starts from whatever the water left behind. Chilling slows all three. It does not reverse any of them.",
      "So the line runs backwards from the seal. Intake is graded before it is washed, because a fruit that fails grading after washing has already spent water and time. Cutting is batched by line rather than by order, because a knife that changes size every ten minutes is a knife that is idle. Packing sits next to sealing, not across the floor from it.",
      "The result is not a claim about freshness in the abstract. It is a batch code, printed on the pack, that tells you the morning the produce was washed and the farm it arrived from. If a pack disappoints, that code is how we find out why.",
    ].join("\n\n"),
    coverImageUrl: FARM_PHOTO,
  },
  {
    slug: "ugu",
    title: "Why we triple-wash ugu and spin it dry",
    category: "The line",
    excerpt:
      "The difference between a pack that keeps three days and one that keeps one is almost always water left in the leaf.",
    readTime: "4 min",
    author: "Blessing Eze",
    published: true,
    publishedAt: new Date("2026-07-29"),
    body: [
      "Ugu comes in with field soil in the crease of the stem, and no single wash reaches it. We run three tanks at falling turbidity, so the last water the leaf touches is the cleanest water on the floor.",
      "Then we spin. A leaf packed wet sweats, and a pack that sweats goes slimy at the bottom long before the top of it turns. Thirty seconds in the spinner is the cheapest shelf life we buy.",
      "Buyers who receive ugu from us and store it above 4°C still see the three days. Below that, four. The variable is almost never the wash — it is the fridge at the other end.",
    ].join("\n\n"),
    coverImageUrl: FARM_PHOTO,
  },
  {
    slug: "export-docs",
    title: "The paperwork an importer asks for first",
    category: "Export",
    excerpt:
      "Phytosanitary, NAFDAC, NEPC, and the certificate of origin. What each one proves, and who issues it.",
    readTime: "8 min",
    author: "Femi Alabi",
    published: true,
    publishedAt: new Date("2026-07-14"),
    body: [
      "Most first-time exporters discover the documentation after the buyer has already agreed a price. It is the wrong order, and it costs a sailing.",
      "A phytosanitary certificate is issued by the Nigeria Agricultural Quarantine Service and attests that the consignment was inspected and found free of quarantine pests. It is consignment-specific. It cannot be issued retrospectively.",
      "NAFDAC registration covers the product and the facility rather than the shipment. NEPC registration covers you as an exporter. The certificate of origin comes from the chamber of commerce and is what the importer files at their end.",
      "We hold the first three continuously and arrange the fourth per consignment. A buyer asking for all of them is not being difficult — they are being audited by someone else.",
    ].join("\n\n"),
    coverImageUrl: PRODUCT_PHOTOS.ugu,
  },
  {
    slug: "pepper",
    title: "Deseeding to a heat level, not a recipe",
    category: "The line",
    excerpt:
      "Two kitchens ordering the same pepper mix rarely want the same pepper mix. We solved it with a number.",
    readTime: "5 min",
    author: "Blessing Eze",
    published: false,
    publishedAt: null,
    body: [
      "Heat in a stew base is a function of the rodo-to-tatashe ratio and how much of the seed and pith survives the blend. Left alone, it varies batch to batch by more than most kitchens will tolerate.",
      "We index it. One through five, agreed once with the kitchen, held on the spec sheet, checked at the blender. A hotel that orders a two gets a two in January and a two in September.",
      "It sounds trivial. It is the single thing our kitchen customers mention most when they renew.",
    ].join("\n\n"),
    coverImageUrl: FARM_PHOTO,
  },
];

const GALLERY_IMAGES = [
  { label: "Intake grading", category: "The line", published: true },
  { label: "Wash tanks", category: "The line", published: true },
  { label: "Cutting bench", category: "The line", published: true },
  { label: "Sealed retail packs", category: "Product", published: true },
  { label: "Pepper base", category: "Product", published: true },
  { label: "Pallet build", category: "Dispatch", published: true },
  { label: "Cold room", category: "Facility", published: false },
  { label: "Morning dispatch", category: "Dispatch", published: false },
  { label: "Batch labelling", category: "Facility", published: true },
];

const ENQUIRIES = [
  {
    reference: "KF-1200",
    type: "GENERAL" as const,
    status: "NEW" as const,
    name: "Tunde Bakare",
    email: "tunde@bakarefoods.ng",
    phone: "0803 221 7745",
    meta: "Bulk · pepper mix · Ikeja",
    notes:
      "We run three kitchens in Ikeja and go through roughly 60kg of pepper base a week. Can you hold a standing Tuesday and Friday delivery? Need the heat mild for the hotel side.",
    createdAt: new Date(Date.now() - 2 * 3600_000),
  },
  {
    reference: "KF-1201",
    type: "GENERAL" as const,
    status: "REPLIED" as const,
    name: "Grace Okonkwo",
    email: "grace.o@gmail.com",
    phone: "0812 004 9911",
    meta: "General · storage question",
    notes:
      "How long does the chopped ugu keep once I open the pack? I buy for the family and would rather not waste it.",
    createdAt: new Date(Date.now() - 26 * 3600_000),
  },
  {
    reference: "KF-1202",
    type: "GENERAL" as const,
    status: "NEW" as const,
    name: "Harbour Hotel",
    email: "procurement@harbourhotel.ng",
    phone: "0700 442 8890",
    meta: "Quote · weekly standing order",
    notes:
      "Requesting pricing on a weekly standing order: sliced pineapple 40 packs, diced watermelon 30 packs, sliced carrots 25 packs. Delivery to Victoria Island before 7am.",
    createdAt: new Date(Date.now() - 30 * 3600_000),
  },
  {
    reference: "KF-1203",
    type: "GENERAL" as const,
    status: "NEW" as const,
    name: "Zenith Foods Ltd",
    email: "exports@zenithfoods.com",
    phone: "0906 118 2200",
    meta: "Export · phytosanitary docs",
    notes:
      "We consolidate for a buyer in Dubai. Before we go further — can you supply phytosanitary certification and NAFDAC registration numbers with each consignment?",
    createdAt: new Date(Date.now() - 2 * 86_400_000),
  },
  {
    reference: "KF-1204",
    type: "GENERAL" as const,
    status: "REPLIED" as const,
    name: "Ada Mensah",
    email: "ada.mensah@outlook.com",
    phone: "0705 663 1042",
    meta: "Retail · home pack",
    notes: "Do you deliver to Yaba on Saturdays? Interested in the 500g fruit packs.",
    createdAt: new Date(Date.now() - 4 * 86_400_000),
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "femi@kadiefresh.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "KadieFresh2026!";
  const adminName = process.env.ADMIN_NAME ?? "Femi Alabi";

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash: await bcrypt.hash(adminPassword, 12),
    },
  });
  console.log(`Seeded Studio admin: ${adminEmail}`);

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      termsContent: TERMS_CONTENT,
      privacyContent: PRIVACY_CONTENT,
      cookieNoticeContent: COOKIE_NOTICE_CONTENT,
    },
  });
  console.log("Seeded default site settings");

  for (const [i, product] of PRODUCTS.entries()) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: { ...product, sortOrder: i },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products`);

  for (const [i, t] of TESTIMONIALS.entries()) {
    const existing = await prisma.testimonial.findFirst({ where: { authorName: t.authorName } });
    if (!existing) await prisma.testimonial.create({ data: { ...t, sortOrder: i } });
  }
  console.log(`Seeded ${TESTIMONIALS.length} testimonials`);

  for (const [i, c] of CERTIFICATIONS.entries()) {
    const existing = await prisma.certification.findFirst({ where: { name: c.name } });
    if (!existing) await prisma.certification.create({ data: { ...c, sortOrder: i } });
  }
  console.log(`Seeded ${CERTIFICATIONS.length} certifications`);

  for (const [i, post] of BLOG_POSTS.entries()) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: { ...post, sortOrder: i },
    });
  }
  console.log(`Seeded ${BLOG_POSTS.length} blog posts`);

  for (const [i, tile] of GALLERY_IMAGES.entries()) {
    const existing = await prisma.galleryImage.findFirst({ where: { label: tile.label } });
    if (!existing) {
      await prisma.galleryImage.create({
        data: { ...tile, url: galleryPhotoForIndex(i), sortOrder: i },
      });
    }
  }
  console.log(`Seeded ${GALLERY_IMAGES.length} gallery images`);

  for (const enquiry of ENQUIRIES) {
    const existing = await prisma.enquiry.findUnique({ where: { reference: enquiry.reference } });
    if (!existing) {
      const { notes, createdAt, ...rest } = enquiry;
      await prisma.enquiry.create({
        data: {
          ...rest,
          notes,
          items: [],
          createdAt,
          updatedAt: createdAt,
          ...(enquiry.status === "REPLIED"
            ? {
                replyMessage: "Thanks for reaching out — replied by the team.",
                repliedAt: new Date(createdAt.getTime() + 3600_000),
                repliedById: admin.id,
              }
            : {}),
        },
      });
    }
  }
  console.log(`Seeded ${ENQUIRIES.length} enquiries`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
