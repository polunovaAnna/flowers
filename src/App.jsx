import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FlowersPage } from './pages/FlowersPage';
import { BouquetsPage } from './pages/BouquetsPage';
import { BuilderPage } from './pages/BuilderPage';
import { ContactsPage } from './pages/ContactsPage';

export function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="flowers" element={<FlowersPage />} />
          <Route path="bouquets" element={<BouquetsPage />} />
          <Route path="builder" element={<BuilderPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
  )
}

export default App;