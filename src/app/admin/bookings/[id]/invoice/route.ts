import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { InvoiceDocument } from "@/lib/pdf/InvoiceDocument";
import { createClient } from "@/lib/supabase/server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select(
      "check_in_at, check_out_at, guests(full_name), booking_rooms(rooms(room_number))",
    )
    .eq("id", id)
    .maybeSingle();

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const { data: invoice } = await supabase
    .from("invoices")
    .select("invoice_number, issue_date, grand_total, amount_paid")
    .eq("booking_id", id)
    .maybeSingle();

  if (!invoice) {
    return NextResponse.json({ error: "No invoice for this booking yet" }, { status: 404 });
  }

  const checkIn = new Date(booking.check_in_at);
  const checkOut = new Date(booking.check_out_at);
  const days = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (24 * 60 * 60 * 1000)));

  const dateTimeFormat = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateOnlyFormat = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const roomsLabel = booking.booking_rooms?.map((br) => br.rooms?.room_number).filter(Boolean).join(", ") || "-";

  const pdfBuffer = await renderToBuffer(
    InvoiceDocument({
      invoiceNumber: invoice.invoice_number,
      issueDate: dateOnlyFormat.format(new Date(invoice.issue_date)),
      guestName: booking.guests?.full_name ?? "-",
      checkInDisplay: dateTimeFormat.format(checkIn),
      checkOutDisplay: dateTimeFormat.format(checkOut),
      days,
      roomsLabel,
      advancePaid: Number(invoice.amount_paid),
      grandTotal: Number(invoice.grand_total),
      logoPath: path.join(process.cwd(), "public/assets/logo-srh.png"),
    }),
  );

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${invoice.invoice_number}.pdf"`,
    },
  });
}
