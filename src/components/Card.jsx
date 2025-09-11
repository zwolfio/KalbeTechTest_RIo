export default function Card({ title, description }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
