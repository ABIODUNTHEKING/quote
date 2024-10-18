export default function AddFriendPrompt() {
  return (
    <div className="rounded-lg p-6 max-w-md mx-auto my-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        👋 Expand Your Circle!
      </h2>
      <p className="text-gray-600 mb-6">
        Don&apos;t miss out on connecting with amazing people. Add a friend now to
        chat, share moments, and stay connected!
      </p>

      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-green-600 mb-3">✨ It&apos;s easy:</h3>
        <ol className="list-decimal list-inside text-left text-gray-700">
          <li className="mb-2">
            Tap the <span className="font-semibold">Message</span> icon.
          </li>
          <li className="mb-2">Search for your friend&apos;s name or username.</li>
          <li>Send a message and start chatting!</li>
        </ol>
      </div>

      <p className="text-sm text-gray-500 mt-4">The more, the merrier! 🌟</p>
    </div>
  );
}
