import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { luckyDrawApi } from '@/db/api';
import { Gift, Sparkles, Trophy } from 'lucide-react';
import type { LuckyDrawHistory } from '@/types/types';

export default function LuckyDrawPage() {
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [canSpin, setCanSpin] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [history, setHistory] = useState<LuckyDrawHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [profile]);

  const loadData = async () => {
    if (!profile) return;
    
    try {
      setLoading(true);
      const canSpinToday = await luckyDrawApi.canSpinToday(profile.id);
      setCanSpin(canSpinToday);
      
      const userHistory = await luckyDrawApi.getUserHistory(profile.id, 10);
      setHistory(userHistory);
    } catch (error) {
      console.error('Error loading lucky draw data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSpin = async () => {
    if (!profile || !canSpin) return;

    try {
      setSpinning(true);
      const result = await luckyDrawApi.spin(profile.id);
      
      await refreshProfile();
      
      toast({
        title: 'Congratulations! 🎉',
        description: `You won ${result.reward_name}! $${result.reward_amount} has been added to your balance.`,
      });

      setCanSpin(false);
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
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Lucky Draw</h1>
          <p className="text-muted-foreground">Spin once per day for bonus rewards!</p>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
              Daily Lucky Spin
              <Sparkles className="h-6 w-6 text-accent" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center py-8">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ${spinning ? 'animate-spin' : ''}`}>
                  <Gift className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            {canSpin ? (
              <Button
                onClick={handleSpin}
                disabled={spinning}
                className="w-full h-12 text-lg"
              >
                {spinning ? 'Spinning...' : 'Spin Now!'}
              </Button>
            ) : (
              <Alert>
                <AlertDescription className="text-center">
                  You have already spun today. Come back tomorrow!
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Your Wins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.reward_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-bold text-success">+${item.reward_amount.toFixed(2)}</p>
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
