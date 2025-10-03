import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { Book, Trophy, Calendar, Sparkles } from "lucide-react";
import { getTodaysWord, getLearnedWordsCount, getTotalWordsWithSentences, getAllWords } from "@/lib/wordStorage";

const Home = () => {
  const navigate = useNavigate();
  const todaysWord = getTodaysWord();
  const learnedCount = getLearnedWordsCount();
  const sentencesCount = getTotalWordsWithSentences();
  const totalWords = getAllWords().length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Book className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              WordMaster
            </h1>
          </div>
          <p className="text-muted-foreground">
            Expand your vocabulary, one word at a time
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard 
            icon={Trophy} 
            label="Words Learned" 
            value={learnedCount}
            iconColor="text-success"
          />
          <StatsCard 
            icon={Calendar} 
            label="Sentences Written" 
            value={sentencesCount}
            iconColor="text-accent"
          />
        </div>

        {/* Daily Word Card */}
        <div className="bg-card rounded-2xl p-8 shadow-elevated border border-border space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Today's Word</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-primary capitalize">
              {todaysWord.word}
            </h3>
            
            <p className="text-lg text-foreground leading-relaxed">
              {todaysWord.meaning}
            </p>

            <div className="pt-4 border-t border-border">
              <p className="text-sm italic text-muted-foreground">
                "{todaysWord.example}"
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate(`/word/${todaysWord.id}`)}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-lg py-6"
            size="lg"
          >
            Practice This Word
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/review")}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Book className="w-5 h-5 mr-2" />
            Review My Progress
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {totalWords} words available • New word daily
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
