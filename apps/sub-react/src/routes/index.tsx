import '../App.css';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="content">
      <h1>Rsbuild</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

