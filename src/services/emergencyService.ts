
export interface Hospital {
  name: string;
  phone: string;
  address: string;
  specialty?: string;
  distance?: string;
}

export interface EmergencyData {
  police: {
    general: string;
    tourist: string;
  };
  ambulance: string;
  fireservice?: string;
  embassies: {
    [country: string]: string;
  };
  hospitals: Hospital[];
}

// Mock emergency data for different destinations
const emergencyDatabase: { [key: string]: EmergencyData } = {
  delhi: {
    police: {
      general: '100',
      tourist: '1800-111-363'
    },
    ambulance: '102',
    fireservice: '101',
    embassies: {
      us: '+91-11-2419-8000',
      uk: '+91-11-2419-2100',
      australia: '+91-11-4139-9900',
      canada: '+91-11-4178-2000'
    },
    hospitals: [
      {
        name: 'All India Institute of Medical Sciences (AIIMS)',
        phone: '+91-11-2658-8500',
        address: 'Ansari Nagar, New Delhi, 110029',
        specialty: 'Multi-Specialty',
        distance: '5.2 km from Connaught Place'
      },
      {
        name: 'Fortis Hospital',
        phone: '+91-11-4277-6222',
        address: 'Shalimar Bagh, New Delhi, 110088',
        specialty: 'Multi-Specialty',
        distance: '12.4 km from Connaught Place'
      },
      {
        name: 'Max Super Specialty Hospital',
        phone: '+91-11-2651-5050',
        address: 'Saket, New Delhi, 110017',
        specialty: 'Multi-Specialty',
        distance: '8.7 km from Connaught Place'
      }
    ]
  },
  mumbai: {
    police: {
      general: '100',
      tourist: '022-2262-3040'
    },
    ambulance: '108',
    fireservice: '101',
    embassies: {
      us: '+91-22-2363-3611',
      uk: '+91-22-6650-2222',
      australia: '+91-22-6116-7100',
      canada: '+91-22-6749-4444'
    },
    hospitals: [
      {
        name: 'Lilavati Hospital',
        phone: '+91-22-2675-1000',
        address: 'Bandra Reclamation, Bandra (W), Mumbai, 400050',
        specialty: 'Multi-Specialty',
        distance: '3.1 km from Bandra'
      },
      {
        name: 'Breach Candy Hospital',
        phone: '+91-22-2366-7888',
        address: 'Bhulabhai Desai Road, Mumbai, 400026',
        specialty: 'Multi-Specialty',
        distance: '5.8 km from Gateway of India'
      },
      {
        name: 'Kokilaben Dhirubhai Ambani Hospital',
        phone: '+91-22-3099-9999',
        address: 'Four Bungalows, Andheri (W), Mumbai, 400053',
        specialty: 'Multi-Specialty',
        distance: '7.4 km from Juhu Beach'
      }
    ]
  },
  goa: {
    police: {
      general: '100',
      tourist: '0832-2428877'
    },
    ambulance: '108',
    fireservice: '101',
    embassies: {
      us: '+91-11-2419-8000', // No US embassy in Goa, listing Delhi contact
      uk: '+91-832-663-3000',  // British consulate
      russia: '+91-832-243-3770', // Russian consulate in Goa
      portugal: '+91-832-242-5252' // Portuguese consulate in Goa
    },
    hospitals: [
      {
        name: 'Goa Medical College and Hospital',
        phone: '+91-832-249-5000',
        address: 'Bambolim, North Goa, 403202',
        specialty: 'Multi-Specialty',
        distance: '10.2 km from Panaji'
      },
      {
        name: 'Manipal Hospital',
        phone: '+91-832-257-0888',
        address: 'Dona Paula, North Goa, 403004',
        specialty: 'Multi-Specialty',
        distance: '7 km from Panaji'
      },
      {
        name: 'Victor Hospital',
        phone: '+91-832-287-1241',
        address: 'Margao, South Goa, 403601',
        specialty: 'Multi-Specialty',
        distance: '4.5 km from Colva Beach'
      }
    ]
  },
  default: {
    police: {
      general: '100',
      tourist: '1800-111-363'
    },
    ambulance: '108',
    fireservice: '101',
    embassies: {
      us: '+91-11-2419-8000',
      uk: '+91-11-2419-2100',
      australia: '+91-11-4139-9900',
      canada: '+91-11-4178-2000'
    },
    hospitals: [
      {
        name: 'General Hospital',
        phone: '+91-XXXX-XXXX-XXX',
        address: 'City Center'
      },
      {
        name: 'Emergency Medical Center',
        phone: '+91-XXXX-XXXX-XXX',
        address: 'Main Street'
      }
    ]
  }
};

export const getEmergencyInfo = async (destination: string): Promise<EmergencyData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Normalize destination for lookup
  const normalizedDest = destination.toLowerCase().trim().replace(/\s+/g, ' ');
  
  // Check if we have specific data for this destination
  for (const key of Object.keys(emergencyDatabase)) {
    if (normalizedDest.includes(key)) {
      return emergencyDatabase[key];
    }
  }
  
  // Return default data if no match
  return emergencyDatabase.default;
};
