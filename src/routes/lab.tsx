import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/lab")({
  component: LabLayout,
});

function LabLayout() {
  return <Outlet />;
}
