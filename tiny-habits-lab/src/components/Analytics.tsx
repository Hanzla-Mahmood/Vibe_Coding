
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Star, TrendingUp } from 'lucide-react';

const Analytics = () => {
  const [myHabits, setMyHabits] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load habits
    const saved = localStorage.getItem('myHabits');
    if (saved) {
      setMyHabits(JSON.parse(saved));
    }

    // Generate week data
    const week = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toDateString();

      const completions = localStorage.getItem(`completions-${dateStr}`);
      const dayData = completions ? JSON.parse(completions) : {};

      week.push({
        date: dateStr,
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        completions: dayData,
        total: Object.values(dayData).filter(Boolean).length
      });
    }

    setWeekData(week);
  }, []);

  const getBestDay = () => {
    if (weekData.length === 0) return 'N/A';
    const sorted = [...weekData].sort((a, b) => b.total - a.total);
    return sorted[0]?.day || 'N/A';
  };

  const getTotalCompletions = () => {
    return weekData.reduce((sum, day) => sum + day.total, 0);
  };

  const getMostConsistentHabit = () => {
    if (myHabits.length === 0) return 'N/A';

    const habitCounts = {};
    myHabits.forEach(habit => {
      habitCounts[habit.id] = 0;
      weekData.forEach(day => {
        if (day.completions[habit.id]) {
          habitCounts[habit.id]++;
        }
      });
    });

    const topHabitId = Object.keys(habitCounts).reduce((a, b) =>
      habitCounts[a] > habitCounts[b] ? a : b
    );

    const topHabit = myHabits.find(h => h.id.toString() === topHabitId);
    return topHabit ? topHabit.title : 'N/A';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-white/20 z-10">
        <div className="flex items-center gap-4 p-6">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="sm"
            className="rounded-full p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Insights
            </h1>
            <p className="text-gray-600 text-sm">Past 7 days</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Weekly Heatmap */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-500" />
            Weekly Progress
          </h3>

          <div className="grid grid-cols-7 gap-2">
            {weekData.map((day, index) => {
              const intensity = myHabits.length > 0 ? day.total / myHabits.length : 0;
              return (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                  <div
                    className={`w-full h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                      intensity === 0 ? 'bg-gray-100 text-gray-400' :
                      intensity < 0.5 ? 'bg-purple-200 text-purple-700' :
                      intensity < 1 ? 'bg-purple-400 text-white' :
                      'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    }`}
                  >
                    {day.total}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 border-0 rounded-2xl">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">{getTotalCompletions()}</div>
              <div className="text-sm text-green-600">Total completions</div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-yellow-100 to-orange-100 border-0 rounded-2xl">
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-800">{getBestDay()}</div>
              <div className="text-sm text-yellow-600">Best day</div>
            </div>
          </Card>
        </div>

        {/* Most Consistent Habit */}
        <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-3xl">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Most Consistent Habit</h3>
          <div className="p-4 bg-white/50 rounded-2xl">
            <p className="text-purple-800 font-medium text-center">
              {getMostConsistentHabit()}
            </p>
          </div>
        </Card>

        {/* Insights */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                🌟 You're most consistent on {getBestDay()}s! Consider scheduling important habits then.
              </p>
            </div>

            {getTotalCompletions() > 10 && (
              <div className="p-3 bg-green-50 rounded-xl">
                <p className="text-sm text-green-800">
                  🚀 Amazing! You've completed {getTotalCompletions()} habits this week. You're building real momentum!
                </p>
              </div>
            )}

            {myHabits.length >= 3 && (
              <div className="p-3 bg-purple-50 rounded-xl">
                <p className="text-sm text-purple-800">
                  💡 With {myHabits.length} habits, you're creating a well-rounded routine. Keep it up!
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Recalibrate Button */}
        <div className="text-center pt-4">
          <Button
            onClick={() => navigate('/quiz')}
            variant="outline"
            className="rounded-full bg-white/50 hover:bg-white/80 border-purple-200"
          >
            <Star className="w-4 h-4 mr-2" />
            Recalibrate Habits
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
