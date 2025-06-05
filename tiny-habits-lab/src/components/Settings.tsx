
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Bell, Moon, Sun, Trash2, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    reminderTime: '09:00',
    aiStyle: 'cheerful',
    darkMode: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));

    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    });
  };

  const exportData = () => {
    const habits = localStorage.getItem('myHabits') || '[]';
    const personality = localStorage.getItem('userPersonality') || '{}';

    const data = {
      habits: JSON.parse(habits),
      personality: JSON.parse(personality),
      settings: settings,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'habitual-curator-data.json';
    a.click();

    toast({
      title: "Data exported! 📁",
      description: "Your habits and settings have been downloaded.",
    });
  };

  const resetAllData = () => {
    if (window.confirm('Are you sure? This will delete all your habits and progress. This cannot be undone.')) {
      localStorage.clear();
      toast({
        title: "Data reset",
        description: "All data has been cleared. Starting fresh!",
      });
      navigate('/');
    }
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
              Settings
            </h1>
            <p className="text-gray-600 text-sm">Customize your experience</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Notifications */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-purple-500" />
            Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Daily Reminders</p>
                <p className="text-sm text-gray-600">Get nudged to check your habits</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(value) => updateSetting('notifications', value)}
              />
            </div>

            {settings.notifications && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reminder Time
                </label>
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => updateSetting('reminderTime', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-white/50"
                />
              </div>
            )}
          </div>
        </Card>

        {/* AI Style */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">AI Coach Style</h3>

          <div className="space-y-3">
            {[
              { value: 'cheerful', label: 'Cheerful & Encouraging', emoji: '😊' },
              { value: 'straightforward', label: 'Straightforward', emoji: '📋' },
              { value: 'playful', label: 'Playful Coach', emoji: '🎯' }
            ].map((style) => (
              <Button
                key={style.value}
                variant={settings.aiStyle === style.value ? 'default' : 'outline'}
                onClick={() => updateSetting('aiStyle', style.value)}
                className={`w-full p-4 justify-start rounded-xl ${
                  settings.aiStyle === style.value
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              >
                <span className="text-xl mr-3">{style.emoji}</span>
                {style.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Goals & Focus */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Personalization</h3>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/quiz')}
              variant="outline"
              className="w-full p-4 justify-start rounded-xl bg-white/50 hover:bg-white/80"
            >
              <span className="text-xl mr-3">🎯</span>
              Update Goals & Focus
            </Button>

            <Button
              onClick={() => navigate('/discover')}
              variant="outline"
              className="w-full p-4 justify-start rounded-xl bg-white/50 hover:bg-white/80"
            >
              <span className="text-xl mr-3">✨</span>
              Get Fresh Habit Suggestions
            </Button>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Data Management</h3>

          <div className="space-y-3">
            <Button
              onClick={exportData}
              variant="outline"
              className="w-full p-4 justify-start rounded-xl bg-blue-50 hover:bg-blue-100 border-blue-200"
            >
              <Download className="w-5 h-5 mr-3 text-blue-600" />
              <span className="text-blue-800">Export My Data</span>
            </Button>

            <Button
              onClick={resetAllData}
              variant="outline"
              className="w-full p-4 justify-start rounded-xl bg-red-50 hover:bg-red-100 border-red-200"
            >
              <Trash2 className="w-5 h-5 mr-3 text-red-600" />
              <span className="text-red-800">Reset All Data</span>
            </Button>
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg rounded-3xl">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Habitual Curator</h3>
            <p className="text-sm text-gray-600 mb-4">
              Small habits. Big shifts. ✨
            </p>
            <p className="text-xs text-gray-500">
              Made with love to help you build better habits
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
