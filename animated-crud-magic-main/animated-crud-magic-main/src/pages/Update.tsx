import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getStudent, updateStudent } from '@/services/api';

const Update = () => {
  const [searchRollNo, setSearchRollNo] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [studentFound, setStudentFound] = useState(false);
  
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    department: '',
    semester: '',
    age: ''
  });

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
      
      setFormData({
        rollNo: student.rollNo,
        name: student.name,
        department: student.department,
        semester: student.semester.toString(),
        age: student.age.toString()
      });
      
      setStudentFound(true);
      
      toast({
        title: "Success!",
        description: `Student record found for Roll No: ${searchRollNo}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Student not found. Please check the roll number.",
        variant: "destructive",
      });
      setStudentFound(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await updateStudent(formData.rollNo, {
        name: formData.name,
        department: formData.department,
        semester: parseInt(formData.semester),
        age: parseInt(formData.age)
      });
      
      toast({
        title: "Success!",
        description: `Student record for ${formData.name} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div 
      className="min-h-screen pt-8 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-cyan-900/60"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Update Student Record</h1>
            <p className="text-blue-100">Modify existing student information</p>
          </div>

          {/* Search Section */}
          <Card className="crud-card animate-bounce-in shadow-2xl mb-6 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Search Student</CardTitle>
              <CardDescription>Enter roll number to fetch existing data</CardDescription>
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
                  className="crud-button bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                >
                  {isSearching ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Update Form */}
          {studentFound && (
            <Card className="crud-card animate-fade-in shadow-2xl backdrop-blur-sm bg-white/95">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Update Information</CardTitle>
                <CardDescription>Modify the student details below</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input
                      id="rollNo"
                      name="rollNo"
                      value={formData.rollNo}
                      className="crud-input bg-gray-100"
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter student name"
                      className="crud-input"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Enter department"
                        className="crud-input"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Input
                        id="semester"
                        name="semester"
                        type="number"
                        value={formData.semester}
                        onChange={handleChange}
                        placeholder="Enter semester"
                        className="crud-input"
                        min="1"
                        max="8"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter age"
                      className="crud-input"
                      min="15"
                      max="30"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full crud-button bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 text-lg font-semibold"
                  >
                    {isUpdating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Edit className="w-5 h-5 mr-2" />
                        Update Record
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Update;
