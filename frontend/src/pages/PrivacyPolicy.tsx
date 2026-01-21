import React from 'react';
import { ShieldCheck, Eye, Database, Lock, UserCog, Share2, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
            <Eye className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Privacy <span className="text-pink-600">Policy</span>
          </h1>
          <p className="text-xl text-gray-600">
            We value your trust. Here is how we protect your information.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Database className="text-pink-600" /> 1. Information We Collect
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>To provide a secure shopping experience, we collect information you provide directly, such as your name, email address, shipping address, and payment details during account creation or checkout.</p>
                <p>For sellers, we also collect verification details including Aadhaar and PAN information to ensure platform safety.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="text-pink-600" /> 2. How Data is Used
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Processing your orders and managing your account.</li>
                <li>Verifying seller identities and product authenticity.</li>
                <li>Communicating order updates and platform news.</li>
                <li>Improving our services and preventing fraudulent activities.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Lock className="text-pink-600" /> 3. Data Protection Measures
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security protocols to protect your data. All sensitive information is encrypted during transmission and storage. Access to personal data is strictly limited to authorized personnel only.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Eye className="text-pink-600" /> 4. Cookies and Tracking
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies to enhance your browsing experience, remember your preferences, and analyze platform traffic. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Share2 className="text-pink-600" /> 5. Data Sharing Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Your data is never sold to third parties. We only share information with trusted service providers (like shipping partners) necessary to fulfill your orders, or when required by law.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <UserCog className="text-pink-600" /> 6. User Rights and Control
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. You can manage these settings through your profile dashboard or by contacting our support team.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <ShieldCheck className="text-pink-600" /> 7. Policy Updates
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this policy periodically to reflect changes in our practices. We will notify you of any significant changes by posting the new policy on our platform.
              </p>
            </section>

          </div>
          
          <div className="bg-gray-50 p-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Effective Date: January 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
