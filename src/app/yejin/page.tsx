import Link from 'next/link';
import PostitBoard from '@/components/PostitBoard';

export default function YejinPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block mb-4 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← 홈으로
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            예진에게 💌
          </h1>
          <p className="text-gray-600 mb-6">학생회장으로 수고한 예진에게 마음을 전해주세요</p>
          <Link
            href="/write?to=yejin"
            className="inline-block px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            메시지 남기기 ✍️
          </Link>
        </div>

        <PostitBoard target="yejin" />
      </div>
    </main>
  );
}
