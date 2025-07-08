import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { deleteStudent } from '@/services/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Delete = () => {
  const [rollNo, setRollNo] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!rollNo.trim()) {
      toast({
        title: "Error",
        description: "Please enter a roll number.",
        variant: "destructive",
      });
      return;
    }

    setIsDeleting(true);

    try {
      await deleteStudent(rollNo);
      
      toast({
        title: "Success!",
        description: `Student record with Roll No: ${rollNo} has been deleted successfully.`,
      });

      setRollNo('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete record. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div 
      className="min-h-screen pt-8 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 to-pink-900/60"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Delete Student Record</h1>
            <p className="text-red-100">Remove a student from the database</p>
          </div>

          <Card className="crud-card animate-bounce-in shadow-2xl backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Delete Record</CardTitle>
              <CardDescription>Enter the roll number of the student to delete</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input
                    id="rollNo"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="Enter roll number to delete"
                    className="crud-input"
                  />
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Warning</h4>
                    <p className="text-sm text-red-700 mt-1">
                      This action cannot be undone. The student record will be permanently deleted from the database.
                    </p>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={!rollNo.trim()}
                      className="w-full crud-button bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 text-lg font-semibold"
                    >
                      <Trash2 className="w-5 h-5 mr-2" />
                      Delete Record
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the student record with Roll No: <strong>{rollNo}</strong>.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isDeleting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Deleting...
                          </div>
                        ) : (
                          'Delete'
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Delete;
