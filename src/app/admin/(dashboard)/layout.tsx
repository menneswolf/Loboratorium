import { AdminShell } from "@/components/admin/admin-shell";

// These pages read live data straight from the database on every request —
// never prerender/cache them statically.
export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
