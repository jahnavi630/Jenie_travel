
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Lightbulb, TrendingDown } from 'lucide-react';
import './BudgetPlanner.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPlanner: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState<number>(1000);
  const [stay, setStay] = useState<number>(40);
  const [food, setFood] = useState<number>(30);
  const [travel, setTravel] = useState<number>(20);
  const [activities, setActivities] = useState<number>(10);
  
  const [stayAmount, setStayAmount] = useState<number>(0);
  const [foodAmount, setFoodAmount] = useState<number>(0);
  const [travelAmount, setTravelAmount] = useState<number>(0);
  const [activitiesAmount, setActivitiesAmount] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);
  
  // Calculate actual amounts based on percentages
  useEffect(() => {
    const calculatedStayAmount = (totalBudget * stay) / 100;
    const calculatedFoodAmount = (totalBudget * food) / 100;
    const calculatedTravelAmount = (totalBudget * travel) / 100;
    const calculatedActivitiesAmount = (totalBudget * activities) / 100;
    
    setStayAmount(calculatedStayAmount);
    setFoodAmount(calculatedFoodAmount);
    setTravelAmount(calculatedTravelAmount);
    setActivitiesAmount(calculatedActivitiesAmount);
    
    const totalSpent = calculatedStayAmount + calculatedFoodAmount + calculatedTravelAmount + calculatedActivitiesAmount;
    setRemainingBudget(totalBudget - totalSpent);
  }, [totalBudget, stay, food, travel, activities]);
  
  // Update slider backgrounds based on their values
  useEffect(() => {
    document.documentElement.style.setProperty('--stay-percent', `${stay}%`);
    document.documentElement.style.setProperty('--food-percent', `${food}%`);
    document.documentElement.style.setProperty('--travel-percent', `${travel}%`);
    document.documentElement.style.setProperty('--activities-percent', `${activities}%`);
  }, [stay, food, travel, activities]);
  
  const chartData = {
    labels: ['Stay', 'Food', 'Travel', 'Activities'],
    datasets: [
      {
        data: [stay, food, travel, activities],
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 12,
            weight: '600',
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        bodyFont: {
          size: 14,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
  };
  
  const handleSliderChange = (
    value: number,
    category: 'stay' | 'food' | 'travel' | 'activities'
  ) => {
    // Update the selected category
    switch (category) {
      case 'stay':
        setStay(value);
        break;
      case 'food':
        setFood(value);
        break;
      case 'travel':
        setTravel(value);
        break;
      case 'activities':
        setActivities(value);
        break;
    }
    
    // Calculate total percentage
    const totalPercentage = 
      (category !== 'stay' ? stay : value) + 
      (category !== 'food' ? food : value) + 
      (category !== 'travel' ? travel : value) + 
      (category !== 'activities' ? activities : value);
    
    // If total exceeds 100%, adjust other values
    if (totalPercentage > 100) {
      const excess = totalPercentage - 100;
      const otherCategories = ['stay', 'food', 'travel', 'activities'].filter(c => c !== category);
      
      // Calculate total of other categories
      const otherTotal = otherCategories.reduce((sum, cat) => {
        switch (cat) {
          case 'stay': return sum + stay;
          case 'food': return sum + food;
          case 'travel': return sum + travel;
          case 'activities': return sum + activities;
          default: return sum;
        }
      }, 0);
      
      // Reduce each category proportionally
      otherCategories.forEach(cat => {
        const currentValue = (() => {
          switch (cat) {
            case 'stay': return stay;
            case 'food': return food;
            case 'travel': return travel;
            case 'activities': return activities;
            default: return 0;
          }
        })();
        
        if (otherTotal > 0) {
          const reduction = Math.round((currentValue / otherTotal) * excess);
          const newValue = Math.max(0, currentValue - reduction);
          
          switch (cat) {
            case 'stay': setStay(newValue); break;
            case 'food': setFood(newValue); break;
            case 'travel': setTravel(newValue); break;
            case 'activities': setActivities(newValue); break;
          }
        }
      });
    }
  };

  const generateSavingsTips = () => {
    const tips = [
      {
        tip: "Use hostels or homestays instead of hotels",
        saving: Math.round(stayAmount * 0.3),
        category: "stay"
      },
      {
        tip: "Eat street food instead of restaurants for most meals",
        saving: Math.round(foodAmount * 0.4),
        category: "food"
      },
      {
        tip: "Use public transportation instead of taxis",
        saving: Math.round(travelAmount * 0.5),
        category: "travel"
      },
      {
        tip: "Look for free walking tours and public attractions",
        saving: Math.round(activitiesAmount * 0.35),
        category: "activities"
      },
      {
        tip: "Travel during off-peak seasons for better deals",
        saving: Math.round(totalBudget * 0.15),
        category: "general"
      }
    ];
    
    // Sort by highest savings first
    return tips.sort((a, b) => b.saving - a.saving).slice(0, 3);
  };
  
  return (
    <div className="budget-planner">
      <h3 className="budget-planner-title">Smart Budget Planner</h3>
      
      <div className="budget-input">
        <label htmlFor="total-budget">Total Budget (₹)</label>
        <input
          type="number"
          id="total-budget"
          className="form-control"
          value={totalBudget}
          onChange={(e) => setTotalBudget(Math.max(0, parseInt(e.target.value) || 0))}
        />
      </div>
      
      <div className="budget-allocation">
        <div className="budget-chart">
          <Pie data={chartData} options={chartOptions} />
        </div>
        
        <div className="budget-sliders">
          <div className="form-group slider-group">
            <label>
              Stay: {stay}%
              <span className="amount">(₹{Math.round(stayAmount)})</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={stay}
              onChange={(e) => handleSliderChange(parseInt(e.target.value), 'stay')}
              className="slider stay-slider"
            />
          </div>
          
          <div className="form-group slider-group">
            <label>
              Food: {food}%
              <span className="amount">(₹{Math.round(foodAmount)})</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={food}
              onChange={(e) => handleSliderChange(parseInt(e.target.value), 'food')}
              className="slider food-slider"
            />
          </div>
          
          <div className="form-group slider-group">
            <label>
              Travel: {travel}%
              <span className="amount">(₹{Math.round(travelAmount)})</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={travel}
              onChange={(e) => handleSliderChange(parseInt(e.target.value), 'travel')}
              className="slider travel-slider"
            />
          </div>
          
          <div className="form-group slider-group">
            <label>
              Activities: {activities}%
              <span className="amount">(₹{Math.round(activitiesAmount)})</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={activities}
              onChange={(e) => handleSliderChange(parseInt(e.target.value), 'activities')}
              className="slider activities-slider"
            />
          </div>
        </div>
      </div>
      
      <div className="budget-table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white">Percentage</TableHead>
              <TableHead className="text-white">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-white">Stay</TableCell>
              <TableCell className="text-white">{stay}%</TableCell>
              <TableCell className="text-white">₹{Math.round(stayAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-white">Food</TableCell>
              <TableCell className="text-white">{food}%</TableCell>
              <TableCell className="text-white">₹{Math.round(foodAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-white">Travel</TableCell>
              <TableCell className="text-white">{travel}%</TableCell>
              <TableCell className="text-white">₹{Math.round(travelAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-white">Activities</TableCell>
              <TableCell className="text-white">{activities}%</TableCell>
              <TableCell className="text-white">₹{Math.round(activitiesAmount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="budget-summary">
        <div className="total-spent">
          <span>Total Allocated:</span>
          <span>₹{Math.round(totalBudget - remainingBudget)}</span>
        </div>
        
        <div className="remaining-budget">
          <span>Unallocated Budget:</span>
          <span className={remainingBudget < 0 ? 'negative' : ''}>
            ₹{Math.round(remainingBudget)}
          </span>
        </div>
      </div>

      <div className="savings-tips">
        <h4 className="savings-tips-title">
          <Lightbulb size={18} />
          Savings Tips
        </h4>
        
        {generateSavingsTips().map((tip, index) => (
          <div key={index} className="savings-tip">
            <TrendingDown size={18} className="tip-icon" />
            <div className="tip-content">
              {tip.tip}
              <span className="tip-saving">Save ₹{tip.saving}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPlanner;
