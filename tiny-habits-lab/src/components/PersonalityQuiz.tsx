
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PersonalityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const questions = [
    {
      id: 'focus',
      question: "What's your main focus right now?",
      options: [
        { value: 'mental-clarity', label: 'Mental Clarity', emoji: '🧠' },
        { value: 'energy', label: 'More Energy', emoji: '⚡' },
        { value: 'creativity', label: 'Creativity', emoji: '🎨' },
        { value: 'focus', label: 'Better Focus', emoji: '🎯' }
      ]
    },
    {
      id: 'timing',
      question: "When do you want to build new habits?",
      options: [
        { value: 'morning', label: 'Morning Person', emoji: '🌅' },
        { value: 'afternoon', label: 'Afternoon Boost', emoji: '☀️' },
        { value: 'evening', label: 'Evening Wind-down', emoji: '🌙' },
        { value: 'flexible', label: 'I\'m Flexible', emoji: '🔄' }
      ]
    },
    {
      id: 'personality',
      question: "Choose 3 words that describe you:",
      multiple: true,
      maxSelections: 3,
      options: [
        { value: 'playful', label: 'Playful', emoji: '🎈' },
        { value: 'analytical', label: 'Analytical', emoji: '📊' },
        { value: 'minimalist', label: 'Minimalist', emoji: '✨' },
        { value: 'social', label: 'Social', emoji: '👥' },
        { value: 'adventurous', label: 'Adventurous', emoji: '🌟' },
        { value: 'calm', label: 'Calm', emoji: '🧘' }
      ]
    },
    {
      id: 'busy-level',
      question: "How busy is your typical day?",
      options: [
        { value: 'very-busy', label: 'Super Packed', emoji: '🏃' },
        { value: 'moderately-busy', label: 'Moderately Busy', emoji: '⏰' },
        { value: 'balanced', label: 'Well Balanced', emoji: '⚖️' },
        { value: 'relaxed', label: 'Pretty Relaxed', emoji: '🛋️' }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (value) => {
    if (currentQ.multiple) {
      const current = answers[currentQ.id] || [];
      const maxSelections = currentQ.maxSelections || 3;

      if (current.includes(value)) {
        setAnswers({
          ...answers,
          [currentQ.id]: current.filter(v => v !== value)
        });
      } else if (current.length < maxSelections) {
        setAnswers({
          ...answers,
          [currentQ.id]: [...current, value]
        });
      }
    } else {
      setAnswers({
        ...answers,
        [currentQ.id]: value
      });
    }
  };

  const canProceed = () => {
    if (currentQ.multiple) {
      const selected = answers[currentQ.id] || [];
      return selected.length > 0;
    }
    return answers[currentQ.id];
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save answers to localStorage and navigate to habit feed
      localStorage.setItem('userPersonality', JSON.stringify(answers));
      navigate('/discover');
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={currentQuestion === 0 ? () => navigate('/') : prevQuestion}
          className="p-2 hover:bg-white/50 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-800">Getting to know you</h1>
          <p className="text-sm text-gray-600">{currentQuestion + 1} of {questions.length}</p>
        </div>

        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center leading-relaxed">
              {currentQ.question}
            </h2>

            {currentQ.multiple && (
              <p className="text-sm text-gray-600 text-center">
                Select up to {currentQ.maxSelections} options
              </p>
            )}

            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((option) => {
                const isSelected = currentQ.multiple
                  ? (answers[currentQ.id] || []).includes(option.value)
                  : answers[currentQ.id] === option.value;

                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleAnswer(option.value)}
                    className={`p-4 h-auto justify-start text-left rounded-xl transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 scale-105'
                        : 'bg-white/50 hover:bg-white/80 border-gray-200 hover:scale-102'
                    }`}
                  >
                    <span className="text-2xl mr-3">{option.emoji}</span>
                    <span className="font-medium">{option.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Next Button */}
        <div className="mt-8">
          <Button
            onClick={nextQuestion}
            disabled={!canProceed()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full py-6 text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:scale-100 hover:scale-105 shadow-lg"
          >
            {currentQuestion === questions.length - 1 ? 'Discover My Habits' : 'Continue'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalityQuiz;
