import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I create an account?',
      answer: 'Click on the "Sign Up" button in the top right corner. Fill in your username, email (must be @gmail.com), and a secure password to create your account.'
    },
    {
      question: 'How do I buy products?',
      answer: 'Browse products, add them to your bag, and proceed to checkout. We offer a secure and seamless payment experience for all our users.'
    },
    {
      question: 'Are the sellers verified?',
      answer: 'Yes, every seller on EasyShop is manually verified and approved by our admin team to ensure trust and reliability.'
    },
    {
      question: 'How are products approved?',
      answer: 'Before any product goes live, it undergoes a strict review process by our administrators to ensure it meets our quality standards.'
    },
    {
      question: 'Is my payment secure?',
      answer: 'Absolutely. We use industry-standard encryption and secure payment gateways to protect your financial information.'
    },
    {
      question: 'How can I track my delivery?',
      answer: 'Once your order is placed, you can view your order status in the "Orders" section of your profile dashboard.'
    },
    {
      question: 'How is my data protected?',
      answer: 'We have strong data protection policies in place. Your personal information is encrypted and never shared with unauthorized third parties.'
    },
    {
      question: 'How do I become a seller?',
      answer: 'Go to your profile and click on "Apply to be a Service Provider". You will need to provide your Aadhaar and PAN details for verification.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach us through our Contact Us page. We are available Monday to Saturday, 10 AM to 7 PM.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-pink-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Frequently Asked <span className="text-pink-600">Questions</span>
          </h1>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions about EasyShop.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-pink-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Call to Action */}
        <div className="mt-12 bg-pink-50 rounded-2xl p-8 text-center border border-pink-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">We're here to help you with anything you need.</p>
          <a 
            href="/contact-us" 
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-700 transition shadow-md"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
