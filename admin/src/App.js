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
        <h1 className="dashboard-title">NeighbourNet</h1>
        <div className="dashboard-cards">
          <Card title="Users" value="$2,454"  color="text-red-500" />
          <Card title="Products" value="$6,982"  color="text-green-500" />
          <Card title="Complaints" value="$8,310"  color="text-green-500" />
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
