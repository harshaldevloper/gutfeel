export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4">
      <div className="max-w-2xl mx-auto prose prose-stone">
        <a href="/" className="text-emerald-600 text-sm no-underline">← Back to GutVista</a>
        <h1 className="text-3xl font-bold mt-6">Privacy Policy</h1>
        <p className="text-stone-500 text-sm">Last updated: August 12, 2026</p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>Account data:</strong> Email and password if you create an account.</li>
          <li><strong>Health logs:</strong> Symptom severity, foods eaten, bowel patterns, and stress levels you choose to log.</li>
          <li><strong>Profile:</strong> Country, IBS type, allergies, and dietary preferences from onboarding.</li>
          <li><strong>Waitlist:</strong> Email address if you join the waitlist.</li>
          <li><strong>Payment:</strong> Processed by Dodo Payments — we do not store card numbers.</li>
        </ul>

        <h2>How we store data</h2>
        <p>
          Symptom logs are stored locally on your device by default. If you sign in, data syncs to Supabase
          (hosted in the cloud) so you can access it across devices. You can use the app fully offline without an account.
        </p>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell your health data to third parties.</li>
          <li>We do not share personal health data with advertisers.</li>
          <li>We do not provide medical advice — GutVista is a tracking and planning tool only.</li>
        </ul>

        <h2>Your rights</h2>
        <p>
          You can delete local data by clearing your browser storage or app data. For account deletion,
          contact us at privacy@gutvista.app.
        </p>

        <h2>Contact</h2>
        <p>Questions: privacy@gutvista.app</p>
      </div>
    </div>
  );
}
