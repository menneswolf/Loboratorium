import { getSettings } from "@/lib/settings";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-bold sm:text-3xl">Settings</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Store, tax and shipping configuration.
      </p>
      <SettingsForm initial={settings} />
    </div>
  );
}
