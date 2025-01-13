import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Privacy Policy | ELEKTRO-MASSIVE";

  const description =
    "Privacy Policy for ELEKTRO-MASSIVE website. Learn how we collect, use and protect your personal information, including Google Sign-In data and cookies policy.";

  return {
    title,
    description,
  };
}

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="text-sm text-gray-600 mb-8">
        Last updated: October 29, 2024
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to elektromassive.com (&quot;Website&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;). This Privacy Policy explains how
          we collect, use, and protect your information when you use our website
          and related services, including authentication through Google Account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Information We Collect
        </h2>

        <h3 className="text-xl font-semibold mb-3">
          2.1. Google Account Information
        </h3>
        <p className="mb-4">
          When you use Google Sign-In, we receive access to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Your Google email address</li>
          <li>Your Google profile name</li>
          <li>Your Google ID</li>
          <li>Your profile picture (if available)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">
          2.2. Additional Information You Provide:
        </h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Phone number (optional)</li>
          <li>Delivery address (if required)</li>
          <li>Other contact information</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">
          2.3. Automatically Collected Information:
        </h3>
        <ul className="list-disc pl-6 mb-4">
          <li>IP address</li>
          <li>Browser type and operating system</li>
          <li>Date and time of visits</li>
          <li>Pages you view</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. How We Use Your Information
        </h2>
        <p className="mb-4">We use the collected information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Authenticate your account</li>
          <li>Provide access to website features</li>
          <li>Personalize your experience</li>
          <li>Secure your account</li>
          <li>Communicate with you about our services</li>
          <li>Improve our website and services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Google OAuth and Security
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>We use Google OAuth 2.0 for secure authentication</li>
          <li>We do not store your Google password</li>
          <li>We do not have access to other Google account data</li>
          <li>
            You can revoke access to your Google account at any time through
            your Google Account settings
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Protection</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to
          protect your personal data, including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Data encryption</li>
          <li>Secure data transmission protocols</li>
          <li>Regular security system updates</li>
          <li>Limited staff access to personal data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Data Sharing with Third Parties
        </h2>
        <p className="mb-4">We may share your data with:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Google (for authentication)</li>
          <li>Cloud service providers</li>
          <li>Payment processors</li>
          <li>Government authorities (if required by law)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
        <p className="mb-4">We use cookies for:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Supporting Google Sign-In functionality</li>
          <li>Ensuring security</li>
          <li>Analyzing website usage</li>
          <li>Saving your preferences</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Delete your data</li>
          <li>Revoke Google Account access</li>
          <li>Restrict data processing</li>
          <li>File a complaint with data protection authorities</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          9. International Data Transfers
        </h2>
        <p className="mb-4">
          Your data may be processed outside your country where Google servers
          and our servers are located. We ensure appropriate levels of data
          protection in accordance with international standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          10. Children&apos;s Privacy
        </h2>
        <p className="mb-4">
          Our services are not intended for children under 13 years of age. We
          do not knowingly collect personal information from children under 13.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          11. Changes to Privacy Policy
        </h2>
        <p className="mb-4">
          We reserve the right to update this Privacy Policy. We will notify you
          of any significant changes via email or through our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">12. Language</h2>
        <p className="mb-4">
          This Privacy Policy is published in English. If we provide
          translations into other languages, the English version shall prevail
          in case of conflicts.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or our data
          practices, please contact us:
        </p>
        <p className="mb-2">
          Email:{" "}
          <Link
            href={`mailto:elektromassive@gmail.com`}
            className="text-blue-600 hover:text-blue-800"
          >
            elektromassive@gmail.com
          </Link>
        </p>
        <p>
          Website:{" "}
          <Link
            href="https://elektromassive.com"
            className="text-blue-600 hover:text-blue-800"
          >
            https://elektromassive.com
          </Link>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">14. Consent</h2>
        <p className="mb-4">
          By using our website and Google Sign-In feature, you agree to the
          terms of this Privacy Policy.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
