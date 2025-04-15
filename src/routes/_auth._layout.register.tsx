import { MetaFunction } from "@remix-run/react";
import { RegisterForm } from "src/widgets/auth/register-form";
export const meta: MetaFunction = () => {
  return [{ title: "Register" }, { name: "description", content: "Register" }];
};

export default function RegisterPage() {
  return <RegisterForm />;
}
