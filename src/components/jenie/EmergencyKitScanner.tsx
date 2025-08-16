
import React, { useState } from 'react';
import { Button } from '../ui/button';

interface EmergencyItem {
  name: string;
  present: boolean;
}

const EmergencyKitScanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scanResults, setScanResults] = useState<EmergencyItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Reset scan results
      setScanResults([]);
    }
  };

  const handleScan = () => {
    if (!file) return;
    
    setIsScanning(true);
    
    // Mock scanning process - in a real app, you would use image recognition API
    setTimeout(() => {
      // Generate mock results
      const mockScanResults: EmergencyItem[] = [
        { name: "First Aid Kit", present: Math.random() > 0.4 },
        { name: "Prescription Medications", present: Math.random() > 0.4 },
        { name: "Emergency Contact Card", present: Math.random() > 0.5 },
        { name: "Flashlight/Torch", present: Math.random() > 0.6 },
        { name: "Power Bank", present: Math.random() > 0.3 },
        { name: "Whistle", present: Math.random() > 0.7 },
        { name: "Emergency Blanket", present: Math.random() > 0.8 },
        { name: "Water Purification Tablets", present: Math.random() > 0.9 },
        { name: "Multi-tool", present: Math.random() > 0.7 },
        { name: "Personal ID", present: Math.random() > 0.5 }
      ];
      
      setScanResults(mockScanResults);
      setIsScanning(false);
    }, 2000);
  };

  const missingItems = scanResults.filter(item => !item.present).map(item => item.name);

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-gray-500">Upload a photo of your emergency kit</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
          "
        />
        
        {preview && (
          <div className="my-2">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-auto max-h-32 object-cover rounded"
            />
          </div>
        )}
        
        <Button 
          onClick={handleScan} 
          disabled={!file || isScanning}
          className="mt-2"
        >
          {isScanning ? 'Scanning...' : 'Scan Emergency Kit'}
        </Button>
      </div>

      {scanResults.length > 0 && (
        <div className="tool-result mt-4">
          <h4 className="tool-heading">Scan Results:</h4>
          
          {missingItems.length > 0 ? (
            <>
              <p className="text-red-500 font-medium mb-2">Missing items:</p>
              <ul className="tool-list">
                {missingItems.map((item, index) => (
                  <li key={index} className="text-red-500">{item}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-green-600 font-medium">Your emergency kit looks complete!</p>
          )}
          
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {Math.floor(((scanResults.length - missingItems.length) / scanResults.length) * 100)}% complete
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyKitScanner;
