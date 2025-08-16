
import { useState, useEffect } from 'react';
import axios from 'axios';

// Types for railway data
export interface RailwayStation {
  name: string;
  code: string;
  state: string;
}

export interface Train {
  id: string;
  name: string;
  trainNumber: string;
  trainName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  fromStation: string;
  toStation: string;
  travelClass: string;
  travelDate: string;
  price: string;
  availability: {
    sleeper: string;
    ac3Tier: string;
    ac2Tier: string;
  };
}

// Mock railway stations
const mockStations: RailwayStation[] = [
  { name: 'New Delhi', code: 'NDLS', state: 'Delhi' },
  { name: 'Mumbai Central', code: 'MMCT', state: 'Maharashtra' },
  { name: 'Howrah', code: 'HWH', state: 'West Bengal' },
  { name: 'Chennai Central', code: 'MAS', state: 'Tamil Nadu' },
  { name: 'Bangalore', code: 'SBC', state: 'Karnataka' },
  { name: 'Hyderabad', code: 'HYD', state: 'Telangana' },
  { name: 'Ahmedabad', code: 'ADI', state: 'Gujarat' },
  { name: 'Pune', code: 'PUNE', state: 'Maharashtra' },
  { name: 'Jaipur', code: 'JP', state: 'Rajasthan' },
  { name: 'Kolkata', code: 'KOAA', state: 'West Bengal' }
];

// Mock railway data
const mockTrains: Train[] = [
  {
    id: '12301',
    name: 'Rajdhani Express',
    trainNumber: '12301',
    trainName: 'Rajdhani Express',
    departureTime: '16:50',
    arrivalTime: '10:20',
    duration: '17h 30m',
    from: 'New Delhi',
    to: 'Howrah',
    fromStation: 'New Delhi',
    toStation: 'Howrah',
    travelClass: 'AC First Class',
    travelDate: new Date().toISOString().split('T')[0],
    price: '₹2,860',
    availability: {
      sleeper: 'Available (54)',
      ac3Tier: 'Available (12)',
      ac2Tier: 'RAC (4)'
    }
  },
  {
    id: '12951',
    name: 'Mumbai Rajdhani',
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani',
    departureTime: '16:25',
    arrivalTime: '08:15',
    duration: '15h 50m',
    from: 'New Delhi',
    to: 'Mumbai Central',
    fromStation: 'New Delhi',
    toStation: 'Mumbai Central',
    travelClass: 'AC 2-Tier',
    travelDate: new Date().toISOString().split('T')[0],
    price: '₹2,390',
    availability: {
      sleeper: 'WL (14)',
      ac3Tier: 'Available (23)',
      ac2Tier: 'Available (8)'
    }
  },
  {
    id: '12259',
    name: 'Sealdah Duronto',
    trainNumber: '12259',
    trainName: 'Sealdah Duronto',
    departureTime: '20:05',
    arrivalTime: '13:30',
    duration: '17h 25m',
    from: 'New Delhi',
    to: 'Sealdah',
    fromStation: 'New Delhi',
    toStation: 'Sealdah',
    travelClass: 'AC 3-Tier',
    travelDate: new Date().toISOString().split('T')[0],
    price: '₹2,045',
    availability: {
      sleeper: 'Available (120)',
      ac3Tier: 'Available (45)',
      ac2Tier: 'Available (12)'
    }
  },
  {
    id: '12309',
    name: 'Rajendra Nagar Patna Rajdhani',
    trainNumber: '12309',
    trainName: 'Rajendra Nagar Patna Rajdhani',
    departureTime: '19:55',
    arrivalTime: '07:50',
    duration: '11h 55m',
    from: 'New Delhi',
    to: 'Rajendra Nagar',
    fromStation: 'New Delhi',
    toStation: 'Rajendra Nagar',
    travelClass: 'Sleeper',
    travelDate: new Date().toISOString().split('T')[0],
    price: '₹570',
    availability: {
      sleeper: 'Available (89)',
      ac3Tier: 'RAC (8)',
      ac2Tier: 'Available (6)'
    }
  }
];

// Function to search for stations
export const getStations = async (query: string): Promise<RailwayStation[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter stations that match the query
  return mockStations.filter(station => 
    station.name.toLowerCase().includes(query.toLowerCase()) || 
    station.code.toLowerCase().includes(query.toLowerCase())
  );
};

// Function to search for trains
export const searchTrains = async (from: string, to: string, date: string): Promise<Train[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For now, return mock data that matches the search criteria
  return mockTrains.filter(train => 
    train.fromStation.toLowerCase().includes(from.toLowerCase()) || 
    train.toStation.toLowerCase().includes(to.toLowerCase())
  );
};

// Hook for fetching train data
export const useTrainSearch = (from: string, to: string, date: string) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrains = async () => {
      if (!from || !to) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await searchTrains(from, to, date);
        setTrains(data);
      } catch (err) {
        console.error('Error fetching train data:', err);
        setError('Failed to fetch train data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [from, to, date]);

  return { trains, loading, error };
};

// Export a railwayService object with all the functions
export const railwayService = {
  getStations,
  searchTrains,
  useTrainSearch
};

export default railwayService;
