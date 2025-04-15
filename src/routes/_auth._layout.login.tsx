import { LoginForm } from "@app/widgets/auth/login-form";
import { MetaFunction } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [{ title: "Login" }, { name: "description", content: "Login" }];
};

export default function IndexPage() {
  return <LoginForm />;
}
