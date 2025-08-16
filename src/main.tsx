
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Import CSS files directly
import './styles/main.css'
import './styles/common.css'
import './styles/pages.css'
import './styles/navbar.css'
import './components/maps/Maps.css'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

createRoot(document.getElementById("root")!).render(<App />);
