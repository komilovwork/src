import { useEffect, useState } from 'react';
import { X, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  logs: string[];
}

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const mockTestCases: Omit<TestCase, 'status' | 'logs'>[] = [
  { id: '1', name: 'Test 1 - mkdir buyrug\'i tekshiruvi' },
  { id: '2', name: 'Test 2 - cd buyrug\'i tekshiruvi' },
  { id: '3', name: 'Test 3 - touch buyrug\'i tekshiruvi' },
  { id: '4', name: 'Test 4 - Fayl tuzilishi tekshiruvi' },
  { id: '5', name: 'Test 5 - VFS yaratish tekshiruvi' },
];

export default function TestModal({ isOpen, onClose, onComplete }: TestModalProps) {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(-1);
  const [allPassed, setAllPassed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTestCases(
        mockTestCases.map(tc => ({ ...tc, status: 'pending', logs: [] }))
      );
      setCurrentTestIndex(-1);
      setAllPassed(false);
      setTimeout(() => runTests(), 500);
    }
  }, [isOpen]);

  const runTests = async () => {
    for (let i = 0; i < mockTestCases.length; i++) {
      setCurrentTestIndex(i);

      setTestCases(prev => prev.map((tc, idx) =>
        idx === i ? { ...tc, status: 'running' } : tc
      ));

      await new Promise(resolve => setTimeout(resolve, 800));

      const logs = generateMockLogs(mockTestCases[i].name);
      const passed = Math.random() > 0.1;

      for (let j = 0; j < logs.length; j++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setTestCases(prev => prev.map((tc, idx) =>
          idx === i ? { ...tc, logs: logs.slice(0, j + 1) } : tc
        ));
      }

      await new Promise(resolve => setTimeout(resolve, 400));

      setTestCases(prev => prev.map((tc, idx) =>
        idx === i ? { ...tc, status: passed ? 'passed' : 'failed' } : tc
      ));

      if (!passed) {
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setAllPassed(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onComplete();
  };

  const generateMockLogs = (testName: string): string[] => {
    return [
      `> Ishga tushirilmoqda: ${testName}`,
      '> Muhit sozlanmoqda...',
      '> Fayllar tekshirilmoqda...',
      '> Buyruqlar bajarilmoqda...',
      '> Natijalar tahlil qilinmoqda...',
      '✓ Test muvaffaqiyatli yakunlandi',
    ];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Test Natijalar</h2>
          <button
            onClick={onClose}
            disabled={currentTestIndex >= 0 && currentTestIndex < mockTestCases.length - 1}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {testCases.map((test, index) => (
              <div
                key={test.id}
                className={`border rounded-lg overflow-hidden transition-all ${
                  test.status === 'running' ? 'border-blue-500 shadow-md' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 p-4 bg-gray-50">
                  {test.status === 'pending' && (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  )}
                  {test.status === 'running' && (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  )}
                  {test.status === 'passed' && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {test.status === 'failed' && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium text-gray-900">{test.name}</span>
                </div>

                {test.logs.length > 0 && (
                  <div className="bg-gray-900 p-4">
                    <div className="space-y-1">
                      {test.logs.map((log, logIndex) => (
                        <div
                          key={logIndex}
                          className="text-sm font-mono text-green-400 animate-fadeIn"
                        >
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {allPassed && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold text-green-900">Tabriklaymiz!</p>
                  <p className="text-sm text-green-700">
                    Barcha testlardan muvaffaqiyatli o'tdingiz. Keyingi darsga o'tishingiz mumkin.
                  </p>
                </div>
              </div>
            </div>
          )}

          {testCases.some(tc => tc.status === 'failed') && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fadeIn">
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-semibold text-red-900">Test bajarilmadi</p>
                  <p className="text-sm text-red-700">
                    Ba'zi testlar muvaffaqiyatsiz yakunlandi. Iltimos, kodni qaytadan ko'rib chiqing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {(allPassed || testCases.some(tc => tc.status === 'failed')) && (
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
