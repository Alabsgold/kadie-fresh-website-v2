import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { listPublishedProducts } from "@/lib/data/products";
import { getSiteSettings } from "@/lib/data/settings";

export async function GET() {
  const [products, settings] = await Promise.all([listPublishedProducts(), getSiteSettings()]);

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]); // A4
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);

  const forest = rgb(0x0e / 255, 0x3d / 255, 0x22 / 255);
  const gray = rgb(0x6b / 255, 0x72 / 255, 0x80 / 255);
  const margin = 44;
  let y = 780;

  page.drawText(settings.businessName, { x: margin, y, size: 22, font: bold, color: forest });
  y -= 22;
  page.drawText("Line card — pack size, minimum order and shelf life", {
    x: margin,
    y,
    size: 11,
    font: regular,
    color: gray,
  });
  y -= 14;
  page.drawText(
    `${settings.address} · ${settings.phone} · ${settings.email}`,
    { x: margin, y, size: 9, font: regular, color: gray },
  );
  y -= 30;

  const columns = [
    { key: "name" as const, label: "Line", x: margin, width: 170 },
    { key: "category" as const, label: "Category", x: margin + 170, width: 70 },
    { key: "pack" as const, label: "Pack", x: margin + 240, width: 140 },
    { key: "moq" as const, label: "MOQ", x: margin + 380, width: 70 },
    { key: "shelfLife" as const, label: "Shelf life", x: margin + 450, width: 100 },
  ];

  for (const col of columns) {
    page.drawText(col.label, { x: col.x, y, size: 9, font: bold, color: forest });
  }
  y -= 6;
  page.drawLine({
    start: { x: margin, y },
    end: { x: 551, y },
    thickness: 0.75,
    color: rgb(0.85, 0.88, 0.86),
  });
  y -= 16;

  for (const product of products) {
    if (y < 60) break;
    for (const col of columns) {
      const value = String(product[col.key]);
      const text = value.length > 32 ? `${value.slice(0, 29)}…` : value;
      page.drawText(text, { x: col.x, y, size: 9.5, font: regular, color: rgb(0.1, 0.12, 0.09) });
    }
    y -= 20;
  }

  const bytes = await pdf.save();

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="kadie-fresh-line-card.pdf"',
    },
  });
}
