import React, { useState } from 'react';
import { AdminUserRecord } from '../../types';

interface AdminUsersTabProps {
  users: AdminUserRecord[];
  onAddUser: (user: Omit<AdminUserRecord, 'id' | 'joinedDate'>) => void;
  onUpdateUser: (user: AdminUserRecord) => void;
  onDeleteUser: (userId: string) => void;
}

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'Todos' | 'Administrador' | 'Usuario' | 'Invitado'>('Todos');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Activo' | 'Suspendido'>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);

  // New user form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState<'Administrador' | 'Usuario' | 'Invitado'>('Usuario');
  const [formStatus, setFormStatus] = useState<'Activo' | 'Suspendido'>('Activo');
  const [formTotalDebts, setFormTotalDebts] = useState<number>(1);
  const [formTotalBalance, setFormTotalBalance] = useState<number>(2500);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'Todos' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'Todos' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    onAddUser({
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim() || 'Sin registrar',
      role: formRole,
      status: formStatus,
      totalDebts: Number(formTotalDebts) || 0,
      totalBalance: Number(formTotalBalance) || 0,
      delinquentCount: 0,
    });

    // Reset
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setIsAddModalOpen(false);
  };

  const handleToggleStatus = (user: AdminUserRecord) => {
    onUpdateUser({
      ...user,
      status: user.status === 'Activo' ? 'Suspendido' : 'Activo',
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex-1 flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre, correo o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder-slate-400 focus:border-[#0037b0] focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-700 bg-white focus:border-[#0037b0] outline-none cursor-pointer"
            >
              <option value="Todos">Todos los roles</option>
              <option value="Administrador">Administradores</option>
              <option value="Usuario">Usuarios</option>
              <option value="Invitado">Invitados</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-700 bg-white focus:border-[#0037b0] outline-none cursor-pointer"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Activo">Activos</option>
              <option value="Suspendido">Suspendidos</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0037b0] hover:bg-[#002f99] active:scale-95 text-white font-label-md text-[13px] font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Users Count Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Usuarios</span>
          <span className="text-[20px] font-black text-slate-800">{users.length}</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Activos</span>
          <span className="text-[20px] font-black text-emerald-700">
            {users.filter((u) => u.status === 'Activo').length}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">Con Deudas</span>
          <span className="text-[20px] font-black text-blue-700">
            {users.filter((u) => u.totalDebts > 0).length}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">En Mora</span>
          <span className="text-[20px] font-black text-rose-700">
            {users.filter((u) => u.delinquentCount > 0).length}
          </span>
        </div>
      </div>

      {/* Users Table / Card List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Usuario / Contacto</th>
                <th className="py-3.5 px-3">Rol</th>
                <th className="py-3.5 px-3">Estado</th>
                <th className="py-3.5 px-3">Deudas / Cartera</th>
                <th className="py-3.5 px-3">Registro</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No se encontraron usuarios con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0037b0]/10 text-[#0037b0] font-bold flex items-center justify-center shrink-0 text-[14px]">
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {u.role === 'Administrador' && (
                              <span className="inline-block px-1.5 py-0.5 rounded bg-blue-100 text-[#0037b0] text-[9px] font-extrabold uppercase">
                                Admin
                              </span>
                            )}
                          </div>
                          <div className="text-[12px] text-slate-500 truncate">{u.email}</div>
                          <div className="text-[11px] text-slate-400">{u.phone}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          u.role === 'Administrador'
                            ? 'bg-blue-100 text-[#0037b0]'
                            : u.role === 'Usuario'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          u.status === 'Activo'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.status === 'Activo' ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        ></span>
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-800">
                        S/ {u.totalBalance.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {u.totalDebts} {u.totalDebts === 1 ? 'deuda' : 'deudas'}
                        {u.delinquentCount > 0 && (
                          <span className="ml-1 text-rose-600 font-bold">
                            ({u.delinquentCount} en mora)
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-slate-500 text-[12px]">
                      {u.joinedDate}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(u)}
                          title={u.status === 'Activo' ? 'Suspender usuario' : 'Activar usuario'}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            u.status === 'Activo'
                              ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[17px]">
                            {u.status === 'Activo' ? 'block' : 'check_circle'}
                          </span>
                        </button>

                        <button
                          onClick={() => setSelectedUser(u)}
                          title="Ver detalles"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[17px]">visibility</span>
                        </button>

                        {u.role !== 'Administrador' && (
                          <button
                            onClick={() => onDeleteUser(u.id)}
                            title="Eliminar usuario"
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[17px]">delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0037b0] text-[24px]">person_add</span>
                <h3 className="font-headline-sm text-[18px] font-bold text-slate-900">Registrar Nuevo Usuario</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3.5 pt-4">
              <div>
                <label className="text-[12px] font-bold text-slate-700 block mb-1">Nombre completo *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Carlos Eduardo Paredes"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Correo electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="usuario@correo.pe"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+51 900 000 000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Rol</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none bg-white focus:border-[#0037b0]"
                  >
                    <option value="Usuario">Usuario Registrado</option>
                    <option value="Invitado">Invitado</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Estado</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none bg-white focus:border-[#0037b0]"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Suspendido">Suspendido</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Número de Deudas</label>
                  <input
                    type="number"
                    min="0"
                    value={formTotalDebts}
                    onChange={(e) => setFormTotalDebts(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-700 block mb-1">Saldo Total Inicial (S/)</label>
                  <input
                    type="number"
                    min="0"
                    value={formTotalBalance}
                    onChange={(e) => setFormTotalBalance(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[13px] outline-none focus:border-[#0037b0]"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-[13px] hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0037b0] text-white font-bold text-[13px] hover:bg-[#002f99] shadow-xs cursor-pointer"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-headline-sm text-[17px] font-bold text-slate-900">Ficha de Usuario</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0037b0] text-white font-black text-[18px] flex items-center justify-center">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-[16px]">{selectedUser.name}</h4>
                  <span className="text-[12px] text-slate-500">{selectedUser.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[12px] bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Rol:</span>
                  <span className="font-bold text-slate-800">{selectedUser.role}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Estado:</span>
                  <span className="font-bold text-emerald-700">{selectedUser.status}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Deuda Total:</span>
                  <span className="font-bold text-slate-800">S/ {selectedUser.totalBalance.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Fecha Registro:</span>
                  <span className="font-bold text-slate-800">{selectedUser.joinedDate}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-[13px] hover:bg-slate-800 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
