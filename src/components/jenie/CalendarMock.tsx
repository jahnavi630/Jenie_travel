
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const CalendarMock: React.FC = () => {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventsSaved, setEventsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripName || !startDate || !endDate) return;

    setIsLoading(true);

    // Mock API call - in a real app, you would use Google Calendar API
    setTimeout(() => {
      setEventsSaved(true);
      setIsLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setTripName('');
    setStartDate('');
    setEndDate('');
    setEventsSaved(false);
  };

  return (
    <div>
      {!eventsSaved ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="Trip Name (e.g., Goa Beach Vacation)"
            className="mb-2"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-500">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mb-2"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mb-2"
                min={startDate}
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading || !tripName || !startDate || !endDate}>
            {isLoading ? 'Saving...' : 'Save to Calendar'}
          </Button>
        </form>
      ) : (
        <div className="tool-result">
          <div className="text-center my-2">
            <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
              ✓ Calendar Events Created!
            </span>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-200 my-2">
            <h4 className="font-medium text-purple-700">{tripName}</h4>
            <p className="text-sm text-gray-600">
              {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </p>
            <div className="mt-2 text-xs text-gray-500">
              <p>✓ Trip start reminder (2 days before)</p>
              <p>✓ Packing reminder (1 week before)</p>
              <p>✓ Weather check reminder (1 day before)</p>
            </div>
          </div>
          
          <div className="mt-3">
            <Button variant="outline" onClick={resetForm} className="w-full">
              Plan Another Trip
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarMock;
