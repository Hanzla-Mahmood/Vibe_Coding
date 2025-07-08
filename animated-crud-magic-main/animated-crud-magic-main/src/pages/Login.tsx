
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (login(pin)) {
      toast({
        title: "Welcome!",
        description: "Login successful. Redirecting to dashboard...",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid PIN. Please try again.",
        variant: "destructive",
      });
      setPin('');
    }
    
    setIsLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Hacker-style animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-blue-900/20">
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Matrix-style falling code effect */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-sm animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        {/* Scanning lines effect */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-0.5 bg-green-400/30 animate-pulse" style={{ top: '20%' }}></div>
          <div className="absolute w-full h-0.5 bg-blue-400/30 animate-pulse" style={{ top: '60%', animationDelay: '1s' }}></div>
          <div className="absolute w-full h-0.5 bg-red-400/30 animate-pulse" style={{ top: '80%', animationDelay: '2s' }}></div>
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>

      {/* Floating circuit elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <Card className="bg-black/80 backdrop-blur-lg border border-green-400/30 shadow-2xl shadow-green-400/20 animate-fade-in">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-green-400/30">
              <Shield className="w-10 h-10 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
              SYSTEM ACCESS
            </CardTitle>
            <CardDescription className="text-green-300 text-lg font-mono">
              &gt; Enter authorization code to proceed_
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-green-400 font-mono font-medium">
                  SECURITY_PIN:
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 transition-colors duration-300 ${
                      focusedField ? 'text-green-400' : 'text-gray-500'
                    }`} />
                  </div>
                  <Input
                    id="pin"
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    onFocus={() => setFocusedField(true)}
                    onBlur={() => setFocusedField(false)}
                    placeholder="****"
                    className={`pl-10 pr-12 h-12 bg-black/50 border-green-400/50 text-green-400 placeholder:text-gray-500 font-mono transition-all duration-300 focus:bg-black/70 focus:border-green-400 focus:ring-2 focus:ring-green-400/50 focus:shadow-lg focus:shadow-green-400/20 ${
                      focusedField ? 'transform scale-105 glow' : ''
                    }`}
                    maxLength={4}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-400 transition-colors duration-200"
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || pin.length !== 4}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-black font-bold text-lg font-mono transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-green-400/30"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                    &gt; AUTHENTICATING...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 mr-2" />
                    &gt; GRANT_ACCESS
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-green-400/70 text-sm font-mono">
                🔐 ENCRYPTED_CONNECTION_ESTABLISHED
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Decorative hacker elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-red-400 rounded-full opacity-40 animate-bounce"></div>
      </div>

      <style jsx>{`
        .glow {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
