import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { insertStudent } from '@/services/api';

const Insert = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    department: '',
    semester: '',
    age: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await insertStudent({
        rollNo: formData.rollNo,
        name: formData.name,
        department: formData.department,
        semester: parseInt(formData.semester),
        age: parseInt(formData.age)
      });
      
      toast({
        title: "Success!",
        description: `Student record for ${formData.name} has been inserted successfully.`,
      });

      // Reset form
      setFormData({
        rollNo: '',
        name: '',
        department: '',
        semester: '',
        age: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to insert record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen pt-8 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 to-emerald-900/60"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Insert Student Record</h1>
            <p className="text-green-100">Add a new student to the database</p>
          </div>

          <Card className="crud-card animate-bounce-in shadow-2xl backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Student Information</CardTitle>
              <CardDescription>Enter the details of the new student</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input
                    id="rollNo"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    placeholder="Enter roll number"
                    className="crud-input"
                    required
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
                  disabled={isSubmitting}
                  className="w-full crud-button bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Inserting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Insert Record
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Insert;
