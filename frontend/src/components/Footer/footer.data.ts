import { Instagram, Linkedin, LucideIcon } from 'lucide-react';

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
      { label: 'About Us', href: '/about-us' },
      { label: 'Career', href: '/career' },
    ],
  },
  {
    title: 'HELP',
    links: [
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'POLICIES',
    links: [
      { label: 'Terms of Use', href: '/terms-of-use' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Security', href: '/security' },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/tushar-patil-a51448227', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/tusshar__patil_?igsh=MXJwN3c3a2w4eHNvZg==', label: 'Instagram' },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { label: 'VISA' },
  { label: 'MC' },
  { label: 'UPI' },
];

export const COPYRIGHT_YEAR = 2026;
