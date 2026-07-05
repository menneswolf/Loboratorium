import type { Order, OrderItem } from "@prisma/client";

type OrderWithItems = Order & { items: OrderItem[] };

type SendcloudParcelResponse = {
  parcel?: {
    id?: number | string;
    tracking_number?: string;
    tracking_url?: string;
    label?: { label_printer?: string; normal_printer?: string };
    documents?: Array<{ type?: string; link?: string }>;
  };
};

export function isSendcloudConfigured(): boolean {
  return Boolean(process.env.SENDCLOUD_PUBLIC_KEY && process.env.SENDCLOUD_SECRET_KEY);
}

function countryCode(country: string): string {
  const normalized = country.trim().toLowerCase();
  const map: Record<string, string> = {
    belgium: "BE",
    belgie: "BE",
    belgique: "BE",
    be: "BE",
    netherlands: "NL",
    nederland: "NL",
    "pays-bas": "NL",
    nl: "NL",
    france: "FR",
    frankrijk: "FR",
    fr: "FR",
    germany: "DE",
    duitsland: "DE",
    allemagne: "DE",
    de: "DE",
  };
  return map[normalized] ?? country.trim().slice(0, 2).toUpperCase();
}

function labelUrl(parcel: NonNullable<SendcloudParcelResponse["parcel"]>): string | null {
  return (
    parcel.label?.normal_printer ??
    parcel.label?.label_printer ??
    parcel.documents?.find((doc) => doc.type === "label")?.link ??
    null
  );
}

export async function createSendcloudParcel(order: OrderWithItems) {
  if (!isSendcloudConfigured()) return null;
  if (order.sendcloudParcelId) return null;

  const publicKey = process.env.SENDCLOUD_PUBLIC_KEY!;
  const secretKey = process.env.SENDCLOUD_SECRET_KEY!;
  const auth = Buffer.from(`${publicKey}:${secretKey}`).toString("base64");

  const payload = {
    parcel: {
      name: order.name,
      company_name: "",
      email: order.email,
      telephone: "",
      address: order.address,
      house_number: order.houseNumber || "1",
      city: order.city,
      postal_code: order.postalCode,
      country: countryCode(order.country),
      order_number: order.ref,
      request_label: true,
      shipment: process.env.SENDCLOUD_SHIPPING_METHOD_ID
        ? { id: Number(process.env.SENDCLOUD_SHIPPING_METHOD_ID) }
        : undefined,
      customs_shipment_type: 2,
      parcel_items: order.items.map((item) => ({
        description: item.name,
        quantity: item.qty,
        value: item.price.toFixed(2),
        weight: "0.2",
      })),
      sender_address: {
        name: process.env.SENDCLOUD_FROM_NAME || process.env.SENDCLOUD_FROM_COMPANY || "Loboratorium",
        company_name: process.env.SENDCLOUD_FROM_COMPANY || "",
        address: process.env.SENDCLOUD_FROM_ADDRESS || "",
        house_number: process.env.SENDCLOUD_FROM_HOUSE_NUMBER || "",
        city: process.env.SENDCLOUD_FROM_CITY || "",
        postal_code: process.env.SENDCLOUD_FROM_POSTAL_CODE || "",
        country: process.env.SENDCLOUD_FROM_COUNTRY || "BE",
      },
    },
  };

  const response = await fetch("https://panel.sendcloud.sc/api/v2/parcels", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as SendcloudParcelResponse | null;
  if (!response.ok || !data?.parcel) {
    throw new Error(`Sendcloud parcel creation failed (${response.status})`);
  }

  const parcel = data.parcel;
  return {
    sendcloudParcelId: parcel.id ? String(parcel.id) : null,
    trackingNumber: parcel.tracking_number ?? null,
    trackingUrl: parcel.tracking_url ?? null,
    labelUrl: labelUrl(parcel),
  };
}
