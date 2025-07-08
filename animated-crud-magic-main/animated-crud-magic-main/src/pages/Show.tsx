import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowDown, Search, User, GraduationCap, Calendar, Hash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getStudent } from '@/services/api';

interface StudentData {
  rollNo: string;
  name: string;
  department: string;
  semester: number;
  age: number;
}

const Show = () => {
  const [searchRollNo, setSearchRollNo] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleSearch = async () => {
    if (!searchRollNo.trim()) {
      toast({
        title: "Error",
        description: "Please enter a roll number to search.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    try {
      const student = await getStudent(searchRollNo);
      setStudentData(student);
      
      toast({
        title: "Success!",
        description: `Student record found for ${student.name} (Roll No: ${searchRollNo})`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Student not found. Please check the roll number.",
        variant: "destructive",
      });
      setStudentData(null);
    } finally {
      setIsSearching(false);
    }
  };

  const InfoCard = ({ icon: Icon, label, value, bgColor }: {
    icon: any;
    label: string;
    value: string;
    bgColor: string;
  }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen pt-8 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-violet-900/60"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Show Student Record</h1>
            <p className="text-purple-100">View detailed student information</p>
          </div>

          {/* Search Section */}
          <Card className="crud-card animate-bounce-in shadow-2xl mb-8 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Search Student</CardTitle>
              <CardDescription>Enter roll number to view student details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  value={searchRollNo}
                  onChange={(e) => setSearchRollNo(e.target.value)}
                  placeholder="Enter roll number to search"
                  className="crud-input flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="crud-button bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white"
                >
                  {isSearching ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <ArrowDown className="w-4 h-4 mr-2" />
                      Show
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Student Details */}
          {studentData && (
            <div className="animate-fade-in">
              <Card className="crud-card shadow-2xl mb-6 backdrop-blur-sm bg-white/95">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl">{studentData.name}</CardTitle>
                  <CardDescription className="text-lg">Student Details</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoCard
                  icon={Hash}
                  label="Roll Number"
                  value={studentData.rollNo}
                  bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
                />
                
                <InfoCard
                  icon={GraduationCap}
                  label="Department"
                  value={studentData.department}
                  bgColor="bg-gradient-to-r from-green-500 to-green-600"
                />
                
                <InfoCard
                  icon={Calendar}
                  label="Semester"
                  value={`${studentData.semester}${getOrdinalSuffix(studentData.semester)}`}
                  bgColor="bg-gradient-to-r from-orange-500 to-orange-600"
                />
                
                <InfoCard
                  icon={User}
                  label="Age"
                  value={`${studentData.age} years`}
                  bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
                />
              </div>

              {/* Additional Details Card */}
              <Card className="crud-card shadow-2xl mt-6 backdrop-blur-sm bg-white/95">
                <CardHeader>
                  <CardTitle className="text-xl">Complete Record</CardTitle>
                  <CardDescription>All student information in tabular format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-4 font-semibold text-gray-700">Field</th>
                          <th className="text-left p-4 font-semibold text-gray-700">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium">Roll Number</td>
                          <td className="p-4">{studentData.rollNo}</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium">Full Name</td>
                          <td className="p-4">{studentData.name}</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium">Department</td>
                          <td className="p-4">{studentData.department}</td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium">Current Semester</td>
                          <td className="p-4">{studentData.semester}</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-medium">Age</td>
                          <td className="p-4">{studentData.age} years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getOrdinalSuffix = (num: number): string => {
  const ones = num % 10;
  const tens = Math.floor(num / 10) % 10;
  
  if (tens === 1) {
    return 'th';
  }
  
  switch (ones) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export default Show;
