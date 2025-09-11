import Card from "../components/Card";

export default function HomePage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card title="Dashboard" description="Ringkasan singkat data" />
      <Card title="Tracker" description="Lihat detail progress" />
      <Card title="Settings" description="Atur preferensi aplikasi" />
    </div>
  );
}