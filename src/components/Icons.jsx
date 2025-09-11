import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Icon({ name, className }) {
  const IconComponent = FaIcons[name]; // ambil icon dari string
  console.log(name)
  if (!IconComponent) return null; // kalau icon tidak ada
  return <FontAwesomeIcon className={className} />;
}