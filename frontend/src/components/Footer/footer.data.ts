import { Facebook, Twitter, Instagram, Youtube, LucideIcon } from 'lucide-react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSectionData {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface PaymentMethod {
  label: string;
}

export const FOOTER_SECTIONS: FooterSectionData[] = [
  {
    title: 'ABOUT EASYSHOP',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'HELP',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Track Order', href: '/order-tracking' },
    ],
  },
  {
    title: 'POLICIES',
    links: [
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Security', href: '/security' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { label: 'VISA' },
  { label: 'MC' },
  { label: 'UPI' },
];

export const COPYRIGHT_YEAR = 2026;
