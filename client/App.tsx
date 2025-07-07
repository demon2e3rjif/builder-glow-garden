import { BrowserRouter, Routes, Route } from "react-router-dom";

// Test if basic React components work
function TestComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">EventHub</h1>
        <p className="text-xl">Multi-Actor Event Management Platform</p>
        <div className="mt-8 space-x-4">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestComponent />} />
        <Route path="*" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
  );
}
