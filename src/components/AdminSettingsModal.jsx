import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Save, Shield, Bell, Database, Mail, Globe, 
  Lock, Eye, EyeOff, Key, Users, Settings as SettingsIcon,
  Trash2, Download, Upload, RefreshCw, AlertCircle
} from 'lucide-react';

const AdminSettingsModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Aton Diya E-Palengke',
    siteDescription: 'Indigenous Products Marketplace',
    contactEmail: 'admin@atondiya.com',
    contactPhone: '09123456789',
    
    // Security Settings
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireEmailVerification: true,
    enable2FA: false,
    
    // Notification Settings
    emailNotifications: true,
    orderNotifications: true,
    vendorApplicationNotifications: true,
    systemAlerts: true,
    
    // System Settings
    maintenanceMode: false,
    allowRegistration: true,
    allowVendorRegistration: true,
    autoApproveVendors: false,
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save settings to localStorage or API
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('✅ Settings saved successfully!');
    } catch (error) {
      alert('❌ Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'system', label: 'System', icon: Database },
    { id: 'backup', label: 'Backup', icon: Download },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-forest-green to-sea-blue text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Admin Settings</h2>
                <p className="text-sm text-white/80">Configure system settings and preferences</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex h-[calc(90vh-120px)]">
            {/* Sidebar Tabs */}
            <div className="w-64 bg-soft-white border-r border-gray-200 p-4 overflow-y-auto">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-forest-green text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'general' && <GeneralSettings settings={settings} setSettings={setSettings} />}
              {activeTab === 'security' && <SecuritySettings settings={settings} setSettings={setSettings} showPassword={showPassword} setShowPassword={setShowPassword} />}
              {activeTab === 'notifications' && <NotificationSettings settings={settings} setSettings={setSettings} />}
              {activeTab === 'email' && <EmailSettings settings={settings} setSettings={setSettings} showPassword={showPassword} setShowPassword={setShowPassword} />}
              {activeTab === 'system' && <SystemSettings settings={settings} setSettings={setSettings} />}
              {activeTab === 'backup' && <BackupSettings settings={settings} setSettings={setSettings} />}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-forest-green text-white rounded-lg font-semibold hover:bg-forest-green/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminSettingsModal;


// General Settings Component
const GeneralSettings = ({ settings, setSettings }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">General Settings</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => setSettings({...settings, siteName: e.target.value})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
        <input
          type="email"
          value={settings.contactEmail}
          onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
        <input
          type="tel"
          value={settings.contactPhone}
          onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Site Description</label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
          rows="3"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
    </div>
  </div>
);

// Security Settings Component
const SecuritySettings = ({ settings, setSettings, showPassword, setShowPassword }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Security Settings</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Session Timeout (minutes)</label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Max Login Attempts</label>
        <input
          type="number"
          value={settings.maxLoginAttempts}
          onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Password Min Length</label>
        <input
          type="number"
          value={settings.passwordMinLength}
          onChange={(e) => setSettings({...settings, passwordMinLength: parseInt(e.target.value)})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
    </div>
    
    <div className="space-y-4 mt-6">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.requireEmailVerification}
          onChange={(e) => setSettings({...settings, requireEmailVerification: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
        <span className="text-gray-700">Require Email Verification</span>
      </label>
      
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={settings.enable2FA}
          onChange={(e) => setSettings({...settings, enable2FA: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
        <span className="text-gray-700">Enable Two-Factor Authentication</span>
      </label>
    </div>
  </div>
);

// Notification Settings Component
const NotificationSettings = ({ settings, setSettings }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h3>
    
    <div className="space-y-4">
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">Email Notifications</p>
            <p className="text-sm text-gray-600">Receive notifications via email</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.emailNotifications}
          onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
      </label>
      
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">Order Notifications</p>
            <p className="text-sm text-gray-600">Get notified about new orders</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.orderNotifications}
          onChange={(e) => setSettings({...settings, orderNotifications: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
      </label>
      
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">Vendor Application Notifications</p>
            <p className="text-sm text-gray-600">Get notified about new vendor applications</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.vendorApplicationNotifications}
          onChange={(e) => setSettings({...settings, vendorApplicationNotifications: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
      </label>
      
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">System Alerts</p>
            <p className="text-sm text-gray-600">Receive critical system alerts</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.systemAlerts}
          onChange={(e) => setSettings({...settings, systemAlerts: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
      </label>
    </div>
  </div>
);

// Email Settings Component
const EmailSettings = ({ settings, setSettings, showPassword, setShowPassword }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Email Configuration</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Host</label>
        <input
          type="text"
          value={settings.smtpHost}
          onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Port</label>
        <input
          type="text"
          value={settings.smtpPort}
          onChange={(e) => setSettings({...settings, smtpPort: e.target.value})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Username</label>
        <input
          type="text"
          value={settings.smtpUser}
          onChange={(e) => setSettings({...settings, smtpUser: e.target.value})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={settings.smtpPassword}
            onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
    
    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      Test Email Configuration
    </button>
  </div>
);

// System Settings Component
const SystemSettings = ({ settings, setSettings }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">System Settings</h3>
    
    <div className="space-y-4">
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <div>
            <p className="font-semibold text-gray-800">Maintenance Mode</p>
            <p className="text-sm text-gray-600">Temporarily disable the site for maintenance</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.maintenanceMode}
          onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
          className="w-5 h-5 text-orange-600 rounded"
        />
      </label>
      
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">Allow Registration</p>
            <p className="text-sm text-gray-600">Allow new users to register</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.allowRegistration}
          onChange={(e) => setSettings({...settings, allowRegistration: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
      </label>
      
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">Allow Vendor Registration</p>
            <p className="text-sm text-gray-600">Allow new vendors to apply</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.allowVendorRegistration}
          onChange={(e) => setSettings({...settings, allowVendorRegistration: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
      </label>
      
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">Auto-Approve Vendors</p>
            <p className="text-sm text-gray-600">Automatically approve vendor applications</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.autoApproveVendors}
          onChange={(e) => setSettings({...settings, autoApproveVendors: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
      </label>
    </div>
    
    <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
      <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
        <Trash2 className="w-5 h-5" />
        Danger Zone
      </h4>
      <p className="text-sm text-red-700 mb-4">These actions are irreversible. Please be careful.</p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          Clear All Cache
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          Reset Settings
        </button>
      </div>
    </div>
  </div>
);

// Backup Settings Component
const BackupSettings = ({ settings, setSettings }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Backup & Restore</h3>
    
    <div className="space-y-4">
      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-800">Automatic Backup</p>
            <p className="text-sm text-gray-600">Enable automatic database backups</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={settings.autoBackup}
          onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
          className="w-5 h-5 text-forest-green rounded"
        />
      </label>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Backup Frequency</label>
        <select
          value={settings.backupFrequency}
          onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Backup Retention (days)</label>
        <input
          type="number"
          value={settings.backupRetention}
          onChange={(e) => setSettings({...settings, backupRetention: parseInt(e.target.value)})}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none"
        />
      </div>
    </div>
    
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        <Download className="w-5 h-5" />
        Download Backup
      </button>
      <button className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
        <Upload className="w-5 h-5" />
        Upload Backup
      </button>
      <button className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
        <RefreshCw className="w-5 h-5" />
        Restore Backup
      </button>
    </div>
    
    <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
      <h4 className="font-bold text-blue-800 mb-2">Last Backup</h4>
      <p className="text-sm text-blue-700">November 28, 2025 at 2:30 AM</p>
      <p className="text-xs text-blue-600 mt-1">Size: 45.2 MB</p>
    </div>
  </div>
);
