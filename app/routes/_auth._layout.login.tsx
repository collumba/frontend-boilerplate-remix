import { LoginForm } from "@app/components/login-form";
import { MetaFunction } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [{ title: "Login" }, { name: "description", content: "Login" }];
};

export default function IndexPage() {
  return <LoginForm />;
}
