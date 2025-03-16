import { RootLayout } from "@components/RootLayout";
import { Avatar } from "@components/ui/Avatar";
import { Button } from "@components/ui/Button";
import { Container } from "@components/ui/Container";
import { Footer } from "@components/ui/Footer";
import { Header } from "@components/ui/Header";
import { Input } from "@components/ui/Input";
import { Typography } from "@components/ui/Typography";
import { Bell } from "lucide-react";

export default function ComponentsShowcase() {
  return (
    <RootLayout>
        <section>
          <Typography variant="h4" className="mb-6">Typography</Typography>
          <div className="space-y-4">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="subtitle1">Subtitle 1</Typography>
            <Typography variant="subtitle2">Subtitle 2</Typography>
            <Typography variant="body1">Body 1 text</Typography>
            <Typography variant="body2">Body 2 text</Typography>
            <Typography variant="caption">Caption text</Typography>
            <Typography variant="overline">Overline text</Typography>
          </div>
        </section>

        <section>
          <Typography variant="h4" className="mb-6">Buttons</Typography>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="primary" size="sm">Small Button</Button>
            <Button variant="primary" size="lg">Large Button</Button>
            <Button variant="primary" disabled>Disabled Button</Button>
            <Button variant="primary">
              <Bell className="mr-2 h-4 w-4" />
              With Icon
            </Button>
          </div>
        </section>

        <section>
          <Typography variant="h4" className="mb-6">Inputs</Typography>
          <div className="space-y-4 max-w-md">
            <Input placeholder="Default input" />
            <Input placeholder="Disabled input" disabled />
            <Input placeholder="With error" error="This field is required" />
            <Input placeholder="With label" label="Email address" />
            <Input type="password" placeholder="Password input" />
          </div>
        </section>

        <section>
          <Typography variant="h4" className="mb-6">Avatar</Typography>
          <div className="flex flex-wrap gap-4 items-end">
            <Avatar size="xs" alt="User" />
            <Avatar size="sm" alt="User" />
            <Avatar size="md" alt="User" />
            <Avatar size="lg" alt="User" />
            <Avatar size="xl" alt="User" />
            <Avatar 
              size="md" 
              alt="User with status" 
              status="online"
              />
            <Avatar 
              size="md" 
              alt="User with image" 
              src="https://github.com/shadcn.png"
              />
          </div>
        </section>

        <section>
          <Typography variant="h4" className="mb-6">Header</Typography>
          <Header 
            logo={<div className="font-bold">Logo</div>}
            navigation={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ]}
            actions={
              <div className="flex items-center gap-2">
                <Button variant="primary">Sign In</Button>
              </div>
            }
          />
        </section>

        <section>
          <Typography variant="h4" className="mb-6">Footer</Typography>
          <Footer
            copyright="Your Company Name"
            navigation={[
              { label: "About", href: "/about" },
              { label: "Terms", href: "/terms" },
              { label: "Privacy", href: "/privacy" },
            ]}
            socials={[
              { icon: "github", href: "https://github.com" },
              { icon: "twitter", href: "https://twitter.com" },
            ]}
            >
            <div className="flex items-center gap-2">
              <div className="font-bold">Logo</div>
            </div>
          </Footer>
        </section>

        <section>
          <Typography variant="h4" className="mb-6">Container</Typography>
          <Container>
            <div className="bg-gray-100 p-4 text-center">
              <Typography>Content inside container</Typography>
            </div>
          </Container>
        </section>
    </RootLayout>
  );
}
