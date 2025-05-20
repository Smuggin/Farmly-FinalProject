import ProductsDashboard from "./ProductsDashboard";
import OrdersDashboard from "./OrdersDashboard";

const renderContent = (action: string) => {
  switch (action) {
    case "products":
      return <ProductsDashboard />;
    case "orders":
      return <OrdersDashboard />;
    default:
      return <div>Unknown action: {action}</div>;
  }
};

export default function ActionPage({
  params,
}: {
  params: { action: string };
}) {
  return <>{renderContent(params.action)}</>;
}
