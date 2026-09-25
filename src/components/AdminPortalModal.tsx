import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  Flame, 
  Wine, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Lock,
  Radio,
  Users,
  UtensilsCrossed
} from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'reservations' | 'dimsum' | 'cocktails' | 'booths'>('reservations');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'lotus2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAutoFill = () => {
    setPasscode('lotus2026');
    setIsAuthenticated(true);
    setError(false);
  };

  const reservations = [
    { id: 'NL-9201', guest: 'Marcus Sterling', tier: "Dragon Banquet", party: 6, time: '19:30', table: 'Booth 08 (Neon Alcove)', status: 'CONFIRMED' },
    { id: 'NL-9202', guest: 'Dr. Vivienne Chen', tier: "Chef's Dim Sum Flight", party: 2, time: '20:15', table: 'Chef Counter 03', status: 'SEATED' },
    { id: 'NL-9203', guest: 'Alexander Wright', tier: 'Baijiu Tasting Room', party: 4, time: '21:00', table: 'Booth 02 (Lantern Room)', status: 'CONFIRMED' },
    { id: 'NL-9204', guest: 'Chloe Laurent', tier: 'Bistro Speakeasy Buyout', party: 12, time: '22:00', table: 'Imperial Pavilion', status: 'PENDING_DEPOSIT' },
  ];

  const dimsumRations = [
    { id: 'DS-01', name: 'Truffle Pork Xiao Long Bao (Soup Dumplings)', category: 'Steamed Baskets', price: '$24.00', status: 'IN_STOCK', temp: '100°C Steam' },
    { id: 'DS-02', name: 'Crispy Wagyu Beef Char Siu Puffs', category: 'Baked Delicacies', price: '$28.00', status: 'LOW_STOCK', temp: 'Fresh Baked' },
    { id: 'DS-03', name: 'Lobster & Tiger Prawn Shumai with Golden Caviar', category: 'Signature Dim Sum', price: '$32.00', status: 'IN_STOCK', temp: 'Optimum' },
    { id: 'DS-04', name: 'Inferno Wok-Seared Dan Dan Noodles', category: 'Wok Protocols', price: '$22.00', status: 'IN_STOCK', temp: '1,000°C Wok Hei' },
  ];

  const baijiuCocktails = [
    { id: 'CKT-201', name: 'The Dragon’s Pearl (Kweichow Moutai, Lychee Liqueur, Smoke)', abv: '22%', price: '$26.00', level: '88% Full' },
    { id: 'CKT-202', name: 'Crimson Lantern Highball (Infused Baijiu, Plum, Tonic)', abv: '16%', price: '$20.00', level: '94% Full' },
    { id: 'CKT-203', name: 'Jade Empress Negroni (Aged Baijiu, Campari, Sweet Vermouth)', abv: '24%', price: '$24.00', level: '76% Full' },
    { id: 'CKT-204', name: 'Wuyi Mountain Smoked Tea Zero-Proof', abv: '0% Non-Alc', price: '$15.00', level: '100% Full' },
  ];

  const booths = [
    { id: 'BTH-08', name: 'Imperial Dragon Booth', capacity: '6-8 Guests', ambiance: 'Crimson Neon & Silk Partitions', status: 'OCCUPIED' },
    { id: 'BTH-02', name: 'Lantern Room Alcove', capacity: '4-6 Guests', ambiance: 'Amber Hanging Lanterns', status: 'OCCUPIED' },
    { id: 'CTR-03', name: "Chef's Dumpling Counter", capacity: '2 Guests', ambiance: 'Direct View of Steamer Station', status: 'SEATED' },
    { id: 'PAV-01', name: 'Imperial VIP Pavilion', capacity: '12-16 Guests', ambiance: 'Private Soundproof Salon', status: 'RESERVED' },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#0A0A0B] border-2 border-neon-red/40 shadow-[0_0_50px_rgba(255,62,62,0.25)] rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-neon-red rounded-full animate-ping" />
            <span className="font-display text-xs uppercase tracking-[0.25em] text-neon-red font-bold flex items-center gap-2">
              <Terminal size={14} /> NEON_LOTUS_OS // BISTRO_OPERATOR_GATE
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-neon-red transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 md:p-12 flex flex-col items-center text-center font-display">
            <div className="w-16 h-16 rounded-full bg-neon-red/10 border border-neon-red/40 flex items-center justify-center text-neon-red mb-6 shadow-[0_0_20px_rgba(255,62,62,0.3)]">
              <Lock size={28} />
            </div>

            <h3 className="text-2xl font-black uppercase tracking-wider mb-2 text-white">
              BISTRO_PASSCODE_REQUIRED
            </h3>
            <p className="text-white/50 text-xs max-w-md mb-8 font-sans">
              Restricted management portal for Neon Lotus floor leads and head sommeliers. Enter your passkey or click the 1-click bypass button below.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 mb-6">
              <div className="relative">
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="ENTER ACCESS KEY"
                  className="w-full bg-black/80 border border-neon-red/50 px-4 py-3 text-center text-sm font-mono text-neon-red tracking-[0.3em] focus:outline-none focus:border-neon-blue rounded"
                />
              </div>

              {error && (
                <div className="flex items-center justify-center gap-2 text-red-500 text-xs font-sans">
                  <AlertCircle size={14} />
                  <span>INVALID BISTRO PASSKEY</span>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3.5 bg-neon-red text-charcoal font-display font-bold text-base font-semibold min-h-[44px] uppercase tracking-widest hover:bg-white transition-colors rounded"
              >
                UNLOCK FLOOR CONSOLE
              </button>
            </form>

            <div className="w-full max-w-sm pt-6 border-t border-white/10">
              <button 
                onClick={handleAutoFill}
                className="w-full py-2.5 px-4 bg-neon-blue/15 hover:bg-neon-blue/25 border border-neon-blue/40 text-neon-blue text-base font-semibold min-h-[44px] font-mono tracking-widest rounded transition-all flex items-center justify-center gap-2 group"
              >
                <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
                <span>[ 1-CLICK DEMO PASSKEY: lotus2026 ]</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden font-sans">
            {/* Top Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 bg-black/60 text-xs divide-x divide-white/10 font-display">
              <div className="p-4">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Tonight's Covers</span>
                <span className="text-neon-red font-bold text-base">78 / 84 SEATS</span>
              </div>
              <div className="p-4">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Wok Station Hei</span>
                <span className="text-neon-blue font-bold text-base">1,000°C INFERNO</span>
              </div>
              <div className="p-4">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Steamer Baskets</span>
                <span className="text-white font-bold text-base">320 STEAMED</span>
              </div>
              <div className="p-4">
                <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Baijiu Cellar</span>
                <span className="text-neon-red font-bold text-base">94% DISPENSED</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 bg-black/40 overflow-x-auto text-xs font-display">
              <button 
                onClick={() => setActiveTab('reservations')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === 'reservations' 
                    ? 'border-neon-red text-neon-red bg-neon-red/10' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Calendar size={14} />
                <span>01_RESERVATIONS</span>
              </button>
              <button 
                onClick={() => setActiveTab('dimsum')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === 'dimsum' 
                    ? 'border-neon-red text-neon-red bg-neon-red/10' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Flame size={14} />
                <span>02_DIM_SUM_HEI</span>
              </button>
              <button 
                onClick={() => setActiveTab('cocktails')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === 'cocktails' 
                    ? 'border-neon-red text-neon-red bg-neon-red/10' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Wine size={14} />
                <span>03_BAIJIU_BAR</span>
              </button>
              <button 
                onClick={() => setActiveTab('booths')}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === 'booths' 
                    ? 'border-neon-red text-neon-red bg-neon-red/10' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Users size={14} />
                <span>04_SPEAKEASY_BOOTHS</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              {activeTab === 'reservations' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold tracking-wider font-mono">
                      Tonight's Guest Roster // Live Supabase Sync
                    </span>
                    <span className="text-neon-blue text-xs font-semibold tracking-wider flex items-center gap-1.5 font-mono">
                      <Radio size={12} className="animate-pulse" /> FLOOR LIVE
                    </span>
                  </div>

                  <div className="overflow-x-auto border border-white/10 rounded">
                    <table className="w-full text-left font-mono">
                      <thead className="bg-white/5 text-xs font-semibold tracking-wider text-white/40 uppercase tracking-wider font-display">
                        <tr>
                          <th className="p-3">Ref ID</th>
                          <th className="p-3">Guest Name</th>
                          <th className="p-3">Experience Tier</th>
                          <th className="p-3">Party</th>
                          <th className="p-3">Seating Time</th>
                          <th className="p-3">Table Node</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {reservations.map(res => (
                          <tr key={res.id} className="hover:bg-white/5">
                            <td className="p-3 text-neon-red">{res.id}</td>
                            <td className="p-3 font-bold text-white">{res.guest}</td>
                            <td className="p-3 text-white/70">{res.tier}</td>
                            <td className="p-3 text-white/50">{res.party} guests</td>
                            <td className="p-3 text-white/80">{res.time}</td>
                            <td className="p-3 text-white/60">{res.table}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                res.status === 'CONFIRMED' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/40' :
                                res.status === 'SEATED' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                                'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                              }`}>
                                {res.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'dimsum' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold tracking-wider font-mono">
                      Steamer Baskets & Inferno Wok Hei
                    </span>
                    <span className="text-neon-red text-xs font-semibold tracking-wider font-mono">1,000°C INFERNO FLAME</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {dimsumRations.map(item => (
                      <div key={item.id} className="p-4 bg-white/5 border border-white/10 rounded flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-neon-blue text-xs font-semibold tracking-wider font-mono">{item.id} // {item.category}</span>
                            <h4 className="text-sm font-bold text-white uppercase font-display">{item.name}</h4>
                          </div>
                          <span className="text-neon-red font-bold text-sm font-mono">{item.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-white/50 border-t border-white/10 pt-2 mt-2 font-mono">
                          <span>Hearth: {item.temp}</span>
                          <span className={`font-bold ${item.status === 'IN_STOCK' ? 'text-neon-blue' : 'text-amber-400'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'cocktails' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold tracking-wider font-mono">
                      Artisanal Baijiu Infusion Dispensary
                    </span>
                    <span className="text-neon-blue text-xs font-semibold tracking-wider font-mono">CELLAR PRESSURE: OPTIMAL</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {baijiuCocktails.map(ckt => (
                      <div key={ckt.id} className="p-4 bg-white/5 border border-white/10 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-neon-red text-xs font-semibold tracking-wider font-mono">{ckt.id}</span>
                            <h4 className="text-sm font-bold text-white font-display">{ckt.name}</h4>
                          </div>
                          <span className="text-neon-blue font-bold font-mono">{ckt.price}</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold tracking-wider text-white/50 border-t border-white/10 pt-2 mt-2 font-mono">
                          <span>Proof: {ckt.abv}</span>
                          <span className="text-white/80">{ckt.level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'booths' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold tracking-wider font-mono">
                      Speakeasy Seating & Private Dining Salons
                    </span>
                    <span className="text-green-400 text-xs font-semibold tracking-wider font-mono">4 / 4 BOOTHS MONITORED</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {booths.map(booth => (
                      <div key={booth.id} className="p-4 bg-white/5 border border-white/10 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-white font-display">{booth.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                            booth.status === 'AVAILABLE' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                            booth.status === 'RESERVED' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' :
                            'bg-neon-red/20 text-neon-red border border-neon-red/40'
                          }`}>
                            {booth.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold tracking-wider text-white/50 mb-2 font-mono">Capacity: {booth.capacity}</p>
                        <div className="text-[9px] text-neon-blue/80 border-t border-white/10 pt-2 font-mono">
                          Ambiance: {booth.ambiance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-black/80 flex items-center justify-between text-xs font-semibold tracking-wider text-white/40 font-mono">
              <span className="flex items-center gap-1.5 text-neon-blue">
                <Database size={12} /> SUPABASE POSTGRESQL CONNECTED (RLS SECURE)
              </span>
              <span>AUTHENTICATED BISTRO LEAD SESSION</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
