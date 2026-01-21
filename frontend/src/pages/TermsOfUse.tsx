import React from 'react';
import { ScrollText, ShieldAlert, UserCheck, ShoppingBag, Scale, AlertTriangle, RefreshCw } from 'lucide-react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
            <ScrollText className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Terms of <span className="text-pink-600">Use</span>
          </h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using the EasyShop platform.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <UserCheck className="text-pink-600" /> 1. Platform Usage Rules
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>By accessing EasyShop, you agree to comply with all applicable laws and regulations. You must be at least 18 years old to create an account and make purchases. The platform is intended for lawful retail purposes only.</p>
                <p>Any attempt to disrupt the platform's services, scrape data, or use it for fraudulent activities will result in immediate termination of access.</p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <ShieldAlert className="text-pink-600" /> 2. User Responsibilities
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Providing accurate and complete registration information.</li>
                <li>Maintaining the confidentiality of your account credentials.</li>
                <li>Ensuring all activities under your account comply with these terms.</li>
                <li>Promptly notifying support of any unauthorized account access.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <ShoppingBag className="text-pink-600" /> 3. Seller Responsibilities
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>All sellers must undergo admin verification before listing products. Sellers are responsible for the accuracy of product descriptions, images, and inventory levels. All products must be approved by our administration team before going live.</p>
                <p>Sellers must fulfill orders promptly and adhere to the platform's quality and shipping standards.</p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Scale className="text-pink-600" /> 4. Product Availability and Pricing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We strive for accuracy, but errors in pricing or availability may occur. EasyShop and its sellers reserve the right to cancel orders arising from such errors. All prices are subject to change without prior notice.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="text-pink-600" /> 5. Account Suspension or Termination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                EasyShop reserves the right to suspend or terminate any user or seller account that violates these terms, engages in fraudulent behavior, or negatively impacts the platform's integrity. Termination can be carried out with or without prior notice.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <ShieldAlert className="text-pink-600" /> 6. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                EasyShop provides the platform "as is" and shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform or the purchase of any products listed by third-party sellers.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <RefreshCw className="text-pink-600" /> 7. Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these terms from time to time to reflect changes in our services or legal obligations. Continued use of the platform after such updates constitutes your acceptance of the new terms.
              </p>
            </section>

          </div>
          
          <div className="bg-gray-50 p-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Last Updated: January 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
