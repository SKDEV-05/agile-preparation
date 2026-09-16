import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ArrowRight, ArrowLeft, Bookmark, Bug, CheckSquare, Filter } from 'lucide-react';

type TicketStatus = 'todo' | 'in_progress' | 'review' | 'done';
type TicketType = 'story' | 'bug' | 'task';

interface JiraTicket {
  id: string;
  key: string;
  title: string;
  type: TicketType;
  storyPoints: number;
  priority: 'Haute' | 'Moyenne' | 'Basse';
  assignee: string;
  status: TicketStatus;
}

const initialTickets: JiraTicket[] = [
  { id: '1', key: 'OFP-101', title: 'Connexion sécurisée par email & mot de passe', type: 'story', storyPoints: 5, priority: 'Haute', assignee: 'Sara', status: 'todo' },
  { id: '2', key: 'OFP-102', title: 'Consultation du relevé de notes semestriel', type: 'story', storyPoints: 8, priority: 'Haute', assignee: 'Karim', status: 'todo' },
  { id: '3', key: 'OFP-103', title: 'Correction faille injection SQL sur recherche', type: 'bug', storyPoints: 3, priority: 'Haute', assignee: 'Youssef', status: 'in_progress' },
  { id: '4', key: 'OFP-104', title: 'Configuration du linter ESLint et scripts CI', type: 'task', storyPoints: 2, priority: 'Moyenne', assignee: 'Salma', status: 'in_progress' },
  { id: '5', key: 'OFP-105', title: 'Revue de code composant NavBar responsive', type: 'story', storyPoints: 3, priority: 'Basse', assignee: 'Sara', status: 'review' },
  { id: '6', key: 'OFP-106', title: 'Mise en place de la base de données PostgreSQL', type: 'task', storyPoints: 5, priority: 'Haute', assignee: 'Karim', status: 'done' },
];

export function JiraBoard() {
  const [tickets, setTickets] = useState<JiraTicket[]>(initialTickets);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const moveTicket = (ticketId: string, direction: 'next' | 'prev') => {
    const statusOrder: TicketStatus[] = ['todo', 'in_progress', 'review', 'done'];
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t;
      const currentIndex = statusOrder.indexOf(t.status);
      const newIndex = direction === 'next'
        ? Math.min(statusOrder.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);
      return { ...t, status: statusOrder[newIndex] };
    }));
  };

  const columns: { id: TicketStatus; label: string; bg: string }[] = [
    { id: 'todo', label: 'À faire', bg: 'bg-slate-50' },
    { id: 'in_progress', label: 'En cours', bg: 'bg-indigo-50/40' },
    { id: 'review', label: 'En revue', bg: 'bg-amber-50/40' },
    { id: 'done', label: 'Terminé (Done)', bg: 'bg-emerald-50/40' },
  ];

  const filteredTickets = typeFilter === 'all'
    ? tickets
    : tickets.filter(t => t.type === typeFilter);

  const totalPoints = tickets.reduce((acc, t) => acc + t.storyPoints, 0);
  const donePoints = tickets.filter(t => t.status === 'done').reduce((acc, t) => acc + t.storyPoints, 0);

  return (
    <Card className="relative rounded-3xl border-0 ring-1 ring-indigo-500/20 bg-gradient-to-b from-[#0F172A]/95 via-[#0D1526]/95 to-[#070B14]/98 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(99,102,241,0.18)] overflow-hidden transition-all duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="relative z-10 border-b border-indigo-500/15 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Laboratoire 03</Badge>
              <Badge variant="outline" size="sm" className="border-indigo-500/30 text-indigo-300">Kanban Scrum interactif</Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl mt-1">Jira Simulation · Scrum Board</CardTitle>
            <CardDescription>
              Manipule les tickets d’un Sprint Scrum, déplace-les entre les colonnes de workflow et observe la mise à jour des Story Points terminés.
            </CardDescription>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Filtrer :
            </span>
            <div className="inline-flex rounded-xl bg-[#070B14] border border-indigo-500/20 p-1 text-xs">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${typeFilter === 'all' ? 'bg-indigo-600 shadow-sm font-bold text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Tous
              </button>
              <button
                onClick={() => setTypeFilter('story')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${typeFilter === 'story' ? 'bg-indigo-600 shadow-sm font-bold text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Stories
              </button>
              <button
                onClick={() => setTypeFilter('bug')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${typeFilter === 'bug' ? 'bg-indigo-600 shadow-sm font-bold text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Bugs
              </button>
              <button
                onClick={() => setTypeFilter('task')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${typeFilter === 'task' ? 'bg-indigo-600 shadow-sm font-bold text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Tasks
              </button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 pt-6">
        {/* Sprint Goal Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 p-4 shadow-sm">
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Sprint 1 Goal</div>
            <div className="text-sm font-bold text-white mt-0.5">
              Permettre la connexion sécurisée et la consultation des notes pour 10 000 stagiaires.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-400">Vélocité validée</div>
              <div className="text-sm font-bold text-emerald-400">
                {donePoints} / {totalPoints} Story Points ({Math.round((donePoints / totalPoints) * 100)}%)
              </div>
            </div>
          </div>
        </div>

        {/* 4 Scrum Columns */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {columns.map(col => {
            const colTickets = filteredTickets.filter(t => t.status === col.id);
            const colPoints = colTickets.reduce((acc, t) => acc + t.storyPoints, 0);

            return (
              <div key={col.id} className="flex flex-col rounded-2xl border border-indigo-500/15 bg-gradient-to-b from-[#070B14]/80 to-[#0A0F1E]/80 p-3.5 shadow-lg">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-indigo-500/15 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{col.label}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-slate-300">
                      {colTickets.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {colPoints} pts
                  </span>
                </div>

                {/* Ticket Cards */}
                <div className="flex-1 space-y-3">
                  {colTickets.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-indigo-500/20 p-4 text-center text-xs text-slate-500">
                      Aucun ticket
                    </div>
                  ) : (
                    colTickets.map(ticket => (
                      <div
                        key={ticket.id}
                        className="rounded-xl border border-indigo-500/20 bg-gradient-to-b from-[#0F172A] to-[#0D1526] p-3.5 shadow-md hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all group"
                      >
                        {/* Key and Type */}
                        <div className="flex items-center justify-between text-[11px] mb-2">
                          <span className="font-mono font-bold text-indigo-400">{ticket.key}</span>
                          <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            ticket.type === 'bug'
                              ? 'bg-red-950/60 text-red-400 border border-red-500/40'
                              : ticket.type === 'story'
                              ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/40'
                              : 'bg-teal-950/60 text-teal-300 border border-teal-500/40'
                          }`}>
                            {ticket.type === 'bug' && <Bug className="h-3 w-3" />}
                            {ticket.type === 'story' && <Bookmark className="h-3 w-3" />}
                            {ticket.type === 'task' && <CheckSquare className="h-3 w-3" />}
                            {ticket.type.toUpperCase()}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-semibold text-slate-200 leading-snug mb-3 line-clamp-2">
                          {ticket.title}
                        </h4>

                        {/* Footer (Points, Assignee, Move Buttons) */}
                        <div className="flex items-center justify-between border-t border-indigo-500/15 pt-2 text-[10px] text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-bold text-slate-300">
                              {ticket.storyPoints} pts
                            </span>
                            <span className="text-slate-400">{ticket.assignee}</span>
                          </div>

                          {/* Controls to move */}
                          <div className="flex items-center gap-1">
                            {ticket.status !== 'todo' && (
                              <button
                                onClick={() => moveTicket(ticket.id, 'prev')}
                                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                title="Reculer d’une colonne"
                              >
                                <ArrowLeft className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {ticket.status !== 'done' && (
                              <button
                                onClick={() => moveTicket(ticket.id, 'next')}
                                className="p-1 rounded hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                                title="Avancer d’une colonne"
                              >
                                <ArrowRight className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
