import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "JoNeX AI Terms of Service governing use of our platform and services.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="December 25, 2025">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of the JoNeX
        AI platform, website, and services operated by JoNeX (&quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;). By using our services, you agree to
        these Terms.
      </p>

      <h2>1. Services</h2>
      <p>
        JoNeX provides AI-powered voice agents, chatbots, and automation
        services for businesses. Our services include:
      </p>
      <ul>
        <li>AI voice agents that handle inbound and outbound phone calls.</li>
        <li>Facebook Messenger chatbot for automated customer engagement.</li>
        <li>Comment-to-DM automation on Facebook Pages.</li>
        <li>CRM integration and workflow automation.</li>
        <li>Appointment scheduling and lead qualification.</li>
      </ul>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and have the legal capacity to enter
        into a binding agreement to use our services. If you use our services on
        behalf of a business, you represent that you have the authority to bind
        that business to these Terms.
      </p>

      <h2>3. User Responsibilities</h2>
      <p>When using our services, you agree to:</p>
      <ul>
        <li>Provide accurate and complete information.</li>
        <li>Use our services only for lawful purposes.</li>
        <li>
          Not attempt to abuse, exploit, or interfere with our AI agents or
          systems.
        </li>
        <li>
          Not use our services to send spam, harass others, or engage in
          fraudulent activity.
        </li>
        <li>
          Comply with all applicable laws and regulations, including those
          related to automated communications and telemarketing.
        </li>
      </ul>

      <h2>4. AI-Generated Content</h2>
      <p>
        Our AI agents generate responses based on the input they receive. While
        we strive for accuracy, AI-generated responses may occasionally contain
        errors or inaccuracies. JoNeX is not liable for decisions made based on
        AI-generated content. Our AI agents are not a substitute for
        professional advice (legal, medical, financial, or otherwise).
      </p>

      <h2>5. Facebook and Meta Platform</h2>
      <p>
        Our Messenger chatbot and Comment-to-DM features operate on the Meta
        (Facebook) platform. By interacting with our services through Facebook,
        you also agree to Meta&apos;s Terms of Service and Privacy Policy. We
        access your Facebook data only through permissions you or your page
        administrator have granted, and we use this data solely to provide our
        services.
      </p>

      <h2>6. Client Services</h2>
      <p>
        For businesses that engage JoNeX to build and operate AI agents:
      </p>
      <ul>
        <li>
          Services are provided on a month-to-month basis unless otherwise
          agreed in writing.
        </li>
        <li>Either party may terminate with 30 days&apos; written notice.</li>
        <li>
          You retain ownership of your business data. We retain the right to use
          anonymized, aggregated data to improve our services.
        </li>
        <li>
          We will provide reasonable support and maintenance for active service
          agreements.
        </li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <p>
        All JoNeX technology, including our AI models, workflows, integrations,
        website content, and branding, remains our intellectual property. You
        may not copy, modify, distribute, or reverse-engineer any part of our
        platform without written permission.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, JoNeX shall not be liable for
        any indirect, incidental, special, consequential, or punitive damages
        arising from your use of our services. Our total liability for any claim
        shall not exceed the amount you paid us in the 12 months preceding the
        claim.
      </p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>
        Our services are provided &quot;as is&quot; and &quot;as available&quot;
        without warranties of any kind, whether express or implied. We do not
        guarantee that our AI agents will be error-free, uninterrupted, or meet
        your specific requirements. We make reasonable efforts to ensure uptime
        and accuracy but cannot guarantee either.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless JoNeX, its founders, employees,
        and partners from any claims, damages, or expenses arising from your use
        of our services, your violation of these Terms, or your violation of any
        applicable law.
      </p>

      <h2>11. Modifications</h2>
      <p>
        We may update these Terms from time to time. We will notify you of
        significant changes by posting the updated Terms on this page. Your
        continued use of our services after changes are posted constitutes
        acceptance of the updated Terms.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with
        applicable laws. Any disputes arising under these Terms shall be
        resolved through good-faith negotiation, and if necessary, through
        binding arbitration.
      </p>

      <h2>13. Contact Us</h2>
      <p>If you have questions about these Terms, contact us at:</p>
      <ul>
        <li>JoNeX AI</li>
        <li>
          Email: <a href="mailto:jnex2130@gmail.com">jnex2130@gmail.com</a>
        </li>
        <li>Website: jonex.site</li>
      </ul>
    </LegalPage>
  );
}
