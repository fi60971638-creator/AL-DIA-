import React, { useState } from 'react';
import {
  AdminUserRecord,
  AdminContentArticle,
  AdminRecommendationRule,
  AdminReminderRule,
  NotificationItem,
} from '../../types';
import { ADMIN_AUTH_CONFIG, APP_NAME, APP_LOGO_URL } from '../../data/initialData';
import { AdminUsersTab } from './AdminUsersTab';
import { AdminContentTab } from './AdminContentTab';
import { AdminRecommendationsTab } from './AdminRecommendationsTab';
import { AdminRemindersTab } from './AdminRemindersTab';
import { AdminStatsTab } from './AdminStatsTab';

interface AdminPanelProps {
  onBackToApp: () => void;
  onLogoutAdmin: () => void;
  // Live state passed from App
  users: AdminUserRecord[];
  setUsers: React.Dispatch<React.SetStateAction<AdminUserRecord[]>>;
  contents: AdminContentArticle[];
  setContents: React.Dispatch<React.SetStateAction<AdminContentArticle[]>>;
  recommendations: AdminRecommendationRule[];
  setRecommendations: React.Dispatch<React.SetStateAction<AdminRecommendationRule[]>>;
  reminderRules: AdminReminderRule[];
  setReminderRules: React.Dispatch<React.SetStateAction<AdminReminderRule[]>>;
  onBroadcastNotification: (notif: NotificationItem) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToApp,
  onLogoutAdmin,
  users,
  setUsers,
  contents,
  setContents,
  recommendations,
  setRecommendations,
  reminderRules,
  setReminderRules,
  onBroadcastNotification,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'usuarios' | 'contenidos' | 'recomendaciones' | 'recordatorios' | 'estadisticas'
  >('usuarios');

  // Handlers for Users
  const handleAddUser = (newUserData: Omit<AdminUserRecord, 'id' | 'joinedDate'>) => {
    const newUser: AdminUserRecord = {
      ...newUserData,
      id: `usr-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleUpdateUser = (updated: AdminUserRecord) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Handlers for Contents
  const handleAddArticle = (newArticleData: Omit<AdminContentArticle, 'id' | 'views' | 'lastUpdated'>) => {
    const newArt: AdminContentArticle = {
      ...newArticleData,
      id: `cnt-${Date.now()}`,
      views: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setContents((prev) => [newArt, ...prev]);
  };

  const handleUpdateArticle = (updated: AdminContentArticle) => {
    setContents((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteArticle = (articleId: string) => {
    setContents((prev) => prev.filter((c) => c.id !== articleId));
  };

  // Handlers for Recommendations
  const handleAddRec = (newRecData: Omit<AdminRecommendationRule, 'id' | 'appliedCount'>) => {
    const newRec: AdminRecommendationRule = {
      ...newRecData,
      id: `rec-${Date.now()}`,
      appliedCount: 0,
    };
    setRecommendations((prev) => [newRec, ...prev]);
  };

  const handleUpdateRec = (updated: AdminRecommendationRule) => {
    setRecommendations((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleDeleteRec = (recId: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== recId));
  };

  // Handlers for Reminders
  const handleAddReminder = (newReminderData: Omit<AdminReminderRule, 'id' | 'triggerCount'>) => {
    const newRule: AdminReminderRule = {
      ...newReminderData,
      id: `rem-${Date.now()}`,
      triggerCount: 0,
    };
    setReminderRules((prev) => [newRule, ...prev]);
  };

  const handleUpdateReminder = (updated: AdminReminderRule) => {
    setReminderRules((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleDeleteReminder = (ruleId: string) => {
    setReminderRules((prev) => prev.filter((r) => r.id !== ruleId));
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-[#131b2e] flex flex-col antialiased">
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand & Admin Title */}
          <div className="flex items-center gap-3">
            <img
              src={APP_LOGO_URL}
              alt={`Logo ${APP_NAME}`}
              className="h-8 w-auto object-contain bg-white rounded-lg p-0.5"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[16px] text-white tracking-tight">
                  {APP_NAME} Admin
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-300 text-[10px] font-extrabold uppercase tracking-wider">
                  Panel de Control
                </span>
              </div>
              <span className="text-[11px] text-slate-400 truncate max-w-xs">
                Sesión de Administrador Autorizada
              </span>
            </div>
          </div>

          {/* Actions: Back to Client App & Logout */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToApp}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-label-md text-[12px] font-bold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span className="hidden sm:inline">Ver Vista Usuario</span>
            </button>

            <button
              onClick={onLogoutAdmin}
              title="Cerrar Sesión de Administrador"
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-label-md text-[12px] font-bold border border-rose-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Module Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-xs sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto no-scrollbar gap-1 sm:gap-2">
          <button
            onClick={() => setActiveAdminTab('usuarios')}
            className={`py-3.5 px-4 font-label-md text-[13px] font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeAdminTab === 'usuarios'
                ? 'border-[#0037b0] text-[#0037b0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">group</span>
            <span>Gestionar Usuarios</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-100 text-[#0037b0] text-[10px] font-black">
              {users.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('contenidos')}
            className={`py-3.5 px-4 font-label-md text-[13px] font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeAdminTab === 'contenidos'
                ? 'border-[#0037b0] text-[#0037b0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">article</span>
            <span>Gestionar Contenidos</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black">
              {contents.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('recomendaciones')}
            className={`py-3.5 px-4 font-label-md text-[13px] font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeAdminTab === 'recomendaciones'
                ? 'border-[#0037b0] text-[#0037b0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">smart_toy</span>
            <span>Gestionar Recomendaciones</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black">
              {recommendations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('recordatorios')}
            className={`py-3.5 px-4 font-label-md text-[13px] font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeAdminTab === 'recordatorios'
                ? 'border-[#0037b0] text-[#0037b0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">alarm</span>
            <span>Gestionar Recordatorios</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black">
              {reminderRules.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('estadisticas')}
            className={`py-3.5 px-4 font-label-md text-[13px] font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeAdminTab === 'estadisticas'
                ? 'border-[#0037b0] text-[#0037b0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">monitoring</span>
            <span>Estadísticas Globales</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 pb-20">
        {activeAdminTab === 'usuarios' && (
          <AdminUsersTab
            users={users}
            onAddUser={handleAddUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {activeAdminTab === 'contenidos' && (
          <AdminContentTab
            articles={contents}
            onAddArticle={handleAddArticle}
            onUpdateArticle={handleUpdateArticle}
            onDeleteArticle={handleDeleteArticle}
          />
        )}

        {activeAdminTab === 'recomendaciones' && (
          <AdminRecommendationsTab
            recommendations={recommendations}
            onAddRecommendation={handleAddRec}
            onUpdateRecommendation={handleUpdateRec}
            onDeleteRecommendation={handleDeleteRec}
          />
        )}

        {activeAdminTab === 'recordatorios' && (
          <AdminRemindersTab
            rules={reminderRules}
            onAddRule={handleAddReminder}
            onUpdateRule={handleUpdateReminder}
            onDeleteRule={handleDeleteReminder}
            onSendBroadcast={onBroadcastNotification}
          />
        )}

        {activeAdminTab === 'estadisticas' && <AdminStatsTab users={users} />}
      </main>
    </div>
  );
};
