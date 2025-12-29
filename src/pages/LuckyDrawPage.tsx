import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { luckyDrawApi } from '@/db/api';
import { Trophy, Gift } from 'lucide-react';
import { SpinWheel } from '@/components/ui/SpinWheel';
import type { LuckyDrawHistory } from '@/types/types';

export default function LuckyDrawPage() {
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [canSpin, setCanSpin] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [history, setHistory] = useState<LuckyDrawHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalWon, setTotalWon] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(0);

  // Wheel segments with colors matching the image
  const wheelSegments = [
    { label: '₹5', color: '#3b82f6', value: 5 },      // Blue
    { label: '₹10', color: '#10b981', value: 10 },    // Green
    { label: '₹2', color: '#8b5cf6', value: 2 },      // Purple
    { label: '₹20', color: '#f59e0b', value: 20 },    // Orange
    { label: '₹1', color: '#ec4899', value: 1 },      // Pink
    { label: '₹25', color: '#ef4444', value: 25 },    // Red
    { label: '₹3', color: '#6366f1', value: 3 },      // Indigo
    { label: '₹15', color: '#14b8a6', value: 15 },    // Teal
  ];

  useEffect(() => {
    loadData();
  }, [profile]);

  const loadData = async () => {
    if (!profile) return;
    
    try {
      setLoading(true);
      const canSpinToday = await luckyDrawApi.canSpinToday(profile.id);
      setCanSpin(canSpinToday);
      setSpinsLeft(canSpinToday ? 1 : 0);
      
      const userHistory = await luckyDrawApi.getUserHistory(profile.id, 10);
      setHistory(userHistory);
      
      // Calculate total won
      const total = userHistory.reduce((sum, item) => sum + item.reward_amount, 0);
      setTotalWon(total);
    } catch (error) {
      console.error('Error loading lucky draw data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSpin = async () => {
    if (!profile || !canSpin || spinning) return;

    setSpinning(true);
  };

  const handleSpinEnd = async (winningIndex: number) => {
    if (!profile) return;

    try {
      const result = await luckyDrawApi.spin(profile.id);
      
      await refreshProfile();
      
      toast({
        title: 'Congratulations! 🎉',
        description: `You won ${result.reward_name}! ₹${result.reward_amount} has been added to your balance.`,
      });

      setCanSpin(false);
      setSpinsLeft(0);
      await loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to spin',
        variant: 'destructive',
      });
    } finally {
      setSpinning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Lucky Draw</h1>
          <p className="text-muted-foreground">Spin the wheel and win rewards!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Won</p>
                  <p className="text-xl font-bold">₹{totalWon.toFixed(0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Spins Left</p>
                  <p className="text-xl font-bold">{spinsLeft}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spin Wheel */}
        <Card>
          <CardContent className="pt-6 pb-8">
            <div className="flex flex-col items-center gap-6">
              <SpinWheel
                segments={wheelSegments}
                isSpinning={spinning}
                onSpinEnd={handleSpinEnd}
              />
              
              <Button
                onClick={handleSpin}
                disabled={!canSpin || spinning}
                size="lg"
                className="w-full max-w-xs h-12 text-lg font-semibold"
              >
                {spinning ? 'Spinning...' : canSpin ? 'Spin Now!' : 'Come Back Tomorrow'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        {history.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Recent Wins</h3>
              <div className="space-y-2">
                {history.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.reward_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-bold text-success">+₹{item.reward_amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
