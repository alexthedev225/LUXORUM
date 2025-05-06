export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-4 text-green-500">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Paiement réussi !</h1>
        <p className="text-gray-600 mb-6">
          Votre commande a été confirmée. Vous recevrez un email de
          confirmation.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            ID de transaction : {searchParams.session_id}
          </p>
          <a
            href="/"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
