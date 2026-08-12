export default function TermsPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4">
      <div className="max-w-2xl mx-auto prose prose-stone">
        <a href="/" className="text-emerald-600 text-sm no-underline">← Back to Gutfeel</a>
        <h1 className="text-3xl font-bold mt-6">Terms of Service</h1>
        <p className="text-stone-500 text-sm">Last updated: August 12, 2026</p>

        <h2>Not medical advice</h2>
        <p>
          Gutfeel is a diet tracking and meal planning tool. It is not a medical device and does not
          diagnose, treat, or cure any condition. Always consult a qualified healthcare provider or
          registered dietitian before changing your diet, especially if you have IBS or other digestive conditions.
        </p>

        <h2>FODMAP data</h2>
        <p>
          Food FODMAP ratings are based on published research including the Monash University protocol.
          Gutfeel is not affiliated with Monash University. Individual tolerance varies — use the app
          to track your own patterns, not as a definitive food safety guide.
        </p>

        <h2>Subscriptions</h2>
        <p>
          Premium subscriptions are billed through Dodo Payments. You may cancel anytime from your account
          settings. Refunds are handled per Dodo Payments policy.
        </p>

        <h2>Food safety alerts</h2>
        <p>
          FDA/FSSAI alerts shown in the app are informational summaries based on public reports.
          Verify critical food safety decisions through official government sources.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Gutfeel is provided &quot;as is.&quot; We are not liable for any health outcomes resulting from
          use of the app, including food choices made based on app recommendations.
        </p>

        <h2>Contact</h2>
        <p>Questions: hello@gutfeel.app</p>
      </div>
    </div>
  );
}
