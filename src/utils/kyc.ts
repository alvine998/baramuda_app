export const isKycVerified = (user: any): boolean => {
  if (!user) {
    return false;
  }

  const normalizeStatus = (status?: string) => {
    if (!status || typeof status !== 'string') return '';
    return status.trim().toLowerCase();
  };

  const status = normalizeStatus(
    user.kycStatus || user.kyc_level || user.statusKyc || user.verificationStatus
  );

  if (['verified', 'approved', 'completed', 'success', 'done'].includes(status)) {
    return true;
  }

  if (typeof user.kycVerified === 'boolean') {
    return user.kycVerified;
  }

  if (typeof user.isKycVerified === 'boolean') {
    return user.isKycVerified;
  }

  if (typeof user.kycStatus === 'boolean') {
    return user.kycStatus;
  }

  return false;
};


