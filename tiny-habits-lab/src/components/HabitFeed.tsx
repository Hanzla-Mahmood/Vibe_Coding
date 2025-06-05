
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Settings, Heart, Star, ArrowDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HabitFeed = () => {
  const [suggestedHabits, setSuggestedHabits] = useState([]);
  const [expandedHabit, setExpandedHabit] = useState(null);
  const [myHabits, setMyHabits] = useState([]);
  const navigate = useNavigate();

  // Sample habit suggestions based on personality
  const habitSuggestions = [
    {
      id: 1,
      title: "Stand on one leg while brushing teeth",
      emoji: "🦵",
      description: "A playful way to improve balance",
      science: "Single-leg stands activate your core and improve proprioception, enhancing overall balance and reducing fall risk by up to 37%.",
      category: "Physical"
    },
    {
      id: 2,
      title: "Take a 3-minute doodle break after lunch",
      emoji: "🎨",
      description: "Boost creativity and mental clarity",
      science: "Creative activities like doodling activate the default mode network in your brain, improving problem-solving and reducing stress hormones.",
      category: "Mental"
    },
    {
      id: 3,
      title: "Send a gratitude text on Thursdays",
      emoji: "💌",
      description: "Spread joy and strengthen connections",
      science: "Expressing gratitude releases dopamine and strengthens social bonds, with studies showing 25% improvement in relationship satisfaction.",
      category: "Social"
    },
    {
      id: 4,
      title: "Do 5 deep breaths before coffee",
      emoji: "☕",
      description: "Start your day centered",
      science: "Deep breathing activates the parasympathetic nervous system, reducing cortisol levels and improving focus for the day ahead.",
      category: "Mindfulness"
    },
    {
      id: 5,
      title: "Name 3 things you can see, hear, and feel",
      emoji: "👁️",
      description: "Ground yourself in the present",
      science: "The 5-4-3-2-1 grounding technique reduces anxiety by engaging your senses and interrupting negative thought patterns.",
      category: "Mindfulness"
    }
  ];

  useEffect(() => {
    // Load random habits based on user personality
    const shuffled = [...habitSuggestions].sort(() => 0.5 - Math.random());
    setSuggestedHabits(shuffled.slice(0, 3));

    // Load existing habits from localStorage
    const saved = localStorage.getItem('myHabits');
    if (saved) {
      setMyHabits(JSON.parse(saved));
    }
  }, []);

  const addHabit = (habit) => {
    const newHabits = [...myHabits, { ...habit, addedAt: new Date().toISOString() }];
    setMyHabits(newHabits);
    localStorage.setItem('myHabits', JSON.stringify(newHabits));

    // Remove from suggestions
    setSuggestedHabits(prev => prev.filter(h => h.id !== habit.id));

    toast({
      title: "Habit added! 🎉",
      description: `"${habit.title}" is now in your dashboard`,
    });
  };

  const rejectHabit = (habitId) => {
    // Remove current habit and add a new random one
    setSuggestedHabits(prev => {
      const filtered = prev.filter(h => h.id !== habitId);
      const remaining = habitSuggestions.filter(h =>
        !filtered.some(fh => fh.id === h.id) &&
        !myHabits.some(mh => mh.id === h.id)
      );

      if (remaining.length > 0) {
        const randomHabit = remaining[Math.floor(Math.random() * remaining.length)];
        return [...filtered, randomHabit];
      }
      return filtered;
    });
  };

  const refreshSuggestions = () => {
    const available = habitSuggestions.filter(h =>
      !myHabits.some(mh => mh.id === h.id)
    );
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    setSuggestedHabits(shuffled.slice(0, 3));

    toast({
      title: "Fresh suggestions! ✨",
      description: "New habits tailored just for you",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-white/20 z-10">
        <div className="flex items-center justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Good morning! 🌞
            </h1>
            <p className="text-gray-600 text-sm">Ready to discover new habits?</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              My Habits
            </Button>
            <Button
              onClick={() => navigate('/settings')}
              variant="ghost"
              size="sm"
              className="rounded-full p-2"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Refresh Button */}
        <div className="text-center">
          <Button
            onClick={refreshSuggestions}
            variant="outline"
            className="rounded-full bg-white/50 hover:bg-white/80 border-purple-200"
          >
            <Star className="w-4 h-4 mr-2" />
            Suggest New Habits
          </Button>
        </div>

        {/* Habit Cards */}
        <div className="space-y-4 max-w-md mx-auto">
          {suggestedHabits.map((habit) => (
            <Card key={habit.id} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{habit.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">
                      {habit.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{habit.description}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {habit.category}
                    </span>
                  </div>
                </div>

                {/* Why it works - Expandable */}
                <Button
                  variant="ghost"
                  onClick={() => setExpandedHabit(expandedHabit === habit.id ? null : habit.id)}
                  className="w-full p-3 text-left rounded-xl bg-purple-50/50 hover:bg-purple-50 text-purple-700 font-medium"
                >
                  <div className="flex items-center justify-between">
                    <span>Why it works</span>
                    <ArrowDown className={`w-4 h-4 transition-transform ${expandedHabit === habit.id ? 'rotate-180' : ''}`} />
                  </div>
                </Button>

                {expandedHabit === habit.id && (
                  <div className="p-4 bg-purple-50/50 rounded-xl">
                    <p className="text-sm text-gray-700 leading-relaxed">{habit.science}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => addHabit(habit)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to My Habits
                  </Button>

                  <Button
                    onClick={() => rejectHabit(habit.id)}
                    variant="outline"
                    className="rounded-full px-6 hover:bg-gray-50"
                  >
                    Not for me
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {suggestedHabits.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">All caught up!</h3>
            <p className="text-gray-600 mb-6">You've seen all available suggestions.</p>
            <Button
              onClick={refreshSuggestions}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-8"
            >
              Get More Suggestions
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation Hint */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={() => navigate('/dashboard')}
          className="bg-white/90 backdrop-blur-sm text-gray-700 rounded-full px-6 shadow-lg hover:bg-white border-0"
        >
          <Heart className="w-4 h-4 mr-2 text-pink-500" />
          View My Habits ({myHabits.length})
        </Button>
      </div>
    </div>
  );
};

export default HabitFeed;
