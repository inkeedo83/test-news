import PropTypes from "prop-types";

export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="container mx-auto max-w-7xl px-3 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-gray-800/30 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-6"
          >
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl aspect-video sm:aspect-[4/3] bg-gray-700/50" />
            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <div className="h-3 sm:h-4 bg-gray-700/50 rounded-full w-1/2" />
              <div className="h-3 sm:h-4 bg-gray-700/50 rounded-full w-3/4" />
              <div className="h-3 sm:h-4 bg-gray-700/50 rounded-full w-full" />
              <div className="h-8 sm:h-10 bg-gray-700/50 rounded-full w-1/3 mt-4 sm:mt-6" />
            </div>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

LoadingSkeleton.propTypes = {
  count: PropTypes.number,
};
