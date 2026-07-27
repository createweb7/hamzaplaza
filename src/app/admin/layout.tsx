import { AdminChrome } from "@/components/admin/AdminChrome";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  const { data: staffProfile } = await supabase
    .from("staff_profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const userLabel = staffProfile
    ? `${staffProfile.full_name} · ${staffProfile.role}`
    : `${user.email} · no staff profile assigned yet`;

  return (
    <AdminChrome userLabel={userLabel} signOutButton={<SignOutButton />}>
      {children}
    </AdminChrome>
  );
}
