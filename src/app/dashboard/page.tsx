"use client";

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Spinner, Chip, Button } from '@heroui/react';
import Link from 'next/link';

interface Cheater {
  steamProfileUrl: string;
}

interface Complaint {
  id: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  videoUrl: string;
  cheater: Cheater | null;
}

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchComplaints(currentPage);
  }, [currentPage]);

  const fetchComplaints = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/complaints?limit=${pageSize}&page=${page}&sort=createdAt:desc`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
      
      const data = await response.json();
      const complaintsData = data.complaints || data.data || data;
      setComplaints(Array.isArray(complaintsData) ? complaintsData : []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchComplaints(1);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in-progress': return 'primary';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Card className="max-w-md mx-auto">
          <CardBody>
            <p className="text-red-600 text-center">Error: {error}</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Dashboard - Recent Complaints
        </h1>
        <Button
            color="primary"
            variant="flat"
            onPress={handleRefresh}
            isLoading={loading}
            className='mb-6'
          >
            Refresh
          </Button>
        
        <div className="grid gap-4">
          {complaints.length === 0 && !loading ? (
            <Card>
              <CardBody>
                <p className="text-center text-gray-500">No complaints found</p>
              </CardBody>
            </Card>
          ) : (
            complaints.map((complaint) => (
              <Card key={complaint.id} className="w-full">
                <CardHeader className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Chip 
                      color={getStatusColor(complaint.status)}
                      variant="flat"
                      size="sm"
                    >
                      {complaint.status}
                    </Chip>
                    <Chip 
                      color={getPriorityColor(complaint.priority)}
                      variant="flat"
                      size="sm"
                    >
                      {complaint.priority}
                    </Chip>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-gray-700 mb-4">
                    {complaint.description}
                  </p>
                  <div className="flex justify-between items-center">
                    {complaint.cheater?.steamProfileUrl && (
                      <Link href={complaint.cheater.steamProfileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                        Cheater Profile
                      </Link>
                    )}
                    <Link href={complaint.videoUrl} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline text-sm">
                      View Video Proof
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
        <div className="flex justify-center items-center space-x-4 mt-8">
            <Button onPress={() => setCurrentPage(p => p - 1)} disabled={currentPage <= 1 || loading}>
                Previous
            </Button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <Button onPress={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages || loading}>
                Next
            </Button>
        </div>
      </div>
  );
}