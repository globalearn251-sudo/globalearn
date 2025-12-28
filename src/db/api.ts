import { supabase } from './supabase';
import type {
  Profile,
  Product,
  UserProduct,
  Transaction,
  RechargeRequest,
  WithdrawalRequest,
  DailyEarning,
  Referral,
  LuckyDrawConfig,
  LuckyDrawHistory,
  KycSubmission,
  CompanySetting,
} from '@/types/types';

// Profile API
export const profileApi = {
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data as Profile | null;
  },

  updateProfile: async (userId: string, updates: Partial<Profile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Profile;
  },

  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as Profile[];
  },

  getProfileByReferralCode: async (referralCode: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, referral_code')
      .eq('referral_code', referralCode)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  // Admin function to update user role
  updateUserRole: async (userId: string, role: 'user' | 'admin') => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Profile;
  },
};

// Product API
export const productApi = {
  getAllProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as Product[];
  },

  getAllProductsAdmin: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as Product[];
  },

  getProduct: async (productId: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .maybeSingle();
    
    if (error) throw error;
    return data as Product | null;
  },

  createProduct: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Product;
  },

  updateProduct: async (productId: string, updates: Partial<Product>) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as Product;
  },

  deleteProduct: async (productId: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);
    
    if (error) throw error;
  },

  purchaseProduct: async (userId: string, productId: string) => {
    const { data, error } = await supabase.rpc('purchase_product', {
      p_user_id: userId,
      p_product_id: productId,
    });
    
    if (error) throw error;
    return data;
  },
};

// User Product API
export const userProductApi = {
  getUserProducts: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_products')
      .select('*, product:products(*)')
      .eq('user_id', userId)
      .order('purchased_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as UserProduct[];
  },

  getActiveUserProducts: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_products')
      .select('*, product:products(*)')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('purchased_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as UserProduct[];
  },
};

// Transaction API
export const transactionApi = {
  getUserTransactions: async (userId: string, limit = 50) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as Transaction[];
  },

  getAllTransactions: async (limit = 100) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as Transaction[];
  },
};

// Recharge Request API
export const rechargeApi = {
  createRechargeRequest: async (userId: string, amount: number, screenshotUrl: string) => {
    const { data, error } = await supabase
      .from('recharge_requests')
      .insert({
        user_id: userId,
        amount,
        payment_screenshot_url: screenshotUrl,
      })
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as RechargeRequest;
  },

  getUserRechargeRequests: async (userId: string) => {
    const { data, error } = await supabase
      .from('recharge_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as RechargeRequest[];
  },

  getAllRechargeRequests: async () => {
    const { data, error } = await supabase
      .from('recharge_requests')
      .select('*, user:profiles(username, email)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as RechargeRequest[];
  },

  getPendingRechargeRequests: async () => {
    const { data, error } = await supabase
      .from('recharge_requests')
      .select('*, user:profiles(username, email)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as RechargeRequest[];
  },

  approveRechargeRequest: async (requestId: string, adminId: string, adminNote?: string) => {
    const { data, error } = await supabase.rpc('approve_recharge_request', {
      p_request_id: requestId,
      p_admin_id: adminId,
      p_admin_note: adminNote || null,
    });
    
    if (error) throw error;
    return data;
  },

  rejectRechargeRequest: async (requestId: string, adminId: string, adminNote: string) => {
    const { data, error } = await supabase
      .from('recharge_requests')
      .update({
        status: 'rejected',
        processed_by: adminId,
        processed_at: new Date().toISOString(),
        admin_note: adminNote,
      })
      .eq('id', requestId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as RechargeRequest;
  },
};

// Withdrawal Request API
export const withdrawalApi = {
  createWithdrawalRequest: async (userId: string, amount: number, bankDetails: string) => {
    const { data, error } = await supabase
      .from('withdrawal_requests')
      .insert({
        user_id: userId,
        amount,
        bank_details: bankDetails,
      })
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as WithdrawalRequest;
  },

  getUserWithdrawalRequests: async (userId: string) => {
    const { data, error } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as WithdrawalRequest[];
  },

  getAllWithdrawalRequests: async () => {
    const { data, error } = await supabase
      .from('withdrawal_requests')
      .select('*, user:profiles(username, email)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as WithdrawalRequest[];
  },

  getPendingWithdrawalRequests: async () => {
    const { data, error } = await supabase
      .from('withdrawal_requests')
      .select('*, user:profiles(username, email)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as WithdrawalRequest[];
  },

  approveWithdrawalRequest: async (requestId: string, adminId: string, adminNote?: string) => {
    const { data, error } = await supabase.rpc('approve_withdrawal_request', {
      p_request_id: requestId,
      p_admin_id: adminId,
      p_admin_note: adminNote || null,
    });
    
    if (error) throw error;
    return data;
  },

  rejectWithdrawalRequest: async (requestId: string, adminId: string, adminNote: string) => {
    const { data, error } = await supabase
      .from('withdrawal_requests')
      .update({
        status: 'rejected',
        processed_by: adminId,
        processed_at: new Date().toISOString(),
        admin_note: adminNote,
      })
      .eq('id', requestId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as WithdrawalRequest;
  },
};

// Daily Earnings API
export const earningsApi = {
  getUserEarnings: async (userId: string, limit = 30) => {
    const { data, error } = await supabase
      .from('daily_earnings')
      .select('*')
      .eq('user_id', userId)
      .order('earning_date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as DailyEarning[];
  },
};

// Referral API
export const referralApi = {
  getUserReferrals: async (userId: string) => {
    const { data, error } = await supabase
      .from('referrals')
      .select('*, referred_user:profiles!referrals_referred_id_fkey(id, username, created_at)')
      .eq('referrer_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as Referral[];
  },

  getReferralStats: async (userId: string) => {
    const { data, error } = await supabase
      .from('referrals')
      .select('commission_earned')
      .eq('referrer_id', userId);
    
    if (error) throw error;
    const referrals = Array.isArray(data) ? data : [];
    const totalCommission = referrals.reduce((sum, r) => sum + Number(r.commission_earned), 0);
    return {
      totalReferrals: referrals.length,
      totalCommission,
    };
  },
};

// Lucky Draw API
export const luckyDrawApi = {
  getActiveRewards: async () => {
    const { data, error } = await supabase
      .from('lucky_draw_config')
      .select('*')
      .eq('is_active', true)
      .order('probability', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as LuckyDrawConfig[];
  },

  getAllRewards: async () => {
    const { data, error } = await supabase
      .from('lucky_draw_config')
      .select('*')
      .order('reward_amount', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as LuckyDrawConfig[];
  },

  canSpinToday: async (userId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('lucky_draw_history')
      .select('id')
      .eq('user_id', userId)
      .eq('spin_date', today)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !data;
  },

  spin: async (userId: string) => {
    const { data, error } = await supabase.rpc('spin_lucky_draw', {
      p_user_id: userId,
    });
    
    if (error) throw error;
    return data;
  },

  getUserHistory: async (userId: string, limit = 20) => {
    const { data, error } = await supabase
      .from('lucky_draw_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as LuckyDrawHistory[];
  },

  updateReward: async (rewardId: string, updates: Partial<LuckyDrawConfig>) => {
    const { data, error } = await supabase
      .from('lucky_draw_config')
      .update(updates)
      .eq('id', rewardId)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as LuckyDrawConfig;
  },

  createReward: async (reward: Omit<LuckyDrawConfig, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('lucky_draw_config')
      .insert(reward)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as LuckyDrawConfig;
  },
};

// KYC API
export const kycApi = {
  submitKyc: async (
    userId: string,
    idFrontUrl: string,
    idBackUrl: string,
    bankName: string,
    accountNumber: string,
    accountHolderName: string
  ) => {
    const { data, error } = await supabase
      .from('kyc_submissions')
      .insert({
        user_id: userId,
        id_front_url: idFrontUrl,
        id_back_url: idBackUrl,
        bank_name: bankName,
        account_number: accountNumber,
        account_holder_name: accountHolderName,
      })
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as KycSubmission;
  },

  getUserKyc: async (userId: string) => {
    const { data, error } = await supabase
      .from('kyc_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data as KycSubmission | null;
  },

  getAllKycSubmissions: async () => {
    const { data, error } = await supabase
      .from('kyc_submissions')
      .select('*, user:profiles(username, email)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as KycSubmission[];
  },

  getPendingKycSubmissions: async () => {
    const { data, error } = await supabase
      .from('kyc_submissions')
      .select('*, user:profiles(username, email)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as KycSubmission[];
  },

  approveKyc: async (submissionId: string, adminId: string, adminNote?: string) => {
    const { data, error } = await supabase.rpc('approve_kyc_submission', {
      p_submission_id: submissionId,
      p_admin_id: adminId,
      p_admin_note: adminNote || null,
    });
    
    if (error) throw error;
    return data;
  },

  rejectKyc: async (submissionId: string, adminId: string, adminNote: string) => {
    const { data, error } = await supabase.rpc('reject_kyc_submission', {
      p_submission_id: submissionId,
      p_admin_id: adminId,
      p_admin_note: adminNote,
    });
    
    if (error) throw error;
    return data;
  },

  // Alias functions for admin pages
  approveKycSubmission: async (submissionId: string, adminNote?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    return kycApi.approveKyc(submissionId, user.id, adminNote);
  },

  rejectKycSubmission: async (submissionId: string, adminNote: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    return kycApi.rejectKyc(submissionId, user.id, adminNote);
  },
};

// Company Settings API
export const companyApi = {
  getSetting: async (key: string) => {
    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .eq('key', key)
      .maybeSingle();
    
    if (error) throw error;
    return data as CompanySetting | null;
  },

  getAllSettings: async () => {
    const { data, error } = await supabase
      .from('company_settings')
      .select('*');
    
    if (error) throw error;
    return (Array.isArray(data) ? data : []) as CompanySetting[];
  },

  updateSetting: async (key: string, value: string) => {
    const { data, error } = await supabase
      .from('company_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)
      .select()
      .maybeSingle();
    
    if (error) throw error;
    return data as CompanySetting;
  },
};

// Storage API
export const storageApi = {
  uploadImage: async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('app_8ildgs548gzl_investment_images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) throw error;
    
    const { data: urlData } = supabase.storage
      .from('app_8ildgs548gzl_investment_images')
      .getPublicUrl(data.path);
    
    return urlData.publicUrl;
  },

  deleteImage: async (path: string) => {
    const { error } = await supabase.storage
      .from('app_8ildgs548gzl_investment_images')
      .remove([path]);
    
    if (error) throw error;
  },
};

// Admin wrapper functions that auto-inject adminId
export const adminRechargeApi = {
  approve: async (requestId: string, adminNote?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    return rechargeApi.approveRechargeRequest(requestId, user.id, adminNote);
  },
  reject: async (requestId: string, adminNote: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    return rechargeApi.rejectRechargeRequest(requestId, user.id, adminNote);
  },
};

export const adminWithdrawalApi = {
  approve: async (requestId: string, adminNote?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    return withdrawalApi.approveWithdrawalRequest(requestId, user.id, adminNote);
  },
  reject: async (requestId: string, adminNote: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    return withdrawalApi.rejectWithdrawalRequest(requestId, user.id, adminNote);
  },
};

// Add delete function for Lucky Draw
export const adminLuckyDrawApi = {
  deleteReward: async (rewardId: string) => {
    const { error } = await supabase
      .from('lucky_draw_config')
      .delete()
      .eq('id', rewardId);
    
    if (error) throw error;
  },
};
