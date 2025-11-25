import Link from 'next/link';
import PostitBoard from '@/components/PostitBoard';

export default function SungeunPage() {
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
            성은에게 💌
          </h1>
          <p className="text-gray-600 mb-6">부학생회장으로 수고한 성은에게 마음을 전해주세요</p>
          <Link
            href="/write?to=sungeun"
            className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            메시지 남기기 ✍️
          </Link>
        </div>

        <PostitBoard target="sungeun" />
      </div>
    </main>
  );
}
