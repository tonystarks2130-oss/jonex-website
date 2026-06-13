import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "JoNeX AI Privacy Policy. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="December 25, 2025">
      <p>
        JoNeX (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the
        JoNeX AI platform, including our website, Facebook Messenger chatbot,
        voice AI agents, and related services. This Privacy Policy explains how
        we collect, use, and protect your information when you interact with our
        services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        When you interact with our services, we may collect the following types
        of information:
      </p>
      <ul>
        <li>
          <strong>Contact information:</strong> Name, email address, phone
          number, and business name that you provide when booking a call or
          contacting us.
        </li>
        <li>
          <strong>Messaging data:</strong> Messages you send to our Facebook
          Page via Messenger or comments you post on our Facebook Page. This
          includes your Facebook public profile name and profile picture.
        </li>
        <li>
          <strong>Voice call data:</strong> Call recordings, transcripts, and
          metadata from calls handled by our AI voice agents, when you call a
          phone number connected to our service.
        </li>
        <li>
          <strong>Scheduling data:</strong> Appointment details when you book
          through our scheduling system.
        </li>
        <li>
          <strong>Usage data:</strong> How you interact with our website,
          including pages visited and time spent.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>
          Respond to your messages and inquiries via Facebook Messenger and
          other channels.
        </li>
        <li>Provide AI-powered voice agent services for businesses you call.</li>
        <li>Schedule and manage appointments.</li>
        <li>Improve our AI agents and service quality.</li>
        <li>
          Send follow-up communications related to your inquiry (with your
          consent).
        </li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. AI and Automated Processing</h2>
      <p>
        Our services use artificial intelligence to process your messages and
        voice calls. When you message our Facebook Page or call a number
        connected to our service, an AI agent processes your input to generate
        relevant responses. Your conversation data may be sent to third-party AI
        providers (such as OpenRouter and Google) for processing. These
        providers process the data solely to generate responses and do not use
        it for their own purposes beyond what their terms of service specify.
      </p>

      <h2>4. Data Sharing</h2>
      <p>We do not sell your personal information. We may share your data with:</p>
      <ul>
        <li>
          <strong>AI processing providers:</strong> OpenRouter (United States)
          for AI response generation.
        </li>
        <li>
          <strong>Hosting providers:</strong> Hostinger for cloud
          infrastructure.
        </li>
        <li>
          <strong>Meta Platforms:</strong> As required to operate our Facebook
          Messenger integration.
        </li>
        <li>
          <strong>Our clients:</strong> If you contact a business that uses our
          AI agent services, your interaction data (messages, call transcripts,
          appointment details) is shared with that business as their customer
          data.
        </li>
        <li>
          <strong>Legal requirements:</strong> When required by law, regulation,
          or legal process.
        </li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>
        We retain your data for as long as necessary to provide our services and
        fulfill the purposes described in this policy. Messenger conversation
        history is retained for the duration of our service relationship with
        the business you contacted. You may request deletion of your data at any
        time (see Section 8).
      </p>

      <h2>6. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to
        protect your personal information, including encrypted connections
        (HTTPS/TLS), access controls, and secure infrastructure. However, no
        method of transmission over the Internet is 100% secure.
      </p>

      <h2>7. Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request deletion of your data.</li>
        <li>Object to or restrict processing of your data.</li>
        <li>Data portability.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{" "}
        <a href="mailto:jnex2130@gmail.com">jnex2130@gmail.com</a>.
      </p>

      <h2>8. Data Deletion</h2>
      <p>
        You can request deletion of your data at any time by visiting our{" "}
        <a href="/data-deletion">Data Deletion page</a> or emailing us at{" "}
        <a href="mailto:jnex2130@gmail.com">jnex2130@gmail.com</a>. We will
        process your request within 30 days.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Our website does not use cookies or tracking technologies. We do not use
        analytics services that track individual users.
      </p>

      <h2>10. Children&apos;s Privacy</h2>
      <p>
        Our services are not directed to children under 13. We do not knowingly
        collect personal information from children. If you believe we have
        collected data from a child, please contact us immediately.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of significant changes by posting the updated policy on this page with a
        revised &quot;Last updated&quot; date.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices,
        contact us at:
      </p>
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
