
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface SavingTip {
  category: string;
  tip: string;
  saving: number;
}

const BudgetOptimizer: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [savingTips, setSavingTips] = useState<SavingTip[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !budget || !days) return;

    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      const tips = generateSavingTips(destination, parseInt(budget), parseInt(days));
      const total = tips.reduce((sum, tip) => sum + tip.saving, 0);
      
      setSavingTips(tips);
      setTotalSavings(total);
      setIsLoading(false);
    }, 1200);
  };

  const generateSavingTips = (dest: string, budgetAmount: number, numDays: number): SavingTip[] => {
    const lowercaseDest = dest.toLowerCase();
    const tips: SavingTip[] = [];
    
    // Generic saving tips
    const genericTips = [
      {
        category: "Accommodation",
        tip: "Book hostels or homestays instead of hotels",
        saving: Math.floor(Math.random() * 500) + 500
      },
      {
        category: "Food",
        tip: "Eat at local street food stalls for authentic and cheaper meals",
        saving: Math.floor(Math.random() * 200) + 200
      },
      {
        category: "Transport",
        tip: "Use public transportation instead of private taxis",
        saving: Math.floor(Math.random() * 300) + 300
      },
      {
        category: "Activities",
        tip: "Look for free walking tours and public attractions",
        saving: Math.floor(Math.random() * 400) + 200
      },
      {
        category: "Shopping",
        tip: "Buy souvenirs from local markets not tourist shops",
        saving: Math.floor(Math.random() * 200) + 100
      }
    ];
    
    // Location-specific tips
    if (lowercaseDest.includes('delhi')) {
      tips.push(
        {
          category: "Transport",
          tip: "Use Delhi Metro instead of cabs - comprehensive network",
          saving: Math.floor(Math.random() * 200) + 500
        },
        {
          category: "Food",
          tip: "Try street food at Chandni Chowk instead of restaurant meals",
          saving: Math.floor(Math.random() * 300) + 400
        },
        {
          category: "Accommodation",
          tip: "Stay in Paharganj area for budget-friendly options",
          saving: Math.floor(Math.random() * 500) + 700
        }
      );
    } else if (lowercaseDest.includes('goa')) {
      tips.push(
        {
          category: "Transport",
          tip: "Rent a scooter (₹300/day) instead of cabs (₹1500+/day)",
          saving: Math.floor(Math.random() * 400) + 800
        },
        {
          category: "Accommodation",
          tip: "Stay in South Goa for cheaper beach huts than North Goa",
          saving: Math.floor(Math.random() * 600) + 600
        },
        {
          category: "Food",
          tip: "Eat at beach shacks instead of resort restaurants",
          saving: Math.floor(Math.random() * 300) + 500
        }
      );
    } else if (lowercaseDest.includes('jaipur')) {
      tips.push(
        {
          category: "Transport",
          tip: "Use the RTDC (Rajasthan Tourism) bus services",
          saving: Math.floor(Math.random() * 300) + 400
        },
        {
          category: "Accommodation",
          tip: "Stay in haveli-converted guesthouses instead of luxury hotels",
          saving: Math.floor(Math.random() * 700) + 800
        },
        {
          category: "Shopping",
          tip: "Shop at Bapu Bazaar rather than hotel boutiques",
          saving: Math.floor(Math.random() * 300) + 400
        }
      );
    } else if (lowercaseDest.includes('mumbai')) {
      tips.push(
        {
          category: "Transport",
          tip: "Use local trains instead of cabs during non-rush hours",
          saving: Math.floor(Math.random() * 400) + 600
        },
        {
          category: "Food",
          tip: "Try street food at Juhu or vada pav stalls instead of restaurants",
          saving: Math.floor(Math.random() * 300) + 400
        },
        {
          category: "Accommodation",
          tip: "Stay in suburbs like Andheri instead of South Mumbai",
          saving: Math.floor(Math.random() * 800) + 1000
        }
      );
    }
    
    // Add some generic tips to ensure we have enough
    const numTipsNeeded = 5 - tips.length;
    for (let i = 0; i < numTipsNeeded; i++) {
      tips.push(genericTips[i]);
    }
    
    // Adjust savings based on trip length
    tips.forEach(tip => {
      if (numDays > 3) {
        tip.saving = Math.floor(tip.saving * (numDays / 3));
      }
    });
    
    return tips;
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination (e.g., Delhi, Goa)"
          className="mb-2 bg-[#2a3649] border-[#3a3a3a] text-white"
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Budget (₹)"
            min="1000"
            className="mb-2 bg-[#2a3649] border-[#3a3a3a] text-white"
          />
          <Input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Number of days"
            min="1"
            max="30"
            className="mb-2 bg-[#2a3649] border-[#3a3a3a] text-white"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !destination || !budget || !days}
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold rounded-xl"
        >
          {isLoading ? 'Analyzing...' : 'Find Saving Opportunities'}
        </Button>
      </form>

      {savingTips.length > 0 && (
        <div className="tool-result mt-4 bg-[#1e293b] border border-[#3a3a3a] rounded-xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="tool-heading text-white font-semibold">Budget Optimization Tips:</h4>
            <div className="text-sm font-medium bg-green-900 text-green-100 px-2 py-1 rounded">
              Save up to {formatCurrency(totalSavings)}!
            </div>
          </div>
          
          {savingTips.map((tip, index) => (
            <div key={index} className="mb-3 pb-2 border-b border-gray-700">
              <div className="flex justify-between">
                <span className="font-medium text-purple-300">{tip.category}</span>
                <span className="text-green-400 font-medium">-{formatCurrency(tip.saving)}</span>
              </div>
              <p className="text-sm mt-1 text-gray-300">{tip.tip}</p>
            </div>
          ))}
          
          <div className="mt-3 pt-2 border-t border-gray-700">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Original budget:</span>
              <span>{formatCurrency(parseInt(budget))}</span>
            </div>
            <div className="flex justify-between text-sm text-green-400">
              <span>Potential savings:</span>
              <span>-{formatCurrency(totalSavings)}</span>
            </div>
            <div className="flex justify-between font-medium mt-1 text-white">
              <span>Optimized budget:</span>
              <span>{formatCurrency(parseInt(budget) - totalSavings)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetOptimizer;
