import React from 'react';
import { Activity, Shield, Database, Search, Lock, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">MedChain</span>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Secure Patient Records on the{' '}
            <span className="text-blue-500">Blockchain</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            MedChain revolutionizes healthcare record management by combining
            blockchain security with seamless accessibility for healthcare providers.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-blue-500 text-white text-lg px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Using MedChain
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose MedChain?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-blue-500" />}
              title="Secure Storage"
              description="Patient records are encrypted and stored securely on the blockchain, ensuring data integrity and privacy."
            />
            <FeatureCard
              icon={<Database className="h-8 w-8 text-blue-500" />}
              title="Immutable Records"
              description="Once stored, records cannot be altered, providing a reliable audit trail for all medical data."
            />
            <FeatureCard
              icon={<Search className="h-8 w-8 text-blue-500" />}
              title="Easy Access"
              description="Quick and efficient access to patient records while maintaining strict security protocols."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Benefits for Healthcare Providers
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <BenefitCard
              icon={<Lock className="h-6 w-6 text-blue-500" />}
              title="Enhanced Security"
              description="Advanced encryption ensures patient data remains confidential and protected from unauthorized access."
            />
            <BenefitCard
              icon={<Zap className="h-6 w-6 text-blue-500" />}
              title="Improved Efficiency"
              description="Streamlined workflows and instant access to patient records save valuable time in healthcare delivery."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join healthcare providers who trust MedChain for secure patient record management.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-500 text-lg px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Activity className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">MedChain</span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} MedChain. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
      <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-100 rounded-lg mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}