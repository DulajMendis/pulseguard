'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MousePointer, Gauge, ListFilter, SlidersHorizontal, Check, RefreshCw, Trash2, Edit3, Copy, Share2, Info } from 'lucide-react';
import { interactionRules } from '@/data/principles';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const InteractionLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'context-menu' | 'doherty-gauge' | 'filter-system'>('context-menu');

  // Interactive 1: Context Menu State
  const [menuPos, setMenuPos] = useState<{ x: number; y: number; flipY: boolean; flipX: boolean } | null>(null);
  const [menuActionToast, setMenuActionToast] = useState<string | null>(null);
  const triggerZoneRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!triggerZoneRef.current) return;
    const rect = triggerZoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Collision-aware flip calculations (Dulaj's Rule: Flip on edge)
    const menuWidth = 200;
    const menuHeight = 220;
    const flipX = x + menuWidth > rect.width;
    const flipY = y + menuHeight > rect.height;

    setMenuPos({ x, y, flipX, flipY });
  };

  const handleMenuAction = (action: string) => {
    setMenuActionToast(action);
    setMenuPos(null);
    setTimeout(() => setMenuActionToast(null), 2500);
  };

  // Interactive 2: Doherty Threshold Simulator
  const [testMode, setTestMode] = useState<'optimistic' | 'pessimistic'>('optimistic');
  const [likeCount, setLikeCount] = useState<number>(42);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [simulatedLatency, setSimulatedLatency] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleLikeTap = () => {
    const startTime = performance.now();
    if (testMode === 'optimistic') {
      // Immediate UI update (< 50ms)
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      const elapsed = Math.round(performance.now() - startTime);
      setSimulatedLatency(Math.max(elapsed, 18));
    } else {
      // Sluggish server wait (650ms)
      setIsSimulating(true);
      setTimeout(() => {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        setIsSimulating(false);
        setSimulatedLatency(680);
      }, 650);
    }
  };

  // Interactive 3: Filter Combinatorics System
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['safari']);
  const [selectedRegion, setSelectedRegion] = useState<string>('southern');

  const sampleInventory = [
    { id: 1, title: 'Udawalawe Elephant Safari', type: 'safari', region: 'southern' },
    { id: 2, title: 'Ceylon 1850 Curated Feast', type: 'dining', region: 'southern' },
    { id: 3, title: 'Kandy to Ella Scenic Express', type: 'transit', region: 'central' },
    { id: 4, title: 'Godakawela Village Trek', type: 'safari', region: 'southern' },
    { id: 5, title: 'Fort Station Heritage Walk', type: 'transit', region: 'western' },
  ];

  const matchingItems = sampleInventory.filter((item) => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
    const matchesRegion = !selectedRegion || item.region === selectedRegion;
    return matchesType && matchesRegion;
  });

  return (
    <section id="lab" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          <Sparkles className="w-4 h-4" />
          Interactive UX Engineering Lab
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Interaction systems engineered for the Doherty threshold.
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Based directly on my documented design systems catalog: right-click mechanics, collision-aware geometry, optimistic UI latency budgets, and predictable filter algebra.
        </p>
      </div>

      {/* Lab Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('context-menu')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'context-menu'
              ? 'bg-purple-500/10 text-purple-500 border border-purple-500/30 dark:bg-purple-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MousePointer className="w-4 h-4" />
          <span>Right-Click is a System</span>
        </button>

        <button
          onClick={() => setActiveTab('doherty-gauge')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'doherty-gauge'
              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 dark:bg-emerald-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>Doherty Latency Gauge</span>
        </button>

        <button
          onClick={() => setActiveTab('filter-system')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'filter-system'
              ? 'bg-sky-500/10 text-sky-500 border border-sky-500/30 dark:bg-sky-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ListFilter className="w-4 h-4" />
          <span>Filters as a System</span>
        </button>
      </div>

      {/* Tab 1: Context Menu System */}
      {activeTab === 'context-menu' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Rule 01: Context Menu Architecture
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Never render before measuring fit. If the cursor approaches the bottom or right boundary of the viewport, the menu flips upward or leftward so it never clips offscreen.
            </p>
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-purple-500 font-semibold uppercase">Engineered Specifications:</div>
              <div>• Measure, then place dynamically</div>
              <div>• Group by intent (Primary, Edit, Danger)</div>
              <div>• Isolate destructive action last in red</div>
              <div>• Esc dismisses cleanly</div>
            </div>
            {menuActionToast && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-mono animate-fade-in flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Dispatched Action: {menuActionToast}</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div
              ref={triggerZoneRef}
              onContextMenu={handleContextMenu}
              onClick={() => setMenuPos(null)}
              className="w-full h-80 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-900/40 relative flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
            >
              <MousePointer className="w-8 h-8 text-purple-500 mb-3 animate-bounce" />
              <div className="text-base font-bold text-slate-900 dark:text-white">
                Right-Click or Long-Press anywhere in this arena
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                Try clicking near the edges or bottom corners to watch the collision-aware flipping engine in action.
              </p>

              {/* Render Context Menu */}
              {menuPos && (
                <div
                  style={{
                    position: 'absolute',
                    top: menuPos.flipY ? `${menuPos.y - 200}px` : `${menuPos.y}px`,
                    left: menuPos.flipX ? `${menuPos.x - 190}px` : `${menuPos.x}px`,
                  }}
                  className="w-48 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl p-1.5 z-30 animate-fade-in text-left text-xs font-medium space-y-1"
                >
                  {/* Group 1: Primary */}
                  <button
                    onClick={() => handleMenuAction('Inspect Tour File')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <span>Inspect Tour File</span>
                    <span className="text-[10px] font-mono text-slate-500">⌘I</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction('Share Snapshot')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-sky-400" /> Share Link
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">⌘S</span>
                  </button>

                  <div className="border-t border-slate-800 my-1" />

                  {/* Group 2: Edit */}
                  <button
                    onClick={() => handleMenuAction('Duplicate Day Block')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Copy className="w-3.5 h-3.5 text-slate-400" /> Duplicate Block
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">⌘D</span>
                  </button>

                  <div className="border-t border-slate-800 my-1" />

                  {/* Group 3: Destructive (Red, isolated last) */}
                  <button
                    onClick={() => handleMenuAction('Prune Version Snapshot')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/15 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Trash2 className="w-3.5 h-3.5" /> Prune Snapshot
                    </span>
                    <span className="text-[10px] font-mono text-rose-500">⌫</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Doherty Latency Gauge */}
      {activeTab === 'doherty-gauge' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Rule 02: The Doherty Threshold (&lt;400ms)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              When computer and user interact at a pace that ensures neither has to wait on the other (&lt;400ms), productivity soars and the interface reads as instant. Compare optimistic execution vs server round-trip latency.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setTestMode('optimistic')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  testMode === 'optimistic'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-300 dark:border-slate-800'
                }`}
              >
                Optimistic UI (~25ms)
              </button>
              <button
                onClick={() => setTestMode('pessimistic')}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  testMode === 'pessimistic'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-300 dark:border-slate-800'
                }`}
              >
                Blocked Wait (~680ms)
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Reversible Low-Stakes Interaction (Bookmark / Like)
                </div>
                <div className="text-xs text-slate-500">
                  Current Mode: {testMode === 'optimistic' ? 'Optimistic (<50ms perception)' : 'Network Round-Trip (>600ms latency)'}
                </div>
              </div>

              {simulatedLatency !== null && (
                <Badge
                  variant={simulatedLatency < 400 ? 'emerald' : 'amber'}
                  size="md"
                  pulse={simulatedLatency < 400}
                >
                  {simulatedLatency}ms response
                </Badge>
              )}
            </div>

            {/* Test Action Arena */}
            <div className="flex items-center justify-center p-8 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <Button
                variant={isLiked ? 'primary' : 'secondary'}
                size="lg"
                onClick={handleLikeTap}
                isLoading={isSimulating}
                loadingText="Awaiting Network..."
              >
                <span>{isLiked ? 'Saved to Knowledge Base' : 'Save System Blueprint'}</span>
                <span className="ml-2 font-mono text-xs px-2 py-0.5 rounded-full bg-black/20">
                  {likeCount}
                </span>
              </Button>
            </div>

            {/* Doherty Gauge Visualizer */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>0ms (Instant)</span>
                <span className="text-emerald-400 font-bold">400ms (Doherty Cutoff)</span>
                <span>800ms (Laggy)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 relative overflow-hidden">
                {/* 400ms mark line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-emerald-500 z-10" />
                {simulatedLatency && (
                  <div
                    className={`h-full transition-all duration-300 ${
                      simulatedLatency < 400 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min((simulatedLatency / 800) * 100, 100)}%` }}
                  />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {simulatedLatency && simulatedLatency < 400
                  ? '✓ Perceived within the Doherty threshold. The interface feels natural and responsive.'
                  : simulatedLatency
                  ? '⚠ Exceeded 400ms. Perceived by human cognition as a pause or broken feedback.'
                  : 'Tap the action button above to calibrate your perception.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Filters as a System */}
      {activeTab === 'filter-system' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Rule 03: Filter Combinatorics
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Filters must provide same-frame feedback without full-page reloads. Selections within the same group combine with OR (widening), while selections across groups combine with AND (narrowing).
            </p>
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-sky-500 font-semibold uppercase">Rule Parameters:</div>
              <div>• 3 visual states: idle, active, disabled</div>
              <div>• Same-frame result recalculation</div>
              <div>• Instant single-tap Clear All</div>
              <div>• Non-destructive empty states</div>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6">
            {/* Filter Controls Bar */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Category (OR Logic within group):
                </span>
                {(selectedTypes.length > 0 || selectedRegion) && (
                  <button
                    onClick={() => {
                      setSelectedTypes([]);
                      setSelectedRegion('');
                    }}
                    className="text-xs font-mono text-emerald-400 hover:underline"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>

              {/* Type Chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'safari', label: 'Eco Safari' },
                  { id: 'dining', label: 'Ceylon 1850 Dining' },
                  { id: 'transit', label: 'Transit Railway' },
                ].map((type) => {
                  const isActive = selectedTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        if (isActive) setSelectedTypes(selectedTypes.filter((t) => t !== type.id));
                        else setSelectedTypes([...selectedTypes, type.id]);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-sky-500/20 text-sky-400 border-sky-500'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {isActive && <Check className="w-3 h-3" />}
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Region Chips (AND across groups) */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Region Constraint (AND Logic across groups):
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'southern', label: 'Southern (Udawalawe / Godakawela)' },
                    { id: 'central', label: 'Central (Kandy / Ella)' },
                    { id: 'western', label: 'Western (Colombo Fort)' },
                  ].map((region) => {
                    const isActive = selectedRegion === region.id;
                    return (
                      <button
                        key={region.id}
                        onClick={() => setSelectedRegion(isActive ? '' : region.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                            : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {region.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results Live View */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Verified Match Inventory</span>
                <Badge variant="blue" size="sm">
                  {matchingItems.length} results matching
                </Badge>
              </div>

              <div className="space-y-2">
                {matchingItems.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 rounded-xl bg-slate-900/60 border border-slate-800">
                    No results match this intersection. Tap "Clear All Filters" to reset.
                  </div>
                ) : (
                  matchingItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs animate-fade-in"
                    >
                      <span className="font-semibold text-white">{item.title}</span>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-sky-400 uppercase">
                          {item.type}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 uppercase">
                          {item.region}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
