import Sidebar from './components/Sidebar';
import Card from './components/Card';
import Chart from './components/Chart';
import Transactions from './components/Transactions';
import NewMembers from './components/Members';
import './App.css';

export default function App() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-cards">
          <Card title="Revenue" value="$2,454" change="-11.4%" color="text-red-500" />
          <Card title="Sales" value="$6,982" change="+8.2%" color="text-green-500" />
          <Card title="Costs" value="$8,310" change="+0.7%" color="text-green-500" />
        </div>
        <div className="dashboard-content">
          <Chart />
          <NewMembers />
        </div>
        <Transactions />
      </main>
    </div>
  );
}
