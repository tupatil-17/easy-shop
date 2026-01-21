import React from 'react';
import { Mail, Briefcase, Users, Rocket } from 'lucide-react';

const Career: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Join the <span className="text-pink-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us build the future of trusted e-commerce.
          </p>
        </div>

        {/* Hero Image/Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-12">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8 text-white text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-2">Build Something Great</h2>
            <p className="text-pink-100">Innovating for trust and security in every transaction.</p>
          </div>
          
          <div className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-yellow-50 rounded-full mb-6 text-yellow-800 font-medium text-sm">
              <Rocket className="w-4 h-4 mr-2" />
              Currently Not Hiring
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">We're taking a short break!</h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We are currently focusing on scaling our current team and operations. While we don't have any open positions at the moment, we're always interested in meeting talented individuals who are passionate about e-commerce and security.
            </p>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Mail className="text-pink-600" /> Want to be considered for future roles?
              </h4>
              <p className="text-gray-600 mb-6">
                Send your resume to our recruitment team, and we'll keep you in our talent pool.
              </p>
              <a 
                href="mailto:tusharpatil170102001@gmail.com" 
                className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-700 transition shadow-md"
              >
                tusharpatil170102001@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="bg-pink-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-pink-600 w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Our Culture</h4>
            <p className="text-gray-600">
              We foster an environment of trust, transparency, and innovation. Every team member's voice matters as we build the future of e-commerce.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <div className="bg-pink-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Rocket className="text-pink-600 w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h4>
            <p className="text-gray-600">
              Working together to create a secure and scalable platform that empowers verified sellers and protects every shopper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
