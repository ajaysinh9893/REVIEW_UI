'use client';

import { AlertCircle, TrendingDown, Phone, Eye } from 'lucide-react';

export default function AlertSection({ alerts = [] }) {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'review':
        return <AlertCircle size={18} />;
      case 'calls':
        return <Phone size={18} />;
      case 'visibility':
        return <Eye size={18} />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          container: 'bg-red-50 border border-red-200',
          badge: 'bg-red-100 text-red-700',
          icon: 'text-red-600',
          change: 'text-red-600'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border border-yellow-200',
          badge: 'bg-yellow-100 text-yellow-700',
          icon: 'text-yellow-600',
          change: 'text-yellow-600'
        };
      case 'info':
        return {
          container: 'bg-blue-50 border border-blue-200',
          badge: 'bg-blue-100 text-blue-700',
          icon: 'text-blue-600',
          change: 'text-blue-600'
        };
      default:
        return {
          container: 'bg-gray-50 border border-gray-200',
          badge: 'bg-gray-100 text-gray-700',
          icon: 'text-gray-600',
          change: 'text-gray-600'
        };
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 p-4 h-full flex flex-col">
      <h2 className="text-base font-semibold text-gray-900 mb-3">Alerts</h2>
      
      <div className="space-y-2 flex-1 overflow-y-auto">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const styles = getSeverityStyles(alert.severity);
            return (
              <div
                key={alert.id}
                className={`rounded-lg p-2 transition-all hover:shadow-md ${styles.container}`}
              >
                {/* Header with icon and severity badge */}
                <div className="flex items-start justify-between mb-1">
                  <div className={`flex items-center gap-2 ${styles.icon}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${styles.badge}`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                  {alert.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-1">
                  {alert.description}
                </p>

                {/* Change percentage and period */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold flex items-center gap-1 ${styles.change}`}>
                    <TrendingDown size={12} />
                    {alert.changePercent}%
                  </span>
                  <span className="text-sm text-gray-500">
                    {alert.period}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-20 text-gray-500">
            <p className="text-sm">No active alerts</p>
          </div>
        )}
      </div>
    </div>
  );
}
