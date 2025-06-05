
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from '../components/Welcome';
import PersonalityQuiz from '../components/PersonalityQuiz';
import HabitFeed from '../components/HabitFeed';
import HabitDashboard from '../components/HabitDashboard';
import Analytics from '../components/Analytics';
import Settings from '../components/Settings';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/quiz" element={<PersonalityQuiz />} />
        <Route path="/discover" element={<HabitFeed />} />
        <Route path="/dashboard" element={<HabitDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default Index;
