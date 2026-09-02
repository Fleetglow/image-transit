import AdminShell from "@/components/admin-shell";
import { isAdmin } from "@/lib/auth";

export default async function AdminPage() {
  return <AdminShell authenticated={await isAdmin()} />;
}
