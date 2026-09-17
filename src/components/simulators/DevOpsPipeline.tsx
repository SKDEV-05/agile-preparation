import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Play, RotateCcw, CheckCircle2, Clock, FileCode, Server } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  jobName: string;
  command: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  duration: string;
  logs: string[];
}

const defaultStages: Stage[] = [
  {
    id: 'build',
    name: '1. Build',
    jobName: 'compile_assets',
    command: 'npm run build',
    status: 'idle',
    duration: '18s',
    logs: [
      'Running with gitlab-runner 16.5.0 on docker-runner-01',
      'Using Docker executor with image node:20 ...',
      '$ npm run build',
      'vite v5.4.2 building for production...',
      '✓ 148 modules transformed.',
      'dist/index.html   0.85 kB',
      'dist/assets/index.js   142.12 kB',
      'Uploading artifacts for successful job...',
      'Job succeeded'
    ]
  },
  {
    id: 'test',
    name: '2. Unit Tests',
    jobName: 'run_unit_tests',
    command: 'npm test -- --coverage',
    status: 'idle',
    duration: '24s',
    logs: [
      'Using Docker executor with image node:20 ...',
      '$ npm test -- --coverage',
      'PASS src/services/auth.test.ts (12 tests)',
      'PASS src/utils/pertCalculator.test.ts (8 tests)',
      'Test Suites: 2 passed, 2 total',
      'Tests:       20 passed, 20 total',
      'Snapshots:   0 total',
      'Time:        4.12s',
      'Job succeeded'
    ]
  },
  {
    id: 'quality',
    name: '3. SonarQube',
    jobName: 'sonar_scanner',
    command: 'sonar-scanner -Dsonar.projectKey=agile-ofppt',
    status: 'idle',
    duration: '31s',
    logs: [
      '$ sonar-scanner -Dsonar.host.url=https://sonarqube.ofppt.ma',
      'INFO: SonarScanner 5.0.1.3006',
      'INFO: Analyzing 148 source files...',
      'INFO: Quality Gate status: OK (Passed)',
      'INFO: 0 Vulnerabilities, 0 Bugs, 1 Code Smell (Minor)',
      'INFO: Coverage: 84.6% (threshold > 80%)',
      'INFO: Duplication: 1.2% (threshold < 3%)',
      'Job succeeded'
    ]
  },
  {
    id: 'package',
    name: '4. Package',
    jobName: 'docker_build',
    command: 'docker build -t registry.gitlab.com/app:v1.2 .',
    status: 'idle',
    duration: '42s',
    logs: [
      '$ docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .',
      'Step 1/6 : FROM nginx:alpine',
      'Step 2/6 : COPY dist/ /usr/share/nginx/html',
      'Successfully tagged registry.gitlab.com/app:v1.2',
      '$ docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA',
      'The push refers to repository [registry.gitlab.com/app]',
      'Job succeeded'
    ]
  },
  {
    id: 'deploy',
    name: '5. Deploy Staging',
    jobName: 'deploy_to_server',
    command: 'ssh deploy@staging.ofppt.ma "docker compose pull && docker compose up -d"',
    status: 'idle',
    duration: '15s',
    logs: [
      '$ ssh-add <(echo "$STAGING_PRIVATE_KEY")',
      'Connecting to staging.ofppt.ma...',
      'Pulling new image registry.gitlab.com/app:v1.2 ...',
      'Container agile-app-prod recreating...',
      'Container agile-app-prod started.',
      'Health check OK (HTTP 200 at /health)',
      'Application successfully deployed to Staging environment!'
    ]
  }
];

export function DevOpsPipeline() {
  const [stages, setStages] = useState<Stage[]>(defaultStages);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<string>('build');
  const [viewYaml, setViewYaml] = useState(false);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);

    // Reset stages to idle first
    setStages(prev => prev.map(s => ({ ...s, status: 'idle' })));

    // Sequential step simulation
    defaultStages.forEach((stage, idx) => {
      setTimeout(() => {
        // Set current to running
        setStages(prev => prev.map((s, i) => i === idx ? { ...s, status: 'running' } : s));
        setSelectedStageId(stage.id);

        setTimeout(() => {
          // Set to passed
          setStages(prev => prev.map((s, i) => i === idx ? { ...s, status: 'passed' } : s));
          if (idx === defaultStages.length - 1) {
            setIsRunning(false);
          }
        }, 900);
      }, idx * 1100);
    });
  };

  const handleReset = () => {
    setStages(defaultStages);
    setIsRunning(false);
    setSelectedStageId('build');
  };

  const selectedStage = stages.find(s => s.id === selectedStageId) || stages[0];

  const yamlContent = `# .gitlab-ci.yml à la racine du projet
stages:
  - build
  - test
  - quality
  - package
  - deploy

compile_assets:
  stage: build
  image: node:20
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

run_unit_tests:
  stage: test
  image: node:20
  script:
    - npm test -- --coverage

sonar_scanner:
  stage: quality
  image: sonarsource/sonar-scanner-cli
  script:
    - sonar-scanner -Dsonar.projectKey=agile-ofppt

docker_build:
  stage: package
  image: docker:24
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

deploy_to_server:
  stage: deploy
  script:
    - ssh deploy@staging.ofppt.ma "docker compose up -d"
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
`;

  return (
    <Card className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1526]/90 shadow-sm dark:shadow-2xl">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="danger" size="sm">Laboratoire 05</Badge>
              <Badge variant="outline" size="sm" className="border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300">GitLab CI / CD</Badge>
            </div>
            <CardTitle className="text-xl sm:text-2xl mt-1 text-slate-900 dark:text-white">DevOps Lab · Pipeline CI/CD Vivant</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Lance l’exécution séquentielle du pipeline de livraison. Clique sur chaque étape pour inspecter les commandes exécutées et les journaux réels du Runner.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewYaml(!viewYaml)}
              className="gap-1.5 border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <FileCode className="h-4 w-4 text-slate-500" />
              <span>{viewYaml ? 'Voir le Pipeline' : 'Voir .gitlab-ci.yml'}</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={isRunning}
              onClick={runPipeline}
              className="gap-2 font-bold shadow-sm"
            >
              <Play className="h-4 w-4" />
              <span>{isRunning ? 'Exécution en cours...' : 'Lancer le Pipeline'}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5">
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {viewYaml ? (
          /* YAML Viewer */
          <div className="rounded-2xl border border-slate-800 dark:border-white/10 bg-[#030712] p-5 font-mono text-xs text-slate-300 overflow-x-auto shadow-inner">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-3 text-slate-400">
              <FileCode className="h-4 w-4 text-cyan-400" />
              <span>.gitlab-ci.yml — Configuration déclarative du pipeline</span>
            </div>
            <pre className="text-slate-200 leading-relaxed">{yamlContent}</pre>
          </div>
        ) : (
          <div>
            {/* Horizontal Stage Timeline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
              {stages.map((stage) => {
                const isSelected = stage.id === selectedStageId;
                let borderStyle = 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#070B14]/80 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300';
                if (stage.status === 'running') {
                  borderStyle = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 ring-2 ring-indigo-500/40 text-indigo-900 dark:text-white animate-pulse';
                } else if (stage.status === 'passed') {
                  borderStyle = 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200';
                }

                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`text-left rounded-2xl border p-4 transition-all duration-200 ${borderStyle} ${
                      isSelected ? 'ring-2 ring-cyan-500 dark:ring-cyan-400 shadow-md dark:shadow-lg dark:shadow-cyan-900/30' : 'shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-2 font-bold">
                      <span className="text-slate-500 dark:text-slate-400">{stage.name}</span>
                      {stage.status === 'passed' && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {stage.status === 'running' && (
                        <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {stage.jobName}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      {stage.status === 'passed' ? `Durée : ${stage.duration}` : 'En attente'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stage Detail & Terminal Logs */}
            <div className="rounded-2xl border border-slate-800 dark:border-white/10 bg-[#030712] p-5 shadow-inner">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 mb-3 gap-2">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <Server className="h-4 w-4 text-cyan-400" />
                  <span>GitLab Runner #01 · Stage : <b className="text-white font-bold">{selectedStage.name}</b></span>
                </div>
                <div className="font-mono text-xs text-slate-400">
                  Commande : <code className="text-cyan-300 font-bold">{selectedStage.command}</code>
                </div>
              </div>

              <div className="space-y-1 font-mono text-xs text-slate-300 max-h-48 overflow-y-auto">
                {selectedStage.logs.map((line, idx) => (
                  <div key={idx} className={line.startsWith('$') ? 'text-cyan-400 font-bold' : line.includes('succeeded') || line.includes('Passed') ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
