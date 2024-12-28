import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../AuthContext';
import { FormInput } from '../components/FormInput';
import { FormTextArea } from '../components/FormTextArea';

export function FindCandidatesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    jobRole: '',
    jobDescription: '',
    startDate: '',
    endDate: '',
    candidatesRequired: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email || '',
      }));
    } else {
      toast.error('Please log in to access this page.');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    toast.success('Fetching candidates...');

    const eventSource = new EventSource('http://localhost:5000/api/candidates/status');
    eventSource.onmessage = (event) => {
      setStatus(event.data);
    };

    try {
      const response = await fetch('http://localhost:5000/api/candidates/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch candidates');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Candidates found successfully!');
        navigate('/dashboard', { state: { candidates: data.candidates } });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to fetch candidates');
        console.error('Error:', error);
      } else {
        toast.error('An unknown error occurred');
        console.error('Unknown error:', error);
      }
    } finally {
      setLoading(false);
      eventSource.close();
    }
  };

  return user ? (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 mt-16">
      <div className="max-w-2xl mx-auto space-y-8 bg-slate-800/50 p-8 rounded-2xl backdrop-blur-lg border border-slate-700">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Find Candidates
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <FormInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <FormInput
            label="Job Role"
            value={formData.jobRole}
            onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
            required
          />
          <FormTextArea
            label="Job Description"
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              type="date"
              label="Start Date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
            <FormInput
              type="date"
              label="End Date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>
          <FormInput
            type="number"
            label="Number of Candidates Required"
            value={formData.candidatesRequired}
            onChange={(e) => setFormData({ ...formData, candidatesRequired: e.target.value })}
            required
          />
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <span className="loader"></span>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Fetch Candidates
                </>
              )}
            </button>
          </div>
        </form>
        {status && (
          <div className="mt-4 text-center text-white">
            <p>{status}</p>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
