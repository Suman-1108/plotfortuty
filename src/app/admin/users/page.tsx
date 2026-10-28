'use client';

import { useState } from 'react';
import {
  Users,
  UserCheck,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Search,
  ShieldCheck
} from 'lucide-react';

const SAMPLE_USERS = [
  {
    id: 'usr-1',
    name: 'S. Ramanathan',
    phone: '+91 98421 55678',
    email: 'ramanathan.s@gmail.com',
    role: 'Verified Buyer',
    savedPlots: 2,
    enquiries: 3,
    joined: '12 Jan 2026',
    status: 'Active',
  },
  {
    id: 'usr-2',
    name: 'K. Balasubramanian',
    phone: '+91 94431 88210',
    email: 'bala.subbu@gmail.com',
    role: 'Buyer',
    savedPlots: 4,
    enquiries: 2,
    joined: '28 Jan 2026',
    status: 'Active',
  },
  {
    id: 'usr-3',
    name: 'M. Anand Kumar',
    phone: '+91 97914 55201',
    email: 'anand.maritime@gmail.com',
    role: 'Buyer (NRI)',
    savedPlots: 1,
    enquiries: 1,
    joined: '04 Feb 2026',
    status: 'Active',
  },
  {
    id: 'usr-4',
    name: 'Dr. V. Rajeshwari',
    phone: '+91 98422 91823',
    email: 'dr.rajeshwari.tuticorin@hospital.org',
    role: 'Verified Buyer',
    savedPlots: 3,
    enquiries: 2,
    joined: '19 Feb 2026',
    status: 'Active',
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [search, setSearch] = useState('');

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DADDD5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#668F35] bg-[#EBF2DE] px-3 py-1 rounded-full border border-[#D5E3C3]">
            User Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F271B] mt-2">
            Registered Customers &amp; Buyers ({users.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Monitor registered buyers, saved properties, enquiry records, and account verification in Thoothukudi.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:border-[#668F35]"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#DADDD5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 font-extrabold uppercase text-[10px]">
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Role</th>
                <th className="p-4">Saved Favourites</th>
                <th className="p-4">Enquiries Sent</th>
                <th className="p-4">Member Since</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[#1F271B]">{user.name}</td>
                  <td className="p-4 text-gray-600">
                    <div className="font-mono">{user.phone}</div>
                    <div className="text-[11px] text-gray-400">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2DE] text-[#486725] font-bold text-[10px]">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-[#1F271B]">{user.savedPlots} Plots</td>
                  <td className="p-4 font-bold text-[#668F35]">{user.enquiries} Inquiries</td>
                  <td className="p-4 text-gray-500">{user.joined}</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{user.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
