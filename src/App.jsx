import { useEffect, useState } from 'react';

const App = () => {
    const [speech] = useState(new SpeechSynthesisUtterance());
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        const populateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0]); // Set the first available voice by default
            }
        };

        // Populate voices when they are changed
        window.speechSynthesis.onvoiceschanged = populateVoices;
        populateVoices(); // Call initially to populate available voices
    }, []);

    const handleSpeak = () => {
        if (text) {
            speech.voice = selectedVoice; // Set selected voice
            speech.text = text; // Set the text to be spoken
            window.speechSynthesis.speak(speech); // Speak the text
        } else {
            alert("Please enter some text to speak."); // Alert if text is empty
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-red-500 to-blue-500">
            <div className="w-full max-w-lg p-8 bg-gradient-to-br from-black via-gray-800 to-red-500 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">Text Speech Converter</h1>
                <textarea
                    className="w-full h-32 border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    placeholder="Type your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex items-center mb-4">
                    <select
                        className="border border-gray-300 p-2 mr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-700 text-white"
                        value={selectedVoice ? selectedVoice.name : ''}
                        onChange={(e) => setSelectedVoice(voices.find(voice => voice.name === e.target.value))}
                    >
                        {voices.map((voice, index) => (
                            <option key={index} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-200 mb-4 w-full"
                    onClick={handleSpeak}
                >
                    Click to Listen
                </button>
                <p className="text-center text-sm text-gray-300 mt-4">
                    By using this service, you agree to our <span className="text-blue-400 underline cursor-pointer">Terms and Conditions</span>.
                </p>
            </div>
        </div>
    );
};

export default App;
