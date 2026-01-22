import { useState, useEffect } from "react";

export default function CommandBar({ onSubmit, disabled }) {
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleVoiceStart = () => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-3 transition-opacity ${disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
    >
      {/* Microphone Button */}
      {isSupported && (
        <button
          type="button"
          onClick={handleVoiceStart}
          disabled={disabled || isListening}
          className={`p-2 rounded-full transition-all mr-2 ${isListening
            ? "bg-red-50 text-red-500 animate-pulse"
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
          aria-label="Use voice input"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        </button>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={isListening ? "Listening..." : (disabled ? "AI is thinking..." : "Ask HR anything…")}
        disabled={disabled || isListening}
        className="flex-1 text-base outline-none bg-transparent text-gray-800 placeholder-gray-400 font-medium"
      />

      {/* Send Button */}
      <button
        type="submit"
        disabled={!value.trim() || disabled || isListening}
        className="ml-1 p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
}
