
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Calendar, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HabitDashboard = () => {
  const [myHabits, setMyHabits] = useState([]);
  const [completedToday, setCompletedToday] = useState({});
  const [currentView, setCurrentView] = useState('today');
  const navigate = useNavigate();

  useEffect(() => {
    // Load habits from localStorage
    const saved = localStorage.getItem('myHabits');
    if (saved) {
      setMyHabits(JSON.parse(saved));
    }

    // Load today's completions
    const today = new Date().toDateString();
    const todayData = localStorage.getItem(`completions-${today}`);
    if (todayData) {
      setCompletedToday(JSON.parse(todayData));
    }
  }, []);

  const toggleHabit = (habitId) => {
    const today = new Date().toDateString();
    const newCompletions = {
      ...completedToday,
      [habitId]: !completedToday[habitId]
    };

    setCompletedToday(newCompletions);
    localStorage.setItem(`completions-${today}`, JSON.stringify(newCompletions));

    if (newCompletions[habitId]) {
      toast({
        title: "Great job! 🎉",
        description: "Habit completed! Keep the momentum going.",
      });
    }
  };

  const getStreak = (habitId) => {
    // Simple streak calculation - count consecutive days
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toDateString();

      const dayData = localStorage.getItem(`completions-${dateStr}`);
      if (dayData) {
        const completions = JSON.parse(dayData);
        if (completions[habitId]) {
          streak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return streak;
  };

  const getCompletionRate = () => {
    if (myHabits.length === 0) return 0;
    const completed = Object.values(completedToday).filter(Boolean).length;
    return Math.round((completed / myHabits.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-white/20 z-10">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/discover')}
              variant="ghost"
              size="sm"
              className="rounded-full p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Habits
              </h1>
              <p className="text-gray-600 text-sm">{getCompletionRate()}% complete today</p>
            </div>
          </div>

          <Button
            onClick={() => navigate('/discover')}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {/* View Tabs */}
        <div className="flex gap-1 px-6 pb-4">
          {['today', 'week', 'all'].map((view) => (
            <Button
              key={view}
              onClick={() => setCurrentView(view)}
              variant={currentView === view ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-full capitalize ${
                currentView === view
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-600'
              }`}
            >
              {view}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Progress Overview */}
        {currentView === 'today' && (
          <Card className="p-6 mb-6 bg-gradient-to-br from-purple-100 to-pink-100 border-0 rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Today's Progress</h3>
                <p className="text-gray-600 text-sm">
                  {Object.values(completedToday).filter(Boolean).length} of {myHabits.length} habits
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {getCompletionRate()}%
                </div>
                <div className="text-sm text-gray-600">complete</div>
              </div>
            </div>
          </Card>
        )}

        {/* Habits List */}
        <div className="space-y-4 max-w-md mx-auto">
          {myHabits.length === 0 ? (
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Start your habit journey!</h3>
              <p className="text-gray-600 mb-6">
                Discover personalized micro-habits that fit your lifestyle.
              </p>
              <Button
                onClick={() => navigate('/discover')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-8"
              >
                <Plus className="w-4 h-4 mr-2" />
                Discover Habits
              </Button>
            </Card>
          ) : (
            myHabits.map((habit) => {
              const isCompleted = completedToday[habit.id];
              const streak = getStreak(habit.id);

              return (
                <Card
                  key={habit.id}
                  className={`p-6 border-0 shadow-lg rounded-3xl transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-green-100 to-emerald-100 scale-102'
                      : 'bg-white/80 backdrop-blur-sm hover:bg-white/90'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Emoji */}
                    <div className="text-3xl">{habit.emoji}</div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg leading-tight ${
                        isCompleted ? 'text-green-800 line-through' : 'text-gray-800'
                      }`}>
                        {habit.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{habit.description}</p>

                      {/* Streak */}
                      {streak > 0 && (
                        <div className="flex items-center mt-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-yellow-700 font-medium">
                            {streak} day streak!
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Toggle */}
                    <div className="flex flex-col items-center gap-2">
                      <Switch
                        checked={isCompleted}
                        onCheckedChange={() => toggleHabit(habit.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      {isCompleted && (
                        <span className="text-xs text-green-600 font-medium">Done!</span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Quick Stats */}
        {myHabits.length > 0 && currentView === 'today' && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => navigate('/analytics')}
              variant="outline"
              className="rounded-full bg-white/50 hover:bg-white/80 border-purple-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitDashboard;
