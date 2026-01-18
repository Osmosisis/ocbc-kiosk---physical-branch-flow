import React, { useState, useMemo, useEffect } from 'react'
import { Header } from './components/Header'
import { BranchCard } from './components/BranchCard'
import { AppStep, Branch, QueueTicket, Region } from './types'
import { supabase } from './supabaseClient'
import {
  Building2, Video, Layout, ChevronRight, ArrowLeft, Search, Download, CheckCircle2,
  Calendar, XCircle, QrCode, Map, HelpCircle, RefreshCw, Smartphone, Ticket
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'


const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('DASHBOARD');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [ticket, setTicket] = useState<QueueTicket | null>(null);
  const [initialQueue, setInitialQueue] = useState<string>('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('ALL');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [branches, setBranches] = useState<Branch[]>([])
  const handleBack = () => {
  if (step === 'RESOLUTION_PATH') return setStep('DASHBOARD')
  if (step === 'CONSULTATION_MODE') return setStep('RESOLUTION_PATH')
  if (step === 'INITIAL_QUEUE') return setStep('CONSULTATION_MODE')
  if (step === 'BRANCH_SELECTION') return setStep('INITIAL_QUEUE')
  if (step === 'TICKET_DISPLAY') return setStep('BRANCH_SELECTION')
}



  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  const load = async () => {
    const { data, error } = await supabase
      .from('branch')
      .select('branch_id, name, address, postal_code, is_premier, region')

    if (error) return

    setBranches(
      (data ?? []).map(b => ({
        id: b.branch_id,
        name: b.name,
        address: b.address,
        postalCode: b.postal_code,
        isPremier: b.is_premier,
        region: b.region
      }))
    )
  }
  load()
}, [])


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredBranches = useMemo(() => {
    return branches.filter(branch => {
      const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            branch.postalCode.includes(searchQuery);
      const matchesRegion = selectedRegion === 'ALL' || branch.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [branches, searchQuery, selectedRegion]);


  const startConsultationFlow = () => {
    const randomInitial = `P2${Math.floor(Math.random() * 90 + 10)}`;
    setInitialQueue(randomInitial);
    setStep('INITIAL_QUEUE');
  };

  const generateTicket = async (branch: Branch) => {
  const { data, error } = await supabase.rpc('issue_queue_ticket', {
    p_branch_id: branch.id,
    p_session_code: initialQueue,
    p_customer_id: null,
    p_terminal_code: '82'
  })

  if (error || !data) return

  const validDate = new Date(data.valid_until).toLocaleDateString('en-SG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  setTicket({
    number: data.ticket_number,
    branchName: branch.name,
    counterRange: data.counter_range,
    validUntil: validDate
  })

  setStep('TICKET_DISPLAY')
}


  const resetFlow = () => {
  setStep('DASHBOARD')
  setSelectedBranch(null)
  setTicket(null)
  setSearchQuery('')
  setSelectedRegion('ALL')
  setTimeLeft(300)
  setInitialQueue('')
}


  return (
    <div className="h-screen w-screen bg-[#0f172a] overflow-hidden flex flex-col relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-ocbc-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-10 relative overflow-hidden">
        
        <div className="w-full max-w-6xl h-[82vh] kiosk-glass rounded-[40px] kiosk-shadow relative flex flex-col overflow-hidden animate-kiosk-entry">
          
          <div className="px-8 py-5 flex items-center justify-between border-b border-gray-100 bg-white/50 flex-shrink-0">
            <div className="flex items-center gap-4">
              {step !== 'DASHBOARD' && (
                <button 
                  onClick={handleBack}
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black hover:text-ocbc-red hover:scale-105 active:scale-90 transition-all kiosk-shadow border border-gray-100"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div>
                <h1 className="text-xl font-black text-black tracking-tight leading-none uppercase">
                  {step === 'DASHBOARD' && <span className="text-ocbc-red">How can we help you today?</span>}
                  {step === 'RESOLUTION_PATH' && <span className="text-ocbc-red">Choose your preferred path</span>}
                  {step === 'CONSULTATION_MODE' && <span className="text-ocbc-red">Select meeting style</span>}
                  {step === 'INITIAL_QUEUE' && <span className="text-ocbc-red">Initial Identification</span>}
                  {step === 'BRANCH_SELECTION' && <span className="text-ocbc-red">Choose a branch</span>}
                  {step === 'TICKET_DISPLAY' && <span className="text-ocbc-red">Pass generated successfully</span>}
                </h1>
                <p className="text-[10px] font-black text-zinc-800 uppercase tracking-widest mt-1">
                  Terminal #82 • Secure Self-Service System
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-green-50 text-green-700 font-black rounded-lg border border-green-200 text-[9px] flex items-center gap-1.5 uppercase tracking-wider">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" /> Live Terminal
              </div>
            </div>
          </div>

          <div className={`flex-1 overflow-y-auto custom-scroll px-8 py-4 ${step !== 'BRANCH_SELECTION' && step !== 'TICKET_DISPLAY' ? 'flex flex-col items-center justify-center' : ''}`}>
            
            {step === 'DASHBOARD' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
                <div 
                  onClick={() => setStep('RESOLUTION_PATH')}
                  className="bg-white p-8 rounded-[40px] border-2 border-transparent hover:border-ocbc-red hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer group flex flex-col items-center text-center kiosk-shadow"
                >
                  <div className="w-20 h-20 bg-red-50 rounded-[28px] flex items-center justify-center text-ocbc-red mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Building2 size={48} />
                  </div>
                  <h2 className="text-2xl font-black text-black mb-3 uppercase tracking-tighter">Branch Services</h2>
                  <p className="text-sm text-black font-extrabold leading-relaxed mb-6">Queue tickets, physical document processing & appointments.</p>
                  <div className="w-full py-4 bg-ocbc-red text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-red-100 group-active:scale-95 transition-transform">
                    GET STARTED <ChevronRight size={20} />
                  </div>
                </div>

                <div className="bg-white/50 p-8 rounded-[40px] border border-gray-100 opacity-60 flex flex-col items-center text-center relative grayscale cursor-not-allowed">
                  <div className="w-20 h-20 bg-gray-50 rounded-[28px] flex items-center justify-center text-gray-400 mb-6">
                    <Smartphone size={48} />
                  </div>
                  <h2 className="text-2xl font-black text-gray-400 mb-3 uppercase tracking-tighter">Digital Banking</h2>
                  <p className="text-sm text-zinc-900 font-extrabold leading-relaxed mb-6">Manage accounts instantly via the OCBC mobile application.</p>
                  <div className="absolute top-6 right-6 bg-black text-white text-[9px] font-black px-3 py-1.5 rounded-lg tracking-widest uppercase shadow-md">Mobile Device Required</div>
                </div>
              </div>
            )}

            {step === 'RESOLUTION_PATH' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
                {[
                  { icon: <Layout size={32} />, title: 'Tutorials', desc: 'Guided help' },
                  { icon: <Search size={32} />, title: 'Visual Guide', desc: 'Interactive aid' },
                  { 
                    icon: <CheckCircle2 size={32} />, 
                    title: 'Human Expert', 
                    desc: 'Speak with us',
                    active: true 
                  },
                ].map((card, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => card.active && setStep('CONSULTATION_MODE')}
                    className={`p-8 rounded-[36px] bg-white border-2 transition-all duration-300 ease-out flex flex-col items-center text-center ${card.active ? 'border-transparent hover:border-ocbc-red hover:scale-105 active:scale-95 cursor-pointer kiosk-shadow group' : 'border-gray-50 opacity-40 grayscale cursor-not-allowed'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${card.active ? 'bg-red-50 text-ocbc-red group-hover:bg-ocbc-red group-hover:text-white' : 'bg-gray-50 text-gray-300'} transition-all`}>
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-black text-black mb-1 uppercase tracking-tight">{card.title}</h3>
                    <p className="text-[11px] text-black font-black uppercase tracking-wider">{card.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {step === 'CONSULTATION_MODE' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
                <div 
                  onClick={startConsultationFlow}
                  className="bg-white p-8 rounded-[40px] border-4 border-transparent hover:border-ocbc-red hover:scale-[1.05] active:scale-[0.98] cursor-pointer kiosk-shadow transition-all duration-300 ease-out group text-center"
                >
                  <div className="w-20 h-20 bg-red-50 rounded-[28px] flex items-center justify-center mb-6 mx-auto group-hover:bg-ocbc-red group-hover:text-white transition-all">
                    <QrCode size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-3 uppercase tracking-tighter">QR Pass</h3>
                  <p className="text-sm text-black font-extrabold mb-6 leading-relaxed">Generate a digital pass to scan at any branch kiosk for immediate service.</p>
                  <div className="text-ocbc-red font-black text-sm flex items-center justify-center gap-2 uppercase tracking-widest border-2 border-ocbc-red py-3 rounded-2xl group-hover:bg-ocbc-red group-hover:text-white transition-all shadow-sm">
                    SELECT MODE <ChevronRight size={18} />
                  </div>
                </div>

                <div className="bg-white/50 p-8 rounded-[40px] border-2 border-gray-50 opacity-40 text-center grayscale relative cursor-not-allowed">
                  <div className="w-20 h-20 bg-gray-50 rounded-[28px] flex items-center justify-center mb-6 mx-auto">
                    <Video size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-400 mb-3 uppercase tracking-tighter">Remote Video</h3>
                  <p className="text-sm text-zinc-900 font-extrabold leading-relaxed mb-6">Secure video consultation from your current location via digital lobby.</p>
                  <div className="absolute top-6 right-6 bg-black text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-md">Coming Soon</div>
                </div>
              </div>
            )}

            {step === 'INITIAL_QUEUE' && (
              <div className="w-full max-w-md mx-auto bg-white p-6 rounded-[32px] kiosk-shadow border-2 border-gray-100 flex flex-col items-center text-center animate-kiosk-entry hover:scale-[1.05] transition-all duration-300 ease-out">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-ocbc-red mb-4 shadow-sm">
                  <Ticket size={32} />
                </div>
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Session Identifier</h3>
                <div className="text-6xl font-black text-black mb-4 tracking-tighter drop-shadow-sm select-all">{initialQueue}</div>
                <p className="text-sm text-zinc-800 font-black leading-relaxed mb-6">
                  Your unique identifier has been assigned.<br/>Proceed to select your preferred branch.
                </p>
                <button 
                  onClick={() => setStep('BRANCH_SELECTION')}
                  className="w-full py-4 bg-black text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg uppercase tracking-widest"
                >
                  SELECT BRANCH <ChevronRight size={18} />
                </button>
              </div>
            )}

            {step === 'BRANCH_SELECTION' && (
              <div className="flex flex-col w-full h-full space-y-4">
                <div className="flex items-center gap-4 flex-shrink-0 bg-white/40 p-3 rounded-[24px] border border-gray-100 kiosk-shadow">
                  <div className="relative group flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black opacity-80 group-focus-within:text-ocbc-red group-focus-within:opacity-100 transition-all" size={20} />
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="SEARCH BRANCH OR AREA..."
                      className="w-full pl-12 pr-10 py-3 bg-white border-2 border-transparent rounded-xl outline-none focus:border-ocbc-red text-base font-black text-black placeholder:text-zinc-500 transition-all shadow-sm uppercase"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-black opacity-30 hover:opacity-100"><XCircle size={20} /></button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pr-2">
                    <div className="text-[10px] font-black text-black uppercase tracking-widest ml-1 mr-2">Filter:</div>
                    {(['ALL', 'CENTRAL', 'EAST', 'NORTH', 'WEST'] as Region[]).map(region => (
                      <button
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all border-2 whitespace-nowrap ${
                          selectedRegion === region 
                            ? 'bg-ocbc-red text-white border-ocbc-red shadow-lg shadow-red-200' 
                            : 'bg-white text-black border-gray-200 hover:border-ocbc-red hover:text-ocbc-red active:scale-95'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scroll -mr-2 pr-2">
                  {filteredBranches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                      {filteredBranches.map(branch => (
                        <BranchCard 
                          key={branch.id} 
                          branch={branch} 
                          onSelect={(b) => {
                            setSelectedBranch(b);
                            generateTicket(b);
                          }} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Search size={64} className="text-zinc-400 mb-4" />
                      <h3 className="text-2xl font-black text-zinc-400 uppercase tracking-tighter">No locations found</h3>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 'TICKET_DISPLAY' && ticket && (
              <div className="max-w-md mx-auto flex flex-col items-center w-full py-1">
                <div className="bg-white rounded-[40px] overflow-hidden kiosk-shadow border-2 border-gray-100 w-full mb-4">
                  <div className="bg-[#121417] p-6 flex flex-col items-center text-center">
                    <div className="p-6 bg-white rounded-[32px] kiosk-shadow flex flex-col items-center">
                      <QRCodeSVG 
                        value={JSON.stringify({
                          t: ticket.number,
                          b: ticket.branchName,
                          c: ticket.counterRange
                        })} 
                        size={160}
                        bgColor={"#FFFFFF"}
                        fgColor={"#000000"}
                        level={"H"}
                      />
                      <div className="mt-4 bg-ocbc-red text-white font-black text-3xl px-6 py-2 rounded-2xl shadow-xl shadow-red-500/30 tracking-tight">
                        {ticket.number}
                      </div>
                    </div>
                    
                    <h2 className="text-white text-2xl font-black mb-1 uppercase tracking-tighter mt-6">Pass Generated</h2>
                    <p className="text-white text-[10px] font-black max-w-[240px] leading-relaxed uppercase tracking-wider">
                      Please present this code at <span className="text-ocbc-red font-black underline">{ticket.branchName}</span> terminals.
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-zinc-50 rounded-[20px] border-2 border-zinc-200">
                        <div className="text-[10px] font-black text-ocbc-red uppercase tracking-widest mb-1 flex items-center gap-1.5">
                          <Map size={12} /> Branch
                        </div>
                        <div className="text-[14px] font-black text-black truncate uppercase">{ticket.branchName}</div>
                      </div>
                      <div className="p-4 bg-zinc-50 rounded-[20px] border-2 border-zinc-200">
                        <div className="text-[10px] font-black text-ocbc-red uppercase tracking-widest mb-1 flex items-center gap-1.5">
                          <Layout size={12} /> Service
                        </div>
                        <div className="text-[14px] font-black text-black truncate uppercase">{ticket.counterRange}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-3 py-3 bg-zinc-50 rounded-xl border border-zinc-200">
                      <div className="flex items-center gap-2 text-black font-black text-[10px] uppercase tracking-widest">
                        <Calendar size={16} className="text-ocbc-red" />
                        Valid Until: {ticket.validUntil}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-green-700 uppercase tracking-widest leading-none">Verified Pass</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-ocbc-red text-white font-black text-lg rounded-2xl kiosk-shadow flex items-center justify-center gap-3 hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-red-200 uppercase tracking-widest">
                  <Download size={20} /> Save Pass to Device
                </button>
              </div>
            )}
          </div>

          <div className="px-8 py-4 bg-white border-t border-gray-100 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">System Security</div>
              <div className={`px-4 py-1.5 rounded-lg text-[13px] font-black font-mono transition-colors border-2 ${timeLeft < 60 ? 'bg-red-50 text-ocbc-red border-ocbc-red animate-pulse' : 'bg-zinc-100 text-black border-zinc-300'}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
            
            <div className="flex gap-4">
               {step !== 'DASHBOARD' && (
                <button 
                  onClick={resetFlow}
                  className="px-6 py-2.5 bg-white text-black text-[11px] font-black rounded-xl border-2 border-zinc-300 hover:border-ocbc-red hover:text-ocbc-red transition-all flex items-center gap-2 uppercase tracking-widest shadow-sm active:scale-95"
                >
                  <RefreshCw size={14} /> Start Over
                </button>
               )}
               <button className="px-6 py-2.5 bg-black text-white text-[11px] font-black rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 uppercase tracking-widest shadow-md active:scale-95">
                <HelpCircle size={14} /> Kiosk Help
              </button>
            </div>
          </div>
        </div>

      </main>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/20 font-black tracking-[0.8em] text-[8px] uppercase pointer-events-none">
        <span className="w-12 h-[1px] bg-white/20" />
        OCBC SECURE DIGITAL TERMINAL
        <span className="w-12 h-[1px] bg-white/20" />
      </div>
    </div>
  );
};

export default App;