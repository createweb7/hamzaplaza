import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  EMAIL,
  GST_NUMBER,
  LANDLINE_DISPLAY,
  PRIMARY_PHONE_DISPLAY,
  WEBSITE,
} from "@/lib/business-info";

const SECONDARY_MOBILE_DISPLAY = "+91 99765 27996";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 10, fontFamily: "Helvetica" },
  box: { border: "1pt solid #000", flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottom: "1pt solid #000",
  },
  brandRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 6 },
  // Source PNG is 1060x738 (not square) — fixed width with height derived from
  // its real aspect ratio, otherwise react-pdf stretches it to a square box.
  logo: { width: 54, height: 54 * (738 / 1060) },
  brandName: { fontSize: 22, fontFamily: "Helvetica-Bold" },
  addressBlock: { alignItems: "center", paddingBottom: 8, borderBottom: "1pt solid #000" },
  billMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottom: "1pt solid #000",
  },
  billTitle: { fontSize: 13, fontFamily: "Helvetica-Bold" },
  toRow: { padding: 8, borderBottom: "1pt solid #000", flexDirection: "row" },
  tableHeaderRow: { flexDirection: "row", borderBottom: "1pt solid #000" },
  tableRow: { flexDirection: "row", borderBottom: "0.5pt solid #ccc" },
  particularsCol: { flex: 3, padding: 8 },
  amountCol: { flex: 1, padding: 8, borderLeft: "1pt solid #000", textAlign: "right" },
  headerCellText: { fontFamily: "Helvetica-Bold", textAlign: "center" },
  totalRow: { flexDirection: "row", borderTop: "1pt solid #000" },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 8,
    borderTop: "1pt solid #000",
  },
});

type InvoicePdfProps = {
  invoiceNumber: string;
  issueDate: string;
  guestName: string;
  checkInDisplay: string;
  checkOutDisplay: string;
  days: number;
  roomsLabel: string;
  advancePaid: number;
  grandTotal: number;
  logoPath: string;
};

const currency = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;

export function InvoiceDocument({
  invoiceNumber,
  issueDate,
  guestName,
  checkInDisplay,
  checkOutDisplay,
  days,
  roomsLabel,
  advancePaid,
  grandTotal,
  logoPath,
}: InvoicePdfProps) {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.box}>
          <View style={styles.headerRow}>
            <Text>GST : {GST_NUMBER}</Text>
            <Text>
              Mobile: {PRIMARY_PHONE_DISPLAY.replace("+91 ", "")} / {SECONDARY_MOBILE_DISPLAY.replace("+91 ", "")}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", paddingHorizontal: 8, paddingTop: 2 }}>
            <Text>Phone: {LANDLINE_DISPLAY}</Text>
          </View>

          <View style={styles.brandRow}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={logoPath} style={styles.logo} />
            <Text style={styles.brandName}>HAMZA Residency Plaza</Text>
          </View>

          <View style={styles.addressBlock}>
            <Text>{ADDRESS_LINE_1}</Text>
            <Text>{ADDRESS_LINE_2}</Text>
            <Text>
              email. {EMAIL}  {WEBSITE}
            </Text>
          </View>

          <View style={styles.billMetaRow}>
            <Text>No. {invoiceNumber}</Text>
            <Text style={styles.billTitle}>CASH BILL</Text>
            <Text>Date: {issueDate}</Text>
          </View>

          <View style={styles.toRow}>
            <Text>To: {guestName}</Text>
          </View>

          <View style={styles.tableHeaderRow}>
            <Text style={[styles.particularsCol, styles.headerCellText, { textAlign: "left" }]}>Particulars</Text>
            <Text style={[styles.amountCol, styles.headerCellText]}>Amount</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.particularsCol}>Room(s): {roomsLabel}</Text>
            <Text style={styles.amountCol}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.particularsCol}>Check IN Date &amp; Time: {checkInDisplay}</Text>
            <Text style={styles.amountCol}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.particularsCol}>Check Out Date &amp; Time: {checkOutDisplay}</Text>
            <Text style={styles.amountCol}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.particularsCol}>Days: {days}</Text>
            <Text style={styles.amountCol}></Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.particularsCol}>Advance Paid Rs.: {currency(advancePaid)}</Text>
            <Text style={styles.amountCol}></Text>
          </View>
          <View style={[styles.tableRow, { minHeight: 60 }]}>
            <Text style={styles.particularsCol}>Room Rent Rs.</Text>
            <Text style={styles.amountCol}>{currency(grandTotal)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={[styles.particularsCol, styles.headerCellText, { textAlign: "right" }]}>Total</Text>
            <Text style={[styles.amountCol, styles.headerCellText]}>{currency(grandTotal)}</Text>
          </View>

          <View style={styles.footerRow}>
            <Text>Signature of Guest</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>for Hamza Residency Plaza</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
