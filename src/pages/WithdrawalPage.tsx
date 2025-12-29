import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { withdrawalApi } from '@/db/api';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function WithdrawalPage() {
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount',
        variant: 'destructive',
      });
      return;
    }

    if (amountNum > profile.withdrawable_amount) {
      toast({
        title: 'Insufficient Balance',
        description: 'You do not have enough withdrawable balance',
        variant: 'destructive',
      });
      return;
    }

    if (!bankDetails.trim()) {
      toast({
        title: 'Bank Details Required',
        description: 'Please provide your bank details',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      await withdrawalApi.createWithdrawalRequest(profile.id, amountNum, bankDetails);
      await refreshProfile();

      toast({
        title: 'Success!',
        description: 'Withdrawal request submitted. Waiting for admin approval.',
      });

      navigate('/profile');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit withdrawal request',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Withdraw Funds</h1>
          <p className="text-muted-foreground">Request withdrawal from your account</p>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Withdrawable Balance: <span className="font-bold">₹{profile?.withdrawable_amount?.toFixed(2) || '0.00'}</span>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={profile?.withdrawable_amount || 0}
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankDetails">Bank Details *</Label>
                <Textarea
                  id="bankDetails"
                  placeholder="Enter your bank name, account number, and account holder name"
                  value={bankDetails}
                  onChange={(e) => setBankDetails(e.target.value)}
                  disabled={loading}
                  rows={5}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Please provide complete bank details for the transfer
                </p>
              </div>

              <Alert>
                <AlertDescription>
                  After submitting, please wait for admin approval. Funds will be transferred to your bank account once approved.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" disabled={loading || !amount || !bankDetails}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Withdrawal Request'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
