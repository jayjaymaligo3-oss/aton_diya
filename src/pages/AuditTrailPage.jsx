import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, LogIn, LogOut, Plus, Edit, Trash2, Archive, Monitor, Smartphone, Tablet, Chrome, Calendar, Filter, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Swal from 'sweetalert2';

const AuditTrailPage = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [deviceStats, setDeviceStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    action: 'all',
    model: 'all',
    from_date: '',
    to_date: '',
  });

  useEffect(() => {
    fetchAuditLogs();
    fetchStats();
    fetchDeviceStats();
  }, [filter]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter.action !== 'all') params.action = filter.action;
      if (filter.model !== 'all') params.model = filter.model;
      if (filter.from_date) params.from_date = filter.from_date;
      if (filter.to_date) params.to_date = filter.to_date;

      const response = await api.get('/audit-logs/my-logs', { params });
      setLogs(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/audit-logs/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchDeviceStats = async () => {
    try {
      const response = await api.get('/audit-logs/device-stats');
      setDeviceStats(response.data);
    } catch (error) {
      console.error('Failed to fetch device stats:', error);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'login': return <LogIn className="w-4 h-4" />;
      case 'logout': return <LogOut className="w-4 h-4" />;
      case 'create': return <Plus className="w-4 h-4" />;
      case 'update': return <Edit className="w-4 h-4" />;
      case 'delete': return <Trash2 className="w-4 h-4" />;
      case 'archive': return <Archive className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'login': return 'bg-green-100 text-green-700';
      case 'logout': return 'bg-gray-100 text-gray-700';
      case 'create': return 'bg-blue-100 text-blue-700';
      case 'update': return 'bg-yellow-100 text-yellow-700';
      case 'delete': return 'bg-red-100 text-red-700';
      case 'archive': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Action', 'Description', 'Device', 'Browser', 'Platform', 'IP Address'];
    const rows = logs.map(log => [
      new Date(log.created_at).toLocaleString(),
      log.action,
      log.description,
      log.device_type,
      log.browser,
      log.platform,
      log.ip_address
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-white via-light-cream to-coconut-tan/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-forest-green mb-2">
                Audit Trail
              </h1>
              <p className="text-earth-brown">Track all your account activities and security events</p>
            </div>
            <button
              onClick={exportToCSV}
              className="btn-organic bg-dawn-orange text-white px-6 py-3 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="basket-card p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-earth-brown">Total Actions</h3>
                <Shield className="w-5 h-5 text-forest-green" />
              </div>
              <p className="text-3xl font-bold text-forest-green">{stats.total_actions}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="basket-card p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-earth-brown">Logins</h3>
                <LogIn className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.logins}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="basket-card p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-earth-brown">Updates</h3>
                <Edit className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stats.updates}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="basket-card p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-earth-brown">Deletes</h3>
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">{stats.deletes}</p>
            </motion.div>
          </div>
        )}

        {/* Device Stats */}
        {deviceStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="basket-card p-6"
            >
              <h3 className="text-lg font-semibold text-forest-green mb-4">Devices</h3>
              <div className="space-y-3">
                {deviceStats.devices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device.device_type)}
                      <span className="text-earth-brown capitalize">{device.device_type}</span>
                    </div>
                    <span className="font-semibold text-forest-green">{device.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="basket-card p-6"
            >
              <h3 className="text-lg font-semibold text-forest-green mb-4">Browsers</h3>
              <div className="space-y-3">
                {deviceStats.browsers.map((browser, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Chrome className="w-4 h-4" />
                      <span className="text-earth-brown">{browser.browser}</span>
                    </div>
                    <span className="font-semibold text-forest-green">{browser.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="basket-card p-6"
            >
              <h3 className="text-lg font-semibold text-forest-green mb-4">Platforms</h3>
              <div className="space-y-3">
                {deviceStats.platforms.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <span className="text-earth-brown">{platform.platform}</span>
                    </div>
                    <span className="font-semibold text-forest-green">{platform.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="basket-card p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-forest-green" />
            <h3 className="text-lg font-semibold text-forest-green">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={filter.action}
              onChange={(e) => setFilter({ ...filter, action: e.target.value })}
              className="px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
            >
              <option value="all">All Actions</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="archive">Archive</option>
            </select>

            <select
              value={filter.model}
              onChange={(e) => setFilter({ ...filter, model: e.target.value })}
              className="px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
            >
              <option value="all">All Models</option>
              <option value="Product">Product</option>
              <option value="Order">Order</option>
              <option value="User">User</option>
            </select>

            <input
              type="date"
              value={filter.from_date}
              onChange={(e) => setFilter({ ...filter, from_date: e.target.value })}
              className="px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
              placeholder="From Date"
            />

            <input
              type="date"
              value={filter.to_date}
              onChange={(e) => setFilter({ ...filter, to_date: e.target.value })}
              className="px-4 py-2 border-2 border-coconut-tan rounded-lg focus:border-dawn-orange focus:outline-none"
              placeholder="To Date"
            />
          </div>
        </motion.div>

        {/* Audit Logs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="basket-card p-6"
        >
          <h3 className="text-lg font-semibold text-forest-green mb-4">Activity Log</h3>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dawn-orange mx-auto"></div>
              <p className="text-earth-brown mt-4">Loading audit logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-earth-brown/30 mx-auto mb-4" />
              <p className="text-earth-brown">No audit logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-coconut-tan">
                    <th className="text-left py-3 px-4 font-semibold text-forest-green">Date & Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-forest-green">Action</th>
                    <th className="text-left py-3 px-4 font-semibold text-forest-green">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-forest-green">Device</th>
                    <th className="text-left py-3 px-4 font-semibold text-forest-green">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-coconut-tan/30 hover:bg-light-cream/50"
                    >
                      <td className="py-4 px-4 text-earth-brown text-sm">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                          {getActionIcon(log.action)}
                          {log.action}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-earth-brown">{log.description}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-earth-brown text-sm">
                          {getDeviceIcon(log.device_type)}
                          <div>
                            <div className="capitalize">{log.device_type}</div>
                            <div className="text-xs text-gray-500">{log.browser} on {log.platform}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-earth-brown text-sm font-mono">{log.ip_address}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuditTrailPage;
