import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, ArrowLeft, Plus, CheckCircle2, Bookmark, Bug, CheckSquare, Layers, Filter } from 'lucide-react';

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
    <Card className="rounded-3xl border-slate-200/90 shadow-card">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">Laboratoire 03</Badge>
              <Badge variant="outline" size="sm">Kanban Scrum interactif</Badge>
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
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${typeFilter === 'all' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-600'}`}
              >
                Tous
              </button>
              <button
                onClick={() => setTypeFilter('story')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${typeFilter === 'story' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-600'}`}
              >
                Stories
              </button>
              <button
                onClick={() => setTypeFilter('bug')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${typeFilter === 'bug' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-600'}`}
              >
                Bugs
              </button>
              <button
                onClick={() => setTypeFilter('task')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${typeFilter === 'task' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-600'}`}
              >
                Tasks
              </button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Sprint Goal Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 p-4">
          <div>
            <div className="text-xs font-bold text-primary uppercase tracking-wider">Sprint 1 Goal</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">
              Permettre la connexion sécurisée et la consultation des notes pour 10 000 stagiaires.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-500">Vélocité validée</div>
              <div className="text-sm font-bold text-emerald-700">
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
              <div key={col.id} className="flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50/40 p-3.5">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{col.label}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200/80 text-[10px] font-bold text-slate-600">
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
                    <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
                      Aucun ticket
                    </div>
                  ) : (
                    colTickets.map(ticket => (
                      <div
                        key={ticket.id}
                        className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm hover:shadow transition-shadow"
                      >
                        {/* Key and Type */}
                        <div className="flex items-center justify-between text-[11px] mb-2">
                          <span className="font-mono font-bold text-primary">{ticket.key}</span>
                          <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            ticket.type === 'bug'
                              ? 'bg-red-50 text-red-700'
                              : ticket.type === 'story'
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'bg-teal-50 text-teal-700'
                          }`}>
                            {ticket.type === 'bug' && <Bug className="h-3 w-3" />}
                            {ticket.type === 'story' && <Bookmark className="h-3 w-3" />}
                            {ticket.type === 'task' && <CheckSquare className="h-3 w-3" />}
                            {ticket.type.toUpperCase()}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-semibold text-slate-800 leading-snug mb-3 line-clamp-2">
                          {ticket.title}
                        </h4>

                        {/* Footer (Points, Assignee, Move Buttons) */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-bold text-slate-700">
                              {ticket.storyPoints} pts
                            </span>
                            <span className="text-slate-400">{ticket.assignee}</span>
                          </div>

                          {/* Controls to move */}
                          <div className="flex items-center gap-1">
                            {ticket.status !== 'todo' && (
                              <button
                                onClick={() => moveTicket(ticket.id, 'prev')}
                                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                                title="Reculer d’une colonne"
                              >
                                <ArrowLeft className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {ticket.status !== 'done' && (
                              <button
                                onClick={() => moveTicket(ticket.id, 'next')}
                                className="p-1 rounded hover:bg-slate-100 text-primary hover:text-primary-hover font-bold"
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
