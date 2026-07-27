import { useState } from 'react';
import DirectoryHeader from '@/components/DirectoryHeader';
import DirectoryHero from '@/components/DirectoryHero';
import CollegeDirectory from '@/components/CollegeDirectory';
import DirectoryAbout from '@/components/DirectoryAbout';
import DirectoryFooter from '@/components/DirectoryFooter';
import CollegeModal from '@/components/CollegeModal';
import CollegeChatbot from '@/components/CollegeChatbot';
import { College } from '@/data/collegesData';

function App() {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <DirectoryHeader />
      <main>
        <DirectoryHero />
        <CollegeDirectory onSelectCollege={setSelectedCollege} />
        <DirectoryAbout />
      </main>
      <DirectoryFooter />
      <CollegeModal college={selectedCollege} onClose={() => setSelectedCollege(null)} />
      <CollegeChatbot />
    </div>
  );
}

export default App;
