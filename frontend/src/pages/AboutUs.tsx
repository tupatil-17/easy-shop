import React from 'react';
import { ShieldCheck, Truck, Lock, Star, Target, TrendingUp } from 'lucide-react';

const AboutUs: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-pink-600" />,
      title: 'Verified Sellers',
      description: 'Shop with confidence from admin-approved and trusted sellers.'
    },
    {
      icon: <Lock className="w-8 h-8 text-pink-600" />,
      title: 'Secure Payments',
      description: 'Your transactions are protected with industry-standard encryption.'
    },
    {
      icon: <Truck className="w-8 h-8 text-pink-600" />,
      title: 'Reliable Delivery',
      description: 'Fast and dependable shipping to your doorstep.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-pink-600" />,
      title: 'Data Security',
      description: 'We prioritize the safety of your personal and payment information.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            About <span className="text-pink-600">EasyShop</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted destination for a safe, secure, and seamless e-commerce experience.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="text-pink-600" /> Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Established in 2026, EasyShop was born from a vision to build a trusted, secure, and scalable e-commerce platform. We believe that online shopping should be worry-free, which is why we meticulously verify every seller on our platform.
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="text-pink-600" /> Our Goal
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our ambition is to become one of the world's largest e-commerce platforms by prioritizing user trust and security above all else. We are committed to constant innovation and excellence in service.
              </p>
            </div>
            <div className="bg-pink-50 rounded-xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Star className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Quality Guaranteed</h4>
                    <p className="text-gray-600">Only the best for our customers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Verified Sellers</h4>
                    <p className="text-gray-600">Every seller is admin-approved.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Lock className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Safe Shopping</h4>
                    <p className="text-gray-600">Secure payments and data protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center text-gray-500 text-sm">
          <p>© 2026 EasyShop. Built with trust and security.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
