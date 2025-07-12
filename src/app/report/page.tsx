"use client";

import { useState } from 'react';
import { Button, Input, Textarea, Select, SelectItem } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function ReportPage() {
  const [steamProfileUrl, setSteamProfileUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

    const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

        if (!isValidUrl(steamProfileUrl)) {
      setError("Veuillez entrer une URL de profil Steam valide.");
      return;
    }

    if (!isValidUrl(videoUrl)) {
      setError("Veuillez entrer une URL de preuve vidéo valide.");
      return;
    }

    setIsSubmitting(true);

    try {

        
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          steamProfileUrl,
          videoUrl,
          description,
          priority,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit report');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Report a Cheater</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-background-800 p-8 rounded-lg shadow-lg">
        <Input
          label="Cheater's Steam Profile URL"
          placeholder="https://steamcommunity.com/id/..."
          value={steamProfileUrl}
          onChange={(e) => setSteamProfileUrl(e.target.value)}
          required
        />
        <Input
          label="Video Proof URL"
          placeholder="https://youtube.com/watch?v=..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <Textarea
          label="Description"
          placeholder="Describe the cheating incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
        />
        <Select
          label="Priority"
          selectedKeys={[priority]}
          onChange={(e) => setPriority(e.target.value)}
        >
          <SelectItem key="low">Low</SelectItem>
          <SelectItem key="medium">Medium</SelectItem>
          <SelectItem key="high">High</SelectItem>
        </Select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          color="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </form>
    </div>
  );
}