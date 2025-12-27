import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { companyApi, userProductApi, transactionApi } from '@/db/api';
import { Wallet, TrendingUp, DollarSign, Gift, Info } from 'lucide-react';
import type { CompanySetting, UserProduct, Transaction } from '@/types/types';

export default function HomePage() {
  const { profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [companySettings, setCompanySettings] = useState<Record<string, string>>({});
  const [activeProducts, setActiveProducts] = useState<UserProduct[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadData();
  }, [profile]);

  const loadData = async () => {
    if (!profile) return;
    
    try {
      setLoading(true);
      
      // Load company settings
      const settings = await companyApi.getAllSettings();
      const settingsMap: Record<string, string> = {};
      settings.forEach((s: CompanySetting) => {
        settingsMap[s.key] = s.value;
      });
      setCompanySettings(settingsMap);

      // Load active products
      const products = await userProductApi.getActiveUserProducts(profile.id);
      setActiveProducts(products);

      // Load recent transactions
      const transactions = await transactionApi.getUserTransactions(profile.id, 5);
      setRecentTransactions(transactions);

      await refreshProfile();
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-48 w-full bg-muted" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 bg-muted" />
          <Skeleton className="h-24 bg-muted" />
        </div>
        <Skeleton className="h-32 bg-muted" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Company Banner */}
      {companySettings.banner_url && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={companySettings.banner_url}
            alt="Company Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Company Notice */}
        {companySettings.company_notice && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>{companySettings.company_notice}</AlertDescription>
          </Alert>
        )}

        {/* Wallet Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              My Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-2xl font-bold text-primary">
                  ${profile?.balance?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-success">
                  ${profile?.total_earnings?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Withdrawable</p>
                <p className="text-2xl font-bold text-accent">
                  ${profile?.withdrawable_balance?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => navigate('/recharge')} className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Recharge
              </Button>
              <Button onClick={() => navigate('/withdrawal')} variant="outline" className="w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Assets */}
        <Card>
          <CardHeader>
            <CardTitle>My Assets</CardTitle>
          </CardHeader>
          <CardContent>
            {activeProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active investments</p>
                <Button onClick={() => navigate('/products')} className="mt-4">
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.product?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Daily: ${product.daily_earning.toFixed(2)} | Days left: {product.days_remaining}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">
                        ${product.total_earned.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">Earned</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Check-in Bonus */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Daily Lucky Draw
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Spin the wheel once per day for bonus rewards!
            </p>
            <Button onClick={() => navigate('/lucky-draw')} className="w-full" variant="secondary">
              Try Your Luck
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        {recentTransactions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium capitalize">{tx.type.replace('_', ' ')}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className={`font-bold ${tx.amount >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {tx.amount >= 0 ? '+' : ''}${tx.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => navigate('/profile')}
                variant="link"
                className="w-full mt-2"
              >
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Company Details */}
        {companySettings.company_details && (
          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {companySettings.company_details}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
