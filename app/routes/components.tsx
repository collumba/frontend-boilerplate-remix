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
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@components/ui/Modal";
import { Select } from "@components/ui/Select";
import { Skeleton } from "@components/ui/Skeleton";
import { Slider } from "@components/ui/Slider";
import { Spinner } from "@components/ui/Spinner";
import { Switch } from "@components/ui/Switch";
import { Table } from "@components/ui/Table";
import { Tabs } from "@components/ui/Tabs";
import { Toast, useToast } from "@components/ui/Toast";
import { Tooltip } from "@components/ui/Tooltip";
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
    <section className="mb-6 bg-secondary-900 rounded-lg p-4">
      <Typography variant="h4" className="mb-6">
        {title}
      </Typography>
      <div className="bg-secondary-900 rounded-lg p-4">{children}</div>
    </section>
  );
}

export default function ComponentsShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<ModalProps["size"]>("md");
  const { show } = useToast();

  return (
    <RootLayout>
      <ComponentSection title="Alert">
        <div className="flex flex-wrap gap-4 items-end">
          <Alert icon={<Bell />} variant="info" onClose={() => {}}>
            Alert
          </Alert>
          <Alert icon={<Bell />} variant="success" onClose={() => {}}>
            Alert
          </Alert>
          <Alert variant="warning" onClose={() => {}}>
            Alert
          </Alert>
          <Alert variant="error" onClose={() => {}}>
            Alert
          </Alert>
          <Alert variant="info" title="Alert Title" onClose={() => {}}>
            Alert
          </Alert>
        </div>
      </ComponentSection>
      <ComponentSection title="Avatar">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 items-end">
            <Avatar size="xs" alt="User" status="online" />
            <Avatar size="sm" alt="User" status="offline" />
            <Avatar size="md" alt="User" status="away" />
            <Avatar size="lg" alt="User" status="busy" />
            <Avatar size="xl" alt="User" status="online" />
            <Avatar size="md" alt="User with status" status="online" />
            <Avatar
              size="md"
              alt="User with image"
              src="https://github.com/shadcn.png"
            />
          </div>
          <div className="flex flex-wrap gap-4 items-end">
            <Avatar size="xs" alt="User" variant="square" />
            <Avatar size="sm" alt="User" variant="square" />
            <Avatar size="md" alt="User" variant="square" />
            <Avatar size="lg" alt="User" variant="square" />
            <Avatar size="xl" alt="User" variant="square" />
            <Avatar
              size="md"
              alt="User with status"
              status="online"
              variant="square"
            />
            <Avatar
              size="md"
              alt="User with image"
              src="https://github.com/shadcn.png"
              variant="square"
            />
            <Avatar
              size="md"
              alt="User with status"
              status="online"
              variant="square"
              fallback="FB"
            />
          </div>
        </div>
      </ComponentSection>
      <ComponentSection title="Badge">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 items-end">
            <Badge variant="primary" size="sm">
              Primary Badge
            </Badge>
            <Badge variant="secondary" size="sm" isOutline>
              Secondary Badge
            </Badge>
            <Badge variant="success" size="sm">
              Success Badge
            </Badge>
            <Badge variant="error" size="sm">
              Error Badge
            </Badge>
            <Badge variant="warning" size="sm">
              Warning Badge
            </Badge>
            <Badge variant="info" size="sm">
              Info Badge
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 items-end">
            <Badge variant="primary" size="md" isOutline>
              Primary Badge
            </Badge>
            <Badge variant="secondary" size="md">
              Secondary Badge
            </Badge>
            <Badge variant="success" size="md">
              Success Badge
            </Badge>
            <Badge variant="error" size="md">
              Error Badge
            </Badge>
            <Badge variant="warning" size="md">
              Warning Badge
            </Badge>
            <Badge variant="info" size="md">
              Info Badge
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4 items-end">
            <Badge variant="primary" size="lg">
              Primary Badge
            </Badge>
            <Badge variant="secondary" size="lg">
              Secondary Badge
            </Badge>
            <Badge variant="success" size="lg" isOutline>
              Success Badge
            </Badge>
            <Badge variant="error" size="lg">
              Error Badge
            </Badge>
            <Badge variant="warning" size="lg">
              Warning Badge
            </Badge>
            <Badge variant="info" size="lg">
              Info Badge
            </Badge>
          </div>
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
          <Button variant="primary" isLoading>
            Loading
          </Button>
        </div>
      </ComponentSection>
      <ComponentSection title="Card">
        <div className="flex flex-wrap gap-4 items-end">
          <Card variant="default">
            <CardHeader title="Card Title" subtitle="Card Subtitle" />
            <CardContent>
              <Typography>Card Content</Typography>
              <Badge variant="primary" size="sm">
                Badge
              </Badge>
            </CardContent>
            <CardFooter>
              <Typography>Card Footer</Typography>
            </CardFooter>
          </Card>
          <Card variant="bordered">
            <CardHeader
              title="Card Title"
              subtitle="Card Subtitle"
              action={<Button variant="primary">Action</Button>}
            ></CardHeader>
            <CardContent>
              <Typography>Card Content</Typography>
            </CardContent>
            <CardFooter>
              <Typography>Card Footer</Typography>
            </CardFooter>
          </Card>
          <Card variant="elevated">
            <CardHeader
              title="Card Title"
              subtitle="Card Subtitle"
              action={<Button variant="primary">Action</Button>}
            ></CardHeader>
            <CardContent>
              <Typography>Card Content</Typography>
            </CardContent>
            <CardFooter>
              <Typography>Card Footer</Typography>
            </CardFooter>
          </Card>
        </div>
      </ComponentSection>
      <ComponentSection title="Checkbox">
        <div className="flex flex-wrap gap-4 items-end">
          <Checkbox id="checkbox-1" label="Checkbox" onChange={() => {}} />
          <Checkbox id="checkbox-2" checked onChange={() => {}} />
          <Checkbox id="checkbox-3" disabled onChange={() => {}} />
          <Checkbox id="checkbox-4" checked disabled onChange={() => {}} />
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
          <EmptyState
            title="No data found"
            description="No data found in the database"
            icon={<Bell />}
            action={<Button variant="primary">Add Data</Button>}
          />
          <EmptyState
            title="No data found"
            description="No data found in the database"
            action={
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Add Data</Button>
                <Button variant="secondary">Add Data</Button>
              </div>
            }
          />
          <EmptyState.Search query="Search query" />
          <EmptyState.NoData />
          <EmptyState.Error error="Error message" />
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
          <Input label="Default input" placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
          <Input placeholder="With error" error="This field is required" />
          <Input placeholder="With label" label="Email address" />
          <Input type="password" placeholder="Password input" />
          <Input
            startIcon={<Bell />}
            endIcon={<Bell />}
            placeholder="With start and end icon"
            helperText="Helper text"
          />
        </div>
      </ComponentSection>
      <ComponentSection title="Link">
        <div className="flex flex-wrap gap-4 items-end">
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
            disabled
          </Link>
          <Link to={"/components"} icon={<Bell />}>
            with icon
          </Link>
          <Link to={"/components"} icon={<Bell />} iconPosition="left">
            with icon left
          </Link>
          <Link to={"/components"} icon={<Bell />} iconPosition="right">
            with icon right
          </Link>
        </div>
      </ComponentSection>
      <ComponentSection title="Modal">
        <div className="flex flex-wrap gap-4 items-end">
          <Select
            options={[
              { label: "small", value: "sm" },
              { label: "medium", value: "md" },
              { label: "large", value: "lg" },
              { label: "full", value: "full" },
            ]}
            onChange={(value) => {
              setModalSize((value.target.value as ModalProps["size"]) || "md");
            }}
          />
          <Button
            variant="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Open Modal
          </Button>
          <Modal
            size={modalSize}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
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
      <ComponentSection title="Select">
        <Select
          options={[
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Cherry", value: "cherry" },
          ]}
        />
      </ComponentSection>
      <ComponentSection title="Skeleton">
        <div className="flex flex-wrap gap-4 items-end">
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" height={40} width={40} />
          <Skeleton variant="circular" height={40} width={40} />
          <Skeleton.Card />
          <Skeleton.Rectangle height={80} width={80} />
        </div>
      </ComponentSection>
      <ComponentSection title="Slider">
        <Slider />
        <Slider min={0} max={100} step={1} value={50} />
        <Slider min={0} max={100} step={1} value={50} showTooltip />
        <Slider
          min={0}
          max={100}
          step={5}
          value={50}
          showTooltip
          formatTooltip={(value) => `${value}%`}
        />
        <Slider label="Slider" size="sm" disabled />
        <Slider label="Slider" size="md" />
        <Slider label="Slider" size="lg" />
      </ComponentSection>
      <ComponentSection title="Spinner">
        <div className="flex flex-wrap gap-4 items-end">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </ComponentSection>
      <ComponentSection title="Switch">
        <div className="flex flex-wrap gap-4 items-end">
          <Switch checked />
          <Switch disabled />
          <Switch checked disabled />
          <Switch label="Switch" checked />
          <Switch helperText="Switch" disabled />
          <Switch error="Switch" checked disabled />
        </div>
      </ComponentSection>
      <ComponentSection title="Table">
        <Table
          columns={[
            { header: "Name", key: "name", sortable: true },
            { header: "Email", key: "email", sortable: true },
            { header: "Phone", key: "phone", sortable: true },
          ]}
          data={[
            {
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "1234567890",
              status: "active",
            },
            {
              name: "Jane Smith",
              email: "jane.smith@example.com",
              phone: "1234567890",
              status: "inactive",
            },
            {
              name: "Jim Beam",
              email: "jim.beam@example.com",
              phone: "1234567890",
            },
          ]}
          emptyMessage="No data found"
          pageSize={2}
          currentPage={1}
          onPageChange={(page) => {
            console.log(page);
          }}
        />
      </ComponentSection>
      <ComponentSection title="Tabs">
        <div className="flex flex-wrap gap-4 items-end">
          <Tabs
            tabs={[
              {
                id: "tab-1",
                label: "Tab 1",
                icon: <Bell />,
                disabled: false,
              },
              {
                id: "tab-2",
                label: "Tab 2",
                icon: <Bell />,
                disabled: false,
              },
            ]}
            activeTab="Tab 1"
            onTabChange={(tab) => {
              console.log(tab);
            }}
          />
          <Tabs
            variant="pills"
            tabs={[
              {
                id: "tab-1",
                label: "Tab 1",
                icon: <Bell />,
                disabled: false,
              },
              {
                id: "tab-2",
                label: "Tab 2",
                icon: <Bell />,
                disabled: false,
              },
            ]}
            activeTab="Tab 1"
            onTabChange={(tab) => {
              console.log(tab);
            }}
          />
          <Tabs
            variant="underline"
            tabs={[
              {
                id: "tab-1",
                label: "Tab 1",
                icon: <Bell />,
                disabled: false,
              },
              {
                id: "tab-2",
                label: "Tab 2",
                icon: <Bell />,
                disabled: false,
              },
            ]}
            activeTab="Tab 1"
            onTabChange={(tab) => {
              console.log(tab);
            }}
          />
          <Tabs
            tabs={[
              {
                id: "tab-1",
                label: "Tab 1",
                icon: <Bell />,
                disabled: false,
              },
              {
                id: "tab-2",
                label: "Tab 2",
                icon: <Bell />,
                disabled: false,
              },
            ]}
            activeTab="Tab 1"
            onTabChange={(tab) => {
              console.log(tab);
            }}
            vertical
          />
        </div>
      </ComponentSection>
      <ComponentSection title="Toast">
        <Toast
          variant="success"
          title="Toast Title"
          description="Toast Description"
          position="top-right"
          action={<Button variant="primary">Action</Button>}
        />
        <div className="flex flex-wrap gap-4 items-end">
          <Button
            onClick={() => {
              show({
                variant: "success",
                title: "Toast Title",
                description: "Toast Description",
                position: "bottom-right",
                action: <Button variant="primary">Action</Button>,
              });
            }}
          >
            Show Toast Success
          </Button>
          <Button
            onClick={() => {
              show({
                variant: "error",
                title: "Toast Title",
                description: "Toast Description",
                position: "bottom-right",
                action: <Button variant="primary">Action</Button>,
              });
            }}
          >
            Show Toast Error
          </Button>
          <Button
            onClick={() => {
              show({
                variant: "warning",
                title: "Toast Title",
                description: "Toast Description",
                position: "bottom-right",
                action: <Button variant="primary">Action</Button>,
              });
            }}
          >
            Show Toast Warning
          </Button>
          <Button
            onClick={() => {
              show({
                variant: "info",
                title: "Toast Title",
                position: "bottom-right",
                action: <Button variant="primary">Action</Button>,
              });
            }}
          >
            Show Toast Info
          </Button>
        </div>
      </ComponentSection>
      <ComponentSection title="Tooltip">
        <div className="flex flex-wrap gap-4 items-end">
          <Tooltip content="Tooltip Content" position="top">
            <Button variant="primary">Hover me top</Button>
          </Tooltip>
          <Tooltip content="Tooltip Content" position="left">
            <Button variant="primary">Hover me left</Button>
          </Tooltip>
          <Tooltip content="Tooltip Content" position="right">
            <Button variant="primary">Hover me right</Button>
          </Tooltip>
          <Tooltip content="Tooltip Content" position="bottom">
            <Button variant="primary">Hover me bottom</Button>
          </Tooltip>
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
