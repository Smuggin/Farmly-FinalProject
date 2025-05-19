import ProductsDashboard from "./ProductsDashboard";

const renderContent = (action: string) => {
  switch (action) {
    case "products":
      return <ProductsDashboard />;
    case "settings":
      // return <SettingsDashboard />;
    default:
      return <div>Unknown action: {action}</div>;
  }
};

export default function ActionPage({ params }: { params: { action: string } }) {
  const action = params.action;

  return (
    <div>
      {renderContent(action)}
    </div>
  );
}
