import React, { useState, useEffect } from 'react';
import api from '../../services/apiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Shield, Trash2, Mail, MoreVertical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MEMBER');
  const { user } = useAuth();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await api.get('/team/members');
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/team/invite', { email, role });
      setInviting(false);
      setEmail('');
      fetchMembers();
    } catch (err) {
      alert('Invite failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-medium text-white italic">Team Management</h1>
          <p className="text-white/40">Manage workspace members and their roles.</p>
        </div>
        <button
          onClick={() => setInviting(true)}
          className="cyber-button flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Member</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Role</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Status</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">Joined</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      {member.name?.[0] || member.email[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{member.name || 'Anonymous'}</div>
                      <div className="text-xs text-white/40">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-white/60">
                    <Shield className="w-3 h-3" />
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="w-2 h-2 rounded-full bg-brand-primary inline-block mr-2" />
                  <span className="text-xs text-white/60">{member.status}</span>
                </td>
                <td className="px-6 py-4 text-xs text-white/40">
                  {new Date(member.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {inviting && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md glass-panel p-8 space-y-6 bg-bg-dark"
            >
              <h2 className="text-xl font-bold">Invite new member</h2>
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-white/40">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-brand-primary/50"
                    placeholder="teammate@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-white/40">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="AGENT">Agent</option>
                    <option value="MEMBER">Member</option>
                    <option value="VIEWER">Viewer</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setInviting(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-sm font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 cyber-button text-sm font-bold"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
