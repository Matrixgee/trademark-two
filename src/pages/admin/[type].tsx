
import { useRouter } from "next/router";
import AuthForms from "../(components)/AUTH/AuthForms";
import AdminAuthForms from "../(components)/AUTH/AdminAuthForms";

export default function AuthPage() {
  const router = useRouter();
  const { type } = router.query;

  if (!type) return null;

  if (type !== "login" && type !== "register") {
    router.replace("/admin/login");
    return null;
  }

  return <AdminAuthForms />;
}
