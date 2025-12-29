
import { useRouter } from "next/router";
import AuthForms from "../(components)/AUTH/AuthForms";

export default function AuthPage() {
  const router = useRouter();
  const { type } = router.query;

  if (!type) return null;

  if (type !== "login" && type !== "register") {
    router.replace("/auth/login");
    return null;
  }

  return <AuthForms />;
}
