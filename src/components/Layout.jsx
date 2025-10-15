import { Outlet } from "react-router-dom";
import { HeaderActionsProvider, useHeaderActions } from "./HeaderActionsContext";

function AppHeader() {
  const { actions } = useHeaderActions();
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-gray-900">Picsum Photo Gallery</h1>
      <div>{actions}</div>
    </header>
  );
}

export default function Layout() {
  return (
    <HeaderActionsProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <AppHeader />
          <Outlet />
        </main>
      </div>
    </HeaderActionsProvider>
  );
}
