import React from 'react';
import { ShieldCheck, Lock, UserCheck, ShieldAlert, CheckCircle, Bell, LifeBuoy } from 'lucide-react';

const Security: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
            <ShieldCheck className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Security <span className="text-pink-600">Center</span>
          </h1>
          <p className="text-xl text-gray-600">
            How we keep your shopping experience safe and secure.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Lock className="text-pink-600" /> 1. Secure Payments
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use top-tier, industry-standard payment gateways. All financial transactions are encrypted using Secure Socket Layer (SSL) technology, ensuring your credit card and banking details are never exposed.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <ShieldCheck className="text-pink-600" /> 2. Data Encryption
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Your personal data is protected by multiple layers of security. We use AES-256 encryption to store sensitive information and ensure that all data transmission between your device and our servers is fully secured.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <UserCheck className="text-pink-600" /> 3. Seller and Product Verification
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>Every seller on EasyShop must pass a manual verification process, including Aadhaar and PAN verification. This ensures you are buying from legitimate businesses.</p>
                <p>Additionally, every product listed is reviewed and approved by our admin team before it becomes visible to customers.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <ShieldAlert className="text-pink-600" /> 4. Admin Moderation
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our security team continuously monitors the platform for suspicious activities. We use advanced algorithms and manual moderation to detect and prevent fraud, ensuring a safe marketplace for everyone.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <CheckCircle className="text-pink-600" /> 5. Account Protection
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We provide tools to keep your account safe, including secure password requirements and session monitoring. We recommend choosing a unique password and never sharing your login details.
              </p>
            </section>

            {/* Section 6 */}
            <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <LifeBuoy className="text-pink-600" /> 6. User Security Tips
              </h2>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">•</span> Use a strong, unique password.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">•</span> Never share your OTP or account password.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">•</span> Keep your browser and OS up to date.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">•</span> Check for the "https://" padlock in your browser.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Bell className="text-pink-600" /> 7. Fraud Prevention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We actively work to prevent phishing and scams. If you receive any suspicious emails or messages claiming to be from EasyShop, please report them to our support team immediately.
              </p>
            </section>

          </div>
          
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8 text-white text-center">
            <h4 className="text-xl font-bold mb-2">Your Security is Our Priority</h4>
            <p className="text-pink-100">Built with trust and security in every line of code.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
