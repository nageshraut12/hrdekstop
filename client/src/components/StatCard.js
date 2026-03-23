import React from 'react';

export const StatCard = ({ icon, label, value, color = 'blue', bgGradient = 'from-blue-500 to-blue-600' }) => {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20`}>
      <div className="flex items-start justify-between">
        <div className="text-white">
          <p className="text-white/80 text-sm font-medium uppercase tracking-wide">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-90">{icon}</div>
      </div>
      <div className="mt-4 h-1 bg-white/30 rounded-full">
        <div className="h-1 bg-white rounded-full w-3/4"></div>
      </div>
    </div>
  );
};
