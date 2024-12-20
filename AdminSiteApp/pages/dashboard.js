import Layout from "../components/Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef, useState } from "react";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const ordersChartRef = useRef(null);
  const salesChartRef = useRef(null);
  const chartInstances = useRef({ orders: null, sales: null });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) throw new Error("Nie udało się pobrać danych o zamówieniach");
        setOrders(await response.json());
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const groupedOrders = orders.reduce((acc, { createdAt, totalPrice }) => {
        const date = createdAt.slice(0, 10); // Format as YYYY-MM-DD
        acc[date] = acc[date] || { count: 0, sales: 0 };
        acc[date].count += 1;
        acc[date].sales += totalPrice;
        return acc;
      }, {});

      const chartLabels = Object.keys(groupedOrders);
      const orderCounts = chartLabels.map(date => groupedOrders[date].count);
      const totalSales = chartLabels.map(date => groupedOrders[date].sales);

      // Destroy previous chart instances if they exist
      Object.values(chartInstances.current).forEach(instance => instance?.destroy());

      const createChart = (ref, data, label, color) => new ChartJS(ref.current.getContext("2d"), {
        type: "bar",
        data: { labels: chartLabels, datasets: [{ label, data, backgroundColor: color, borderColor: color, borderWidth: 1 }] },
        options: { responsive: true, plugins: { legend: { position: "top" } } },
      });

      chartInstances.current.orders = createChart(ordersChartRef, orderCounts, "Liczba zamówień", "rgba(75, 192, 192, 0.6)");
      chartInstances.current.sales = createChart(salesChartRef, totalSales, "Sprzedaż (PLN)", "rgba(255, 99, 132, 0.6)");
    }
  }, [orders]);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Statystyki Zamówień:</h2>
      {error ? <p className="text-red-500">Błąd: {error}</p> : orders.length === 0 ? <p>Ładowanie danych...</p> : (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-semibold">Liczba zamówień dziennie:</h3>
            <canvas ref={ordersChartRef}></canvas>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Sprzedaż dziennie (PLN):</h3>
            <canvas ref={salesChartRef}></canvas>
          </div>
        </>
      )}
    </Layout>
  );
}
