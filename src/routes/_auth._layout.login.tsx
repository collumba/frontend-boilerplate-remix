import { MetaFunction } from "@remix-run/react";
import { LoginForm } from "src/widgets/auth/login-form";
export const meta: MetaFunction = () => {
  return [{ title: "Login" }, { name: "description", content: "Login" }];
};

export default function IndexPage() {
  return <LoginForm />;
}
