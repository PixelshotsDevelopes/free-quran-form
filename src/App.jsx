import { useState } from 'react';

const StepOne = ({ onSelect, onBack }) => {
  const options = ['Interested in Islam', 'Revert Muslim', 'Born Muslim'];

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">What best describes you?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="bg-gray-800 hover:bg-green-600 transition p-4 rounded-xl w-48 text-white font-medium"
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-4 bg-yellow-600 px-4 py-2 rounded">Previous</button>
    </div>
  );
};

const StepTwoA = ({ onSelect, onBack }) => {
  const faiths = ['Christianity', 'Hinduism', 'Atheist', 'Agnostic', 'Buddhist', 'Other'];

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">What is your current faith?</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {faiths.map(faith => (
          <button
            key={faith}
            onClick={() => onSelect(faith)}
            className="bg-gray-800 hover:bg-green-600 transition p-4 rounded-xl text-white font-medium"
          >
            {faith}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-4 bg-yellow-600 px-4 py-2 rounded">Previous</button>
    </div>
  );
};

const USAQuestion = ({ onSelect, onBack }) => (
  <div className="flex flex-col items-center space-y-4">
    <h2 className="text-xl font-bold">Do you live in the USA?</h2>
    <div className="flex space-x-6">
      <button onClick={() => onSelect(true)} className="bg-green-600 p-3 px-6 rounded-xl font-medium">Yes</button>
      <button onClick={() => onSelect(false)} className="bg-red-600 p-3 px-6 rounded-xl font-medium">No</button>
    </div>
    <button onClick={onBack} className="mt-4 bg-yellow-600 px-4 py-2 rounded">Previous</button>
  </div>
);

const QuranLanguage = ({ onSelect, onBack }) => {
  const languages = ['English', 'Spanish'];

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Choose Quran Language</h2>
      <div className="flex space-x-6">
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            className="bg-gray-800 hover:bg-green-600 transition px-6 py-3 rounded-xl font-medium"
          >
            {lang}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-4 bg-yellow-600 px-4 py-2 rounded">Previous</button>
    </div>
  );
};

const AddressForm = ({ onBack, userType, faith, inUSA, language }) => (
  <form
    action="https://formbold.com/s/oeq7j"
    method="POST"
    className="flex flex-col space-y-4 w-full max-w-md"
  >
    {/* Hidden Fields */}
    <input type="hidden" name="userType" value={userType || ''} />
    <input type="hidden" name="faith" value={faith || ''} />
    <input type="hidden" name="inUSA" value={inUSA ? 'Yes' : 'No'} />
    <input type="hidden" name="quranLanguage" value={language || ''} />

    <input type="text" name="name" placeholder="Full Name" className="p-3 bg-gray-800 rounded text-white" required />
    <input type="text" name="address" placeholder="Street Address" className="p-3 bg-gray-800 rounded text-white" required />
    <input type="text" name="city" placeholder="City" className="p-3 bg-gray-800 rounded text-white" required />
    <input type="text" name="state" placeholder="State" className="p-3 bg-gray-800 rounded text-white" required />
    <input type="text" name="zip" placeholder="ZIP Code" className="p-3 bg-gray-800 rounded text-white" required />
    <input type="email" name="email" placeholder="Email Address" className="p-3 bg-gray-800 rounded text-white" required />
    <input type="tel" name="phone" placeholder="Phone Number" className="p-3 bg-gray-800 rounded text-white" required />

    <textarea name="comment" placeholder="Additional comments (optional)" rows="4" className="p-3 bg-gray-800 rounded text-white" />

    <button type="submit" className="bg-green-700 py-3 rounded font-bold text-white">Submit</button>
    <button type="button" onClick={onBack} className="bg-yellow-600 py-2 rounded font-medium text-white">Previous</button>
  </form>
);

export default function App() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [faith, setFaith] = useState(null);
  const [inUSA, setInUSA] = useState(null);
  const [language, setLanguage] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {step === 1 && (
        <>
          <h1 className="text-3xl font-bold mb-2">Interested in Islam?</h1>
          <p className="mb-6">Order a free Quran</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setStep(2)} className="bg-green-600 px-6 py-3 rounded-xl">Get Started</button>
            <a href="https://zamzamzakat.com/index.php/donations/donate-a-quran/" target="_blank" className="bg-blue-600 px-6 py-3 rounded-xl text-center">Donate a Quran</a>
          </div>
        </>
      )}

      {step === 2 && (
        <StepOne
          onSelect={(type) => {
            setUserType(type);
            if (type === 'Born Muslim') setStep(10);
            else if (type === 'Interested in Islam') setStep(3);
            else setStep(4);
          }}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <StepTwoA
          onSelect={(faith) => {
            setFaith(faith);
            setStep(4);
          }}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <USAQuestion
          onSelect={(yes) => {
            setInUSA(yes);
            setStep(yes ? 6 : 11); // changed step 5 -> 6
          }}
          onBack={() => (userType === 'Interested in Islam' ? setStep(3) : setStep(2))}
        />
      )}

      {step === 6 && (
        <QuranLanguage
          onSelect={(lang) => {
            setLanguage(lang);
            setStep(5);
          }}
          onBack={() => setStep(4)}
        />
      )}

      {step === 5 && (
        <AddressForm
          onBack={() => setStep(6)}
          userType={userType}
          faith={faith}
          inUSA={inUSA}
          language={language}
        />
      )}

      {step === 10 && (
        <div className="text-center space-y-4">
          <p>Sorry, we are only shipping Qurans to new Muslims or those interested in Islam.</p>
          <div>
            <a
              href="https://zamzamzakat.com/index.php/donations/donate-a-quran/"
              target="_blank"
              className="bg-blue-600 px-6 py-3 rounded-xl inline-block"
            >
              Donate a Quran
            </a>
          </div>
          <div>
            <button
              onClick={() => setStep(2)}
              className="bg-yellow-600 px-6 py-2 rounded"
            >
              Previous
            </button>
          </div>
        </div>
      )}

      {step === 11 && (
        <div className="text-center space-y-4">
          <p>Sorry, we are currently shipping only in the United States.</p>
          <div>
            <a
              href="https://zamzamzakat.com/index.php/donations/donate-a-quran/"
              target="_blank"
              className="bg-blue-600 px-6 py-3 rounded-xl inline-block"
            >
              Donate a Quran
            </a>
          </div>
          <div>
            <button
              onClick={() => setStep(4)}
              className="bg-yellow-600 px-6 py-2 rounded"
            >
              Previous
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
