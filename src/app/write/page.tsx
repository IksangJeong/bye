'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { COLORS, ColorKey } from '@/lib/utils';

function WriteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const target = searchParams.get('to') as 'yejin' | 'sungeun' | null;

  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<ColorKey>('yellow');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!target || (target !== 'yejin' && target !== 'sungeun')) {
      router.push('/');
    }
  }, [target, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!author.trim()) {
      setError('이름을 입력해주세요');
      return;
    }

    if (message.length < 5) {
      setError('메시지는 최소 5자 이상이어야 합니다');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target,
          author: author.trim(),
          message: message.trim(),
          color,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit message');
      }

      // Success - redirect to target page
      router.push(`/${target}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSubmitting(false);
    }
  };

  const targetName = target === 'yejin' ? '예진' : '성은';
  const colorOptions: ColorKey[] = ['yellow', 'pink', 'blue', 'green', 'purple', 'orange'];

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <Link
            href={`/${target}`}
            className="inline-block mb-4 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← 돌아가기
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            {targetName}에게 메시지 남기기
          </h1>
          <p className="text-gray-600">마음을 담아 메시지를 작성해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Author Name */}
          <div className="mb-6">
            <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="익명"
              maxLength={50}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              disabled={submitting}
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              메시지 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="고마웠던 일, 응원의 메시지를 남겨주세요"
              maxLength={500}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none transition-all"
              disabled={submitting}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {message.length}/500
            </div>
          </div>

          {/* Color Picker */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              포스트잇 색상
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => setColor(colorOption)}
                  className={`
                    h-16 rounded-lg transition-all duration-200
                    ${COLORS[colorOption]}
                    ${color === colorOption
                      ? 'ring-4 ring-gray-800 scale-110'
                      : 'ring-2 ring-gray-300 hover:scale-105'
                    }
                  `}
                  disabled={submitting}
                  aria-label={colorOption}
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '전송 중...' : '메시지 남기기 ✨'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <WriteForm />
    </Suspense>
  );
}
