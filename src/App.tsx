/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, DebtItem, QuotaItem, NotificationItem, BudgetData, ReminderConfig, UserProfile } from './types';
import {
  INITIAL_DEBTS,
  INITIAL_QUOTAS,
  INITIAL_NOTIFICATIONS,
  INITIAL_BUDGET,
  INITIAL_REMINDERS,
  INITIAL_USER,
} from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { InicioScreen } from './components/screens/InicioScreen';
import { MisDeudasScreen } from './components/screens/MisDeudasScreen';
import { CalendarioScreen } from './components/screens/CalendarioScreen';
import { CapacidadPagoScreen } from './components/screens/CapacidadPagoScreen';
import { EducacionSBSScreen } from './components/screens/EducacionSBSScreen';
import { PaymentModal } from './components/modals/PaymentModal';
import { AddDebtModal } from './components/modals/AddDebtModal';
import { EditDebtModal } from './components/modals/EditDebtModal';
import { DebtDetailModal } from './components/modals/DebtDetailModal';
import { RemindersModal } from './components/modals/RemindersModal';
import { AdvisorChatModal } from './components/modals/AdvisorChatModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { ProfileModal } from './components/modals/ProfileModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [debts, setDebts] = useState<DebtItem[]>(INITIAL_DEBTS);
  const [quotas, setQuotas] = useState<QuotaItem[]>(INITIAL_QUOTAS);
  const [budget, setBudget] = useState<BudgetData>(INITIAL_BUDGET);
  const [reminders, setReminders] = useState<ReminderConfig>(INITIAL_REMINDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [selectedDebtDetail, setSelectedDebtDetail] = useState<DebtItem | null>(null);
  const [editingDebt, setEditingDebt] = useState<DebtItem | null>(null);
  const [payingQuota, setPayingQuota] = useState<QuotaItem | null>(null);
  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);
  const [isAdvisorChatOpen, setIsAdvisorChatOpen] = useState(false);
  const [advisorChatContext, setAdvisorChatContext] = useState<string | undefined>(undefined);
  const [isRemindersOpen, setIsRemindersOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [actionGuideTopic, setActionGuideTopic] = useState<string | undefined>(undefined);

  // Notification counter
  const unreadCount = notifications.filter((n) => !n.read).length;

  const generateId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

  // Handlers
  const handlePaymentSuccess = (quotaId: string, operationNumber: string) => {
    setQuotas((prev) =>
      prev.map((q) =>
        q.id === quotaId
          ? {
              ...q,
              status: 'paid' as const,
              statusLabel: 'Pagada',
              operationNumber,
              paidDate: 'Hoy',
            }
          : q
      )
    );

    const paidQuota = quotas.find((q) => q.id === quotaId);
    if (paidQuota) {
      if (paidQuota.debtId) {
        setDebts((prev) =>
          prev.map((d) =>
            d.id === paidQuota.debtId
              ? {
                  ...d,
                  paidAmount: (d.paidAmount || 0) + paidQuota.amount,
                  balance: Math.max(0, d.balance - paidQuota.amount),
                  status: 'al_dia',
                  statusLabel: 'Al día',
                }
              : d
          )
        );
      }

      const newNotif: NotificationItem = {
        id: generateId('notif'),
        title: `Pago confirmado - ${paidQuota.entity}`,
        desc: `Se registró el abono de S/ ${paidQuota.amount} con N° Op. ${operationNumber}.`,
        time: 'Justo ahora',
        read: false,
        type: 'success',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const handleAddDebt = (newDebt: Omit<DebtItem, 'id'>) => {
    const createdDebt: DebtItem = {
      ...newDebt,
      id: generateId('debt'),
    };
    setDebts((prev) => [createdDebt, ...prev]);

    const newQuota: QuotaItem = {
      id: generateId('quota'),
      debtId: createdDebt.id,
      entity: createdDebt.entity,
      debtType: createdDebt.type,
      quotaNumber: `Cuota 01/${createdDebt.totalQuotas || 12}`,
      amount: createdDebt.monthlyQuota,
      dueDate: createdDebt.dueDate,
      dueDateDay: createdDebt.dueDateDay || 15,
      month: '2026-09',
      status: createdDebt.status === 'atrasado' ? 'overdue' : 'pending',
      statusLabel: createdDebt.status === 'atrasado' ? 'Atrasada' : 'Próxima',
      daysRemaining: 10,
      hasReminder: true,
    };
    setQuotas((prev) => [newQuota, ...prev]);

    const newNotif: NotificationItem = {
      id: generateId('notif'),
      title: 'Nueva deuda registrada',
      desc: `Registraste ${createdDebt.entity} por S/ ${createdDebt.balance.toLocaleString()}.`,
      time: 'Justo ahora',
      read: false,
      type: 'info',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleEditDebt = (updatedDebt: DebtItem) => {
    setDebts((prev) => prev.map((d) => (d.id === updatedDebt.id ? updatedDebt : d)));
    const newNotif: NotificationItem = {
      id: generateId('notif'),
      title: 'Deuda actualizada',
      desc: `Se actualizaron los datos de ${updatedDebt.entity}.`,
      time: 'Justo ahora',
      read: false,
      type: 'info',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleDeleteDebt = (debtId: string) => {
    const debtToDelete = debts.find((d) => d.id === debtId);
    setDebts((prev) => prev.filter((d) => d.id !== debtId));
    if (debtToDelete) {
      setQuotas((prev) => prev.filter((q) => q.debtId !== debtId && q.entity !== debtToDelete.entity));

      const newNotif: NotificationItem = {
        id: generateId('notif'),
        title: 'Deuda eliminada',
        desc: `Se retiró el compromiso de ${debtToDelete.entity} de AlDía.`,
        time: 'Justo ahora',
        read: false,
        type: 'info',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const handleDeleteQuota = (quotaId: string) => {
    const quotaToDelete = quotas.find((q) => q.id === quotaId);
    setQuotas((prev) => prev.filter((q) => q.id !== quotaId));
    if (quotaToDelete) {
      const newNotif: NotificationItem = {
        id: generateId('notif'),
        title: 'Cuota retirada',
        desc: `Se retiró la cuota de ${quotaToDelete.entity} (${quotaToDelete.quotaNumber}).`,
        time: 'Justo ahora',
        read: false,
        type: 'info',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const handleToggleReminder = (quotaId: string) => {
    setQuotas((prev) =>
      prev.map((q) => (q.id === quotaId ? { ...q, hasReminder: !q.hasReminder } : q))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const openAdvisorChat = (context?: string) => {
    setAdvisorChatContext(context);
    setIsAdvisorChatOpen(true);
  };

  const handleOpenActionGuide = (topicId: string) => {
    setActionGuideTopic(topicId);
    setCurrentTab('educacion');
  };

  if (currentTab === 'bienvenida') {
    return (
      <WelcomeScreen
        onStart={() => setCurrentTab('inicio')}
        onRegisterSuccess={(newUser) => {
          setUser(newUser);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased selection:bg-blue-100">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenWelcome={() => setCurrentTab('bienvenida')}
      />

      {/* Main Container */}
      <main className="flex-1 w-full pt-16 pb-20">
        {currentTab === 'inicio' && (
          <InicioScreen
            user={user}
            debts={debts}
            quotas={quotas}
            onNavigate={(tab) => setCurrentTab(tab)}
            onPayQuota={(quota) => setPayingQuota(quota)}
            onViewDebtDetail={(debt) => setSelectedDebtDetail(debt)}
            onOpenAdvisorChat={openAdvisorChat}
            onOpenReminders={() => setIsRemindersOpen(true)}
            onOpenActionGuide={handleOpenActionGuide}
          />
        )}

        {currentTab === 'mis-deudas' && (
          <MisDeudasScreen
            debts={debts}
            onOpenAddDebt={() => setIsAddDebtOpen(true)}
            onSelectDebt={(debt) => setSelectedDebtDetail(debt)}
            onEditDebt={(debt) => setEditingDebt(debt)}
            onDeleteDebt={handleDeleteDebt}
            onOpenAdvisorChat={openAdvisorChat}
          />
        )}

        {currentTab === 'calendario' && (
          <CalendarioScreen
            quotas={quotas}
            onPayQuota={(quota) => setPayingQuota(quota)}
            onToggleReminder={handleToggleReminder}
            onDeleteQuota={handleDeleteQuota}
          />
        )}

        {currentTab === 'capacidad' && (
          <CapacidadPagoScreen
            budget={budget}
            debts={debts}
            onSaveBudget={(updated) => setBudget(updated)}
            onOpenAdvisorChat={openAdvisorChat}
          />
        )}

        {currentTab === 'educacion' && (
          <EducacionSBSScreen
            onOpenAdvisorChat={openAdvisorChat}
            initialTopicId={actionGuideTopic}
          />
        )}
      </main>

      {/* Bottom Persistent Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

      {/* Modals */}
      {selectedDebtDetail && (
        <DebtDetailModal
          debt={selectedDebtDetail}
          onClose={() => setSelectedDebtDetail(null)}
          onRegisterPayment={(debt) => {
            const matchedQuota = quotas.find((q) => q.debtId === debt.id || q.entity === debt.entity);
            if (matchedQuota) {
              setPayingQuota(matchedQuota);
            } else {
              setPayingQuota({
                id: generateId('quota'),
                debtId: debt.id,
                entity: debt.entity,
                debtType: debt.type,
                quotaNumber: `Cuota ${debt.totalQuotas - debt.pendingQuotas + 1}/${debt.totalQuotas}`,
                amount: debt.monthlyQuota,
                dueDate: debt.dueDate,
                dueDateDay: debt.dueDateDay || 15,
                month: '2026-09',
                status: 'pending',
                statusLabel: 'Próxima',
              });
            }
          }}
          onEditDebt={(debt) => setEditingDebt(debt)}
          onDeleteDebt={handleDeleteDebt}
          onOpenAdvisory={(query) => openAdvisorChat(query)}
        />
      )}

      {isAddDebtOpen && (
        <AddDebtModal onClose={() => setIsAddDebtOpen(false)} onAddDebt={handleAddDebt} />
      )}

      {editingDebt && (
        <EditDebtModal
          debt={editingDebt}
          onClose={() => setEditingDebt(null)}
          onSaveDebt={handleEditDebt}
        />
      )}

      {payingQuota && (
        <PaymentModal
          quota={payingQuota}
          onClose={() => setPayingQuota(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {isRemindersOpen && (
        <RemindersModal
          reminders={reminders}
          onClose={() => setIsRemindersOpen(false)}
          onSaveReminders={(updated) => {
            setReminders(updated);
            const newNotif: NotificationItem = {
              id: generateId('notif'),
              title: 'Recordatorios actualizados',
              desc: `Alertas configuradas para ${updated.days7 ? '7d, ' : ''}${updated.days3 ? '3d, ' : ''}${updated.days1 ? '1d' : ''} antes.`,
              time: 'Justo ahora',
              read: false,
              type: 'info',
            };
            setNotifications((prev) => [newNotif, ...prev]);
          }}
        />
      )}

      {isAdvisorChatOpen && (
        <AdvisorChatModal
          initialContext={advisorChatContext}
          onClose={() => {
            setIsAdvisorChatOpen(false);
            setAdvisorChatContext(undefined);
          }}
        />
      )}

      {isNotificationsOpen && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkAllAsRead={handleMarkAllAsRead}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          user={user}
          onClose={() => setIsProfileOpen(false)}
          onRestartWelcome={() => setCurrentTab('bienvenida')}
          onLogout={() => {
            setUser({
              name: '',
              email: '',
              phone: '',
              isLoggedIn: false,
            });
            setCurrentTab('bienvenida');
          }}
        />
      )}
    </div>
  );
}
