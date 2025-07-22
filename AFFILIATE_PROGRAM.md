# RoyaltyX Affiliate Program

Our affiliate program rewards you for sharing RoyaltyX with your network. You'll earn a recurring commission for every customer who joins through your referral link.

## Incentives
- **20% commission on paid plans** for each referral
- **Monthly bonus tiers** for high performers
- **Early payout options** when you reach the minimum threshold
- **Marketing assets** to help you promote RoyaltyX

## How It Works
1. Sign up for an affiliate account on our website.
2. Receive your unique referral link.
3. Share the link via social media, blogs, or email.
4. Earn commissions whenever someone subscribes using your link.

### API Usage
- `POST /affiliate/signup/` – register as an affiliate and get your code
- `GET /affiliate/referrals/` – check users who signed up with your link
When new users register, include `referral_code` in the payload or `?ref=<code>` in the URL to credit the referral.

Ready to get started? Visit our dashboard to apply and begin earning today!
