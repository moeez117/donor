import React, { useState } from 'react';
import { 
  ArrowRight, 
  Camera, 
  Globe,
  BarChart3,
  Download,
  Sparkles
} from 'lucide-react';
import ImpactHeader from './ImpactHeader';
import ImpactTabs from './ImpactTabs';
import ImpactContent from './ImpactContent';
import MediaModal from './MediaModal';

const RealTimeImpactTracking = () => {
  const [activeTab, setActiveTab] = useState('journey');
  const [selectedLocation, setSelectedLocation] = useState('Doha');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [donationAmount, setDonationAmount] = useState(100);
  const [savedItems, setSavedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [expandedSection, setExpandedSection] = useState(null);
  const [timeframe, setTimeframe] = useState('monthly');

  // Sample data
  const donationJourney = [
    {
      step: 1,
      title: "Donation Made",
      status: "completed",
      timestamp: "2024-01-15 10:30:00",
      description: "Your donation has been successfully processed and encrypted",
      icon: ArrowRight,
      details: "Transaction ID: TX-789456123 | Amount: $100 | Method: Credit Card"
    },
    {
      step: 2,
      title: "Charity Received",
      status: "completed",
      timestamp: "2024-01-16 14:20:00",
      description: "Funds received and allocated by charity organization",
      icon: Download,
      details: "Organization: Hope Foundation | Allocation: Emergency Relief"
    },
    {
      step: 3,
      title: "Beneficiary Delivered",
      status: "current",
      timestamp: "2024-01-18 09:15:00",
      description: "Aid packages delivered to 25 families in the community",
      icon: Globe,
      details: "Location: Doha District | Beneficiaries: 125 people | Items: Food & Medical Supplies"
    }
  ];

  const mediaProof = [
    {
      id: 1,
      type: "image",
      title: "Food Distribution Center",
      location: "Doha",
      date: "2024-01-18",
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      verified: true,
      likes: 42,
      description: "Weekly food distribution serving 200+ families with fresh meals and essential supplies",
      tags: ["food", "distribution", "community"]
    },
    {
      id: 2,
      type: "image",
      title: "Medical Aid Delivery",
      location: "Al Rayyan",
      date: "2024-01-17",
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      verified: true,
      likes: 28,
      description: "Mobile medical clinic providing healthcare services to underserved communities",
      tags: ["medical", "healthcare", "clinic"]
    },
    {
      id: 3,
      type: "image",
      title: "Education Materials",
      location: "Al Wakrah",
      date: "2024-01-15",
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      verified: true,
      likes: 36,
      description: "Distribution of educational materials and school supplies to local schools",
      tags: ["education", "school", "materials"]
    }
  ];

  const locations = [
    { name: "Doha", donations: 1247, active: true, progress: 83 },
    { name: "Al Rayyan", donations: 856, active: true, progress: 57 },
    { name: "Al Wakrah", donations: 543, active: true, progress: 36 },
    { name: "Al Khor", donations: 321, active: false, progress: 21 }
  ];

  const handleSaveItem = (itemId) => {
    setSavedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDonate = () => {
    alert(`Thank you for your donation of $${donationAmount}!`);
  };

  const tabs = [
    { id: 'journey', label: 'Donation Journey', icon: ArrowRight },
    { id: 'media', label: 'Media Proof', icon: Camera },
    { id: 'map', label: 'Interactive Map', icon: Globe },
    { id: 'analytics', label: 'Impact Analytics', icon: BarChart3 }
  ];

  return (
    <div className="
      min-h-screen 
      bg-gradient-to-br from-emerald-50 via-white to-teal-50 
      py-6 sm:py-8 lg:py-12 
      px-3 sm:px-4 lg:px-6
    ">
      <div className="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 lg:space-y-10">
        <ImpactHeader 
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
          handleDonate={handleDonate}
        />
        
        <ImpactTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />

        <ImpactContent
          activeTab={activeTab}
          donationJourney={donationJourney}
          mediaProof={mediaProof}
          locations={locations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
          savedItems={savedItems}
          handleSaveItem={handleSaveItem}
          setSelectedMedia={setSelectedMedia}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />

        {selectedMedia && (
          <MediaModal
            media={selectedMedia}
            onClose={() => setSelectedMedia(null)}
            savedItems={savedItems}
            handleSaveItem={handleSaveItem}
          />
        )}
      </div>
    </div>
  );
};

export default RealTimeImpactTracking;
