import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { luckyDrawApi } from '@/db/api';
import { Trophy, Gift } from 'lucide-react';
import { SpinWheel } from '@/components/ui/SpinWheel';
import type { LuckyDrawHistory, LuckyDrawConfig } from '@/types/types';

export default function LuckyDrawPage() {
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [canSpin, setCanSpin] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [history, setHistory] = useState<LuckyDrawHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalWon, setTotalWon] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(0);
  const [rewards, setRewards] = useState<LuckyDrawConfig[]>([]);
  const [wheelSegments, setWheelSegments] = useState<Array<{
    label: string;
    color: string;
    value: number;
  }>>([]);
  const [winningIndex, setWinningIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    loadData();
  }, [profile]);

  // Generate vibrant colors for wheel segments
  const generateWheelColors = (count: number): string[] => {
    const colors = [
      '#3b82f6', // Blue
      '#10b981', // Green
      '#8b5cf6', // Purple
      '#f59e0b', // Orange
      '#ec4899', // Pink
      '#ef4444', // Red
      '#6366f1', // Indigo
      '#14b8a6', // Teal
      '#f97316', // Orange-red
      '#06b6d4', // Cyan
      '#8b5cf6', // Violet
      '#84cc16', // Lime
    ];
    
    // If we need more colors than available, cycle through them
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(colors[i % colors.length]);
    }
    return result;
  };

  const loadData = async () => {
    if (!profile) return;
    
    try {
      setLoading(true);
      
      // Fetch active rewards from admin settings
      const activeRewards = await luckyDrawApi.getActiveRewards();
      setRewards(activeRewards);
      
      // Generate wheel segments from active rewards
      if (activeRewards.length > 0) {
        const colors = generateWheelColors(activeRewards.length);
        const segments = activeRewards.map((reward, index) => ({
          label: reward.reward_name,
          color: colors[index],
          value: reward.reward_amount,
        }));
        setWheelSegments(segments);
      }
      
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
      toast({
        title: 'Error',
        description: 'Failed to load lucky draw data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSpin = async () => {
    if (!profile || !canSpin || spinning) return;

    try {
      // Call backend API first to get the actual winning reward
      const result = await luckyDrawApi.spin(profile.id);
      
      // Find the index of the winning reward in the segments array
      const winIndex = rewards.findIndex(
        (reward) => reward.reward_name === result.reward_name
      );
      
      if (winIndex === -1) {
        throw new Error('Winning reward not found in segments');
      }
      
      // Set the winning index and start spinning
      setWinningIndex(winIndex);
      setSpinning(true);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to spin',
        variant: 'destructive',
      });
    }
  };

  const handleSpinEnd = async (winningIdx: number) => {
    if (!profile) return;

    try {
      // Refresh profile to get updated balance
      await refreshProfile();
      
      // Get the reward details from the winning index
      const wonReward = rewards[winningIdx];
      
      toast({
        title: 'Congratulations! 🎉',
        description: `You won ${wonReward.reward_name}! ₹${wonReward.reward_amount} has been added to your balance.`,
      });

      setCanSpin(false);
      setSpinsLeft(0);
      await loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to process reward',
        variant: 'destructive',
      });
    } finally {
      setSpinning(false);
      setWinningIndex(undefined);
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
            {loading ? (
              <div className="flex flex-col items-center gap-6 py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Loading lucky draw...</p>
              </div>
            ) : wheelSegments.length === 0 ? (
              <div className="flex flex-col items-center gap-6 py-12">
                <Gift className="h-16 w-16 text-muted-foreground opacity-50" />
                <div className="text-center">
                  <p className="font-semibold text-lg">No Rewards Available</p>
                  <p className="text-muted-foreground text-sm">
                    Lucky draw rewards are being configured. Please check back later!
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <SpinWheel
                  segments={wheelSegments}
                  isSpinning={spinning}
                  onSpinEnd={handleSpinEnd}
                  winningIndex={winningIndex}
                />
                
                <Button
                  onClick={handleSpin}
                  disabled={!canSpin || spinning || wheelSegments.length === 0}
                  size="lg"
                  className="w-full max-w-xs h-12 text-lg font-semibold"
                >
                  {spinning ? 'Spinning...' : canSpin ? 'Spin Now!' : 'Come Back Tomorrow'}
                </Button>
              </div>
            )}
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
