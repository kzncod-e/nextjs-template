"use client";

export default function HomePage() {
  return (
    <div className="flex-1 p-8">
      <h2 className="text-4xl font-bold text-cyan-400 mb-2 font-mono">
        Welcome
      </h2>
      <p className="text-cyan-400/60 text-lg mb-8">
        Explore the neon sidebar interface
      </p>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <div
            key={card}
            className="group p-6 bg-zinc-900 border border-cyan-500/30 rounded-lg hover:border-cyan-500/60 hover:shadow-lg transition-all duration-300"
            style={{
              boxShadow: "inset 0 0 30px rgba(34, 211, 238, 0.05)",
            }}
          >
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg mb-4 group-hover:bg-cyan-500/20 transition-colors" />
            <h3 className="text-cyan-400 font-semibold mb-2">Card {card}</h3>
            <p className="text-cyan-400/70 text-sm">
              This is a sample content card demonstrating the neon sidebar
              layout with modern styling.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
