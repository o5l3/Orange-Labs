import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RouteSeo from './RouteSeo';

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <RouteSeo />
      <Header />
      <main style={{ flex: 1, paddingTop: '64px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
