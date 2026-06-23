import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Data Deletion",
  description:
    "How to request deletion of your personal data from JoNex AI services.",
};

const DELETION_MAILTO =
  "mailto:jeremy@jonex.site?subject=Data%20Deletion%20Request&body=I%20would%20like%20to%20request%20deletion%20of%20my%20data.%20My%20name%20is%3A%20%0AThe%20Facebook%20account%20or%20phone%20number%20associated%20with%20my%20interactions%20is%3A%20";

export default function DataDeletionPage() {
  return (
    <LegalPage title="Data Deletion Instructions" lastUpdated="December 25, 2025">
      <p>
        JoNex respects your right to control your personal data. If you have
        interacted with our services through Facebook Messenger, our website, or
        our AI voice agents, you can request deletion of all data we hold about
        you.
      </p>

      <h2>What Data We Can Delete</h2>
      <p>Upon your request, we will delete:</p>
      <ul>
        <li>Your Messenger conversation history with our AI chatbot.</li>
        <li>
          Your contact information (name, email, phone number) stored in our
          systems.
        </li>
        <li>
          Voice call recordings and transcripts from our AI voice agents.
        </li>
        <li>Any scheduling or appointment data associated with you.</li>
        <li>Your Facebook user ID and profile data stored in our systems.</li>
      </ul>

      <h2>How to Request Data Deletion</h2>
      <p>
        You can request deletion of your data using any of the following
        methods:
      </p>
      <ul>
        <li>
          <strong>Email us directly:</strong> Send an email to{" "}
          <a href="mailto:jeremy@jonex.site">jeremy@jonex.site</a> with the
          subject line &quot;Data Deletion Request.&quot; Include your name and
          the Facebook account or phone number associated with your interactions
          so we can locate your data.
        </li>
        <li>
          <strong>Message us on Facebook:</strong> Send a message to our JoNex
          Facebook Page requesting data deletion.
        </li>
      </ul>

      <p>
        Click the button below to send us a pre-filled email requesting deletion
        of your data. We will confirm receipt and process your request within 30
        days.
      </p>
      <p>
        <a
          href={DELETION_MAILTO}
          className="inline-flex h-12 items-center justify-center rounded-[10px] bg-accent px-6 text-sm font-semibold text-accent-contrast no-underline transition-opacity hover:opacity-90 hover:!no-underline"
        >
          Request Data Deletion
        </a>
      </p>

      <h2>What Happens After You Request Deletion</h2>
      <ul>
        <li>
          <strong>Confirmation:</strong> We will acknowledge your request within
          3 business days.
        </li>
        <li>
          <strong>Verification:</strong> We may ask you to verify your identity
          to ensure we are deleting the correct data.
        </li>
        <li>
          <strong>Processing:</strong> Your data will be permanently deleted
          from our active systems within 30 days of your request.
        </li>
        <li>
          <strong>Completion:</strong> We will send you a confirmation once
          deletion is complete.
        </li>
      </ul>

      <h2>Data We Cannot Delete</h2>
      <p>In some cases, we may be unable to delete certain data:</p>
      <ul>
        <li>
          Data that we are legally required to retain (e.g., for tax or
          compliance purposes).
        </li>
        <li>
          Data that has already been anonymized and cannot be linked back to
          you.
        </li>
        <li>
          Data stored by Meta (Facebook) on their own systems. To delete data
          held by Meta, visit{" "}
          <a
            href="https://www.facebook.com/help/delete_account"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook&apos;s data deletion page
          </a>
          .
        </li>
      </ul>

      <h2>Facebook Login Data Deletion</h2>
      <p>
        If you logged in or connected your Facebook account to our services and
        wish to remove this connection:
      </p>
      <ul>
        <li>Go to your Facebook Settings.</li>
        <li>Navigate to Security and Login &gt; Apps and Websites.</li>
        <li>Find &quot;JoNex&quot; and click Remove.</li>
        <li>This will revoke our access to your Facebook data going forward.</li>
        <li>
          To delete data we already collected, follow the deletion request
          process above.
        </li>
      </ul>

      <h2>Contact Us</h2>
      <p>If you have questions about data deletion, contact us at:</p>
      <ul>
        <li>JoNex AI</li>
        <li>
          Email: <a href="mailto:jeremy@jonex.site">jeremy@jonex.site</a>
        </li>
        <li>Website: jonex.site</li>
      </ul>
    </LegalPage>
  );
}
