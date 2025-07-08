
const API_BASE_URL = 'http://localhost:5000/api';

export interface Student {
  rollNo: string;
  name: string;
  department: string;
  semester: number;
  age: number;
}

// Insert student
export const insertStudent = async (student: Student) => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to insert student');
  }
  return data;
};

// Get student by roll number
export const getStudent = async (rollNo: string) => {
  const response = await fetch(`${API_BASE_URL}/students/${rollNo}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch student');
  }
  return data;
};

// Update student
export const updateStudent = async (rollNo: string, student: Omit<Student, 'rollNo'>) => {
  const response = await fetch(`${API_BASE_URL}/students/${rollNo}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to update student');
  }
  return data;
};

// Delete student
export const deleteStudent = async (rollNo: string) => {
  const response = await fetch(`${API_BASE_URL}/students/${rollNo}`, {
    method: 'DELETE',
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete student');
  }
  return data;
};
