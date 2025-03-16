import { RootLayout } from "@components/layouts/RootLayout";
import { Alert } from "@components/ui/Alert";
import { Avatar } from "@components/ui/Avatar";
import { Badge } from "@components/ui/Badge";
import { Breadcrumbs } from "@components/ui/Breadcrumbs";
import { Button } from "@components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/Card";
import { Checkbox } from "@components/ui/Checkbox";
import { Container } from "@components/ui/Container";
import { EmptyState } from "@components/ui/EmptyState";
import { Footer } from "@components/ui/Footer";
import { Grid } from "@components/ui/Grid";
import { Header } from "@components/ui/Header";
import { Input } from "@components/ui/Input";
import { Link } from "@components/ui/Link";
import { ListCard } from "@components/ui/ListCard";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@components/ui/Modal";
import { Typography } from "@components/ui/Typography";
import { Bell } from "lucide-react";
import { useState } from "react";

function ComponentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Typography variant="h4" className="mb-6">
        {title}
      </Typography>
      {children}
    </section>
  );
}

export default function ComponentsShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <RootLayout>
      <ComponentSection title="Alert">
        <div className="flex flex-wrap gap-4 items-end">
          <Alert variant="info">Alert</Alert>
          <Alert variant="success">Alert</Alert>
          <Alert variant="warning">Alert</Alert>
          <Alert variant="error">Alert</Alert>
          <Alert variant="info" title="Alert Title">
            Alert
          </Alert>
        </div>
      </ComponentSection>
      <ComponentSection title="Avatar">
        <div className="flex flex-wrap gap-4 items-end">
          <Avatar size="xs" alt="User" />
          <Avatar size="sm" alt="User" />
          <Avatar size="md" alt="User" />
          <Avatar size="lg" alt="User" />
          <Avatar size="xl" alt="User" />
          <Avatar size="md" alt="User with status" status="online" />
          <Avatar
            size="md"
            alt="User with image"
            src="https://github.com/shadcn.png"
          />
        </div>
      </ComponentSection>
      <ComponentSection title="Badge">
        <div className="flex flex-wrap gap-4 items-end">
          <Badge variant="primary">Primary Badge</Badge>
          <Badge variant="secondary">Secondary Badge</Badge>
          <Badge variant="success">Success Badge</Badge>
          <Badge variant="error">Error Badge</Badge>
          <Badge variant="warning">Warning Badge</Badge>
          <Badge variant="info">Info Badge</Badge>
        </div>
      </ComponentSection>
      <ComponentSection title="Breadcrumbs">
        <div className="flex flex-wrap gap-4 items-end">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>
      </ComponentSection>
      <ComponentSection title="Buttons">
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            onClick={() => {
              alert("clicked");
            }}
          >
            Primary Button
          </Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="primary" size="sm">
            Small Button
          </Button>
          <Button variant="primary" size="lg">
            Large Button
          </Button>
          <Button variant="primary" disabled>
            Disabled Button
          </Button>
          <Button variant="primary">
            <Bell className="mr-2 h-4 w-4" />
            With Icon
          </Button>
        </div>
      </ComponentSection>
      <ComponentSection title="Card">
        <div className="flex flex-wrap gap-4 items-end">
          <Card>
            <CardHeader
              title="Card Title"
              subtitle="Card Subtitle"
              action={<Button variant="primary">Action</Button>}
            >
              <CardContent>
                <Typography>Card Content</Typography>
              </CardContent>
              <CardFooter>
                <Typography>Card Footer</Typography>
              </CardFooter>
            </CardHeader>
          </Card>
        </div>
      </ComponentSection>
      <ComponentSection title="Checkbox">
        <div className="flex flex-wrap gap-4 items-end">
          <Checkbox />
          <Checkbox checked onChange={() => {}} />
          <Checkbox disabled onChange={() => {}} />
          <Checkbox checked disabled onChange={() => {}} />
        </div>
      </ComponentSection>
      <ComponentSection title="Container">
        <Container>
          <div className="bg-gray-100 p-4 text-center">
            <Typography variant="body1" color="secondary">
              Content inside container
            </Typography>
          </div>
        </Container>
      </ComponentSection>
      <ComponentSection title="Empty State">
        <div className="flex flex-wrap gap-4 items-end">
          <EmptyState
            title="No data found"
            description="No data found in the database"
            action={<Button variant="primary">Add Data</Button>}
          />
        </div>
      </ComponentSection>
      <ComponentSection title="Footer">
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
      </ComponentSection>
      <ComponentSection title="Grid">
        <div className="flex flex-wrap gap-4 items-end">
          <Grid cols={12} gap={4} colsSm={6} colsMd={4} colsLg={3}>
            <Avatar size="xs" alt="User" />
            <Avatar size="sm" alt="User" />
            <Avatar size="md" alt="User" />
            <Avatar size="lg" alt="User" />
            <Avatar size="xl" alt="User" />
          </Grid>
        </div>
      </ComponentSection>
      <ComponentSection title="Header">
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
      </ComponentSection>
      <ComponentSection title="Inputs">
        <div className="space-y-4 max-w-md">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
          <Input placeholder="With error" error="This field is required" />
          <Input placeholder="With label" label="Email address" />
          <Input type="password" placeholder="Password input" />
        </div>
      </ComponentSection>
      <ComponentSection title="Link">
        <div className="flex flex-wrap gap-4 items-end">
          <Link to={"/components"}>Default Link</Link>
          <Link to={"/components"} variant="default">
            default
          </Link>
          <Link to={"/components"} variant="underline">
            underline
          </Link>
          <Link to={"/components"} variant="button">
            button
          </Link>
          <Link to={"/components"} disabled>
            Disabled Link
          </Link>
        </div>
      </ComponentSection>
      <ComponentSection title="ListCard">
        <div className="flex flex-wrap gap-4 items-end">
          <ListCard
            title="List Card Title"
            subtitle="List Card Description"
            action={<Button variant="primary">Action</Button>}
          />
        </div>
      </ComponentSection>
      <ComponentSection title="Modal">
        <div className="flex flex-wrap gap-4 items-end">
          <Button
            variant="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Open Modal
          </Button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalHeader
              title="Modal Title"
              subtitle="Modal Subtitle"
              onClose={() => setIsModalOpen(false)}
            />
            <ModalContent>
              <Typography>Modal Content</Typography>
            </ModalContent>
            <ModalFooter>
              <Button variant="primary">Save</Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </ComponentSection>
      <ComponentSection title="Typography">
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
      </ComponentSection>
    </RootLayout>
  );
}
