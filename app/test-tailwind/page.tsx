export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Tailwind CSS 测试
        </h1>
        <p className="text-gray-600 text-center mb-6">
          如果你看到彩色的渐变背景和美观的白色卡片，说明 Tailwind CSS 工作正常！
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            蓝色按钮
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            绿色按钮
          </button>
        </div>
      </div>
    </div>
  );
}