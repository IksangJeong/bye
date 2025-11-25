import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-gray-800">
          🎓 롤링페이퍼
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-12">
          학생회장 예진, 부학생회장 성은에게<br />
          마음을 전해주세요
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/yejin"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative z-10">
              <div className="text-5xl mb-4">💌</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">예진</h2>
              <p className="text-gray-600">학생회장</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/sungeun"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative z-10">
              <div className="text-5xl mb-4">💌</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">성은</h2>
              <p className="text-gray-600">부학생회장</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </main>
  );
}
