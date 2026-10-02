import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import useRippleEffect from './hooks/useRippleEffect';

function App() {
  useRippleEffect();

  return (
    <div className="App">
      <Header />
      <main>
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><Skills /></ErrorBoundary>
        <ErrorBoundary><Projects /></ErrorBoundary>
        <ErrorBoundary><Experience /></ErrorBoundary>
        <ErrorBoundary><Education /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;
