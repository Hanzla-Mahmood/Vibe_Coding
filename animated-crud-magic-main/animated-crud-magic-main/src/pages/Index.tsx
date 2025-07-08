
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, ArrowDown, Database, Zap, Shield, Sparkles } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Plus,
      title: 'Insert Records',
      description: 'Add new student records with comprehensive information including roll number, name, department, semester, and age.',
      color: 'from-green-500 to-emerald-600',
      path: '/insert'
    },
    {
      icon: Trash2,
      title: 'Delete Records',
      description: 'Remove student records safely with confirmation dialogs to prevent accidental deletions.',
      color: 'from-red-500 to-pink-600',
      path: '/delete'
    },
    {
      icon: Edit,
      title: 'Update Records',
      description: 'Modify existing student information by searching with roll number and updating specific fields.',
      color: 'from-blue-500 to-cyan-600',
      path: '/update'
    },
    {
      icon: ArrowDown,
      title: 'Show Records',
      description: 'View detailed student information in beautiful card layouts and organized tables.',
      color: 'from-purple-500 to-violet-600',
      path: '/show'
    }
  ];

  const stats = [
    { icon: Database, label: 'MongoDB Atlas', value: 'Cloud Database' },
    { icon: Zap, label: 'Real-time', value: 'Live Updates' },
    { icon: Shield, label: 'Secure', value: 'Data Protection' },
    { icon: Sparkles, label: 'Modern UI', value: 'Animated Design' }
  ];

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/70 to-pink-900/70"></div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-12 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-white drop-shadow-lg">CRUD Operations</span>
            <span className="block text-4xl text-indigo-200 mt-2">Student Management System</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            A beautiful, animated web application for performing Create, Read, Update, and Delete operations 
            on student records using MongoDB. Experience modern design with smooth animations and intuitive user interface.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 shadow-lg">
              <p className="text-sm font-medium text-white">
                <Database className="w-4 h-4 inline mr-2" />
                Connected to MongoDB: <span className="font-mono text-blue-200">mongodb://localhost:27017/CRUD</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">{stat.value}</h3>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="crud-card hover:transform hover:scale-105 transition-all duration-300 animate-fade-in group cursor-pointer backdrop-blur-sm bg-white/95"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to={feature.path}>
                    <Button
                      className={`crud-button bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-semibold px-8 py-3`}
                    >
                      Get Started
                      <Icon className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Database Info Section */}
        <Card className="crud-card animate-fade-in max-w-4xl mx-auto backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl">Database Configuration</CardTitle>
            <CardDescription className="text-lg">
              This application connects to MongoDB for data persistence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Connection String:</span>
                  <div className="text-blue-600 font-semibold">mongodb://localhost:27017/</div>
                </div>
                <div>
                  <span className="text-gray-600">Database Name:</span>
                  <div className="text-green-600 font-semibold">CRUD</div>
                </div>
                <div>
                  <span className="text-gray-600">Collection Name:</span>
                  <div className="text-purple-600 font-semibold">CRUD</div>
                </div>
                <div>
                  <span className="text-gray-600">Operations:</span>
                  <div className="text-orange-600 font-semibold">Create, Read, Update, Delete</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Student Record Schema</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div><span className="font-medium">Roll No:</span> Unique identifier for each student</div>
                <div><span className="font-medium">Name:</span> Full name of the student</div>
                <div><span className="font-medium">Department:</span> Academic department</div>
                <div><span className="font-medium">Semester:</span> Current semester (1-8)</div>
                <div><span className="font-medium">Age:</span> Student's age in years</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
